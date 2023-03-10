package com.mugui.http.Bean;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import net.sf.json.JSONObject;

public class WindowListenerBean extends JsonBean {
	private int x;
	private int y;
	private int w;
	private int h;
	private String user_mail;
	private String to_user_mail;
	private double rate;
	private int mark;
	private int model;
	private long time;
	private int length;
	private FileBean bean;

	public int getModel() {
		return model;
	}

	public void setModel(int model) {
		this.model = model;
	}

	public long getTime() {
		return time;
	}

	public void setTime(long time) {
		this.time = time;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public FileBean getBean() {
		return bean;
	}

	public void setBean(FileBean bean) {
		this.bean = bean;
	}

	public int getX() {
		return x;
	}

	public void setX(int x) {
		this.x = x;
	}

	public int getY() {
		return y;
	}

	public void setY(int y) {
		this.y = y;
	}

	public int getW() {
		return w;
	}

	public void setW(int w) {
		this.w = w;
	}

	public int getH() {
		return h;
	}

	public void setH(int h) {
		this.h = h;
	}

	public String getUser_mail() {
		return user_mail;
	}

	public void setUser_mail(String user_mail) {
		this.user_mail = user_mail;
	}

	public String getTo_user_mail() {
		return to_user_mail;
	}

	public void setTo_user_mail(String to_user_mail) {
		this.to_user_mail = to_user_mail;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double nsn) {
		this.rate = nsn;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
	}

	public WindowListenerBean() {
		this(null);
	}

	public WindowListenerBean(JSONObject object) {
		InitBean(object);
	}

	@Override
	public JSONObject toJsonObject() {
		Field[] field = getClass().getDeclaredFields();
		JSONObject object = new JSONObject();
		for (Field f : field) {
			try {
				Object object2 = f.get(this);
				if (object2 != null)
					object.put(f.getName(), f.get(this));
			} catch (IllegalArgumentException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		}
		return object;
	}

	@Override
	public void InitBean(JSONObject jsonObject) {
		if (jsonObject == null)
			return;
		Field[] field = getClass().getDeclaredFields();
		for (Field f : field) {
			Object object = jsonObject.get(f.getName());
			if (object != null) {
				try {
					Object object2 = null;
					try {
						object2 = f.getType().newInstance();
					} catch (InstantiationException e) {
					}
					if (object2 == null) {
						Method method = Number.class.getMethod(f.getType().getName() + "Value", null);
						f.set(this, method.invoke(object, null));
					} else if (object2 instanceof String) {
						f.set(this, object);
					} else if (object2 instanceof JsonBean) {
						((JsonBean) object2).InitBean(JSONObject.fromObject(object));
						f.set(this, object2);
					}
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (NoSuchMethodException e) {
					// TODO ??????????????? catch ???
					e.printStackTrace();
				} catch (SecurityException e) {
					// TODO ??????????????? catch ???
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					// TODO ??????????????? catch ???
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO ??????????????? catch ???
					e.printStackTrace();
				}
			}
		}
	}

	public WindowListenerBean newInstanceBean(Object body) {
		return newInstanceBean(this.getClass(), body);
	}

}
