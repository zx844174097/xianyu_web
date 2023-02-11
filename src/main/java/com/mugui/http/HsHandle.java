/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.http;

import com.mugui.http.pack.TcpBag;
import com.mugui.http.tcp.Bag;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.model.AppTCPModel;
import com.mugui.model.HsListentModel;
import com.mugui.model.TCPModel;
import com.mugui.tool.Other;

public class HsHandle {
	public static void manage(Bag accBag, TcpSocketUserBean tcpSocket) {
		TcpBag bag = (TcpBag) accBag;
		if (bag == null)
			return;
		if (!Other.isInteger(bag.getBag_id())) {
			if (bag.getBag_id().equals("get_user_list")) {
				HsListentModel.getUserList(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals("user_cmd_info")) {
				HsListentModel.sendCMD(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals("admin_cmd_info")) {
				HsListentModel.reCmdInfo(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals("get_user_windows")) {
				HsListentModel.getUserWindows(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals("stop_user_window")) {
				HsListentModel.stopUserWindow(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals("user_windows_img")) {
				HsListentModel.userWindowsImg(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals("mouse_info")) {
				HsListentModel.mouseInfo(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals(Bag.KEY_INFO)) {
				HsListentModel.keyInfo(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals(TcpBag.SELECT_APP_ID)) {
				TCPModel.selectAppId(bag, tcpSocket);
				return;
			}
			if (bag.getBag_id().equals(TcpBag.START_DOWNLOAD_FILE)) {
				TCPModel.startDownloadFile(bag, tcpSocket);
				return;
			}
			if(bag.getBag_id().equals(TcpBag.RE_DOWNLOAD_FILE)) {
				TCPModel.reDownloadFile(bag, tcpSocket);
				return; 
			}
		} else {
			switch (Integer.parseInt(bag.getBag_id())) {
			case 8:
				TCPModel.login(bag, tcpSocket);
				return;
			case 9:
				TCPModel.reg(bag, tcpSocket);
				return;
			case 10:
				TCPModel.regCode(bag, tcpSocket);
				return;
			case 18:
				TCPModel.updateUserPawd(bag, tcpSocket);
				return;
			case 19:
				TCPModel.updateRegCode(bag, tcpSocket);
				return;
			case 20:
				TCPModel.sendFishLineFeature(bag, tcpSocket);
				return;
			case 21:
				TCPModel.sendLineAllFishPrice(bag, tcpSocket);
				return;
			case 24:
				TCPModel.sendBoldOne(bag, tcpSocket);
				return;
			case 27:
				TCPModel.sendDelBoldOne(bag, tcpSocket);
				return;
			case 23:
				TCPModel.getLineAllYuBody(bag, tcpSocket);
				return;
			case 26:
				TCPModel.getBoldLines(bag, tcpSocket);
				return;
			case Bag.SEND_NEW_BOSS_UPDATE_TIME:
				TCPModel.sendNewBossUpdateTime(bag, tcpSocket);
				return;
			case Bag.APP_USER_LOGIN:
				AppTCPModel.appUserLogin(bag, tcpSocket);
				return;
			case Bag.SEND_RECEIVE_CDK:
				TCPModel.sendReceiveCDK(bag,tcpSocket); 
			}
			if (!(TCPModel.isState(bag, tcpSocket))) {
				return;
			} 
			switch (Integer.parseInt(bag.getBag_id())) {
			case 6:
				TCPModel.getDyTime(bag, tcpSocket);
				break;
			case 7:
				TCPModel.getQpTime(bag, tcpSocket);
				break;
			case 16:
				TCPModel.getDsTime(bag, tcpSocket);
				break;
			case 15:
				TCPModel.getJgTime(bag, tcpSocket);
				break;
			case 17:
				TCPModel.getMyTime(bag, tcpSocket);
				break;
			case Bag.GET_LJTIME:
				TCPModel.getLjTime(bag, tcpSocket);
				break;
			case 0:
				TCPModel.getError(bag, tcpSocket);
				break;
			case 11:
				TCPModel.setUserName(bag, tcpSocket);
				return;
			case 12:
				TCPModel.saveSnakeMark(bag, tcpSocket);
				return;
			case 13:
				TCPModel.getSnakeMarkAll(bag, tcpSocket);
				return;
			case Bag.GET_ALL_BOSS_UPDATE_TIME:
				TCPModel.getAllBossUpdateTime(bag, tcpSocket);
				return;
			case Bag.APP_SEND_START_LISTENER_1:
				AppTCPModel.appSendStartListener1(bag, tcpSocket);
				return;
			case Bag.PC_SEND_APP_INFO:
				AppTCPModel.pcSendAppInfo(bag, tcpSocket);
				return;
			case Bag.SEND_MAN_LISTENER:
				AppTCPModel.sendManListener(bag, tcpSocket);
				return;
			case Bag.STOP_MAN_LISTENER:
				AppTCPModel.stopManListener(bag, tcpSocket);
				return;
			case Bag.SEND_STOP_MAN_LISTENER:
				AppTCPModel.sendStopManListener(bag, tcpSocket);
				return;
			case -1:
				tcpSocket.sendCompact(bag);
				return;
			case Bag.SEND_START_DY:
				AppTCPModel.appSendStartListener1(bag, tcpSocket);
				break;
			case Bag.SEND_STOP_DY:
				AppTCPModel.appSendStartListener1(bag, tcpSocket);
				break;
			case Bag.SEND_PC_SEND_INFO:
				AppTCPModel.appSendStartListener1(bag, tcpSocket);
				break;
			case Bag.GET_DATA:
				TCPModel.getData(bag,tcpSocket);
				break;
			}
			
		}

	}

}