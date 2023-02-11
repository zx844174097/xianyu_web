package com.mugui.http.Bean;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import net.sf.json.JSONObject;

public class AliPublicBean extends JsonBean {
	public static final String Refund_Url="https://openapi.alipay.com/gateway.do";
	public static final String Refund_Public_key="123+G4lsuUqLL1lpvXTvOOR4EA3BejEP9GKt9v2O8Yl+B8i/jBcj/cD5vL26k+J/X2Rzh6E0j1le84Loj+h31nIo3NP4ynAr+2+VyUKEU8/3o8AEhDThIWSKZZPVO+gWf76XzVQLQ879RMys0DYzNaWi69T9tTHUaQ8kn/e839z4gMlZ8zEf3yrz4iOc8DCKrnaB+QAYatdid+pkQ0IOgmTMCJRutnkyNgMg+ZQxl/L3oXsP2KC2XWysGT/w+vVuHWHun00PdG4TURFvs929/qha6Fwswm5n1uQFzw/l/DeLvR4QjeyWPvHm5lCm5lP2lKQukJc8yrnl698HYwIDAQAB";
	// app_id 应用id
	private String app_id = "123";
	 private String method = "alipay.trade.app.pay";// 接口名称 
	//private String method = "mobile.securitypay.pay";// 接口名称
	private String format = "JSON";
	private String charset = "UTF-8";
	private String trade_status=null; //阿里返回的状态通知码
	private String sign_type = "RSA2";
	private String sign = ""; 
	private String timestamp = "30m"; 
	private String version = "1.0"; 
	private String return_url = "http://123/jiaoben/sendali.do";
	private String notify_url = "http://123.1222.22.99/jiaoben/accpetali.do";
	private String biz_content = ""; 
	private String app_private_key = null;
	private String ali_public_key = "123+G4lsuUqLL1lpvXTvOOR4EA3BejEP9GKt9v2O8Yl+B8i/jBcj/cD5vL26k+J/X2Rzh6E0j1le84Loj+h31nIo3NP4ynAr+2+VyUKEU8/3o8AEhDThIWSKZZPVO+gWf76XzVQLQ879RMys0DYzNaWi69T9tTHUaQ8kn/e839z4gMlZ8zEf3yrz4iOc8DCKrnaB+QAYatdid+pkQ0IOgmTMCJRutnkyNgMg+ZQxl/L3oXsP2KC2XWysGT/w+vVuHWHun00PdG4TURFvs929/qha6Fwswm5n1uQFzw/l/DeLvR4QjeyWPvHm5lCm5lP2lKQukJc8yrnl698HYwIDAQAB";
	
	public AliPublicBean(JSONObject jsonObject) {
		 if (jsonObject == null) 
			return;
		if (jsonObject.get("app_id") != null)
			setApp_id(jsonObject.getString("app_id"));   
		if (jsonObject.get("method") != null)
			setMethod(jsonObject.getString("method"));
		if (jsonObject.get("format") != null)
			setFormat(jsonObject.getString("format"));
		if (jsonObject.get("charset") != null)
			setCharset(jsonObject.getString("charset"));
		if (jsonObject.get("sign_type") != null)
			setSign_type(jsonObject.getString("sign_type"));
		if (jsonObject.get("sign") != null)
			setSign(jsonObject.getString("sign"));
		if (jsonObject.get("timestamp") != null)
			setTimestamp(jsonObject.getString("timestamp"));
		if (jsonObject.get("version") != null)
			setVersion(jsonObject.getString("version"));
		if (jsonObject.get("return_url") != null)
			setReturn_url(jsonObject.getString("return_url"));
		if (jsonObject.get("notify_url") != null)
			setNotify_url(jsonObject.getString("notify_url"));
		if (jsonObject.get("biz_content") != null)
			setBiz_content(jsonObject.getString("biz_content"));
		if (jsonObject.get("app_private_key") != null)
			setApp_private_key(jsonObject.getString("app_private_key"));
		if (jsonObject.get("ali_public_key") != null)
			setAli_public_key(jsonObject.getString("ali_public_key"));
		if (jsonObject.get("trade_status") != null)
			setTrade_status(jsonObject.getString("trade_status"));

	}
	public AliPublicBean() {
		this(null);
		app_private_key="123+123/nARoinTk8jwwyF/123+3wMO/123/123/123/123/9+ued86gc0JdAVXb4g0zEE4usVSkyb0aLvvw3HjXBjHUPMw0XvZUZo6oSI0+O79zficrSlPwlH4vStLbM29Hba6ZFmBDkkN9FEIoFkpSEtT5TLDbSnI/UzdEmv2f3A7m+WTrSCJ25FO8qh53FPpZW++8EcMZoGw3rVulkcTABJY6k/Il6t9jiq7qQCFkNr3Q/8WIZrIaejp3A2RrQV9+hYvc6lXH2XPwOUoMdHL//+a4cdupe89bd7c789JF8sJjNGsCYcCv1BJkEPLy9VWhLB+TjNJpkfV2U1onMJSeHomNEdmzUp73yErDzEFgORCvCSzueoi0QKBgQDkNSxTnJcbcxur/G8G94Kc0FAoIxIPo1tmt1SECc5rYONrF0flMb6xLt5azgoQtfcetPlZgEeeS6teM7i6yC30arE/3ZcpE6Z/puxB+LtVFGKePVdx19XzZM11Grt+r6aUf069F3x+dYU5C34V99L07uF8GX2RmSl8edhfzCgJowKBgQCfsUDLr0rs6fCKxDOzUJDhMuZv4IiOvjzn1r5L6cfZ7blciM6+T/B+ewkyrN1BJdp5Me79X+svmrpPpKpGivZBr06bH04YuP7pLpujy7Y+tYHmThdey2IDm0BfVMVpOGA42vRUrl7erKcU98yzj5Q1OIAnHT6rBiCcsy3ooDe26QKBgF4Mb+0xbrD4WmIh0Zv8a063JyGzemEJgMSvL1yPMgvczTy4Rn/1ZVJeL3Ma0NkcNPDpwo2ZKWraYpCbHjmUACRnyA67Au4B1C9tmpaBrKqekRoHy772JY1+cJIfZ0AJocw3Pzr8r+jqA/KDgv4IuV8KB9F+K9rSVV+gU4T/fUyjAoGANmB5G+J4tOuECPx+TlTkwIpAhWADn/ePbbJl4huc/cxBDg1XuN4nminzG9pZDNIC7rneE1ESGIerYWtEv/iZmgxDy/aA9VIpGuXQAZpgWEIeFXoJ4zGGEoxPAycugYG84h9Mi3lEvLY1vqIShiIh6W1v1eHTcREJEdLBkzDbR+ECgYB8JDeAVhJlFxIrz9TJLRQuaLqd3T1ZZZmAYfkry+saS3FR8XCH/38Vo1OlBRLcjSR6gMRegu9Ixn4FxWMD1Fittz8eSluCowwo2xCvSuuv85M4/e8tAMwHI6KatJJjmQxfLCS1fsYCjXDfVyR4VjjNIVvoE4WlWIkkYxYJqjnR+w==";
	}
	
	public JSONObject toJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("app_id", getApp_id());
		jsonObject.put("method", getMethod());
		jsonObject.put("format", getFormat());
		jsonObject.put("charset", getCharset());
		jsonObject.put("sign_type", getSign_type());
		jsonObject.put("sign", getSign());
		jsonObject.put("timestamp", getTimestamp());
		jsonObject.put("version", getVersion());
		jsonObject.put("notify_url", getNotify_url());
		jsonObject.put("biz_content", getBiz_content());
		jsonObject.put("trade_status", getTrade_status());
		return jsonObject;
	}

	public String getTrade_status() {
		return trade_status;
	}
	public void setTrade_status(String trade_status) {
		this.trade_status = trade_status;
	}
	/**
	 * create the order info. 创建订单信息
	 * 
	 * @throws UnsupportedEncodingException
	 * 
	 */
	public String getOrderInfo(AliBizBean aliBizBean)
			throws UnsupportedEncodingException {
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("out_trade_no", aliBizBean.getOut_trade_no());
		jsonObject.put("product_code", aliBizBean.getProduct_code());
		jsonObject.put("total_amount", aliBizBean.getTotal_amount()); 
		jsonObject.put("subject", aliBizBean.getSubject());
		jsonObject.put("body", aliBizBean.getBody());
//		jsonObject.put("seller_id", "ouuipj3293@sandbox.com");
//		jsonObject.put("it_b_pay", timestamp);
		return jsonObject.toString();
		
		
		
//		String orderInfo = "";
//		// 接口名称， 固定值
//		orderInfo += "service=\"" + method + "\"";
//		// 合作者身份ID
//		orderInfo += "&partner=" + "\"" + aliBizBean.getSeller_id() + "\"";
//		// 参数编码， 固定值
//		orderInfo += "&_input_charset=\"" + getCharset() + "\"";
//
//		// 商户网站唯一订单号
//		orderInfo += "&out_trade_no=" + "\"" + aliBizBean.getOut_trade_no()
//				+ "\"";
//		// 商品名称
//		orderInfo += "&subject=" + "\"" + aliBizBean.getSubject() + "\"";
//
//		// 支付类型， 固定值
//		orderInfo += "&payment_type=\"" + aliBizBean.getGoods_type() + "\"";
//
//		// 卖家支付宝账号
//		orderInfo += "&seller_id=" + "\"" +"ouuipj3293@sandbox.com" + "\"";
//
//		// 商品金额
//		orderInfo += "&total_fee=" + "\"" + aliBizBean.getTotal_amount() + "\"";
//
//		// 商品详情
//		orderInfo += "&body=" + "\"" + aliBizBean.getBody() + "\"";
//
//		// 设置未付款交易的超时时间
//		// 默认30分钟，一旦超时，该笔交易就会自动被关闭。
//		// 取值范围：1m～15d。
//		// m-分钟，h-小时，d-天，1c-当天（无论交易何时创建，都在0点关闭）。
//		// 该参数数值不接受小数点，如1.5h，可转换为90m。
//		orderInfo += "&it_b_pay=\"" + timestamp + "\"";
//
//		// 服务器异步通知页面路径
////		orderInfo += "&notify_url=" + "\""
////				+ URLEncoder.encode(notify_url, getCharset()) + "\"";
////		// 支付宝处理完请求后，当前页面跳转到商户指定页面的路径，可空
////
////		orderInfo += "&show_url=\""
////				+ URLEncoder.encode(return_url, getCharset()) + "\"";
//		// alipay.trade.app.paymobile.securitypay.pay
//
//		// 调用银行卡支付，需配置此参数，参与签名， 固定值
//		// orderInfo += "&paymethod=\"expressGateway\"";
//		return orderInfo;
	}

	
	public String getReturn_url() {
		return return_url;
	}
	public void setReturn_url(String return_url) {
		this.return_url = return_url;
	}
	public String getAli_public_key() {
		return ali_public_key;
	}

	public void setAli_public_key(String ali_public_key) {
		this.ali_public_key = ali_public_key;
	}

	public String getApp_private_key() {
		return app_private_key;
	}

	public void setApp_private_key(String app_private_key) {
		this.app_private_key = app_private_key;
	}

	public String getApp_id() {
		return app_id;
	}

	public void setApp_id(String app_id) {
		this.app_id = app_id;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getCharset() {
		return charset;
	}

	public void setCharset(String charset) {
		this.charset = charset;
	}

	public String getSign_type() {
		return sign_type;
	}

	public void setSign_type(String sign_type) {
		this.sign_type = sign_type;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getNotify_url() {
		return notify_url;
	}

	public void setNotify_url(String notify_url) {
		this.notify_url = notify_url;
	}

	public String getBiz_content() {
		return biz_content;
	}

	public void setBiz_content(String biz_content) {
		this.biz_content = biz_content;
	}

	public void setBiz_content(AliBizBean biz_content) {
		this.biz_content = biz_content.toString();
	}

	public void setBiz_content(JSONObject jsonObject) {
		this.biz_content = jsonObject.toString();
	}

}
