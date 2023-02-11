/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.http;

//public class HsAllHandle {
//	public static int updateUserPawd(UserBean userBag, TcpSocketUserBean tcpSocket) {
//		if ((userBag.getUser_mail() == null) || (userBag.getCode() == null) || (userBag.getUser_passwd() == null) || (userBag.getUser_mail().equals(""))
//				|| (userBag.getCode().equals("")) || (userBag.getUser_passwd().equals("")) || (!(Other.isMailString(userBag.getUser_mail())))) {
//			return 1;
//		}
//		String s = DataSave.getCheck(tcpSocket);
//		if (s == null) {
//			return 2;
//		}
//		if (!(s.equals(userBag.getCode()))) {
//			return 2;
//		}
//		DataSave.remove(tcpSocket);
//		if (SQLModel.updateUserPawd(userBag)) {
//			return 0;
//		}
//		return -1;
//	}
//
//	public static int updateRegCode(UserBean userBag, TcpSocketUserBean tcpSocket) {
//		String mail = userBag.getUser_mail();
//		if ((mail == null) || (mail.equals("")) || (!(Other.isMailString(mail)))) {
//			return 1;
//		}
//
//		String s = DataSave.getCheck(tcpSocket);
//		if (s != null) {
//			return 0;
//		}
//		MailBean mailBean = new MailBean();
//		mailBean.setTitle("黑色沙漠咸鱼辅助系统");
//		mailBean.setSendTo(mail);
//		s = Other.getVerifyCode(8);
//		mailBean.setMailbody("验证码为： " + s);
//		if (new SendMailToSomeone().send(mailBean)) {
//			tcpSocket.addUserData("code", s);
//			return 0;
//		}
//		DataSave.remove(tcpSocket);
//		return -1;
//	}
//
//	public static int getDstime(UserBean userBag) {
//		int time = SQLModel.getDsTime(userBag.getUser_mail());
//		if (time > 0) {
//			return time;
//		}
//		time = SQLModel.getDyTime(userBag.getUser_mail());
//		if (time > 0) {
//			return time;
//		}
//		time = SQLModel.getJgTime(userBag.getUser_mail());
//		if (time > 0) {
//			return time;
//		}
//		time = SQLModel.getMyTime(userBag.getUser_mail());
//		if (time > 0) {
//			return time;
//		}
//		time = SQLModel.getQpTime(userBag.getUser_mail());
//		if (time > 0) {
//			return time;
//		}
//		return 0;
//	}
//}