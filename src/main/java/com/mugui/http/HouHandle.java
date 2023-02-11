/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.http;

import com.mugui.http.pack.HouBag;
import com.mugui.model.HOUModel;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class HouHandle {
	static HOUModel httpModel = null;

	public static ActionForward manage(HouBag hou, ActionMapping mapping, HttpServletRequest request, HttpServletResponse response) {
		if (hou == null || hou.getBag_id() == null) {
			return null;
		}
		if (hou.getBag_id().equals("user_login")) {
			getHOUModel(request).userLogin(hou, getSession(request), getWriter(response));
			return null;
		}
		if (!(getHOUModel(request).isUserLogin(hou, getSession(request), getWriter(response)))) {
			return null;
		}
		if (hou.getBag_id().equals("selectUserid")) {
			getHOUModel(request).SelectUserId(hou, getSession(request), getWriter(response));
			return null;
		}
		if (hou.getBag_id().equals("update_user_time")) {
			getHOUModel(request).updateUserTime(hou, getSession(request), getWriter(response));
			return null; 
		} 
		return null;
	}

	private static HOUModel getHOUModel(HttpServletRequest request) {
		if (httpModel == null) {
			httpModel = new HOUModel();
		}
		return httpModel;
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