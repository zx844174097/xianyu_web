package com.mugui.windows;

import java.awt.Dimension;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.DataBufferInt;
import java.awt.image.DirectColorModel;
import java.awt.image.Raster;
import java.awt.image.WritableRaster;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;

import com.mugui.http.Bean.FileBean;
import com.mugui.http.Bean.ImgBean;
import com.mugui.http.pack.TcpBag;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.model.TCPModel;
import com.mugui.tool.Other;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class WindowControlThread extends Thread {
	public static final int LIUNX = 1;
	public static final int WINDOWS = 2;
	public static int SYSTEM_OS = -1;
	static {
		String os = System.getProperties().getProperty("os.name");
		if (!os.startsWith("win") && !os.startsWith("Win")) {
			SYSTEM_OS = LIUNX;
		} else {
			SYSTEM_OS = WINDOWS;
		}
	}
	public static Dimension WINDOW_SIZE = null;
	private static final double nsn = 1.0;
	public static final double WIDTH = 1920 * nsn;
	public static final double HEIGHT = 1080 * nsn;

	public WindowControlThread() {
		if (WINDOW_SIZE == null) {
			WINDOW_SIZE = Toolkit.getDefaultToolkit().getScreenSize();
		}
	}

	private static boolean windowDrawIsTrue = false;

	@Override
	public void run() {
		ByteArrayInputStream inputStream = null;
		try {
			windowDrawIsTrue = true;
			while (windowDrawIsTrue) {
				int size = 1024;

				// DrawHandleThread threads[] = new DrawHandleThread[1];
				// for (int i = 0; i < threads.length; i++) {
				// threads[i] = new DrawHandleThread();
				// threads[i].start();
				// }
				DrawHandleThread thread = new DrawHandleThread();
				thread.start();
				System.out.println("初始化");
				TcpBag bag = new TcpBag();
				while (windowDrawIsTrue) {
					boolean bool = false;
					for (int i = 0; i < map.length && windowDrawIsTrue; i++) {
						WindowControlBean windowControlBean = map[i];
						if (windowControlBean == null || !windowControlBean.isTrue()) {
							continue;
						}
						bool = true;
						DrawHandleBean drawHandleBean = windowControlBean.getOrSetBody(null);
						if (drawHandleBean == null)
							continue;

						bag.setBag_id(TcpBag.USER_WINDOWS_IMG);
						inputStream = new ByteArrayInputStream(drawHandleBean.body);
						byte bb[] = new byte[size];
						int len;
						FileBean bean = new FileBean();
						bean.setFile_page_all_size(drawHandleBean.body.length);
						bean.setFile_name(drawHandleBean.hashCode() + " " + System.currentTimeMillis());
						int seek = 0;
						long time = System.currentTimeMillis();
						while ((len = inputStream.read(bb)) > 0 && windowDrawIsTrue) {
							bag.setBody(bb);
							bean.setFile_page_number(len);
							bean.setFile_seek(seek);
							bean.setOther_description(nsn + " " + drawHandleBean.type + " " + drawHandleBean.yuan_len);
							seek += len;
							bag.setBody_description(bean.toJsonObject());
							 if (map[i].getTcpSocket().isSocketRun()) {
							map[i].getTcpSocket().sendByteArray(bag);
							} else {
								windowDrawIsTrue = false;
								return; 
							}
						}
						inputStream.close();
						// System.out.println(System.currentTimeMillis() -
						// time);
					}
					if (windowDrawIsTrue)
						windowDrawIsTrue = bool;
				}
				System.out.println("正常停止");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			windowDrawIsTrue = false;
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
	}

	class DrawHandleThread extends Thread {
		private DirectColorModel screenCapCM = new DirectColorModel(24,
				/* red mask */ 0x00FF0000, /* green mask */ 0x0000FF00,
				/* blue mask */ 0x000000FF);
		private int[] bandmasks = new int[3];

		@Override
		public void run() {
			bandmasks[0] = screenCapCM.getRedMask();
			bandmasks[1] = screenCapCM.getGreenMask();
			bandmasks[2] = screenCapCM.getBlueMask();
			w = WINDOW_SIZE.width > WIDTH ? WIDTH : WINDOW_SIZE.width;
			h = WINDOW_SIZE.height > HEIGHT ? HEIGHT : WINDOW_SIZE.height;
			dw = WINDOW_SIZE.width > WIDTH ? WIDTH / WINDOW_SIZE.width : 1;
			dh = WINDOW_SIZE.height > HEIGHT ? HEIGHT / WINDOW_SIZE.height : 1;

			// int size = WINDOW_SIZE.width * WINDOW_SIZE.height
			// /
			// 8;
			init();
			while (windowDrawIsTrue) {
				for (int i = 0; i < map.length && windowDrawIsTrue; i++) {
					WindowControlBean windowControlBean = map[i];
					if (windowControlBean == null || !windowControlBean.isTrue()) {
						continue;
					}
					try {
						DrawHandleBean linbean = Draw(windowControlBean.getLastBean());
						if (linbean == null)
							continue;
						windowControlBean.getOrSetBody(linbean);
					} catch (Exception e) {
						e.printStackTrace();
						windowDrawIsTrue = false;
					} finally {
						if (outputStream != null) {
							try {
								outputStream.close();
							} catch (IOException e) {
								e.printStackTrace();
							}
						}

					}
				}
			}
		}

		private void init() {
			float quality = 0.15f;
			writer = ImageIO.getImageWritersByFormatName("JPEG").next();
			writeParam = (JPEGImageWriteParam) writer.getDefaultWriteParam();
			writeParam.setCompressionMode(JPEGImageWriteParam.MODE_EXPLICIT);
			writeParam.setProgressiveMode(JPEGImageWriteParam.MODE_DISABLED);
			writeParam.setCompressionQuality(quality);
			ColorModel colorModel = ColorModel.getRGBdefault();
			// 指定压缩时使用的色彩模式
			writeParam.setDestinationType(new javax.imageio.ImageTypeSpecifier(colorModel, colorModel.createCompatibleSampleModel(6, 6)));

		}

		ByteArrayOutputStream outputStream = null;
		ImageWriter writer;
		JPEGImageWriteParam writeParam;
		BufferedImage bufferedImage;
		DataBufferInt buffer;
		WritableRaster raster;

		private DrawHandleBean Draw(DrawHandleBean last_bean) throws IOException {
			DrawHandleBean linbean = new DrawHandleBean();
			int[] draw_data = getDrawData();
			linbean.draw_data = draw_data;
			if (!windowDrawIsTrue)
				return null;
			if (last_bean != null) {
				outputStream = new ByteArrayOutputStream();
				DataOutputStream outputStream2 = new DataOutputStream(outputStream);
				for (int i = 0; i < last_bean.last_data.length; i++) {
					if (last_bean.last_data[i] != draw_data[i]) {
						outputStream2.writeInt(i);
						outputStream2.writeInt(draw_data[i]);
						i++;
						for (; i < last_bean.last_data.length; i++) {
							if (last_bean.last_data[i] != draw_data[i]) {
								outputStream2.writeInt(draw_data[i]);
							} else {
								outputStream2.writeInt(1);
								break;
							}
						}
					}
				}
				linbean.body = outputStream.toByteArray();
				outputStream2.close();
				outputStream.close();
				if (linbean.body.length <= 0) {
					Other.sleep(10);
					return null;
				}
				linbean.yuan_len = linbean.body.length;
				if (linbean.yuan_len < last_bean.last_body.length * 8) {
					linbean.body = Other.ZIPComperssor(linbean.body);
				} else {
					linbean.body = null;
				}
			}
			if (linbean.body != null) {
				linbean.type = 1;
			} else {
				linbean.type = 0;
				buffer = new DataBufferInt(draw_data, draw_data.length);
				raster = Raster.createPackedRaster(buffer, (int) w, (int) h, (int) w, bandmasks, null);
				bufferedImage = new BufferedImage(screenCapCM, raster, false, null);
				outputStream = new ByteArrayOutputStream();
				ImageOutputStream ios = ImageIO.createImageOutputStream(outputStream);
				writer.setOutput(ios);
				writer.write(null, new IIOImage(bufferedImage, null, null), writeParam);
				// writer.dispose();
				ios.close();
				outputStream.close();
				linbean.body = outputStream.toByteArray();
			}
			return linbean;
		}

	}

	Tool tool = new Tool();
	double w, h, dw, dh;
	long times = 0;

	private int[] getDrawData() {
		while (System.currentTimeMillis() - times < 40 && windowDrawIsTrue) {
			tool.delay(10);
		}
		times = System.currentTimeMillis();
		int[] lin2 = new int[(int) (w * h)];
		int[] lin = new int[WINDOW_SIZE.width * WINDOW_SIZE.height];
		if (WINDOW_SIZE.width >= WIDTH || WINDOW_SIZE.height >= HEIGHT) {
			lin = tool.getScreenBufferInt(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height);
			for (int j = 0; j < WINDOW_SIZE.height; j++) {
				for (int i = 0; i < WINDOW_SIZE.width; i++) {
					int s = (int) ((int) (j * dh) * w) + (int) (i * dw);
					lin2[s] = lin[j * WINDOW_SIZE.width + i];
				}
			}
			return lin2;
		} else {
			return tool.getScreenBufferInt(0, 0, WINDOW_SIZE.width, WINDOW_SIZE.height);
		}
	}

	private static WindowControlThread thread = null;

	public static boolean start(TcpBag bag2, TcpSocketUserBean tcpSocket2) {
		if (thread == null || !thread.isAlive()) {
			thread = new WindowControlThread();
		}
		ImgBean userBean = ImgBean.newInstanceBean(ImgBean.class, bag2.getBody_description());
		if (userBean == null)
			return false;
		LinkedList<Rectangle> list = new LinkedList<Rectangle>();
		if (userBean.getBody().equals("ALL")) {
			Dimension dimension = Toolkit.getDefaultToolkit().getScreenSize();
			list.add(new Rectangle(0, 0, dimension.width, dimension.height));
		} else {
			JSONArray array = JSONArray.fromObject(userBean.getBody());
			if (array == null)
				return false;
			Iterator iterator = array.iterator();
			while (iterator.hasNext()) {
				JSONObject object = JSONObject.fromObject(iterator.next());
				int x = object.getInt("x");
				int y = object.getInt("y");
				int w = object.getInt("w");
				int h = object.getInt("h");
				list.add(new Rectangle(x, y, w, h));
			}
		}
		if (list.size() <= 0) {
			System.err.println("无法知晓监视范围");
			return false;
		}
		WindowControlBean bean = new WindowControlBean(tcpSocket2, userBean, list.toArray(new Rectangle[10]));
		if (!thread.addWindowControlBean(bean)) {
			System.err.println("监视加入失败了，监视方过多");
			return false;
		}
		thread.start();
		return true;
	}

	private boolean addWindowControlBean(WindowControlBean bean) {
		bean.setTrue(true);
		for (int i = 0; i < map.length; i++) {
			if (map[i] == null || !map[i].isTrue()) {
				map[i] = bean;
				return true;
			}
		}
		return false;
	}

	public static void stop(TcpBag bag2, TcpSocketUserBean tcpSocket2) {
		windowDrawIsTrue = false;
	}

	private static WindowControlBean[] map = new WindowControlBean[5];

}

class DrawHandleBean {
	int type = -1;
	int yuan_len = -1;
	byte body[] = null;
	int last_data[] = null;
	int draw_data[] = null;
	byte[] last_body = null;
}

class WindowControlBean {
	private boolean isTrue = false;
	private ImgBean bean = null;
	private Rectangle[] rectangle = null;
	private DrawHandleBean body = null;
	private boolean isBody = false;
	private TcpSocketUserBean tcpSocket;

	protected TcpSocketUserBean getTcpSocket() {
		return tcpSocket;
	}

	protected void setTcpSocket(TcpSocketUserBean tcpSocket) {
		this.tcpSocket = tcpSocket;
	}

	private DrawHandleBean getBody() {
		if (!isTrue || !isBody) {
			return null;
		}
		if (body.type == 0) {
			this.body.last_data = this.body.draw_data;
			this.body.last_body = this.body.body;
		}
		isBody = false;
		return body;

	}

	public DrawHandleBean getLastBean() {
		return body;
	}

	public synchronized DrawHandleBean getOrSetBody(DrawHandleBean body) {
		if (body == null) {
			return getBody();
		} else {
			setBody(body);
		}
		return null;
	}

	private void setBody(DrawHandleBean body) {
		if (this.body == null) {
			this.body = body;
			body.last_body = body.body;
			body.last_data = body.draw_data;
		} else {
			this.body.draw_data = body.draw_data;
			this.body.body = body.body;
			this.body.type = body.type;
			this.body.yuan_len = body.yuan_len;
		}
		isBody = true;
	}

	public WindowControlBean(TcpSocketUserBean tcpSocket2, ImgBean userBean, Rectangle[] rectangle) {
		super();
		this.tcpSocket = tcpSocket2;
		this.bean = userBean;
		this.rectangle = rectangle;

	}

	public boolean isTrue() {
		return isTrue;
	}

	public void setTrue(boolean isTrue) {
		this.isTrue = isTrue;
	}

	public ImgBean getUserBean() {
		return bean;
	}

	public void setUserBean(ImgBean bean) {
		this.bean = bean;
	}

	public Rectangle[] getRectangle() {
		return rectangle;
	}

	public void setRectangle(Rectangle[] rectangle) {
		this.rectangle = rectangle;
	}

}