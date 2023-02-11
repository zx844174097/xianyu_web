package com.mugui.Dui;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;
import com.mugui.tool.BufferedRandomAccessFile;

public class DimgFile {
	public BufferedImage bufferedImage = null;
	public File file = null;
	public String objecttype = "不区分";
	public String objectcolor = "任意";
	public String objectlevel = "任意";
	public String objecttime = "0-16"; 
	public String objectPRI = "999";
	public String objectname = "";

	public void saveAllData() {
		if (bufferedImage != null && file != null)
			try {
				if (objectcolor != null && objectlevel != null && objectPRI != null && objecttime != null && objecttype != null) {
					
					// 创建储存图片二进制流的输出流'
					ByteArrayOutputStream baos = new ByteArrayOutputStream();
					// 创建ImageOutputStream流
					ImageOutputStream imageOutputStream = ImageIO.createImageOutputStream(baos);
					ImageIO.write(bufferedImage, "bmp", imageOutputStream);
					BufferedRandomAccessFile bRandomAccessFile = new BufferedRandomAccessFile(file, "rw");
					String s = "{";
					s += objecttype + ",";
					s += objectcolor + ",";
					s += objectlevel + ",";
					s += objecttime + ",";
					s += objectPRI + ",";
					s += objectname + "}";
					bRandomAccessFile.seek(0);
					bRandomAccessFile.write(s.getBytes("utf-8"));
					bRandomAccessFile.seek(s.getBytes("utf-8").length);
					bRandomAccessFile.write(baos.toByteArray());
					bRandomAccessFile.close();
					imageOutputStream.close();
					baos.close();
					return;
				}
				ImageIO.write(bufferedImage, "bmp", file);
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

	public DimgFile getImgFile(String filepath) {
		return getImgFile(new File(filepath));
	}

	public DimgFile getImgFile(File file2) {
		try {
			InputStream inputStream = null;
			if (!file2.isFile()) {
				inputStream = DimgFile.class.getResourceAsStream("/com/mugui/ui/data/" + file2.getName());
			}
			DataInputStream dataInputStream = null;
			if (inputStream == null) {
				inputStream = new FileInputStream(file2);
			}
			dataInputStream = new DataInputStream(inputStream);
			if ((dataInputStream.read()) == '{') {
				byte[] b = new byte[1024 * 8];
				int bi = 0;
				int i = 0;
				while ((i = dataInputStream.read()) != '}') {
					b[bi++] = (byte) i;
				}
				String s = new String(b, "utf-8").trim();
				String pei[] = s.split(",");
				objecttype = pei[0];
				objectcolor = pei[1];
				objectlevel = pei[2];
				objecttime = pei[3];
				objectPRI = pei[4];
				if (pei.length > 5) {
					objectname = pei[5];
				} else {
					objectname = file2.getName().split("\\.")[0];
				}
				bi += 2;
			} else {
				dataInputStream.close();
				inputStream.close();
				inputStream = null;
				if (!file2.isFile()) {
					inputStream = DimgFile.class.getResourceAsStream("/com/mugui/ui/data/" + file2.getName());
				}
				if (inputStream == null) {
					inputStream = new FileInputStream(file2);
				}
				dataInputStream = new DataInputStream(inputStream);
			}
			ByteArrayOutputStream bos = new ByteArrayOutputStream();
			byte bbb[] = new byte[1024];
			int sss = 0;
			while ((sss = dataInputStream.read(bbb)) != -1) {
				bos.write(bbb, 0, sss);
			}
			ByteArrayInputStream bais = new ByteArrayInputStream(bos.toByteArray());
			ImageInputStream imageInputStream = ImageIO.createImageInputStream(bais);
			bufferedImage = ImageIO.read(imageInputStream);
			bais.close();
			dataInputStream.close();
			inputStream.close();
			file = file2;
		} catch (FileNotFoundException e) {
			//e.printStackTrace();
		} catch (IOException e) {
			//e.printStackTrace();
		}
		return this;
	}
}
