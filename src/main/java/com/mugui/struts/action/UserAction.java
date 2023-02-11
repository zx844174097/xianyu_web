/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.mugui.struts.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.mugui.http.HouHandle;
import com.mugui.http.UserHandle;
import com.mugui.http.GJ.GJUserHandle;
import com.mugui.http.pack.HTTPBag;
import com.mugui.http.pack.HouBag;
import com.mugui.tool.Other;

import net.sf.json.JSONObject;

/**
 * MyEclipse Struts Creation date: 04-20-2018
 * 
 * XDoclet definition:
 * 
 * @struts.action validate="true"
 */
public class UserAction extends Action {
	/*
	 * Generated Methods
	 */

	/**
	 * Method execute
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return ActionForward 用于用户与盒子网站的交互
	 * 
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST,GET");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		String bag_id = request.getParameter("bag_id");
		String body = request.getParameter("body");
		String version = request.getParameter("version");
		JSONObject jsonObject = null;
		if (body != null) {
			jsonObject = JSONObject.fromObject(body);
			jsonObject = Other.delJsonNull(jsonObject);
		}
		HTTPBag bag = new HTTPBag();
		bag.setBag_id(bag_id);
		bag.setBody(jsonObject);
		bag.setVersion(version);
		if (jsonObject.get("web_type") == null)
			UserHandle.manage(bag, request, response);
		else if (jsonObject.get("web_type").equals("GJ")) {
			GJUserHandle.manage(bag,request,response);
		}else{
			UserHandle.manage(bag, request, response);
		}
		return null;
	}
}