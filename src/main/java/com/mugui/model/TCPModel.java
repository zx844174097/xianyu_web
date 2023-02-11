/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.MAIN.MAIN;
import com.mugui.Mail.MailBean;
import com.mugui.Mail.SendMailToSomeone;
import com.mugui.http.DataSave;
import com.mugui.http.Bean.DataTypeBean;
import com.mugui.http.Bean.FileBean;
import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.pack.TcpBag;
import com.mugui.http.tcp.Bag;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.model.GJ.GJModel;
import com.mugui.tool.DataClassLoader;
import com.mugui.tool.Other;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.NullArgumentException;
import org.apache.commons.lang.StringUtils;

public class TCPModel {
	private static BufferedImage image = null;
	private static int height = 0;
	private static int width = 0;
	private static int[][] tu = null;
	private static int[][] tu2 = null;
	private static int zuox;
	private static int zuoy;
	private static int youx;
	private static int youy;

	protected static void sendOutLoginError(TcpBag bag, TcpSocketUserBean writer) {
		bag.setBag_id(4);
		sendBean(bag, writer);
	}

	protected static String sendError(TcpBag bag, String error_id, String error, TcpSocketUserBean writer) {
		InfoBean info = new InfoBean();
		info.setId(error_id);
		info.setInfo(error);
		return sendBean(bag, info, writer).toString();
	}

	protected static String sendSuccess(TcpBag bag, String success_id, String success, TcpSocketUserBean writer) {
		InfoBean info = new InfoBean();
		info.setId(success_id);
		info.setInfo(success);
		return sendBean(bag, info, writer).toString();
	}

	protected static void sendBean(TcpBag bag, JSONArray jsonArray, TcpSocketUserBean writer) {
		bag.setBody(jsonArray);
		sendBean(bag, writer);
	}

	protected static void sendBean(TcpBag bag, JSONObject jsonObject, TcpSocketUserBean writer) {
		bag.setBody(jsonObject);

		sendBean(bag, writer);
	}

	protected static JsonBean sendBean(TcpBag bag, JsonBean bean, TcpSocketUserBean writer) {
		sendBean(bag, bean.toJsonObject(), writer);
		return bean;
	}

	protected static void sendBean(TcpBag bag, TcpSocketUserBean main_tcp) {
		main_tcp.sendCompact(bag);
		// TcpSocket.sendCompact(bag, writer);
	}

	public static void reg(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		if ((userBag.getUser_mail() == null) || (userBag.getCode() == null) || (userBag.getUser_passwd() == null) || (userBag.getUser_mail().equals(""))
				|| (userBag.getCode().equals("")) || (userBag.getUser_passwd().equals("")) || (!(Other.isMailString(userBag.getUser_mail())))) {
			sendError(bag, "error_reg", "你究竟想要做些什么呢？", writer);

			return;
		}
		// String s = DataSave.getCheck(writer);
		String s = (String) writer.getUserData("reg_code");
		if (s == null) {
			bag.setBag_id(0);
			sendError(bag, "error_reg", "验证码不正确，或者邮箱被更换？", writer);
			return;
		}
		if (!(s.equals(userBag.getCode()))) {
			bag.setBag_id(0);
			sendError(bag, "error_reg", "验证码不正确，请重新输入！", writer);
			return;
		}
		writer.delUserData("reg_code");
		// DataSave.remove(writer);
		if (SQLModel.reg(userBag)) {
			bag.setBag_id(2);
			sendSuccess(bag, "success_reg", "注册成功了！！", writer);
			return;
		}
		bag.setBag_id(0);
		sendError(bag, "error_reg", "不知道什么原因，注册失败了！", writer);
	}

	public static void login(TcpBag bag, TcpSocketUserBean tcpSocket) {
		if (StringUtils.isBlank(bag.getVersion())) {
			InfoBean infoBean = new InfoBean();
			infoBean.setInfo("该版本过低已被舍弃，请前往304814727QQ群重新下载");
			infoBean.setType("error");
			bag.setBody(infoBean.toJsonObject());
			sendOutLoginError(bag, tcpSocket);
			return;
		}
		if (!(StringUtils.equals(getNewVersion(), bag.getVersion()))) {
			bag.setBag_id(14);
			sendError(bag, "error", "发现新的辅助版本，稍后辅助将自行下载，若长时间辅助未跳转下载界面，请手动重启辅助", tcpSocket);
			return;
		}
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		if ((userBag == null) || (userBag.getUser_mail() == null) || (userBag.getUser_mail().equals("")) || (userBag.getUser_passwd().equals(""))
				|| (!(Other.isMailString(userBag.getUser_mail())))) {
			bag.setBag_id(4);
			sendError(bag, "error_login", "what? fuck!你想要干什么！！！sure?", tcpSocket);
			return;
		}
		String code = (String) tcpSocket.getUserData("login_code");
		if (HsAllModel.login(userBag, tcpSocket)) {
			String user_mail = userBag.getUser_mail();
			// System.out.println(writer.getHost() + " " + writer.getPort() + "
			// " + userBag);
			int type = -1;
			type = SQLModel.SaveUserLoginCity(userBag, tcpSocket);
			tcpSocket.delUserData("login_code");
			// 保存本次他登录的城市
			if (type == -1) {
				bag.setBag_id(4);
				sendError(bag, "error_login", "您登录的城市过多，请联系管理员", tcpSocket);
				tcpSocket.clearUserAllData();
				return;
			}
			code = Other.getShortUuid();
			tcpSocket.addUserData("code", code);
			tcpSocket.addUserData("userbean", userBag);
			bag.setBag_id(1);
			InfoBean infoBean = new InfoBean();
			String user_name = SQLModel.getUserName(userBag);
			if (user_name != null) {
				userBag.setUser_name(user_name);
			}
			userBag.setUser_mail(user_mail);
			userBag.setUser_mac(code);
			infoBean.setBody(userBag.toJsonObject());
			if (type == 0) {
				infoBean.setMessage("登录成功了，恭喜-。-！");
				infoBean.setType("success_login");
			} else {
				if (HsAllModel.updateLoginCode(userBag, tcpSocket) < 0) {
					sendError(bag, "error_login", "登录失败,您的账号可能被盗，且无法向您的邮箱发送验证信息，请联系管理员！", tcpSocket);
					return;
				}
				infoBean.setMessage("登录成功了，但是您的账号可能被盗，请前往注册邮箱查看验证码并输入");
				infoBean.setType("success_login_no");
			}
			TcpSocketUserBean t = com.mugui.http.DataSave.getTcpSocket(userBag.getUser_mail());
			if (t != null && t.isSocketRun() && t.getSocketChannel() != tcpSocket.getSocketChannel()) {
				TcpBag bag2 = new TcpBag();
				bag2.setBag_id(4);
				sendError(bag2, "error", "您在另一个设备登录了！", t);
				t.clearUserAllData();
			}
			bag.setBody(infoBean.toJsonObject());
			sendBean(bag, tcpSocket);
			com.mugui.http.DataSave.addTcpSocket(userBag.getUser_mail(), tcpSocket);
			return;
		}
		bag.setBag_id(0);
		sendError(bag, "error_login", "登录失败,用户名或者密码错误！", tcpSocket);
	}

	private static long time = 0;
	private static String version = "";

	private static String getNewVersion() {
		BufferedReader bReader = null;
		try {
			if (System.currentTimeMillis() - time > 30 * 1000) {
				File file = new File(MAIN.JARFILEPATH + "/WEB-INF/App/config");
				if (!(file.isFile())) {
					file.getParentFile().mkdirs();
					file.createNewFile();
					throw new NullArgumentException("未发现该文件目录，系统已自行创建" + file.getPath());
				}
				bReader = new BufferedReader(new FileReader(file));

				String str = null;
				String banben;
				while ((banben = bReader.readLine()) != null) {
					str = banben;
				}
				bReader.close();
				version = str;
				time = System.currentTimeMillis();
				return version;
			} else {
				return version;
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (bReader != null)
				try {
					bReader.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
		return null;
	}

	public static void regCode(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		String mail = userBag.getUser_mail();
		if ((mail == null) || (mail.equals("")) || (!(Other.isMailString(mail)))) {
			bag.setBag_id(0);
			sendError(bag, "error_regCode", "what? fuck!你想要干什么！！！验证码", writer);
			return;
		}
		if (SQLModel.isMail(mail)) {
			bag.setBag_id(0);
			sendError(bag, "error_regCode", "该邮箱已经被使用！！", writer);
			return;
		}
		String s = (String) writer.getUserData("reg_code");
		if (s != null) {
			bag.setBag_id(3);
			sendError(bag, "success_regCode", "验证码已发送到指定邮箱，请查看邮箱！", writer);
			return;
		}
		MailBean mailBean = new MailBean();
		mailBean.setTitle("黑色沙漠咸鱼辅助系统");
		mailBean.setSendTo(mail);
		s = Other.getVerifyCode(8);
		mailBean.setMailbody("咸鱼盒子群：304814727<br>本次操作验证码为： " + s);
		if (new SendMailToSomeone().send(mailBean)) {
			writer.addUserData("reg_code", s);
			bag.setBag_id(3);
			sendSuccess(bag, "success_regCode", "验证码已发送到指定邮箱，请查看邮箱！", writer);
		} else {
			bag.setBag_id(0);
			sendError(bag, "error_regCode", "验证码发送失败！", writer);
			writer.delUserData("reg_code");
			return;
		}
	}

	public static void Error(TcpBag bag, TcpSocketUserBean writer) {
		bag.setBag_id(4);
		sendError(bag, "error_outLogin", "天数时间不足，您已经被服务器注销了", writer);
	}

	public static String chuli() {
		String key = "";
		int maxbody = 0;
		height = image.getHeight();
		width = image.getWidth();
		tu = new int[width][height];
		tu2 = new int[width][height];
		maxbody = image.getRGB(20, 9);
		for (int j = 0; j < width; ++j)
			for (int i = 0; i < height; ++i)
				if (image.getRGB(j, i) == maxbody) {
					tu[j][i] = 1;
					tu2[j][i] = 1;
				} else {
					tu[j][i] = 0;
					tu2[j][i] = 0;
				}
		for (int j = 0; j < width; ++j) {
			for (int i = 0; i < height; ++i) {
				if (tu[j][i] == 1) {
					zuox = 9999;
					zuoy = 9999;
					youx = -1;
					youy = -1;
					int size = getBImages(j, i, 0);
					if ((size < 15) || (size > 30)) {
						j = youx + 1;
						break;
					}
					if ((tu2[zuox][zuoy] == 1) || (tu2[(zuox + 1)][zuoy] == 1) || (tu2[zuox][(zuoy + 1)] == 1)) {
						if ((tu2[youx][zuoy] == 1) || (tu2[(youx - 1)][zuoy] == 1) || (tu2[youx][(zuoy + 1)] == 1))
							key = key + "S";
						else {
							key = key + "D";
						}
					} else if ((tu2[youx][zuoy] == 1) || (tu2[youx][(zuoy + 1)] == 1) || (tu2[(youx - 1)][zuoy] == 1))
						key = key + "A";
					else {
						key = key + "W";
					}

					j = youx + 1;
					break;
				}
			}
		}
		return key;
	}

	public static int getBImages(int x1, int y1, int size) {
		tu[x1][y1] = 0;
		if (zuox > x1)
			zuox = x1;
		if (zuoy > y1)
			zuoy = y1;
		if (youx < x1)
			youx = x1;
		if (youy < y1)
			youy = y1;
		if ((x1 - 1 > 0) && (tu[(x1 - 1)][y1] == 1))
			size = getBImages(x1 - 1, y1, size + 1);
		if ((y1 - 1 > 0) && (tu[x1][(y1 - 1)] == 1))
			size = getBImages(x1, y1 - 1, size + 1);
		if ((x1 + 1 < width) && (tu[(x1 + 1)][y1] == 1))
			size = getBImages(x1 + 1, y1, size + 1);
		if ((y1 + 1 < height) && (tu[x1][(y1 + 1)] == 1))
			size = getBImages(x1, y1 + 1, size + 1);
		return size;
	}

	public static void getDyTime(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getDyTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getQpTime(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getQpTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getDsTime(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		sendSuccess(bag, "success", HsAllModel.getDstime(userBag) + "", writer);
	}

	public static void getJgTime(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getJgTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getMyTime(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getMyTime(userBag.getUser_mail());

		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getError(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean userBag = null;
		try {
			userBag = new UserBean((JSONObject) bag.getBody());
		} catch (Exception e) {
			Error(bag, tcpSocket);
			return;
		}
		String s = userBag.getCode();
		if ((s != null) && (s.equals("dy"))) {
			if (SQLModel.getDyTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket);
				return;
			}
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else if ((s != null) && (s.equals("qp"))) {
			if (SQLModel.getQpTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket);
				return;
			}
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else if ((s != null) && (s.equals("ds"))) {
			if (HsAllModel.getDstime(userBag) <= 0) {
				Error(bag, tcpSocket);
				return;
			}
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else if ((s != null) && (s.equals("jg"))) {
			if (SQLModel.getJgTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket);
				return;
			}
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else if ((s != null) && (s.equals("my"))) {
			if (SQLModel.getMyTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket);
				return;
			}
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else if ((s != null) && (s.equals("lj"))) {
			if (SQLModel.getLjTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket);
				return;
			}
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else if ((s != null) && (s.equals("gj_dy"))) {
			if (com.mugui.model.GJ.SQLModel.getDyTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket);
				return;
			} 
			bag.setBag_id(-1);
			sendBean(bag, tcpSocket);
		} else {
			Error(bag, tcpSocket);
		}
	}

	public static boolean isState(TcpBag bag, TcpSocketUserBean writer) {
		UserBean userBag = null;
		try {
			userBag = new UserBean((JSONObject) bag.getBody());
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		if (userBag.getUser_mail() == null || writer.isOutTimeLimit()) {
			bag.setBag_id(4);
			sendError(bag, "error_outLogin", "您长时间未与服务器发生通信，已被服务器注销1", writer);
			return false;
		}
		writer.reCodeTime();
		if (bag.getVersion().equals(AppTCPModel.getAPPVersion())) {
			String code = (String) writer.getUserData("code");
			System.out.println(code + " " + userBag.getUser_mac());
			if (code == null || !code.equals(userBag.getUser_mac())) {
				bag.setBag_id(4);
				sendError(bag, "error_outLogin", "APP您的校验码出现异常，已被强制退出", writer);
				return false;
			}
			TcpSocketUserBean t = com.mugui.http.DataSave.getAppTcpSocket(userBag.getUser_mail());
			if (t != writer) {
				DataSave.addAppTcpSocket(userBag.getUser_mail(), writer);
			}
			return true;
		} else {
			String code = (String) writer.getUserData("code");
			if (code == null || !code.equals(userBag.getUser_mac())) {
				bag.setBag_id(4);
				sendError(bag, "error_outLogin", "您的校验码(" + userBag.getUser_mac() + ")与(" + code + ")不匹配，已被强制退出", writer);
				return false;
			}
			TcpSocketUserBean t = com.mugui.http.DataSave.getTcpSocket(userBag.getUser_mail());
			if (t != writer) {
				DataSave.addTcpSocket(userBag.getUser_mail(), writer);
			}
			return true;
		}
	}

	public static void setUserName(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean userBean = new UserBean((JSONObject) bag.getBody());
		if ((userBean.getUser_mail() == null) || (userBean.getUser_name() == null) || (userBean.getUser_name().trim().equals(""))
				|| (userBean.getUser_mail().trim().equals(""))) {
			sendError(bag, "error_setUserName", "不能为空!!", tcpSocket);
			return;
		}
		InfoBean infoBean = new InfoBean();
		if (SQLModel.addUserName(userBean)) {
			infoBean.setId("success");
			infoBean.setMessage("设置昵称成功");
			infoBean.setBody(userBean.toJsonObject());
			sendBean(bag, infoBean, tcpSocket);
			return;
		}
		sendError(bag, "error_setUserName", "设置昵称失败", tcpSocket);
	}

	public static void saveSnakeMark(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean userBean = new UserBean((JSONObject) bag.getBody());
		if ((userBean.getUser_mail() == null) || (userBean.getUser_snake_mark() == null) || (userBean.getUser_snake_mark().trim().equals(""))) {
			sendError(bag, "error_outLogin", "这个你也改？", tcpSocket);
			return;
		}
		if (!(Other.isInteger(userBean.getUser_snake_mark()))) {
			sendError(bag, "error_outLogin", "？？？？？？", tcpSocket);
			return;
		}
		UserBean userBean2 = SQLModel.getUserBean(userBean);
		if ((((!(Other.isInteger(userBean2.getUser_snake_mark())))
				|| (Integer.parseInt(userBean2.getUser_snake_mark()) < Integer.parseInt(userBean.getUser_snake_mark()))))
				&& (SQLModel.saveSnakeMark(userBean))) {
			bag.setBag_id(13);
			getSnakeMarkAll(bag, tcpSocket);
			return;
		}

		sendError(bag, "error_outLogin", "成绩保存失败", tcpSocket);
	}

	public static void getSnakeMarkAll(TcpBag bag, TcpSocketUserBean tcpSocket) {
		sendBean(bag, SQLModel.snakeMarkAll(), tcpSocket);
	}

	public static void updateUserPawd(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
		int state = HsAllModel.updateUserPawd(bean, tcpSocket);
		switch (state) {
		case 0:
			sendSuccess(bag, "success_updateUserPawd", "更新密码成功", tcpSocket);
			break;
		case 1:
			sendSuccess(bag, "success_updateUserPawd", "更新密码失败，错误的邮箱地址", tcpSocket);
			break;
		case 2:
			sendSuccess(bag, "success_updateUserPawd", "验证码错误，请输入正确的验证码", tcpSocket);
			break;
		default:
			sendSuccess(bag, "success_updateUserPawd", "更新密码时发生错误。请重试，或联系QQ:844174097", tcpSocket);
		}
	}

	public static void updateRegCode(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
		int state = HsAllModel.updateRegCode(bean, tcpSocket);
		switch (state) {
		case 0:
			sendSuccess(bag, "success_updateRegCode", "验证码获取成功，请前往邮箱查收", tcpSocket);
			break;
		case 1:
			sendSuccess(bag, "success_updateRegCode", "错误的邮箱地址,无法获取验证码", tcpSocket);
			break;
		default:
			sendSuccess(bag, "success_updateRegCode", "服务器发生意外的错误，无法获取验证码。请重试，或联系QQ:844174097", tcpSocket);
		}
	}

	public static void sendFishLineFeature(TcpBag bag, TcpSocketUserBean tcpSocket) {
		HsAllModel.DInt index = new HsAllModel.DInt(-1);
		byte[] bb = HsAllModel.sendFishLineFeature((byte[]) bag.getBody(), (String) bag.getBody_description(), index);
		if (bb == null)
			return;
		bag.setBody(bb);
		bag.setBody_description(Integer.valueOf(index.getI()));
		sendBean(bag, tcpSocket);
	}

	public static void sendLineAllFishPrice(TcpBag bag, TcpSocketUserBean tcpSocket) {

		byte[] bb = (byte[]) bag.getBody();
		int index = ((Integer) bag.getBody_description()).intValue();
		if (bb == null)
			return;
		if (!(HsAllModel.sendLineAllFishPrice(bb, index)))
			return;
		HsAllModel.sendAllNewFishUpdate(index);
	}

	public static void getLineAllYuBody(TcpBag bag, TcpSocketUserBean tcpSocket) {
		byte[] bb = HsAllModel.getLineAllFishPrice((Integer) bag.getBody_description());
		if (bb == null)
			return;
		bag.setBody(bb);
		sendBean(bag, tcpSocket);
	}

	public static void sendBoldOne(TcpBag bag, TcpSocketUserBean tcpSocket) {
		BufferedImage img = Other.byteArrayToImg((byte[]) bag.getBody());
		if (img == null)
			return;
		int key = HsAllModel.sendBoldOne(img, (String) bag.getBody_description());
		if (key > -1)
			HsAllModel.sendBoldNewLineUpdate(key);
	}

	public static void sendDelBoldOne(TcpBag bag, TcpSocketUserBean tcpSocket) {
		int key = HsAllModel.sendDelBoldOne(Integer.parseInt(bag.getBody().toString().replaceAll("\"", "")), (String) bag.getBody_description());
		if (key > -1)
			HsAllModel.sendAllNewFishUpdate(key);
	}

	public static void getBoldLines(TcpBag bag, TcpSocketUserBean tcpSocket) {
		String bb = HsAllModel.getBoldLines((String) bag.getBody_description());
		if (bb == null)
			return;
		bag.setBody(bb.getBytes());
		sendBean(bag, tcpSocket);
	}

	/**
	 * 得到一个更新的boss刷新时间
	 * 
	 * @param bag
	 * @param tcpSocket
	 */
	public static void sendNewBossUpdateTime(TcpBag bag, TcpSocketUserBean tcpSocket) {
		HsAllModel.sendNewBossUpdateTime(bag.getBody(), bag.getBody_description());
	}

	public static void getAllBossUpdateTime(TcpBag bag, TcpSocketUserBean tcpSocket) {
		String s = ((String) bag.getBody_description()).trim();
		if (s == null || Other.isInteger(s)) {
			JSONArray array = HsAllModel.getAllBossUpdateTime(Integer.parseInt(s));
			if (array == null)
				return;
			sendBean(bag, array, tcpSocket);
		}
	}

	public static void getLjTime(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = HsAllModel.getLjTime(userBag);
		sendSuccess(bag, "success", time + "", tcpSocket);

	}

	public static void selectAppId(TcpBag accpet, TcpSocketUserBean tcpSocket) {
		File file = new File(MAIN.JARFILEPATH + "/WEB-INF/App/config");
		try {
			if (!(file.exists())) {
				file.createNewFile();
				throw new FileNotFoundException("系統找不到" + file.getPath() + ",已經重建");
			}
			BufferedReader bReader = new BufferedReader(new FileReader(file));
			String banben = null;
			boolean lin = false;
			while ((banben = bReader.readLine()) != null) {
				if (accpet.getVersion().trim().equals(banben.trim())) {
					lin = true;
					break;
				}
			}
			accpet.setBody((Object) null);
			if (lin) {
				if ((banben = bReader.readLine()) == null) {
					bReader.close();
					return;
				}
			} else {
				bReader.close();
				bReader = new BufferedReader(new FileReader(file));
				banben = bReader.readLine();
			}
			bReader.close();
			if (banben == null) {
				return;
			}
			InfoBean infoBean = new InfoBean();
			infoBean.setId("error");
			File updata_info = new File(MAIN.JARFILEPATH + "/WEB-INF/updata_info.str");
			if (updata_info.isFile()) {
				BufferedReader reader = null;
				try {
					reader = new BufferedReader(new InputStreamReader(new FileInputStream(updata_info), "UTF-8"));
					char[] cs = new char[1024];
					int len = reader.read(cs);
					infoBean.setInfo(String.valueOf(cs, 0, len));
				} catch (IOException e) {
					infoBean.setInfo("盒子有新的更新");
				} finally {
					if (reader != null) {
						try {
							reader.close();
						} catch (Exception e2) {
						}
					}
				}
			}
			File[] files = new File(MAIN.JARFILEPATH + "/WEB-INF/App/" + banben).listFiles();
			if(files==null) {
				return;
			}
			JSONArray array = new JSONArray();
			for (File f : files) {
				FileBean fileBean = new FileBean();
				fileBean.setFile_name(f.getName());
				fileBean.setFile_page_all_size((int) (f.length() / 768L) + ((f.length() % 768L == 0L) ? 0 : 1));
				fileBean.setOther_description("App:" + banben);
				array.add(fileBean.toJsonObject());
			}
			infoBean.setBody(array);
			accpet.setBody(infoBean.toJsonObject());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			sendBean(accpet, tcpSocket);
		}
	}

	public static void startDownloadFile(TcpBag bag, TcpSocketUserBean tcpSocket) {
		FileDownModel.startDownloadFile(bag, tcpSocket);
	}

	public static void reDownloadFile(TcpBag bag, TcpSocketUserBean tcpSocket) {
		FileDownModel.reDownloadFile(bag, tcpSocket);
	}
 
	public static void sendReceiveCDK(TcpBag bag, TcpSocketUserBean tcpSocket) {
		String cdk = (String) bag.getBody();
		System.out.println(bag.toString());
		if (cdk != null && !((cdk = cdk.trim()).equals("")) && cdk.length() == 20) {
			if (SQLModel.getCdk(cdk) == null) {
				long time = System.currentTimeMillis();
				String user_mail = DataSave.getTcpUserMail(tcpSocket);
				if (SQLModel.addCdk(cdk, time, user_mail)) {
					HsAllModel.SendAllUser(Bag.SEND_RECEIVE_CDK, cdk, null, 0);
				}
			}
		}
	}

	public static void getData(TcpBag bag, TcpSocketUserBean tcpSocket) {
		DataTypeBean bean = new DataTypeBean();
		bean.InitBean(JSONObject.fromObject(bag.getBody_description()));
		UserBean userBean = new UserBean();
		userBean.InitBean(JSONObject.fromObject(bag.getBody()));
		Object object = null;
		object = GJModel.getData(userBean, bean);
		if (object != null) {
			bag.setBody(object);
		}
		bag.setBody_description(bean.getCode());
		tcpSocket.sendByteArray(bag);
	}

}