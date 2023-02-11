package com.mugui.http.GJ;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts.action.ActionForward;
import com.mugui.http.pack.HTTPBag;
import com.mugui.model.GJ.GJUserModel;

public class GJUserHandle {
	static GJUserModel userModel = null;

	public static ActionForward manage(HTTPBag bag, HttpServletRequest request, HttpServletResponse response) {
		if (!getUserModel().isVersion(bag, getWriter(response))) {
			return null;
		}
		// 检查操作频繁性
		if(!getUserModel().testFrequency(bag,getSession(request),getWriter(response))){
			return null;
		}
		if (bag.getBag_id().equals(HTTPBag.SELECT_USER_TIME)) {
			getUserModel().selectUserTime(bag, getWriter(response));
		} else if (bag.getBag_id().equals(HTTPBag.ADD_ORDER)) {
			getUserModel().addOrder(bag, getWriter(response), getSession(request));
		}
		return null;
	}

	public static GJUserModel getUserModel() {
		if (userModel == null) {
			userModel = new GJUserModel();
		}
		return userModel;
	}

	private static HttpSession getSession(HttpServletRequest request) {
		return request.getSession();
	}

	private static PrintWriter getWriter(HttpServletResponse response) {
		try {
			return response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

}
