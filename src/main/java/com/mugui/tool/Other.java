/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.tool;

import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Random;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.imageio.ImageIO;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;

import org.xerial.snappy.Snappy;
import net.sf.json.JSONObject;

public class Other {
	private static final double EARTH_RADIUS = 6378.1369999999997D;
	public static final String[] chars = { "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
			"x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
			"Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

	public static void sleep(int i) {
		try {
			Thread.sleep(i);
		} catch (Exception localException) {
		}
	}

	public static <T> boolean ObjectToNewObjectBoolean(T obj, Class<?> toobj) {
		return toobj.isAssignableFrom(obj.getClass());
	}

	public static final Object ByteArrayToNewObject(byte[] b) {
		ByteArrayInputStream bArrayInputStream = null;
		ObjectInputStream ois = null;
		try {
			bArrayInputStream = new ByteArrayInputStream(b, 0, b.length);
			ois = new ObjectInputStream(bArrayInputStream);
			return ois.readObject();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (ois != null)
					ois.close();
				if (bArrayInputStream != null)
					bArrayInputStream.close();
			} catch (Exception localException3) {
			}
		}
		return null;
	}

	public static final byte[] ObjectToNewByteArray(Object obj) {
		ByteArrayOutputStream bArrayOutputStream = null;
		ObjectOutputStream oos = null;
		try {
			bArrayOutputStream = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(bArrayOutputStream);
			oos.writeObject(obj);
			return bArrayOutputStream.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (oos != null)
					oos.close();
				if (bArrayOutputStream != null)
					bArrayOutputStream.close();
			} catch (Exception localException3) {
			}
		}
		return null;
	}

	public static String ObjectToNewString(Object object) {
		try {
			return new String(ObjectToNewByteArray(object), "ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static Object StringToNewObjet(String s) {
		try {
			return ByteArrayToNewObject(s.getBytes("ISO-8859-1"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public static <T> T copyClassToNewClass(T obj) {
		ByteArrayOutputStream baos = null;
		ObjectOutputStream oos = null;
		ObjectInputStream ois = null;
		try {
			baos = new ByteArrayOutputStream();
			oos = new ObjectOutputStream(baos);
			oos.writeObject(obj);
			ois = new ObjectInputStream(new ByteArrayInputStream(baos.toByteArray()));
			return (T) ois.readObject();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (ois != null)
					ois.close();
				if (oos != null)
					oos.close();
				if (baos != null)
					baos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	public static boolean isMailString(String mialString) {
		if (mialString == null)
			return false;
		Pattern p = Pattern.compile("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.([a-zA-Z0-9_-])+)+$");
		Matcher m = p.matcher(mialString);
		return m.matches();
	}

	public static <T> T[] ArraysToNewArray(T[] first, T[] second) {
		T[] result = Arrays.copyOf(first, first.length + second.length);
		System.arraycopy(second, 0, result, first.length, second.length);
		return result;
	}

	public static byte[] ArraysToNewArray(byte[] first, byte[] second) {
		byte[] result = Arrays.copyOf(first, first.length + second.length);
		System.arraycopy(second, 0, result, first.length, second.length);
		return result;
	}

	public static byte[] intToByteArray(int i) {
		byte[] result = new byte[4];
		result[0] = (byte) (i & 0xFF);
		result[1] = (byte) (i >> 8 & 0xFF);
		result[2] = (byte) (i >> 16 & 0xFF);
		result[3] = (byte) (i >> 24 & 0xFF);
		return result;
	}

	public static int byteArrayint(byte[] res) {
		int targets = res[0] & 0xFF | res[1] << 8 & 0xFF00 | res[2] << 24 >>> 8 | res[3] << 24;
		return targets;
	}

	public static int getTextLength(Graphics graphics, String text) {
		return graphics.getFontMetrics().stringWidth(text);
	}

	public static int getFontHeight(Graphics graphics) {
		return graphics.getFontMetrics().getAscent();
	}

	public static boolean isInteger(String string) {
		try {
			Integer.parseInt(string);
			return true;
		} catch (Exception localException) {
		}
		return false;
	}

	public static boolean isDouble(String string) {
		try {
			Double.parseDouble(string);
			return true;
		} catch (Exception localException) {
		}
		return false;
	}

	private static double rad(double d) {
		return (d * 3.141592653589793D / 180.0D);
	}

	public static double GetDistance(double lat1, double lng1, double lat2, double lng2) {
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lng1) - rad(lng2);
		double s = 2.0D * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2.0D), 2.0D) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2.0D), 2.0D)));
		s *= 6378.1369999999997D;
		s = Math.round(s * 10000.0D) / 10000L;
		return s;
	}

	public static String getShortUuid() {
		StringBuffer stringBuffer = new StringBuffer();
		String uuid = UUID.randomUUID().toString().replace("-", "");
		for (int i = 0; i < 8; ++i) {
			String str = uuid.substring(i % 8 * 4, i % 8 * 4 + 4);
			int strInteger = Integer.parseInt(str, 16);
			stringBuffer.append(chars[(strInteger % 62)]);
		}

		uuid = UUID.randomUUID().toString().replace("-", "");
		for (int i = 0; i < 8; ++i) {
			String str = uuid.substring(i % 8 * 4, i % 8 * 4 + 4);
			int strInteger = Integer.parseInt(str, 16);
			stringBuffer.append(chars[(strInteger % 62)]);
		}
		return stringBuffer.toString();
	}

	public static String getUUID() {
		UUID uuid = UUID.randomUUID();
		String str = uuid.toString();
		String uuidStr = str.replace("-", "");
		return uuidStr;
	}

	public static long getDateToLong(String time) {
		try {
			return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(time).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return -1L;
	}

	public static long getNowDate() {
		return System.currentTimeMillis();
	}

	public static int getDateDifference(long createtime, long nowtime) {
		return Math.abs((int) (createtime - nowtime));
	}

	public static JSONObject delJsonNull(JSONObject jsonObject) {
		JSONObject jsonObject2 = new JSONObject();
		Iterator iterator = jsonObject.keys();
		while (iterator.hasNext()) {
			String key = (String) iterator.next();
			Object value = jsonObject.get(key);
			if ((value != null) && (!(value.toString().trim().equals("")))) {
				jsonObject2.put(key, value);
			}
		}
		return jsonObject2;
	}

	private static int r(int min, int max) {
		int num = 0;
		num = new Random().nextInt(max - min) + min;
		return num;
	}

	public static String getVerifyCode(int codeSize) {
		String str = "1234567890";
		char[] c = new char[codeSize];
		for (int i = 0; i < codeSize; ++i)
			c[i] = str.charAt(r(0, str.length()));
		return new String(c);
	}

	public static byte[] ZIPComperssor(byte[] body) {
		try {
			return Snappy.compress(body);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	public static byte[] ZIPDecompressor(byte[] body, int yuan_len) {
		try {
			return Snappy.uncompress(body);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;

	}

	public static byte[] ImgToByteArray(BufferedImage image) {
		ByteArrayOutputStream outputStream = null;
		try {
			outputStream = new ByteArrayOutputStream();
			ImageOutputStream outputStream2 = ImageIO.createImageOutputStream(outputStream);
			ImageIO.write(image, "BMP", outputStream2);
			return outputStream.toByteArray();
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			if (outputStream != null)
				try {
					outputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}

	public static BufferedImage byteArrayToImg(byte[] body) {
		ByteArrayInputStream bais = null;
		ImageInputStream inputStream = null;
		try {
			bais = new ByteArrayInputStream(body);
			inputStream = ImageIO.createImageInputStream(bais);
			return ImageIO.read(inputStream);
		} catch (IOException e) {
			return null;
		} finally {
			if (bais != null)
				try {
					bais.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}

	public static byte[] ArrayBytesDecrypt(byte[] data) {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
		byte[] key = new byte[16];
		try {
			int i;
			for (i = 0; i < key.length; i++) {
				key[i] = (byte) (data[i] - 125);
			}
			for (; i < data.length; i++) {
				data[i] = (byte) (key[i % 16] ^ (data[i] + key[i % 16]));
				dataOutputStream.writeByte(data[i]);
			}
			data = outputStream.toByteArray();
			dataOutputStream.close();
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return data;
	}

	public static byte[] ArrayBytesEncryption(byte[] data) {
		byte[] string = getShortUuid().getBytes();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
		try {
			int len = string.length;
			for (int i = 0; i < len; i++) {
				dataOutputStream.writeByte(string[i] + 125);
			}
			for (int i = 0; i < data.length; i++) {
				data[i] = (byte) ((string[i % len] ^ data[i]) - (string[i % len]));
				dataOutputStream.writeByte(data[i]);
			}
			data = outputStream.toByteArray();
			dataOutputStream.close();
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return data;
	}

	/**
	 * 
	 * @param content
	 *            请求的参数 格式为：name=xxx&pwd=xxx
	 * @param encoding
	 *            服务器端请求编码。如GBK,UTF-8等
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String getAddresses(String content, String encodingString) throws UnsupportedEncodingException {
		// 这里调用淘宝API
		String urlStr = "http://ip.taobao.com/service/getIpInfo.php";
		// 从http://whois.pconline.com.cn取得IP所在的省市区信息
		String returnStr = getResult(urlStr, content, encodingString);
		if (returnStr != null) {
			// 处理返回的省市区信息
			// System.out.println("(1) unicode转换成中文前的returnStr : " + returnStr);
			returnStr = decodeUnicode(returnStr);
			// System.out.println("(2) unicode转换成中文后的returnStr : " + returnStr);
			String[] temp = returnStr.split(",");
			if (temp.length < 3) {
				return null;// 无效IP，局域网测试
			}
			return returnStr;
		}
		return null;
	}

	/**
	 * @param urlStr
	 *            请求的地址
	 * @param content
	 *            请求的参数 格式为：name=xxx&pwd=xxx
	 * @param encoding
	 *            服务器端请求编码。如GBK,UTF-8等
	 * @return
	 */
	private static String getResult(String urlStr, String content, String encoding) {
		URL url = null;
		HttpURLConnection connection = null;
		try {
			url = new URL(urlStr + "?" + content);
			connection = (HttpURLConnection) url.openConnection();// 新建连接实例
			connection.setConnectTimeout(10000);// 设置连接超时时间，单位毫秒
			connection.setReadTimeout(10000);// 设置读取数据超时时间，单位毫秒
			connection.setDoOutput(true);// 是否打开输出流 true|false
			connection.setDoInput(true);// 是否打开输入流true|false
			connection.setRequestMethod("POST");// 提交方法POST|GET
			connection.setUseCaches(false);// 是否缓存true|false
			// DataOutputStream out = new
			// DataOutputStream(connection.getOutputStream());// 打开输出流往对端服务器写数据
			// out.writeBytes(content);// 写数据,也就是提交你的表单 name=xxx&pwd=xxx
			// out.flush();// 刷新
			// out.close();// 关闭输出流 
			if (connection.getResponseCode() == 200) {
				BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), encoding));// 往对端写完数据对端服务器返回数据
				// ,以BufferedReader流来读取
				StringBuffer buffer = new StringBuffer();
				String line = "";
				while ((line = reader.readLine()) != null) {
					buffer.append(line);
				}
				reader.close();
				return buffer.toString();
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (connection != null) {
				connection.disconnect();// 关闭连接
			}
		}
		return null;
	}

	/**
	 * unicode 转换成 中文
	 * 
	 * @author fanhui 2007-3-15
	 * @param theString
	 * @return
	 */
	public static String decodeUnicode(String theString) {
		char aChar;
		int len = theString.length();
		StringBuffer outBuffer = new StringBuffer(len);
		for (int x = 0; x < len;) {
			aChar = theString.charAt(x++);
			if (aChar == '\\') {
				aChar = theString.charAt(x++);
				if (aChar == 'u') {
					int value = 0;
					for (int i = 0; i < 4; i++) {
						aChar = theString.charAt(x++);
						switch (aChar) {
						case '0':
						case '1':
						case '2':
						case '3':
						case '4':
						case '5':
						case '6':
						case '7':
						case '8':
						case '9':
							value = (value << 4) + aChar - '0';
							break;
						case 'a':
						case 'b':
						case 'c':
						case 'd':
						case 'e':
						case 'f':
							value = (value << 4) + 10 + aChar - 'a';
							break;
						case 'A':
						case 'B':
						case 'C':
						case 'D':
						case 'E':
						case 'F':
							value = (value << 4) + 10 + aChar - 'A';
							break;
						default:
							throw new IllegalArgumentException("Malformed      encoding.");
						}
					}
					outBuffer.append((char) value);
				} else {
					if (aChar == 't') {
						aChar = '\t';
					} else if (aChar == 'r') {
						aChar = '\r';
					} else if (aChar == 'n') {
						aChar = '\n';
					} else if (aChar == 'f') {
						aChar = '\f';
					}
					outBuffer.append(aChar);
				}
			} else {
				outBuffer.append(aChar);
			}
		}
		return outBuffer.toString();
	}
}