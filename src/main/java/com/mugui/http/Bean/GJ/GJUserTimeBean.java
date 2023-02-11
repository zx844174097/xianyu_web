package com.mugui.http.Bean.GJ;

import com.mugui.http.Bean.JsonBean;

public class GJUserTimeBean extends JsonBean {
	private String mail = null;
	private String dytime = null;

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getDytime() {
		return dytime;
	}

	public void setDytime(String dytime) {
		this.dytime = dytime;
	}

	public String[] toTimeArray() {
		return new String[] { dytime };
	}

}
