/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.struts.action;

import com.mugui.http.HouHandle;
import com.mugui.http.pack.HouBag;
import com.mugui.tool.Other;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class HouAction extends Action {
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST,GET");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		String bag_id = request.getParameter("bag_id");
		String body = request.getParameter("body");
		JSONObject jsonObject = null;
		if (body != null) {
			jsonObject = JSONObject.fromObject(body);
			jsonObject = Other.delJsonNull(jsonObject);
		}
		HouBag bag = new HouBag();
		bag.setBag_id(bag_id);
		bag.setBody(jsonObject);
		return HouHandle.manage(bag, mapping, request, response);
	}
}