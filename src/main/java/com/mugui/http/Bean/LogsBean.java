package com.mugui.http.Bean;

import net.sf.json.JSONObject;

public class LogsBean extends JsonBean {
	private int logs_id;
	private int logs_type;
	private String logs_userid;
	private String logs_bag_id;
	private String logs_time;
	private String logs_info;
	private String logs_result;
	public static final int TYPE_MERCHANT = 0x000001;
	public static final int TYPE_OTHER = 0x000000;
	public static final int TYPE_USER = 0x000002;
	public static final int TYPE_ADMIN = 0x000003;

	public LogsBean(int logs_type, String logs_userid, String logs_bag_id) {
		this(logs_type, logs_userid, logs_bag_id, null);
	}

	public LogsBean(int logs_type, String logs_userid, String logs_bag_id,
			String logs_info) {
		this(logs_type, logs_userid, logs_bag_id, logs_info, null);
	}

	public LogsBean(int logs_type, String logs_userid, String logs_bag_id,
			String logs_info, String logs_result) {
		this.logs_type = logs_type;
		this.logs_userid = logs_userid;
		this.logs_bag_id = logs_bag_id;
		this.logs_info = logs_info;
		this.logs_result = logs_result;
	}

	public String[] toArray() {
		String s[] = { logs_type + "", logs_userid, logs_bag_id,
				logs_info == null ? "" : logs_info,
				logs_result == null ? "" : logs_result };
		return s;
	}

	public LogsBean(JSONObject jsonObject) {
		if (jsonObject == null)
			return;
		if (jsonObject.get("logs_id") != null)
			setLogs_id(jsonObject.getInt("logs_id"));
		if (jsonObject.get("logs_type") != null)
			setLogs_type(jsonObject.getInt("logs_type"));
		if (jsonObject.get("logs_userid") != null)
			setLogs_userid(jsonObject.getString("logs_userid"));
		if (jsonObject.get("logs_bag_id") != null)
			setLogs_bag_id(jsonObject.getString("logs_bag_id"));
		if (jsonObject.get("logs_time") != null)
			setLogs_time(jsonObject.getString("logs_time"));
		if (jsonObject.get("logs_info") != null)
			setLogs_info(jsonObject.getString("logs_info"));
		if (jsonObject.get("logs_result") != null)
			setLogs_result(jsonObject.getString("logs_result"));
	}

	public LogsBean() {
		this(null);
	}

	public JSONObject toJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("logs_id", getLogs_id());
		jsonObject.put("logs_type", getLogs_type());
		jsonObject.put("logs_userid", getLogs_userid());
		jsonObject.put("logs_bag_id", getLogs_bag_id());
		jsonObject.put("logs_time", getLogs_time());
		jsonObject.put("logs_info", getLogs_info());
		jsonObject.put("logs_result", getLogs_result());
		return jsonObject;
	}

	public String getLogs_result() {
		return logs_result;
	}

	public void setLogs_result(String logs_result) {
		this.logs_result = logs_result;
	}

	public int getLogs_id() {
		return logs_id;
	}

	public void setLogs_id(int logs_id) {
		this.logs_id = logs_id;
	}

	public int getLogs_type() {
		return logs_type;
	}

	public void setLogs_type(int logs_type) {
		this.logs_type = logs_type;
	}

	public String getLogs_userid() {
		return logs_userid;
	}

	public void setLogs_userid(String logs_userid) {
		this.logs_userid = logs_userid;
	}

	public String getLogs_bag_id() {
		return logs_bag_id;
	}

	public void setLogs_bag_id(String logs_bag_id) {
		this.logs_bag_id = logs_bag_id;
	}

	public String getLogs_time() {
		return logs_time;
	}

	public void setLogs_time(String logs_time) {
		this.logs_time = logs_time;
	}

	public String getLogs_info() {
		return logs_info;
	}

	public void setLogs_info(String logs_info) {
		this.logs_info = logs_info;
	}

}
