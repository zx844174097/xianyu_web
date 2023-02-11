package com.mugui.model;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import net.sf.json.JSONObject;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradeRefundRequest;
import com.alipay.api.response.AlipayTradeRefundResponse;
import com.mugui.http.UserHandle;
import com.mugui.http.Bean.AliPayBean;
import com.mugui.http.Bean.AliPublicBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.LogsBean;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.Bean.UserTimeBean;
import com.mugui.http.Bean.GJ.GJUserTimeBean;
import com.mugui.http.GJ.GJUserHandle;

public class PayModel {
	public static void addLogs(int type, String userid, String bag_id, String info, String result) {
		SQLModel.addLogs(new LogsBean(type, userid, bag_id, info, result));
	}

	public static void newPay(HttpServletResponse response, AliPayBean aliPayBean) {
		PrintWriter writer = null;
		try {
			writer = response.getWriter();
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (writer == null)
			return;
		if (aliPayBean.getTrade_status().equals(AliPayBean.WAIT_BUYER_PAY)) {
			addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.WAIT_BUYER_PAY, aliPayBean.toString(), "");
			writer.append("success");
		} else if (aliPayBean.getTrade_status().equals(AliPayBean.TRADE_FINISHED)) {
			payFinished(aliPayBean, response, writer);
			// paySuccess(aliPayBean, response, writer);
		} else if (aliPayBean.getTrade_status().equals(AliPayBean.TRADE_SUCCESS)) {
			paySuccess(aliPayBean, response, writer);
		} else if (aliPayBean.getTrade_status().equals(AliPayBean.TRADE_CLOSED)) {
			payClosed(aliPayBean, response, writer);
		}
	}

	private static void payFinished(AliPayBean aliPayBean, HttpServletResponse response, PrintWriter writer) {
		OrderBean orderBean = new OrderBean();
		orderBean.setCode(aliPayBean.getOut_trade_no());
		orderBean = SQLModel.getOrderOne(orderBean);
		if (orderBean == null || (orderBean.getState() != 2 && orderBean.getState() != 1)) {
			addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.ERROR, aliPayBean.toString(), "数据库订单状态异常");
			writer.append("success");
			return;
		}
		orderBean.setState(4);
		if (!SQLModel.updataOrderState(orderBean)) {
			addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, aliPayBean.toString(), "订单状态更新失败");
			return;
		}
		addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, aliPayBean.toString(), "订单已完成");
		writer.append("success");
	}

	private static void payClosed(AliPayBean aliPayBean, HttpServletResponse response, PrintWriter writer) {
		addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_CLOSED, aliPayBean.toString(), "");
		writer.append("success");
	}

	private static void paySuccess(AliPayBean aliPayBean, HttpServletResponse response, PrintWriter writer) {
		OrderBean orderBean = new OrderBean();
		orderBean.setCode(aliPayBean.getOut_trade_no());
		orderBean = SQLModel.getOrderOne(orderBean);
		if (orderBean == null || orderBean.getState() != 1) {
			addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.ERROR, aliPayBean.toString(), "数据库订单状态异常");
			writer.append("success");
			return;
		}
		orderBean.setState(2);
		if (!SQLModel.updataOrderState(orderBean)) {
			addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, aliPayBean.toString(), "订单状态更新失败");
			return; 
		}
		String data[] = orderBean.getInput().split("\\|");
		if (data.length == 2) { 
			JsonBean bean = null;
			try {
				bean = (JsonBean) JsonBean.newInstanceBean(Class.forName(data[0]), data[1]);
			} catch (ClassNotFoundException e) {
				addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, bean.toString(), "时间更新错误");
				e.printStackTrace();
			}
			if (bean == null)
				return;
			System.out.println("paySuccess:" + bean);
			boolean bool = false;
			if (data[0].equals(GJUserTimeBean.class.getName())) {
				GJUserHandle.getUserModel().updateUserTimes((GJUserTimeBean) bean);
			} else {
				UserHandle.getUserModel().updateUserTimes((UserTimeBean) bean);
			}
			if (bool) {
				addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, bean.toString(), "时间更新成功");
				writer.append("success");
			} else
				addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, bean.toString(), "时间更新错误");

		} else {
			UserTimeBean bean = JsonBean.newInstanceBean(UserTimeBean.class, orderBean.getInput());
			System.out.println("paySuccess:" + bean);
			if (UserHandle.getUserModel().updateUserTimes((UserTimeBean) bean)) {
				addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, bean.toString(), "时间更新成功");
				writer.append("success");
			} else
				addLogs(LogsBean.TYPE_ADMIN, aliPayBean.getBuyer_email(), AliPayBean.TRADE_SUCCESS, bean.toString(), "时间更新错误");
		}
	}

	// 退款这个订单
	public static boolean refundOrder(OrderBean orderBean) {
		if (orderBean == null || orderBean.getState() != 6) {
			return false;
		}
		// TODO 退款代码
		if (orderBean.getState() == 3) {
			return refundAliOrder(orderBean);
		} else if (orderBean.getState() == 4) {
			// return refundTenOrder(orderBean);
		}
		return false;
	}

	private static boolean refundAliOrder(OrderBean orderBean) {
		try {
			AliPublicBean aliPublicBean = new AliPublicBean();
			AlipayClient alipayClient = new DefaultAlipayClient(AliPublicBean.Refund_Url, aliPublicBean.getApp_id(), aliPublicBean.getApp_private_key(),
					aliPublicBean.getFormat(), aliPublicBean.getCharset(), AliPublicBean.Refund_Public_key, aliPublicBean.getSign_type());
			AlipayTradeRefundRequest request = new AlipayTradeRefundRequest();
			JSONObject jsonObject = new JSONObject();
			// " \"out_trade_no\":\"20150320010101001\"," +
			// " \"trade_no\":\"2014112611001004680073956707\"," +
			// " \"refund_amount\":200.12," +
			// " \"refund_reason\":\"正常退款\"," +
			// " \"out_request_no\":\"HZ01RF001\"," +
			// " \"operator_id\":\"OP001\"," +
			// " \"store_id\":\"NJ_S_001\"," +
			// " \"terminal_id\":\"NJ_T_001\"" +
			// " }");
			jsonObject.put("out_trade_no", orderBean.getCode());
			// orderBean.setUser_paymoney("0.01");
			jsonObject.put("refund_amount", orderBean.getMoney());
			jsonObject.put("refund_reason", "退款");
			request.setBizContent(jsonObject.toString());
			AlipayTradeRefundResponse response = alipayClient.execute(request);
			if (response.isSuccess()) {
				// 退款成功
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
