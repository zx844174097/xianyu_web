package com.mugui.model.GJ;

import java.lang.reflect.Method;
import com.mugui.DB.SqlServer;
import com.mugui.DB.TableMode;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.Bean.TimeMoneyBean;
import com.mugui.http.Bean.GJ.GJUserTimeBean;

import net.sf.json.JSONArray;

public class SQLModel {
	public static JSONArray getObjectBean(TableMode tm, Class<? extends Object> beanClass) {
		JSONArray jsonArray = new JSONArray();
		if (tm != null) {
			for (int j = 0; j < tm.getRowCount(); ++j)
				jsonArray.add(getJsonObject(tm, j, beanClass));
		}
		return jsonArray;
	}

	public static Object getJsonObject(TableMode tm, int j, Class<? extends Object> beanClass) {
		if (tm == null)
			return null;
		if (tm.getRowCount() <= 0)
			return null;
		Object objectBean = null;
		try {
			objectBean = beanClass.newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
			return null;
		} catch (IllegalAccessException e) {
			e.printStackTrace();
			return null;
		}
		for (int i = 0; i < tm.getColumnCount(); i++) {
			StringBuilder name = new StringBuilder(tm.getColumnName(i));
			if (name.charAt(0) < 'a' || name.charAt(0) > 'z')
				;
			else
				name.setCharAt(0, Character.toUpperCase(name.charAt(0)));
			String set = "set" + name.toString();
			String get = "get" + name.toString();
			String value = tm.getValueAt(j, i);
			if (value == null)
				continue;
			Method method = null;
			try {
				method = objectBean.getClass().getMethod(get);
			} catch (SecurityException e) {
				continue;
			} catch (NoSuchMethodException e) {
				continue;
			}
			try {
				if (method.getReturnType().getName().equals("int")) {
					method = objectBean.getClass().getMethod(set, method.getReturnType());
					method.invoke(objectBean, Integer.parseInt(value));
				} else {
					method = objectBean.getClass().getMethod(set, method.getReturnType());
					method.invoke(objectBean, value);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return objectBean;
	}

	protected static SqlServer getSqlServer() {
		return new SqlServer("GJSqlConfig.txt");
	}

	public static long getDyTime(String mail) {
		TableMode tm = getSqlServer().select("userDyTime", new String[] { mail });
		if (tm == null || tm.getValueAt(0, 0) == null)
			return 0;
		String value[] = tm.getValueAt(0, 0).split(",");
		if (value.length < 2) {
			try {
				throw new Exception("数据库数据发生严重错误:getDyTime");
			} catch (Exception e) {
				e.printStackTrace();
			}
			return -1;
		}
		long r = Long.parseLong(value[1]);
		return (r - System.currentTimeMillis());
	}

	public static GJUserTimeBean getUserTimerBean(GJUserTimeBean bean) {
		TableMode tm = getSqlServer().select("get_user_time", bean.getMail());
		return (GJUserTimeBean) getJsonObject(tm, 0, GJUserTimeBean.class);
	}

	public static OrderBean getNotFinishOrder(String mail) {
		TableMode mode = getSqlServer().select("get_not_finish_order", mail);
		return (OrderBean) getJsonObject(mode, 0, OrderBean.class);
	}

	public static boolean addOrder(OrderBean orderBean) {
		return getSqlServer().update("add_order", orderBean.getcreateSqlArray());
	}

	public static boolean updateUserTimeBean(GJUserTimeBean bean) {
		// 2018-01-30 23:18:51
		return getSqlServer().update("update_user_time", bean.getDytime(), bean.getMail());
	}

	public static boolean addUserTimeBean(GJUserTimeBean bean) {
		return getSqlServer().update("add_user_time", bean.getMail());
	}

	public static TimeMoneyBean getTimeMoneyBean(TimeMoneyBean timemoneybean) {
		TableMode mode = new SqlServer().select("select_time_money", timemoneybean.getName());
		return (TimeMoneyBean) getJsonObject(mode, 0, TimeMoneyBean.class);
	}

}
