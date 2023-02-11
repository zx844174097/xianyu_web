/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.Dui.DimgFile;
import com.mugui.MAIN.MAIN;
import com.mugui.http.Bean.FishBean;
import com.mugui.tool.ImgTool;
import com.mugui.tool.Other;
import com.mugui.windows.Tool;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.commons.lang.NullArgumentException;

public class FishPrice {
	private static Tool tool = new Tool();
	public static ConcurrentHashMap<Integer, YuAllBody> allbody = new ConcurrentHashMap();

	public static void addAllBody(int line_index, FishBean yutu, int index) {
		if (allbody.get(Integer.valueOf(line_index)) == null) {
			throw new NullArgumentException("该调线路未被建立失败");
		}
		((YuAllBody) allbody.get(Integer.valueOf(line_index))).addYuBody(yutu, index);
	}

	public static int saveLine(BufferedImage image, int server_id) {
		XianluBody temp_img = new XianluBody(image);
		Iterator<Entry<Integer, YuAllBody>> body = allbody.entrySet().iterator();
		while (body.hasNext()) {
			Entry<Integer, YuAllBody> temp_body = body.next();
			if (temp_body.getValue() == null || temp_body.getValue().xianluBody == null) {
				continue;
			}
			if (tool.图中找图EX(temp_body.getValue().xianluBody.yuan, temp_img.te, 0.015D, 0, 0) != null) {
				temp_body.getValue().xianluBody.yuan = temp_img.yuan;
				temp_body.getValue().xianluBody.lint_time = System.currentTimeMillis();
				// saveLineFile(temp_body.getValue(), temp_body.getKey());
				return ((Integer) temp_body.getKey()).intValue();
			} else if (System.currentTimeMillis() - temp_body.getValue().xianluBody.lint_time > 60 * 60 * 24 * 1000) {
				temp_body.getValue().body.clear();
				body.remove(); 
			}
		}
		YuAllBody temp = new YuAllBody(temp_img);
		temp.xianluBody.server_id = server_id;
		temp.xianluBody.lint_time = System.currentTimeMillis();
		int i = 0;
		allbody.put((i = allbody.size()), temp);
		// 保存这次的线路id
		// saveLineFile(temp, i);
		return i;
	}

	// private static void saveLineFile(YuAllBody temp, int line_id) {
	// DimgFile dimgFile = new DimgFile();
	// dimgFile.bufferedImage = temp.xianluBody.yuan;
	// dimgFile.objectlevel = line_id + "";
	// dimgFile.objecttype = temp.xianluBody.server_id + "";
	// File file = new File(MAIN.JARFILEPATH + "/line_img");
	// if (!file.isDirectory()) {
	// file.mkdirs();
	// }
	// dimgFile.file = new File(MAIN.JARFILEPATH + "/line_img/" +
	// Other.getShortUuid() + ".bmp");
	// dimgFile.saveAllData();
	// }

	public static byte[] getLineAllBody(int d_index2) {
		YuAllBody temp = (YuAllBody) allbody.get(Integer.valueOf(d_index2));
		if (temp == null) {
			throw new NullArgumentException("该线路不存在：" + d_index2);
		}
		Iterator iterator = temp.body.entrySet().iterator();
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		DataOutputStream dataOutputStream = new DataOutputStream(out);

		try {
			byte[] b = null;
			dataOutputStream.writeLong(temp.xianluBody.time);
			while (iterator.hasNext()) {
				Map.Entry entry = (Map.Entry) iterator.next();
				dataOutputStream.writeInt(((Integer) entry.getKey()).intValue());
				YuBody body = (YuBody) entry.getValue();
				dataOutputStream.writeInt((int) body.bean.getFish_price());
				if (body.bean.getFish_name() == null) {
					body.bean.setFish_name(" ");
				}
				b = body.bean.getFish_name().getBytes(Charset.forName("UTF-8"));
				dataOutputStream.writeInt(b.length);
				dataOutputStream.write(b);
				b = Other.ImgToByteArray(body.bean.getFish_name_img());
				dataOutputStream.writeInt(b.length);
				dataOutputStream.write(b);
				b = Other.ImgToByteArray(body.bean.getFish_img());
				dataOutputStream.writeInt(b.length);
				dataOutputStream.write(b);
			}
			return out.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (dataOutputStream != null)
					dataOutputStream.close();
				if (out != null)
					out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public static Iterator<Map.Entry<Integer, YuAllBody>> getAllLine() {
		return allbody.entrySet().iterator();
	}

	public static XianluBody getLineFeature(int line_index) {
		return ((YuAllBody) allbody.get(Integer.valueOf(line_index))).xianluBody;
	}

	public static void updateLineTime(int line_index) {
		((YuAllBody) allbody.get(Integer.valueOf(line_index))).xianluBody.time = System.currentTimeMillis();
	}

	public static void removeLineBody(int line_index) {
		((YuAllBody) allbody.get(Integer.valueOf(line_index))).body.clear();
	}

	public static int sendBoldeOne(BufferedImage img, int server_id) {
		int i = saveLine(img, server_id);
		if (System.currentTimeMillis() - ((YuAllBody) allbody.get(Integer.valueOf(i))).xianluBody.bold_time < 3600000L)
			return -1;
		((YuAllBody) allbody.get(Integer.valueOf(i))).xianluBody.bold_time = System.currentTimeMillis();
		return i;
	}

	public static class XianluBody {
		public long lint_time;
		public long bold_time = 0L;
		public BufferedImage yuan = null;
		public BufferedImage te = null;
		public long time = 0L;
		public int server_id;

		public XianluBody(BufferedImage image) {
			this.yuan = image;
			image = ImgTool.cutImage(image, 6, 0, image.getWidth() - 12, image.getHeight());
			this.te = FishPrice.tool.得到图的特征图(image, 0.12D, "61CDB0");
		}
	}

	public static class YuAllBody {
		public FishPrice.XianluBody xianluBody = null;
		public ConcurrentHashMap<Integer, FishPrice.YuBody> body = new ConcurrentHashMap();

		public YuAllBody(FishPrice.XianluBody temp_img) {
			this.xianluBody = temp_img;
		}

		public YuAllBody(BufferedImage xianlu) {
			this.xianluBody = new FishPrice.XianluBody(xianlu);
		}

		public void addYuBody(FishBean yutu, int i) {
			FishPrice.YuBody lin = new FishPrice.YuBody(yutu);
			if (this.body.get(Integer.valueOf(i)) == null) {
				this.body.put(Integer.valueOf(i), lin);
				return;
			}
			BufferedImage lin_temp = ImgTool.cutImage(lin.bean.getFish_img(), 5, 5, lin.bean.getFish_img().getWidth() - 10,
					lin.bean.getFish_img().getHeight() - 10);
			FishPrice.YuBody lin2 = (FishPrice.YuBody) this.body.get(Integer.valueOf(i));
			if (FishPrice.tool.图中找图(lin2.bean.getFish_img(), lin_temp, 0.07D, 0, 0) != null) {
				lin2.bean = yutu;
				return;
			}
			Iterator iterator = this.body.entrySet().iterator();
			while (iterator.hasNext()) {
				Map.Entry temp = (Map.Entry) iterator.next();
				if (FishPrice.tool.图中找图(((FishPrice.YuBody) temp.getValue()).bean.getFish_img(), lin_temp, 0.07D, 0, 0) != null) {
					((FishPrice.YuBody) temp.getValue()).bean = yutu;
					return;
				}
			}
			this.body.put(Integer.valueOf(i), lin);
		}
	}

	public static class YuBody {
		public FishBean bean = null;

		public YuBody(FishBean yuan) {
			this.bean = yuan;
		}
	}
}