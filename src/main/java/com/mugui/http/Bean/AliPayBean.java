package com.mugui.http.Bean;

import net.sf.json.JSONObject;

public class AliPayBean extends JsonBean{
	public static final String WAIT_BUYER_PAY="WAIT_BUYER_PAY";
	public static final String TRADE_SUCCESS="TRADE_SUCCESS";
	public static final String TRADE_FINISHED="TRADE_FINISHED";
	public static final String TRADE_CLOSED="TRADE_CLOSED";
	public static final String ERROR = "error";
	private String buyer_id;//卖家id
	private String trade_no;
	private String use_coupon;
	private String notify_time;
	private String subject;
	private String sign_type;
	private String is_total_fee_adjust;
	private String notify_type;
	private String out_trade_no;
	private String trade_status;
	private String discount;
	private String sign;
	private String gmt_create;
	private String price;
	private String total_fee;
	private String quantity;
	private String seller_id;
	private String notify_id;
	private String seller_email;
	private String payment_type;
	private String buyer_email;
	private String body;
	private String gmt_payment;

	public JSONObject toJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("buyer_id", getBuyer_id());
		jsonObject.put("trade_no", getTrade_no());
		jsonObject.put("use_coupon", getUse_coupon());
		jsonObject.put("notify_time", getNotify_time());
		jsonObject.put("subject", getSubject());
		jsonObject.put("sign_type", getSign_type());
		jsonObject.put("is_total_fee_adjust", getIs_total_fee_adjust());
		jsonObject.put("notify_type", getNotify_type());
		jsonObject.put("out_trade_no", getOut_trade_no());
		jsonObject.put("trade_status", getTrade_status());
		jsonObject.put("discount", getDiscount());
		jsonObject.put("sign", getSign());
		jsonObject.put("gmt_create", getGmt_create());
		jsonObject.put("price", getPrice());
		jsonObject.put("total_fee",getTotal_fee());
		jsonObject.put("quantity", getQuantity());
		jsonObject.put("seller_id", getSeller_id());
		jsonObject.put("notify_id", getNotify_id());
		jsonObject.put("seller_email", getSeller_email());
		jsonObject.put("payment_type", getPayment_type());
		jsonObject.put("buyer_email", getBuyer_email());
		jsonObject.put("body", getBody());
		jsonObject.put("gmt_payment", getGmt_payment());
		return jsonObject;
	}
	public AliPayBean(JSONObject jsonObject) {
		 if (jsonObject == null) 
			return;
		if (jsonObject.get("buyer_id") != null)
			setBuyer_id(jsonObject.getString("buyer_id"));  
		if (jsonObject.get("trade_no") != null)
			setTrade_no(jsonObject.getString("trade_no"));
		if (jsonObject.get("use_coupon") != null)
			setUse_coupon(jsonObject.getString("use_coupon"));
		if (jsonObject.get("notify_time") != null)
			setNotify_time(jsonObject.getString("notify_time"));
		if (jsonObject.get("subject") != null)
			setSubject(jsonObject.getString("subject"));
		if (jsonObject.get("sign_type") != null)
			setSign_type(jsonObject.getString("sign_type"));
		if (jsonObject.get("is_total_fee_adjust") != null)
			setIs_total_fee_adjust(jsonObject.getString("is_total_fee_adjust"));
		if (jsonObject.get("notify_type") != null)
			setNotify_type(jsonObject.getString("notify_type"));
		if (jsonObject.get("out_trade_no") != null)
			setOut_trade_no(jsonObject.getString("out_trade_no"));
		if (jsonObject.get("trade_status") != null)
			setTrade_status(jsonObject.getString("trade_status"));
		if (jsonObject.get("discount") != null)
			setDiscount(jsonObject.getString("discount"));
		if (jsonObject.get("sign") != null)
			setSign(jsonObject.getString("sign"));
		if (jsonObject.get("gmt_create") != null)
			setGmt_create(jsonObject.getString("gmt_create"));
		if (jsonObject.get("price") != null)
			setPrice(jsonObject.getString("price"));
		if (jsonObject.get("total_fee") != null)
			setTotal_fee(jsonObject.getString("total_fee"));
		if (jsonObject.get("price") != null)
			setPrice(jsonObject.getString("price"));
		if (jsonObject.get("quantity") != null)
			setQuantity(jsonObject.getString("quantity"));
		if (jsonObject.get("seller_id") != null)
			setBuyer_id(jsonObject.getString("seller_id"));
		if (jsonObject.get("notify_id") != null)
			setNotify_id(jsonObject.getString("notify_id"));
		if (jsonObject.get("seller_email") != null)
			setSeller_email(jsonObject.getString("seller_email"));
		if (jsonObject.get("payment_type") != null)
			setPayment_type(jsonObject.getString("payment_type"));
		if (jsonObject.get("buyer_email") != null)
			setBuyer_email(jsonObject.getString("buyer_email"));
		if (jsonObject.get("body") != null)
			setBody(jsonObject.getString("body"));
		if (jsonObject.get("gmt_payment") != null)
			setGmt_payment(jsonObject.getString("gmt_payment"));
	}

	public AliPayBean() {
		this(null);
	}


	public String getBuyer_id() {
		return buyer_id;
	}

	public void setBuyer_id(String buyer_id) {
		this.buyer_id = buyer_id;
	}

	public String getTrade_no() {
		return trade_no;
	}

	public void setTrade_no(String trade_no) {
		this.trade_no = trade_no;
	}

	public String getUse_coupon() {
		return use_coupon;
	}

	public void setUse_coupon(String use_coupon) {
		this.use_coupon = use_coupon;
	}

	public String getNotify_time() {
		return notify_time;
	}

	public void setNotify_time(String notify_time) {
		this.notify_time = notify_time;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSign_type() {
		return sign_type;
	}

	public void setSign_type(String sign_type) {
		this.sign_type = sign_type;
	}

	public String getIs_total_fee_adjust() {
		return is_total_fee_adjust;
	}

	public void setIs_total_fee_adjust(String is_total_fee_adjust) {
		this.is_total_fee_adjust = is_total_fee_adjust;
	}

	public String getNotify_type() {
		return notify_type;
	}

	public void setNotify_type(String notify_type) {
		this.notify_type = notify_type;
	}

	public String getOut_trade_no() {
		return out_trade_no;
	}

	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}

	public String getTrade_status() {
		return trade_status;
	}

	public void setTrade_status(String trade_status) {
		this.trade_status = trade_status;
	}

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public String getSign() {
		return sign;
	}

	public void setSign(String sign) {
		this.sign = sign;
	}

	public String getGmt_create() {
		return gmt_create;
	}

	public void setGmt_create(String gmt_create) {
		this.gmt_create = gmt_create;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getTotal_fee() {
		return total_fee;
	}

	public void setTotal_fee(String total_fee) {
		this.total_fee = total_fee;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getSeller_id() {
		return seller_id;
	}

	public void setSeller_id(String seller_id) {
		this.seller_id = seller_id;
	}

	public String getNotify_id() {
		return notify_id;
	}

	public void setNotify_id(String notify_id) {
		this.notify_id = notify_id;
	}

	public String getSeller_email() {
		return seller_email;
	}

	public void setSeller_email(String seller_email) {
		this.seller_email = seller_email;
	}

	public String getPayment_type() {
		return payment_type;
	}

	public void setPayment_type(String payment_type) {
		this.payment_type = payment_type;
	}

	public String getBuyer_email() {
		return buyer_email;
	}

	public void setBuyer_email(String buyer_email) {
		this.buyer_email = buyer_email;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getGmt_payment() {
		return gmt_payment;
	}

	public void setGmt_payment(String gmt_payment) {
		this.gmt_payment = gmt_payment;
	}


}
