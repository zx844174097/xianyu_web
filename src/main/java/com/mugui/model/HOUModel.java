/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.MoneyLogBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.Bean.UserTimeBean;
import com.mugui.http.pack.HouBag;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.sf.json.JSONObject;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class HOUModel {
	private void sendError(HouBag hou, String error, PrintWriter writer) {
		InfoBean info = new InfoBean();
		info.setId("error");
		info.setInfo(error);
		sendBean(hou, info, writer);
	}

	private void sendSuccess(HouBag hou, String success, PrintWriter writer) {
		sendSuccess(hou, success, null, writer);
	}

	private void sendSuccess(HouBag hou, String success, JSONObject jsonObject, PrintWriter writer) {
		InfoBean info = new InfoBean();
		info.setId("success");
		info.setInfo(success);
		info.setBody(jsonObject);
		sendBean(hou, info, writer);
	}

	private void sendBean(HouBag hou, JSONObject jsonObject, PrintWriter writer) {
		hou.setBody(jsonObject);
		sendBean(hou, writer);
	}

	private void sendBean(HouBag hou, JsonBean bean, PrintWriter writer) {
		sendBean(hou, bean.toJsonObject(), writer);
	}

	private void sendBean(HouBag hou, PrintWriter writer) {
		writer.append(hou.toString());
	}

	public ActionForward ERROR(HouBag hou, PrintWriter printWriter, HttpSession httpSession) {
		sendError(hou, "错误的bag_id", printWriter);
		return null;
	}

	public void userLogin(HouBag hou, HttpSession session, PrintWriter writer) {
		UserBean userBean = new UserBean((JSONObject) hou.getBody());
		if ((userBean.getUser_mail().equals("844174097@qq.com") || userBean.getUser_mail().equals("747058102@qq.com")) && SQLModel.login(userBean)) {
			session.setAttribute("user_mail", userBean.getUser_mail());
			sendSuccess(hou, "登录成功！", writer); 
		} else { 
			sendError(hou, "登录失败!", writer);
		}
	}

	public void SelectUserId(HouBag hou, HttpSession session, PrintWriter writer) {
		UserBean userBean = new UserBean((JSONObject) hou.getBody());
		UserTimeBean bean = new UserTimeBean();
		bean.setMail(userBean.getUser_mail());
		bean = SQLModel.getUserTimerBean(bean);
		if (bean != null) {
			sendSuccess(hou, "查询成功!", bean.toJsonObject(), writer);
		} else {
			sendError(hou, "查询失败!", writer);
		}
	}

	public void updateUserTime(HouBag hou, HttpSession session, PrintWriter writer) {

		UserTimeBean bean = JsonBean.newInstanceBean(UserTimeBean.class, hou.getBody());
		MoneyLogBean logBean = JsonBean.newInstanceBean(MoneyLogBean.class, hou.getBody());
		if (logBean == null) {
			logBean = new MoneyLogBean();
		}
		if (bean != null) {
			if (SQLModel.updateUserTimeBean(bean)) {
				bean = SQLModel.getUserTimerBean(bean);
				if (bean != null) {
					sendSuccess(hou, "更新成功", bean.toJsonObject(), writer);
					logBean.setInput(bean.toJsonObject().toString());
					logBean.setOutput("更新成功");
					SQLModel.writeMoneyLog(logBean);
				} else {
					sendSuccess(hou, "更新成功，但是数据反馈发生问题", writer);
					logBean.setInput(bean.toJsonObject().toString());
					logBean.setOutput("更新成功，但是数据反馈发生问题");
					SQLModel.writeMoneyLog(logBean);
				}
			} else {
				sendError(hou, "SQL语句发生错误，或者数据库服务器错误，可重试", writer);
				logBean.setInput(bean.toJsonObject().toString());
				logBean.setOutput("SQL语句发生错误，或者数据库服务器错误，可重试");
				SQLModel.writeMoneyLog(logBean);
			}
		} else {
			sendError(hou, "更新失败", writer);
			logBean.setInput("");
			logBean.setOutput("更新失败");
			SQLModel.writeMoneyLog(logBean);
		}
	}

	public boolean isUserLogin(HouBag hou, HttpSession session, PrintWriter writer) {
		Object o = session.getAttribute("user_mail");
		if (o == null) {
			sendError(hou, "out", writer);
			return false;
		}
		return true;
	}

	public void userOut(HouBag hou, HttpSession session, PrintWriter writer) {
		session.removeAttribute("admin_name");
		sendSuccess(hou, "注销成功!", writer);
	}

}