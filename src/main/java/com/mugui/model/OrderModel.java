package com.mugui.model;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alipay.api.AlipayApiException;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.mugui.http.Bean.AliBizBean;
import com.mugui.http.Bean.AliPublicBean;
import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.pack.HTTPBag;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class OrderModel {
	private void sendOutLoginError(HTTPBag bag, PrintWriter writer) {
		InfoBean info = new InfoBean();
		info.setId(InfoBean.OUT_LOGIN_ERROR);
		info.setInfo("登录信息已过期！");
		sendBean(bag, info, writer);
		return;
	}

	private String sendError(HTTPBag bag, String error, PrintWriter writer) {
		return sendError(bag, error, null, writer);
	}

	private String sendError(HTTPBag bag, String message, Object object, PrintWriter writer) {
		return sendInfo(bag, InfoBean.ERROR, message, object, writer);
	}

	private String sendSuccess(HTTPBag bag, String success, PrintWriter writer) {
		return sendInfo(bag, InfoBean.SUCCESS, success, null, writer);
	}

	private String sendSuccess(HTTPBag bag, String success, JSONObject jsonObject, PrintWriter writer) {
		return sendInfo(bag, InfoBean.SUCCESS, success, jsonObject, writer);
	}

	private String sendInfo(HTTPBag bag, String infotype, String success, Object jsonObject, PrintWriter writer) {
		InfoBean info = new InfoBean();
		info.setId(infotype);
		info.setInfo(success);
		if (jsonObject != null)
			info.setBody(jsonObject);
		return sendBean(bag, info, writer).toString();
	}

	private void sendBean(HTTPBag bag, JSONArray jsonArray, PrintWriter writer) {
		bag.setBody(jsonArray);
		sendBean(bag, writer);
	}

	private void sendBean(HTTPBag bag, JSONObject jsonObject, PrintWriter writer) {
		bag.setBody(jsonObject);
		sendBean(bag, writer);
	}

	private JsonBean sendBean(HTTPBag bag, JsonBean bean, PrintWriter writer) {
		sendBean(bag, bean.toJsonObject(), writer);
		return bean;
	}

	private void sendBean(HTTPBag bag, PrintWriter writer) {
		writer.append(bag.toString());
	}

	public void createOrderHtml(OrderBean orderBean, HttpServletRequest request, HttpServletResponse response) {

		orderBean = SQLModel.getOrderOne(orderBean);
		AliBizBean aliBizBean = new AliBizBean();
		aliBizBean.setBody("成都叶旅科技支付支持");
		aliBizBean.setSubject("咸鱼盒子VIP充值");
		aliBizBean.setPassback_params(orderBean.getInput());
		aliBizBean.setOut_trade_no(orderBean.getCode());
		aliBizBean.setTotal_amount(orderBean.getMoney());
		AliPublicBean aliPublicBean = new AliPublicBean();
		DefaultAlipayClient alipayClient = new DefaultAlipayClient(AliPublicBean.Refund_Url, aliPublicBean.getApp_id(), aliPublicBean.getApp_private_key(),
				"json", aliPublicBean.getCharset(), aliPublicBean.Refund_Public_key, aliPublicBean.getSign_type());
		AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest(); 
		alipayRequest.setReturnUrl(aliPublicBean.getReturn_url());
		alipayRequest.setNotifyUrl(aliPublicBean.getNotify_url()); 
		try { 
			alipayRequest.setBizContent(aliPublicBean.getOrderInfo(aliBizBean));
			String result = alipayClient.pageExecute(alipayRequest).getBody();
			orderBean.setState(1); 
			SQLModel.updataOrderState(orderBean);
			request.getSession().setAttribute("order_html", result);
			response.sendRedirect("pay.jsp");
		} catch (AlipayApiException | IOException e) {
			e.printStackTrace();
			orderBean.setState(5);
			SQLModel.updataOrderState(orderBean);
		}
	}

	public void removeOrder(OrderBean bean, PrintWriter writer) {
		bean.setState(5);
		HTTPBag bag = new HTTPBag();
		if (SQLModel.updataOrderState(bean)) {
			sendSuccess(bag, "取消订单成功", writer);
			return ;
		}
		sendSuccess(bag, "取消订单失败", writer);
		return ;
	}

}
