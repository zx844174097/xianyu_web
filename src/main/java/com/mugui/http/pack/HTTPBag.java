package com.mugui.http.pack;

import java.io.Serializable;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class HTTPBag implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3651822328811451392L;
	public static final String USER_REGIST = "user_regist"; // 用户注册
	public static final String USER_GET_CODE = "user_get_code";// 注册验证码获取
	public static final String USER_LOGIN = "user_login";// 用户登录
	public static final String USER_INFO = "user_info";// 用户信息
	public static final String USER_ORDER = "user_order";// 用户订单
	public static final String ADD_ORDER = "add_order";// 用户生成一个订单
	// 商家接收到一个新的订单
	public static final String PAY_ORDER = "pay_order";// 支付某个订单
	public static final String PAY_ORDER_TEN="pay_order_ten";
	public static final String SELECT_USER_TIME="select_user_time";
	private String bag_id;
	private String version;
	private Object body;


	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	public String getBag_id() {
		return bag_id;
	}

	public void setBag_id(String bag_id) {
		this.bag_id = bag_id;
	}

	public void setBody(JSONObject jsonObject) {
		this.body = jsonObject;
	}

	public void setBody(JSONArray jsonArray) {
		this.body = jsonArray;
	}

	public void setBody(String string) {
		this.body = "\"" + string + "\"";
	}

	public Object getBody() {
		return body;
	}

	public JSONObject toJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("bag_id", bag_id);
		jsonObject.put("info", body);
		jsonObject.put("version", version);
		return jsonObject;
	}

	@Override
	public String toString() {
		return  toJsonObject().toString();
	}

}
