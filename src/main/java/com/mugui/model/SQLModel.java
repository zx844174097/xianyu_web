/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.DB.SqlServer;
import com.mugui.DB.TableMode;
import com.mugui.http.Bean.CityBean;
import com.mugui.http.Bean.LogsBean;
import com.mugui.http.Bean.MoneyLogBean;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.Bean.TimeMoneyBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.Bean.UserTimeBean;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.tool.Other;

import java.lang.reflect.Method;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class SQLModel {
	public static boolean isMail(String mail) {
		TableMode tm = new SqlServer().select("isMail", new String[] { mail });

		return ((tm != null) && (tm.getRowCount() > 0));
	}

	public static boolean reg(UserBean userBag) {
		return new SqlServer().update("regUser", new String[] { userBag.getUser_mail(), userBag.getUser_passwd() });
	}

	public static boolean login(UserBean userBag) {
		TableMode tm = new SqlServer().select("loginUser", new String[] { userBag.getUser_mail(), userBag.getUser_passwd() });

		return ((tm != null) && (tm.getRowCount() > 0));
	}

	public static Integer getUserTime(String mail) {
		TableMode tm = new SqlServer().select("userTime", new String[] { mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.valueOf(Integer.parseInt(tm.getValueAt(0, 0)));
		return Integer.valueOf(0);
	}

	public static int getDyTime(String mail) {
		TableMode tm = new SqlServer().select("userDyTime", new String[] { mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.parseInt(tm.getValueAt(0, 0));
		return 0;
	}

	public static int getQpTime(String mail) {
		TableMode tm = new SqlServer().select("userQpTime", new String[] { mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.parseInt(tm.getValueAt(0, 0));
		return 0;
	}

	public static int getDsTime(String user_mail) {
		TableMode tm = new SqlServer().select("userDsTime", new String[] { user_mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.parseInt(tm.getValueAt(0, 0));
		return 0;
	}

	public static int getJgTime(String user_mail) {
		TableMode tm = new SqlServer().select("userJgTime", new String[] { user_mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.parseInt(tm.getValueAt(0, 0));
		return 0;
	}

	public static int getMyTime(String user_mail) {
		TableMode tm = new SqlServer().select("userMyTime", new String[] { user_mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.parseInt(tm.getValueAt(0, 0));
		return 0;
	}

	public static int getLjTime(String user_mail) {
		TableMode tm = new SqlServer().select("userLjTime", new String[] { user_mail });
		if ((tm != null) && (tm.getRowCount() > 0))
			return Integer.parseInt(tm.getValueAt(0, 0));
		return 0;
	}

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

	public static boolean addUserName(UserBean userBean) {
		return new SqlServer().update("add_user_name", new String[] { userBean.getUser_mail(), userBean.getUser_name() });
	}

	public static UserBean getUserBean(UserBean userBag) {
		TableMode tm = new SqlServer().select("get_user_one", new String[] { userBag.getUser_mail() });
		return ((UserBean) getJsonObject(tm, 0, userBag.getClass()));
	}

	public static boolean saveSnakeMark(UserBean userBean) {
		return new SqlServer().update("save_snake_mark", new String[] { userBean.getUser_snake_mark(), userBean.getUser_mail() });
	}

	public static JSONArray snakeMarkAll() {
		TableMode tm = new SqlServer().select("snake_mark_all");
		return getObjectBean(tm, UserBean.class);
	}

	public static boolean updateUserPawd(UserBean userBag) {
		TableMode user = new SqlServer().select("select_user", new String[] { userBag.getUser_mail() });
		if (user == null)
			return false;
		if (user.getRowCount() <= 0)
			return false;
		String[] strings = new String[user.getColumnCount() - 2];
		for (int i = 1; i < user.getColumnCount() - 1; ++i) {
			strings[(i - 1)] = user.getValueAt(0, i);
		}
		strings[1] = userBag.getUser_passwd();
		if (new SqlServer().update("delete_user", new String[] { userBag.getUser_mail() })) {
			return new SqlServer().update("add_user", strings);
		}
		return false;
	}

	public static int SaveUserLoginCity(UserBean userBag, TcpSocketUserBean tcpsocket) {
		int state = 0;
		UserBean userBean = getUserBean(userBag);
		if (userBean == null)
			return state;
		if (userBag.getUser_sequence() != null && !userBag.getUser_sequence().trim().equals("")) {
			if (userBean.getUser_sequence() == null || userBean.getUser_sequence().equals("")) {
				UpdateUserInfo(userBag);
			} else {
				if (userBean.getUser_sequence().equals(userBag.getUser_sequence())) {

				} else {
					if (tcpsocket.getUserData("login_code") != null) {
						UpdateUserInfo(userBag);
					} else
						state = 1;
				}
			}
		}
		// 保存登录的城市
		String address = null;
		try {
			address = Other.getAddresses("ip=" + tcpsocket.getServerHost(), "utf-8");
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (address == null) {
			return state;
		}
		JSONObject object = JSONObject.fromObject(address);
		object = object.getJSONObject("data");
		if (object == null) {
			return state;
		}
		CityBean city = CityBean.newInstanceBean(CityBean.class, object);
		if (city.getCountry() != null && city.getRegion() != null && city.getCity() != null) {

		} else {
			return state;
		}
		city.setMail(userBag.getUser_mail());
		// 得到
		JSONArray array = getUserCityAll(city);
		Iterator<JSONObject> iterator = array.iterator();
		int n = 0;
		while (iterator.hasNext()) {
			JSONObject object2 = iterator.next();
			CityBean tempBean = CityBean.newInstanceBean(CityBean.class, object2);
			if (tempBean.getCountry() != null && tempBean.getCountry().equals(city.getCountry()) && tempBean.getRegion() != null
					&& tempBean.getRegion().equals(city.getRegion()) && tempBean.getCity() != null && tempBean.getCity().equals(city.getCity())) {
				city.setId(tempBean.getId());
				break;
			}
			n++;
		}
		if (state == 1 && n >= 4) {
			state = -1;
			return state;
		}
		if (city.getId() > -1) {
			UpdateUserCityOne(city);
			// state = 0;
		} else {
			SaveUserCityOne(city);
		}
		return state;
	}

	private static boolean UpdateUserInfo(UserBean userBag) {
		return new SqlServer().update("UpdateUserInfo",
				new String[] { userBag.getUser_pc_win(), userBag.getUser_pc_name(), userBag.getUser_sequence(), userBag.getUser_mail() });

	}

	private static boolean SaveUserCityOne(CityBean city) {
		return new SqlServer().update("SaveUserCityOne",
				new String[] { city.getMail(), city.getCountry(), city.getRegion(), city.getCity(), city.getCounty(), city.getIp() });
	}

	private static boolean UpdateUserCityOne(CityBean city) {
		return new SqlServer().update("UpdateUserCityOne",
				new String[] { city.getMail(), city.getCountry(), city.getRegion(), city.getCity(), city.getCounty(), city.getIp(), city.getId() + "" });
	}

	private static JSONArray getUserCityAll(CityBean city) {
		TableMode tm = new SqlServer().select("get_user_city_all", city.getMail());
		return getObjectBean(tm, CityBean.class);
	}

	public static String getUserName(UserBean userBag) {
		UserBean bean = getUserBean(userBag);
		if (bean == null)
			return null;
		return bean.getUser_name();
	}

	public static UserTimeBean getUserTimerBean(UserTimeBean bean) {
		TableMode tm = new SqlServer().select("get_user_time", bean.getMail());
		return (UserTimeBean) getJsonObject(tm, 0, UserTimeBean.class);
	}

	// UPDATE `jiaoben`.`user` SET `Qptime`=?, `Dstime`=?, `Jgtime`=?,
	// `Mytime`=?, `Ljtime`=?, `time`=? WHERE `mail`=? and state="*";
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	public static boolean updateUserTimeBean(UserTimeBean bean) {
		// 2018-01-30 23:18:51
		return new SqlServer().update("update_user_time", bean.getQptime() + "", bean.getDstime() + "", bean.getJgtime() + "", bean.getMytime() + "",
				bean.getLjtime() + "", bean.getTime() + "", sdf.format(new Date(System.currentTimeMillis())), bean.getMail());
	}

	public static boolean writeMoneyLog(MoneyLogBean logBean) {
		return new SqlServer().update("write_money_log", logBean.getMail(), logBean.getMoney(), logBean.getInput(), logBean.getOutput(), logBean.getRemark());
	}

	public static String getCdk(String ckd) {
		TableMode tm = new SqlServer().select("get_cdk", ckd);
		return tm.getValueAt(0, 0);
	}

	public static boolean addCdk(String ckd, long currentTimeMillis, String user_mail) {
		return new SqlServer().update("add_cdk", user_mail, ckd, currentTimeMillis);
	}

	public static void addLogs(LogsBean logsBean) {

	}

	public static OrderBean getOrderOne(OrderBean orderBean) {
		TableMode mode = new SqlServer().select("select_order", orderBean.getCode());
		return (OrderBean) getJsonObject(mode, 0, OrderBean.class);
	}

	public static boolean updataOrderState(OrderBean orderBean) {
		return new SqlServer().update("update_order_state", orderBean.getState(), orderBean.getCode());
	}

	public static boolean addOrder(OrderBean orderBean) {
		return new SqlServer().update("add_order", orderBean.getcreateSqlArray());
	}

	public static OrderBean getNotFinishOrder(String mail) {
		TableMode mode = new SqlServer().select("get_not_finish_order", mail);
		return (OrderBean) getJsonObject(mode, 0, OrderBean.class);
	}

	public static TimeMoneyBean getTimeMoneyBean(TimeMoneyBean moneyBean) {
		TableMode mode = new SqlServer().select("select_time_money", moneyBean.getName());
		return (TimeMoneyBean) getJsonObject(mode, 0, TimeMoneyBean.class);
	}

}