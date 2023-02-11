/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.http;

import com.mugui.http.pack.UdpBag;
import com.mugui.http.tcp.Bag;
import com.mugui.http.udp.UDPSocket;
import com.mugui.http.udp.UdpHandle;
import com.mugui.model.TCPModel;
import com.mugui.model.UDPModel;
import com.mugui.tool.Other;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.commons.lang.StringUtils;

public class HsUdpHandle implements UdpHandle {
	private ArrayBlockingQueue<String> bag_list = new ArrayBlockingQueue(1000);
	private ConcurrentHashMap<String, Integer> bag_table = new ConcurrentHashMap(1005);

	public void manage(Bag accpet, UDPSocket udpSocket) {
		UdpBag bag = (UdpBag) accpet;
		if (!(isHandle(bag)))
			return;
		if (!Other.isInteger(bag.getBag_id())) {
			if (!(bag.getUser_to().equals("Admin"))) {
				return;
			}
			if (bag.getBag_id().equals("get_udp_type")) {
				UDPModel.getUdpType(bag, udpSocket);
				return;
			}
			if (bag.getBag_id().equals("select_app_id")) {
				UDPModel.selectAppId(bag, udpSocket);
				return;
			}
			if (bag.getBag_id().equals("start_download_file")) {
				UDPModel.startDownloadFile(bag, udpSocket);
				return;
			}
			if (bag.getBag_id().equals("re_download_file")) {
				UDPModel.reDownloadFile(bag, udpSocket);
				return;
			}
			if (bag.getBag_id().equals("new_user")) {
				return;
			}
			if (bag.getBag_id().equals("")) {
				UDPModel.NULL(bag, udpSocket);
				return;
			}
		} else {
			// switch (Integer.parseInt(bag.getBag_id())) {
			// case 8:
			// UDPModel.login(bag, udpSocket);
			// return;
			// case 9:
			// UDPModel.reg(bag, udpSocket);
			// return;
			// case 10:
			// UDPModel.regCode(bag, udpSocket);
			// return;
			// case 18:
			// UDPModel.updateUserPawd(bag, udpSocket);
			// return;
			// case 19:
			// UDPModel.updateRegCode(bag, udpSocket);
			// return;
			// case 20:
			// UDPModel.sendFishLineFeature(bag, udpSocket);
			// return;
			// case 21:
			// UDPModel.sendLineAllFishPrice(bag, udpSocket);
			// return;
			// case 24:
			// UDPModel.sendBoldOne(bag, udpSocket);
			// return;
			// case 27:
			// UDPModel.sendDelBoldOne(bag, udpSocket);
			// return;
			// case 23:
			// UDPModel.getLineAllYuBody(bag, udpSocket);
			// return;
			// case 26:
			// UDPModel.getBoldLines(bag, udpSocket);
			// return;
			// case Bag.SEND_NEW_BOSS_UPDATE_TIME:
			// UDPModel.sendNewBossUpdateTime(bag, udpSocket);
			// return;
			// case 12:
			// case 13:
			// case 14:
			// case 15:
			// case 16:
			// case 17:
			// case 22:
			// case 25:
			// }
//			if (!(UDPModel.isState(bag, udpSocket))) {
//				return;
//			}
			// switch (Integer.parseInt(bag.getBag_id())) {
			// case 6:
			// UDPModel.getDyTime(bag, udpSocket);
			// break;
			// case 7:
			// UDPModel.getQpTime(bag, udpSocket);
			// break;
			// case 16:
			// UDPModel.getDsTime(bag, udpSocket);
			// break;
			// case 15:
			// UDPModel.getJgTime(bag, udpSocket);
			// break;
			// case 17:
			// UDPModel.getMyTime(bag, udpSocket);
			// break;
			// case Bag.GET_LJTIME:
			// UDPModel.getLjTime(bag, udpSocket);
			// break;
			// case 0:
			// UDPModel.getError(bag, udpSocket);
			// break;
			// case 11:
			// UDPModel.setUserName(bag, udpSocket);
			// return;
			// case 12:
			// UDPModel.saveSnakeMark(bag, udpSocket);
			// return;
			// case 13:
			// UDPModel.getSnakeMarkAll(bag, udpSocket);
			// return;
			// case Bag.GET_ALL_BOSS_UPDATE_TIME:
			// UDPModel.getAllBossUpdateTime(bag, udpSocket);
			// case 1:
			// case 2:
			// case 3:
			// case 4:
			// case 5:
			// case 8:
			// case 9:
			// case 10:
			// case 14:
			// }
		}
	}

	private boolean isHandle(UdpBag bag) {
		if (bag == null)
			return false;
		if (StringUtils.isBlank(bag.getBag_code())) {
			return false;
		}
		if (bag.getUser_id().equals("Admin")) {
			return false;
		}
		boolean b = this.bag_table.get(bag.getBag_code()) == null;
		if (!(b))
			return false;
		try {
			this.bag_list.add(bag.getBag_code());
		} catch (IllegalStateException e) {
			this.bag_table.remove(this.bag_list.poll());
			this.bag_list.add(bag.getBag_code());
		}
		this.bag_table.put(bag.getBag_code(), Integer.valueOf(1));
		return b;
	}

	public Bag getValue(String key) {
		return null;
	}
}