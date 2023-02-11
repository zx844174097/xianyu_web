package com.mugui.http;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.mugui.http.Bean.OrderBean;
import com.mugui.model.OrderModel;
import com.mugui.model.SQLModel;

public class OrderHandle {

	static OrderModel userModel = null;

	public static void manage(Object type, OrderBean bean, HttpServletRequest request, HttpServletResponse response) {
		if (type.equals("pay"))
			getOrderModel(request).createOrderHtml(bean, request, response);
		else if (type.equals("remove")) {
			getOrderModel(request).removeOrder(bean,getWriter(response));
		}
	} 

	private static OrderModel getOrderModel(HttpServletRequest request) {
		if (userModel == null) {
			userModel = new OrderModel();
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
