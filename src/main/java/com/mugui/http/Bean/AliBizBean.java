package com.mugui.http.Bean;

import net.sf.json.JSONObject;

public class AliBizBean extends JsonBean {
	private String body;//商品描述
	private String subject;//商户标题
	private String out_trade_no;//订单号
	private String timeout_express;//最晚付款时间
	private String total_amount;//订单的总金额
	private String seller_id="123";//收款支付宝用户id
	private String product_code="FAST_INSTANT_TRADE_PAY";
	private String goods_type="1";
	private String passback_params;//共用回传参数
	private String extend_params;//优惠参数
	private String enable_pay_channels="balance,creditCard,creditCardExpress";//支付可用渠道
	private String disable_pay_channels;//支付禁用渠道

	public AliBizBean(JSONObject jsonObject) {
		 if (jsonObject == null) 
			return;
		if (jsonObject.get("body") != null)
			setBody(jsonObject.getString("body"));  
		if (jsonObject.get("subject") != null)
			setSubject(jsonObject.getString("subject"));
		if (jsonObject.get("out_trade_no") != null)
			setOut_trade_no(jsonObject.getString("out_trade_no"));
		if (jsonObject.get("timeout_express") != null)
			setTimeout_express(jsonObject.getString("timeout_express"));
		if (jsonObject.get("total_amount") != null)
			setTotal_amount(jsonObject.getString("total_amount"));
		if (jsonObject.get("seller_id") != null)
			setSeller_id(jsonObject.getString("seller_id"));
		if (jsonObject.get("product_code") != null)
			setProduct_code(jsonObject.getString("product_code"));
		if (jsonObject.get("goods_type") != null)
			setGoods_type(jsonObject.getString("goods_type"));
		if (jsonObject.get("passback_params") != null)
			setPassback_params(jsonObject.getString("passback_params"));
		if (jsonObject.get("extend_params") != null)
			setExtend_params(jsonObject.getString("extend_params"));
		if (jsonObject.get("enable_pay_channels") != null)
			setEnable_pay_channels(jsonObject.getString("enable_pay_channels"));
		if (jsonObject.get("disable_pay_channels") != null)
			setDisable_pay_channels(jsonObject.getString("disable_pay_channels"));

	}

	public AliBizBean() {
		this(null);
	}

	public JSONObject toJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("body", getBody());
		jsonObject.put("subject", getSubject());
		jsonObject.put("out_trade_no", getOut_trade_no());
		jsonObject.put("timeout_express", getTimeout_express());
		jsonObject.put("total_amount", getTotal_amount());
		jsonObject.put("seller_id", getSeller_id());
		jsonObject.put("product_code", getProduct_code());
		jsonObject.put("goods_type", getGoods_type());
		jsonObject.put("passback_params", getPassback_params());
		jsonObject.put("extend_params", getExtend_params());
		jsonObject.put("enable_pay_channels", getEnable_pay_channels());
		jsonObject.put("disable_pay_channels", getDisable_pay_channels());
		return jsonObject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getOut_trade_no() {
		return out_trade_no;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getTimeout_express() {
		return timeout_express;
	}

	public void setTimeout_express(String timeout_express) {
		this.timeout_express = timeout_express;
	}

	public String getTotal_amount() {
		return total_amount;
	}

	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}

	public String getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(String seller_id) {
		this.seller_id = seller_id;
	}

	public String getProduct_code() {
		return product_code;
	}

	public void setProduct_code(String product_code) {
		this.product_code = product_code;
	}

	public String getGoods_type() {
		return goods_type;
	}

	public void setGoods_type(String goods_type) {
		this.goods_type = goods_type;
	}

	public String getPassback_params() {
		return passback_params;
	}

	public void setPassback_params(String passback_params) {
		this.passback_params = passback_params;
	}

	public String getExtend_params() {
		return extend_params;
	}

	public void setExtend_params(String extend_params) {
		this.extend_params = extend_params;
	}

	public String getEnable_pay_channels() {
		return enable_pay_channels;
	}

	public void setEnable_pay_channels(String enable_pay_channels) {
		this.enable_pay_channels = enable_pay_channels;
	}

	public String getDisable_pay_channels() {
		return disable_pay_channels;
	}

	public void setDisable_pay_channels(String disable_pay_channels) {
		this.disable_pay_channels = disable_pay_channels;
	}

}
