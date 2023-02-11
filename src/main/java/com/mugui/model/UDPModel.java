/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.MAIN.MAIN;
import com.mugui.Mail.MailBean;
import com.mugui.Mail.SendMailToSomeone;
import com.mugui.http.DataSave;
import com.mugui.http.Bean.FileBean;
import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.pack.UdpBag;
import com.mugui.http.udp.UDPSocket;
import com.mugui.tool.Other;
import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Time;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.lang.NullArgumentException;
import org.apache.commons.lang.StringUtils;

public class UDPModel {
	private static ConcurrentHashMap<String, UdpBag> map = new ConcurrentHashMap();

	private static HashMap<String, P2PThread> threadGroup = new HashMap();

	private static void sendOutLoginError(UdpBag bag, UDPSocket writer) {
		InfoBean info = new InfoBean();
		info.setId("error");
		info.setInfo("登录信息已过期！");
		sendBean(bag, info, writer);
	}

	private static String sendError(UdpBag bag, String error_id, String error, UDPSocket writer) {
		InfoBean info = new InfoBean();
		info.setId(error_id);
		info.setInfo(error);
		return sendBean(bag, info, writer).toString();
	}

	private static String sendSuccess(UdpBag bag, String success_id, String success, UDPSocket writer) {
		InfoBean info = new InfoBean();
		info.setId("success_id");
		info.setInfo(success);
		return sendBean(bag, info, writer).toString();
	}

	private static void sendBean(UdpBag bag, JSONArray jsonArray, UDPSocket writer) {
		bag.setUser_to(bag.getUser_id());
		bag.setUser_id("Admin");
		bag.setBody(jsonArray);
		sendBean(bag, writer);
	}

	private static void sendBean(UdpBag bag, JSONObject jsonObject, UDPSocket writer) {
		bag.setUser_to(bag.getUser_id());
		bag.setUser_id("Admin");
		bag.setBody(jsonObject);
		sendBean(bag, writer);
	}

	private static JsonBean sendBean(UdpBag bag, JsonBean bean, UDPSocket writer) {
		sendBean(bag, bean.toJsonObject(), writer);
		return bean;
	}

	private static void sendBean(UdpBag bag, UDPSocket writer) {
		writer.Send(bag);
	}

	public static void selectAppId(UdpBag accpet, UDPSocket udpSocket) {
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
				if (accpet.getBody().equals(banben)) {
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
			accpet.setUser_to(accpet.getUser_id());
			accpet.setUser_id("Admin");
			sendBean(accpet, udpSocket);
		}
	}

	public static void startDownloadFile(UdpBag bag, UDPSocket udpSocket) {
		//FileDownModel.startDownloadFile(bag, udpSocket);
	}

	public static void reDownloadFile(UdpBag bag, UDPSocket udpSocket) {
		//FileDownModel.reDownloadFile(bag, udpSocket);
	}

	public static void addP2P(UdpBag accpet, UDPSocket udpSocket) {
		UdpBag bag = getP2P(accpet.getUser_id());
		System.out.println("p2p:" + bag);
		if (bag == null) {
			bag = new UdpBag();
			System.out.println("向局域网中所有用户发送新加入的用户信息,但不包括新用户");
			bag.setBody(accpet.getHost() + ":" + accpet.getPort());
			bag.setBody_description(accpet.getUser_id());
			bag.setBag_id("new_user");
			map.put(accpet.getUser_id(), accpet);

			sendAllP2P(bag, udpSocket);
			return;
		}
		bag.setHost(accpet.getHost());
		bag.setPort(accpet.getPort());
	}

	private static void sendAllP2P(UdpBag bag, UDPSocket udpSocket) {
		Iterator iterator = map.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry entry = (Map.Entry) iterator.next();
			UdpBag udpBag = (UdpBag) entry.getValue();
			if (udpBag.getUser_id().equals("Admin"))
				continue;
			bag.setHost(udpBag.getHost());
			bag.setPort(udpBag.getPort());
			bag.setUser_to(udpBag.getUser_id());
			bag.setUser_id("Admin");
			sendBean(bag, udpSocket);
		}
	}

	private static UdpBag getP2P(String user_id) {
		return ((UdpBag) map.get(user_id));
	}

	public static void getUdpType(UdpBag accpet, UDPSocket udpSocket) {
		UdpBag bag = getP2P(accpet.getUser_id());
		if (bag == null) {
			bag = new UdpBag();
			bag.setUser_id(bag.getUser_id());
			addP2P(bag, udpSocket);
		}
		if (!(accpet.getHost().equals(bag.getHost())))
			bag.setType(0);
		else if (accpet.getPort() == bag.getPort())
			bag.setType(1);
		else {
			bag.setType(2);
		}
		bag.setHost(accpet.getHost());
		bag.setPort(accpet.getPort());

		accpet.setBag_id("accpet_udp_type");
		accpet.setType(bag.getType());
		Iterator iterator = map.entrySet().iterator();
		while (iterator.hasNext()) {
			Map.Entry entry = (Map.Entry) iterator.next();
			UdpBag udpBag = (UdpBag) entry.getValue();
			if (udpBag.getUser_id().equals("Admin"))
				continue;
			accpet.setBody(bag.getUser_id() + ":" + bag.getHost() + ":" + bag.getPort());
			accpet.setHost(udpBag.getHost());
			accpet.setPort(udpBag.getPort());
			accpet.setType(bag.getType());
			accpet.setUser_to(udpBag.getUser_id());
			accpet.setUser_id("Admin");
			sendBean(accpet, MAIN.udpSocket);
			if (!(udpBag.getUser_id().equals(bag.getUser_id()))) {
				accpet.setHost(bag.getHost());
				accpet.setPort(bag.getPort());
				accpet.setBody(udpBag.getUser_id() + ":" + udpBag.getHost() + ":" + udpBag.getPort());
				accpet.setType(udpBag.getType());
				accpet.setUser_to(bag.getUser_id());
				accpet.setUser_id("Admin");
				sendBean(accpet, MAIN.udpSocket);
			}
		}
	}

	public static void NULL(UdpBag udpBag, UDPSocket udpSocket) {
		UdpBag bag = getP2P(udpBag.getUser_id());
		if (bag == null) {
			bag = new UdpBag();
			bag.setUser_id(udpBag.getUser_id());
			map.put(bag.getUser_id(), bag);
		}
		bag.setPort(udpBag.getPort());
		bag.setHost(udpBag.getHost());
		bag.setType(udpBag.getType());
		P2PThread thread = (P2PThread) threadGroup.get(bag.getUser_id());
		if ((thread == null) || (!(thread.isAlive()))) {
			thread = new P2PThread(bag);
			threadGroup.put(bag.getUser_id(), thread);
			thread.start();
		} else {
			thread.bag = bag;
			thread.reTime();
		}
	}

	public static void reg(UdpBag bag, UDPSocket writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		if ((userBag.getUser_mail() == null) || (userBag.getCode() == null) || (userBag.getUser_passwd() == null) || (userBag.getUser_mail().equals(""))
				|| (userBag.getCode().equals("")) || (userBag.getUser_passwd().equals("")) || (!(Other.isMailString(userBag.getUser_mail())))) {
			sendError(bag, "error_reg", "你究竟想要做些什么呢？", writer);

			return;
		}
		String s = DataSave.getUDPCheck(userBag.getUser_mail());
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
		DataSave.removeUdpCheck(userBag.getUser_mail());
		if (SQLModel.reg(userBag)) {
			bag.setBag_id(2);
			sendSuccess(bag, "success_reg", "注册成功了！！", writer);
			return;
		}
		bag.setBag_id(0);
		sendError(bag, "error_reg", "不知道什么原因，注册失败了！", writer);
	}

//	public static void login(UdpBag bag, UDPSocket writer) {
//		if (StringUtils.isBlank(bag.getVersion())) {
//			InfoBean infoBean = new InfoBean();
//			infoBean.setInfo("该版本过低已被舍弃，请前往117438225QQ群重新下载");
//			infoBean.setType("error");
//			bag.setBody(infoBean.toJsonObject());
//			sendOutLoginError(bag, writer);
//			return;
//		}
//		if (!(StringUtils.equals(getNewVersion(), bag.getVersion()))) {
//			bag.setBag_id(14);
//			sendError(bag, "error", "发现新的辅助版本，稍后辅助将自行下载，若长时间辅助未跳转下载界面，请手动重启辅助", writer);
//			return;
//		}
//		UserBean userBag = new UserBean((JSONObject) bag.getBody());
//		if ((userBag == null) || (userBag.getUser_mail() == null) || (userBag.getUser_mail().equals("")) || (userBag.getUser_passwd().equals(""))
//				|| (!(Other.isMailString(userBag.getUser_mail())))) {
//			bag.setBag_id(0);
//			sendError(bag, "error_login", "what? fuck!你想要干什么！！！sure?", writer);
//			return;
//		}
//
//		UdpBag t = com.mugui.http.DataSave.getUDPSocket(userBag.getUser_mail());
//		if ((t != null) && (writer.isClose()) && (!(t.getHost().equals(bag.getHost())))) {
//			bag.setBag_id(4);
//			sendError(bag, "error", "您在另一个设备登录了！", writer);
//			com.mugui.http.DataSave.delUDPSocket(userBag.getUser_mail());
//		}
//		if (HsAllModel.login(userBag)) {
//			System.out.println(bag.getHost() + " " + bag.getPort() + " " + userBag);
//			String user_mail = userBag.getUser_mail();
//			// 保存本次他登录的城市
//			int type = SQLModel.SaveUserLoginCity(userBag, bag.getHost());
//			DataSave.remove(user_mail);
//			if (type == -1) {
//				sendError(bag, "error_login", "您登录的城市过多，请联系管理员", writer);
//				com.mugui.http.DataSave.delUDPSocket(userBag.getUser_mail());
//				return;
//			}
//			com.mugui.http.DataSave.addUDPSocket(userBag.getUser_mail(), bag);
//			String code = Other.getShortUuid();
//			com.mugui.http.DataSave.setUserCode(userBag.getUser_mail(), code);
//			bag.setBag_id(1);
//			InfoBean infoBean = new InfoBean();
//			// UserBean userBag2 = SQLModel.getUserBean(userBag);
//			String user_name = SQLModel.getUserName(userBag);
//			if (user_name != null) {
//				userBag.setUser_name(user_name);
//			}
//			userBag.setUser_mail(user_mail);
//			userBag.setUser_mac(code);
//			infoBean.setBody(userBag.toJsonObject());
//			if (type == 0) {
//				infoBean.setMessage("登录成功了，恭喜-。-！");
//				infoBean.setType("success_login");
//			} else {
//				if (HsAllModel.updateRegCode(userBag) < 0) {
//					sendError(bag, "error_login", "登录失败,您的账号可能被盗，且无法向您的邮箱发送验证信息，请联系管理员！", writer);
//					return;
//				}
//				infoBean.setMessage("登录成功了，但是您的账号可能被盗，请前往注册邮箱输入验证码继续");
//				infoBean.setType("success_login_no");
//			}
//			bag.setBody(infoBean.toJsonObject());
//			bag.setUser_to(bag.getUser_id());
//			bag.setUser_id("Admin");
//			sendBean(bag, writer);
//			return;
//		}
//		bag.setBag_id(0);
//		sendError(bag, "error_login", "登录失败,用户名或者密码错误！", writer);
//	}

	private static String getNewVersion() {
		BufferedReader bReader = null;
		try {
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
			return str;
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

//	public static void regCode(UdpBag bag, UDPSocket writer) {
//		UserBean userBag = new UserBean((JSONObject) bag.getBody());
//		String mail = userBag.getUser_mail();
//		if ((mail == null) || (mail.equals("")) || (!(Other.isMailString(mail)))) {
//			bag.setBag_id(0);
//			sendError(bag, "error_regCode", "what? fuck!你想要干什么！！！验证码", writer);
//			return;
//		}
//		if (SQLModel.isMail(mail)) {
//			bag.setBag_id(0);
//			sendError(bag, "error_regCode", "该邮箱已经被使用！！", writer);
//			return;
//		}
//
//		String s = DataSave.getCheck(mail);
//		if (s != null) {
//			bag.setBag_id(3);
//			sendError(bag, "success_regCode", "验证码已发送到指定邮箱，请查看邮箱！", writer);
//			return;
//		}
//		MailBean mailBean = new MailBean();
//		mailBean.setTitle("黑色沙漠木鬼辅助系统");
//		mailBean.setSendTo(mail);
//		s = Other.getVerifyCode(8);
//		mailBean.setMailbody("验证码为： " + s);
//		if (new SendMailToSomeone().send(mailBean)) {
//			DataSave.addCheck(mail, s);
//			bag.setBag_id(3);
//			sendSuccess(bag, "success_regCode", "验证码已发送到指定邮箱，请查看邮箱！", writer);
//		} else {
//			bag.setBag_id(0);
//			sendError(bag, "error_regCode", "验证码发送失败！", writer);
//			return;
//		}
//	}

	public static void Error(UdpBag bag, UDPSocket writer) {
		bag.setBag_id(4);
		sendError(bag, "error_outLogin", "您已经被服务器注销了", writer);
	}

	public static void Error(UdpBag bag, UDPSocket writer, String errorMeg) {
		bag.setBag_id(4);
		sendError(bag, "error_outLogin", errorMeg, writer);
	}

	public static void getDyTime(UdpBag bag, UDPSocket writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getDyTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getQpTime(UdpBag bag, UDPSocket writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getQpTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getDsTime(UdpBag bag, UDPSocket writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		sendSuccess(bag, "success", HsAllModel.getDstime(userBag) + "", writer);
	}

	public static void getJgTime(UdpBag bag, UDPSocket writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getJgTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getMyTime(UdpBag bag, UDPSocket writer) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = SQLModel.getMyTime(userBag.getUser_mail());
		sendSuccess(bag, "success", time + "", writer);
	}

	public static void getError(UdpBag bag, UDPSocket tcpSocket) {
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
				Error(bag, tcpSocket, "钓鱼天数不足，无法继续");
				return;
			}
			bag.setBag_id(-1);
		} else if ((s != null) && (s.equals("qp"))) {
			if (SQLModel.getQpTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket, "抢拍天数不足，无法继续");
				return;
			}
			bag.setBag_id(-1);
		} else if ((s != null) && (s.equals("ds"))) {
			if (HsAllModel.getDstime(userBag) <= 0) {
				Error(bag, tcpSocket, "定时天数不足，无法继续");
				return;
			}
			bag.setBag_id(-1);
		} else if ((s != null) && (s.equals("jg"))) {
			if (SQLModel.getJgTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket, "加工天数不足，无法继续");
				return;
			}
			bag.setBag_id(-1);
		} else if ((s != null) && (s.equals("my"))) {
			if (SQLModel.getMyTime(userBag.getUser_mail()) <= 0) {
				Error(bag, tcpSocket, "贸易天数不足，无法继续");
				return;
			}
			bag.setBag_id(-1);
		} else {
			Error(bag, tcpSocket);
			return;
		}
		bag.setUser_to(bag.getUser_id());
		bag.setUser_id("Admin");
		sendBean(bag, tcpSocket);
	}

//	public static boolean isState(UdpBag bag, UDPSocket writer) {
//		UserBean userBag = null;
//		try {
//			userBag = new UserBean((JSONObject) bag.getBody());
//		} catch (Exception e) {
//			return false;
//		}
//		if (!(com.mugui.http.DataSave.isLimitTime(userBag.getUser_mail()))) {
//			bag.setBag_id(4);
//			sendError(bag, "error_outLogin", "您长时间未与服务器发生通信，已被服务器注销2", writer);
//			return false;
//		}
//		UdpBag t = com.mugui.http.DataSave.getUDPSocket(userBag.getUser_mail());
//		if (t == null) {
//			Error(bag, writer);
//			return false;
//		}
//		if ((userBag.getUser_mac() != null) && (com.mugui.http.DataSave.isUserCode(userBag.getUser_mail(), userBag.getUser_mac()))) {
//			if ((!(t.getHost().equals(bag.getHost()))) || (t.getPort() != bag.getPort()) || (!(writer.isClose())))
//				com.mugui.http.DataSave.updataUDPSocket(userBag.getUser_mail(), bag);
//			else
//				com.mugui.http.DataSave.reUDPSocket(userBag.getUser_mail());
//		} else {
//			bag.setBag_id(4);
//			sendError(bag, "error_outLogin", "您的状态异常3！！", writer);
//			return false;
//		}
//		return true;
//	}

	public static void setUserName(UdpBag bag, UDPSocket tcpSocket) {
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

	public static void saveSnakeMark(UdpBag bag, UDPSocket tcpSocket) {
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

	public static void getSnakeMarkAll(UdpBag bag, UDPSocket tcpSocket) {
		sendBean(bag, SQLModel.snakeMarkAll(), tcpSocket);
	}

//	public static void updateUserPawd(UdpBag bag, UDPSocket tcpSocket) {
//		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
//		int state = HsAllModel.updateUserPawd(bean);
//		switch (state) {
//		case 0:
//			sendSuccess(bag, "success_updateUserPawd", "更新密码成功", tcpSocket);
//			break;
//		case 1:
//			sendSuccess(bag, "success_updateUserPawd", "更新密码失败，错误的邮箱地址", tcpSocket);
//			break;
//		case 2:
//			sendSuccess(bag, "success_updateUserPawd", "验证码错误，请输入正确的验证码", tcpSocket);
//			break;
//		default:
//			sendSuccess(bag, "success_updateUserPawd", "更新密码时发生错误。请重试，或联系QQ:844174097", tcpSocket);
//		}
//	} 

//	public static void updateRegCode(UdpBag bag, UDPSocket tcpSocket) {
//		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
//		int state = HsAllModel.updateRegCode(bean);
//		switch (state) {
//		case 0:
//			sendSuccess(bag, "success_updateRegCode", "验证码获取成功，请前往邮箱查收", tcpSocket);
//			break;
//		case 1:
//			sendSuccess(bag, "success_updateRegCode", "错误的邮箱地址,无法获取验证码", tcpSocket);
//			break;
//		default:
//			sendSuccess(bag, "success_updateRegCode", "服务器发生意外的错误，无法获取验证码。请重试，或联系QQ:844174097", tcpSocket);
//		}
//	}

	public static void sendFishLineFeature(UdpBag bag, UDPSocket udpSocket) {
		HsAllModel.DInt index = new HsAllModel.DInt(-1);
		byte[] bb = HsAllModel.sendFishLineFeature((byte[]) bag.getBody(), (String) bag.getBody_description(), index);
		bag.setBody(bb);
		bag.setBody_description(Integer.valueOf(index.getI()));
		bag.setUser_to(bag.getUser_id());
		bag.setUser_id("Admin");
		udpSocket.SendByteArrays(bag);
	}

	public static void sendLineAllFishPrice(UdpBag bag, UDPSocket udpSocket) {
		byte[] bb = (byte[]) bag.getBody();
		int index = ((Integer) bag.getBody_description()).intValue();
		if (bb == null)
			return;
		if (!(HsAllModel.sendLineAllFishPrice(bb, index)))
			return;
		HsAllModel.sendAllNewFishUpdate(index);
	}

	public static void getLineAllYuBody(UdpBag bag, UDPSocket udpSocket) {
		byte[] bb = HsAllModel.getLineAllFishPrice((Integer) bag.getBody_description());
		if (bb == null)
			return;
		bag.setBody(bb);
		bag.setUser_to(bag.getUser_id());
		bag.setUser_id("Admin");
		udpSocket.SendByteArrays(bag);
	}

	public static void sendBoldOne(UdpBag bag, UDPSocket udpSocket) {
		BufferedImage img = Other.byteArrayToImg((byte[]) bag.getBody());
		if (img == null)
			return;
		int key = HsAllModel.sendBoldOne(img, (String) bag.getBody_description());
		if (key > -1)
			HsAllModel.sendBoldNewLineUpdate(key);
	}

	public static void getBoldLines(UdpBag bag, UDPSocket udpSocket) {
		String bb = HsAllModel.getBoldLines((String) bag.getBody_description());
		if (bb == null)
			return;
		bag.setBody(bb.getBytes());
		bag.setUser_to(bag.getUser_id());
		bag.setUser_id("Admin");
		udpSocket.SendByteArrays(bag);
	}

	public static void sendDelBoldOne(UdpBag bag, UDPSocket udpSocket) {
		int key = HsAllModel.sendDelBoldOne(Integer.parseInt(bag.getBody().toString()), (String) bag.getBody_description());
		if (key > -1)
			HsAllModel.sendAllNewFishUpdate(key);
	}

	private static class P2PThread extends Thread {
		private UdpBag bag = null;
		private int time = 300000;

		public P2PThread(UdpBag u) {
			this.bag = u;
		}

		public void reTime() {
			this.time = 300000;
		}

		public void run() {
			Other.sleep(500);
			UdpBag u = new UdpBag();
			u.setUser_id("Admin");
			u.setUser_to(this.bag.getUser_id());
			u.setBag_id("");
			while (this.time > 0) {
				Other.sleep(30000);
				this.time -= 30000;
			}
			UDPModel.map.remove(u.getUser_id());
			UDPModel.threadGroup.remove(u.getUser_id());
		}
	}

	public static void sendNewBossUpdateTime(UdpBag bag, UDPSocket udpSocket) {
		HsAllModel.sendNewBossUpdateTime(bag.getBody(), bag.getBody_description());
	}

	public static void getAllBossUpdateTime(UdpBag bag, UDPSocket udpSocket) {
		String s = ((String) bag.getBody_description()).trim();
		if (s == null || Other.isInteger(s)) {
			JSONArray array = HsAllModel.getAllBossUpdateTime(Integer.parseInt(s));
			if (array == null)
				return;
			sendBean(bag, array, udpSocket);
		}
	}

	public static void getLjTime(UdpBag bag, UDPSocket udpSocket) {
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		int time = HsAllModel.getLjTime(userBag);
		sendSuccess(bag, "success", time + "", udpSocket);
	}
}