/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.mugui.struts.action;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.mugui.http.OrderHandle;
import com.mugui.http.UserHandle;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.pack.HTTPBag;
import com.mugui.model.SQLModel;
import com.mugui.tool.Other;

import net.sf.json.JSONObject;

/**
 * MyEclipse Struts Creation date: 12-26-2016
 * 
 * XDoclet definition:
 * 
 * @struts.action validate="true"
 */
public class OrderAction extends Action {
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
	 * @return ActionForward
	 */
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST,GET");
		response.setContentType("text/html;charset=utf-8");
//		Cookie cookie=new Cookie("JSESSIONID", request.getSession(false).getId());
//		cookie.setMaxAge(30*60*1000);
//		cookie.setPath("/");
//		response.addCookie(cookie); 
//		System.out.println("OrderAction="+request.getSession(false).getId());
		Object order_code = request.getSession(false).getAttribute("order_code");
		Object type = request.getParameter("bag_id");

		if (type == null) 
			return null; 
		if (order_code != null) {
			OrderBean bean = new OrderBean();
			bean.setCode(String.valueOf(order_code));
			request.getSession().removeAttribute("order_code");
			OrderHandle.manage(type, bean, request, response);
		}
		return null;
	}
}