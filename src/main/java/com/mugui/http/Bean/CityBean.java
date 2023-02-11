package com.mugui.http.Bean;

import com.mugui.http.Bean.JsonBean;

import net.sf.json.JSONObject;

public class CityBean extends JsonBean {
	private int id = -1;
	private String mail = null;
	private String country = null;
	private String region = null;
	private String city = null;
	private String county = null;
	private String ip=null;
	@Override
	public void InitBean(JSONObject jsonObject) {
		if (jsonObject == null)
			return;
		if (jsonObject.get("id") != null)
			setId(jsonObject.getInt("id"));
		if (jsonObject.get("mail") != null)
			setMail(jsonObject.getString("mail"));
		if (jsonObject.get("country") != null)
			setCountry(jsonObject.getString("country"));
		if (jsonObject.get("region") != null)
			setRegion(jsonObject.getString("region"));
		if (jsonObject.get("city") != null)
			setCity(jsonObject.getString("city"));
		if (jsonObject.get("county") != null)
			setCounty(jsonObject.getString("county"));
		if (jsonObject.get("ip") != null)
			setIp(jsonObject.getString("ip"));

	}

	@Override
	public JSONObject toJsonObject() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("id", getId());
		jsonObject.put("mail", getMail());
		jsonObject.put("country", getCountry());
		jsonObject.put("region", getRegion());
		jsonObject.put("city", getCity());
		jsonObject.put("county", getCounty());
		jsonObject.put("ip", getIp());
		return jsonObject;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

}
