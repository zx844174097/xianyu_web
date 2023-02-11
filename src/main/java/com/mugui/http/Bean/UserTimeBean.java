package com.mugui.http.Bean;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.NumberFormat;

import net.sf.json.JSONObject;

public class UserTimeBean extends JsonBean {
	private String mail = null;
	private int Qptime = 0;
	private int Dstime = 0;
	private int Jgtime = 0;
	private int Mytime = 0;
	private int Ljtime = 0;
	private int time = 0;
	private String zTime = null;

	public UserTimeBean(JSONObject body) {
		InitBean(body);
	}

	public UserTimeBean() {
		this(null);
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public int getQptime() {
		return Qptime;
	}

	public void setQptime(int qptime) {
		Qptime = qptime;
	}

	public int getDstime() {
		return Dstime;
	}

	public void setDstime(int dstime) {
		Dstime = dstime;
	}

	public int getJgtime() {
		return Jgtime;
	}

	public void setJgtime(int jgtime) {
		Jgtime = jgtime;
	}

	public int getMytime() {
		return Mytime;
	}

	public void setMytime(int mytime) {
		Mytime = mytime;
	}

	public int getLjtime() {
		return Ljtime;
	}

	public void setLjtime(int ljtime) {
		Ljtime = ljtime;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getZTime() {
		return zTime;
	}

	public void setZTime(String zTime) {
		this.zTime = zTime;
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
						object = new Double(object.toString());
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
					// TODO 自动生成的 catch 块
					e.printStackTrace();
				} catch (SecurityException e) {
					// TODO 自动生成的 catch 块
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					// TODO 自动生成的 catch 块
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO 自动生成的 catch 块
					e.printStackTrace();
				}
			}
		}
	}

}
