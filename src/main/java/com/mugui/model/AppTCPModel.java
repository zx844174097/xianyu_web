package com.mugui.model;

import org.apache.commons.lang.StringUtils;

import com.mugui.http.DataSave;
import com.mugui.http.UserThread;
import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.pack.TcpBag;
import com.mugui.http.tcp.Bag;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.tool.Other;

import net.sf.json.JSONObject;

public class AppTCPModel extends TCPModel {
	public static void appUserLogin(TcpBag bag, TcpSocketUserBean tcpSocket) {
		if (StringUtils.isBlank(bag.getVersion())) {
			InfoBean infoBean = new InfoBean();
			infoBean.setInfo("该版本过低已被舍弃，请前往117438225QQ群重新下载");
			infoBean.setType("error");
			bag.setBody(infoBean.toJsonObject());
			sendOutLoginError(bag, tcpSocket);
			return;
		}
		if (!(StringUtils.equals(getAPPVersion(), bag.getVersion()))) {
			bag.setBag_id(14);
			sendError(bag, "error", "发现新的辅助版本，稍后辅助将自行下载，若长时间辅助未跳转下载界面，请手动重启辅助", tcpSocket);
			return;
		}
		UserBean userBag = new UserBean((JSONObject) bag.getBody());
		if ((userBag == null) || (userBag.getUser_mail() == null) || (userBag.getUser_mail().equals("")) || (userBag.getUser_passwd().equals(""))
				|| (!(Other.isMailString(userBag.getUser_mail())))) {
			bag.setBag_id(Bag.OUT_LOGIN);
			sendError(bag, "error_login", "what? fuck!你想要干什么！！！sure?", tcpSocket);
			return;
		}
		TcpSocketUserBean socket = DataSave.getTcpSocket(userBag.getUser_mail());
		if (socket == null || !socket.isSocketRun()) {
			bag.setBag_id(Bag.OUT_LOGIN);
			sendError(bag, "error_login", "并没有检测到你PC端的登录，无法使用", tcpSocket);
			return;
		}
		TcpSocketUserBean appSocket = DataSave.getAppTcpSocket(userBag.getUser_mail());
		if (appSocket != tcpSocket && appSocket != null && appSocket.isSocketRun()) {
			bag.setBag_id(4);
			sendError(bag, "error", "您在另一个设备登录了！", appSocket);
			tcpSocket.clearUserAllData();
		}
		if (SQLModel.login(userBag)) {
			String user_mail = userBag.getUser_mail();
			String user_name = SQLModel.getUserName(userBag);
			if (user_name != null) {
				userBag.setUser_name(user_name);
			}
			if (appSocket != tcpSocket) {
				DataSave.addAppTcpSocket(user_mail, tcpSocket);
			}
			String code = Other.getShortUuid();
			userBag.setUser_passwd("");
			userBag.setUser_mail(user_mail);
			userBag.setUser_mac(code);
			tcpSocket.addUserData("userbean", userBag);
			tcpSocket.addUserData("code", code);
			tcpSocket.reCodeTime();
			InfoBean infoBean = new InfoBean();
			infoBean.setMessage("登录成功了，恭喜-。-！");
			infoBean.setType("success_login");
			infoBean.setBody(userBag.toJsonObject());
			bag.setBody(infoBean.toJsonObject());
			sendBean(bag, tcpSocket);
			return;  
		} 
		bag.setBag_id(4);
		sendError(bag, "error_login", "登录失败,用户名或者密码错误！", tcpSocket);
	}

	public static String getAPPVersion() {
		return "APP_1.00";
	}

	// 发送准备监听的消息给pc
	public static void appSendStartListener1(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
		TcpSocketUserBean socket = DataSave.getTcpSocket(bean.getUser_mail());
		if (socket == null || !socket.isSocketRun()) {
			bag.setBag_id(Bag.ERROR);
			sendError(bag, "error", "暂时无法与pc端建立联系，稍后再试", tcpSocket);
			return;
		}
		sendBean(bag, socket);
	}

	public static void pcSendAppInfo(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
		TcpSocketUserBean socketUserBean = DataSave.getAppTcpSocket(bean.getUser_mail());
		if (socketUserBean != null && socketUserBean.isSocketRun()) {
			sendBean(bag, socketUserBean);
		}
	}

	public static void sendManListener(TcpBag bag, TcpSocketUserBean tcpSocket) {
		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
		TcpSocketUserBean socketUserBean = DataSave.getAppTcpSocket(bean.getUser_mail());
		if (socketUserBean != null && socketUserBean.isSocketRun()) {
			sendBean(bag, socketUserBean);
		}
	}

	public static void stopManListener(TcpBag bag, TcpSocketUserBean tcpSocket) {
		System.out.println("stopManListener: " + bag);
		UserBean bean = new UserBean(JSONObject.fromObject(bag.getBody()));
		TcpSocketUserBean socketUserBean = DataSave.getTcpSocket(bean.getUser_mail());
		if (socketUserBean != null && socketUserBean.isSocketRun()) {
			sendBean(bag, socketUserBean);
			// return;
		}
		sendBean(bag, tcpSocket);
	}

	public static void sendStopManListener(TcpBag bag, TcpSocketUserBean tcpSocket) {
		bag.setBag_id(TcpBag.STOP_MAN_LISTENER);
		sendManListener(bag, tcpSocket);
	}

}
