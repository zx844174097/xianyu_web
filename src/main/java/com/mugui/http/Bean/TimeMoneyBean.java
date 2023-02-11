package com.mugui.http.Bean;

public class TimeMoneyBean extends JsonBean {
	private String name = null;
	private int id = 0;
	private int day = 999999;
	private int week = 999999;
	private int month = 999999;
	private int season = 999999;
	private int halfyear = 999999;
	private int year = 999999;
	private int permanent = 999999;

	public int getHalfyear() {
		return halfyear;
	}

	public void setHalfyear(int halfyear) {
		this.halfyear = halfyear;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getDay() {
		return day;
	}

	public void setDay(int day) {
		this.day = day;
	}

	public int getWeek() {
		return week;
	}

	public void setWeek(int week) {
		this.week = week;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getSeason() {
		return season;
	}

	public void setSeason(int season) {
		this.season = season;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getPermanent() {
		return permanent;
	}

	public void setPermanent(int permanent) {
		this.permanent = permanent;
	}

}
