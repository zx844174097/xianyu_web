package com.mugui.model;

import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpSession;

import com.alipay.util.UtilDate;
import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.Bean.TimeMoneyBean;
import com.mugui.http.Bean.UserTimeBean;
import com.mugui.http.Bean.GJ.GJUserTimeBean;
import com.mugui.http.GJ.GJUserHandle;
import com.mugui.http.pack.HTTPBag;
import com.mugui.tool.Other;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class UserModel {
	private void sendOutLoginError(HTTPBag bag, PrintWriter writer) {
		InfoBean info = new InfoBean();
		info.setId(InfoBean.OUT_LOGIN_ERROR);
		info.setInfo("登录信息已过期！");
		sendBean(bag, info, writer);
		return;
	}

	private String sendError(HTTPBag bag, String error, PrintWriter writer) {
		return sendError(bag, error, null, writer);
	}

	private String sendError(HTTPBag bag, String message, Object object, PrintWriter writer) {
		return sendInfo(bag, InfoBean.ERROR, message, object, writer);
	}

	private String sendSuccess(HTTPBag bag, String success, PrintWriter writer) {
		return sendInfo(bag, InfoBean.SUCCESS, success, null, writer);
	}

	private String sendSuccess(HTTPBag bag, String success, JSONObject jsonObject, PrintWriter writer) {
		return sendInfo(bag, InfoBean.SUCCESS, success, jsonObject, writer);
	}

	private String sendInfo(HTTPBag bag, String infotype, String success, Object jsonObject, PrintWriter writer) {
		InfoBean info = new InfoBean();
		info.setId(infotype);
		info.setInfo(success);
		if (jsonObject != null)
			info.setBody(jsonObject);
		return sendBean(bag, info, writer).toString();
	}

	private void sendBean(HTTPBag bag, JSONArray jsonArray, PrintWriter writer) {
		bag.setBody(jsonArray);
		sendBean(bag, writer);
	}

	private void sendBean(HTTPBag bag, JSONObject jsonObject, PrintWriter writer) {
		bag.setBody(jsonObject);
		sendBean(bag, writer);
	}

	private JsonBean sendBean(HTTPBag bag, JsonBean bean, PrintWriter writer) {
		sendBean(bag, bean.toJsonObject(), writer);
		return bean;
	}

	private void sendBean(HTTPBag bag, PrintWriter writer) {
		writer.append(bag.toString());
	}

	// private void addLogs(int type, String userid, String bag_id, String info,
	// String result) {
	// SQLModel.addLogs(new LogsBean(type, userid, bag_id, info, result));
	// }
	private final static String HTTP_VERSION = "v1.0";

	// 版本号判断
	public boolean isVersion(HTTPBag bag, PrintWriter writer) {
		if (bag == null)
			return false;
		if (bag.getVersion() == null)
			return false;
		if (!bag.getVersion().trim().equals(HTTP_VERSION)) {
			sendError(bag, "校验码错误，以禁止该ip对服务器的访问", writer);
			return false;
		}
		return true;
	}

	public void selectUserTime(HTTPBag bag, PrintWriter writer) {
		UserTimeBean bean = UserTimeBean.newInstanceBean(UserTimeBean.class, bag.getBody());
		if (bean == null) {
			sendError(bag, "数据解析错误", writer);
			return;
		}
		if (!Other.isMailString(bean.getMail())) {
			sendError(bag, "错误的mail，以禁止该ip对服务器的访问", writer);
			return;
		}
		String mailString = bean.getMail();
		bean = SQLModel.getUserTimerBean(bean);
		if (bean == null) {
			sendError(bag, "查询：" + mailString + "失败，请确认盒子邮箱正确", writer);
			return;
		}
		sendBean(bag, bean.toJsonObject(), writer);
	}

	public void addOrder(HTTPBag bag, PrintWriter writer, HttpSession httpSession) {
		// 数据合法判断
		UserTimeBean bean = UserTimeBean.newInstanceBean(UserTimeBean.class, bag.getBody());
		if (bean == null) {
			sendError(bag, "数据解析错误", writer);
			return;
		}
		if (!Other.isMailString(bean.getMail())) {
			sendError(bag, "邮箱格式不正确,已禁止该ip对服务器的访问", writer);
			return;
		}
		// 判断所有的时间添加都是合法的
		bean = getFillUserTime(bean);
		if (bean == null) {
			sendError(bag, "充值天数检测未通过，已禁止该ip对服务的访问", writer);
			return;
		}
		System.out.println("订单信息:" + bean.toString());
		// 计算金额
		int money = getFillTimeMoney(bean);
		if (money < 7) {
			sendError(bag, "金额计算发生错误，请重试，或检查提交的天数数据", writer);
			return;
		} 
		// 向数据库搜索是否有未完成的订单，并提醒用户是否重新提交
		OrderBean notFinishBean = SQLModel.getNotFinishOrder(bean.getMail());
		if (notFinishBean != null) {
			String[] input = notFinishBean.getInput().split("\\|");
			if (input.length == 2) {
				if (input[0].equals(UserTimeBean.class.getName())) {
					bean = UserTimeBean.newInstanceBean(UserTimeBean.class, input[1]);
					sendInfo(bag, InfoBean.USER_NOT_ORDER, "发现有未完成的订单,请先支付未完成订单", bean.toJsonObject(), writer);
					httpSession.setAttribute("order_code", notFinishBean.getCode());
					return;
				}  
			} else {
				bean = UserTimeBean.newInstanceBean(UserTimeBean.class, notFinishBean.getInput());
				sendInfo(bag, InfoBean.USER_NOT_ORDER, "发现有未完成的订单,请先支付未完成订单", bean.toJsonObject(), writer);
				httpSession.setAttribute("order_code", notFinishBean.getCode());
				return;
			}
		}
		// 向数据库创建一个订单
		OrderBean orderBean = new OrderBean();
		orderBean.setCode(UtilDate.getOrderNum() + Other.getVerifyCode(4));
		orderBean.setInput(bean.getClass().getName() + "|" + bean.toString());
		orderBean.setMoney(money + "");
		orderBean.setMail(bean.getMail());
		orderBean.setState(0);
		if (!SQLModel.addOrder(orderBean)) {
			sendError(bag, "订单创建失败，服务器内部发生严重错误，请联系网站管理员", writer);
			return;
		}
		sendSuccess(bag, "订单生成成功", bean.toJsonObject(), writer);
		httpSession.setAttribute("order_code", orderBean.getCode());
	}

	private int getFillTimeMoney(UserTimeBean bean) {
		Field fields[] = bean.getClass().getDeclaredFields(); 
		int money = 0;
		for (Field f : fields) {
			try {
				if (f.getType().getName().equals(int.class.getName())) {
					StringBuilder nameString = new StringBuilder(f.getName());
					if (nameString.charAt(0) > 'Z') {
						nameString.replace(0, 1, (char) (nameString.charAt(0) - 'z' + 'Z') + "");
					}
					Method getMethod = bean.getClass().getMethod("get" + nameString);
					int v = (int) getMethod.invoke(bean);
					while (v > 0) {
						TimeMoneyBean timemoneybean = new TimeMoneyBean();
						timemoneybean.setName("HS_" + f.getName());
						timemoneybean = SQLModel.getTimeMoneyBean(timemoneybean);
						if (timemoneybean == null)
							return 0;
						int temp = money;
						if (v >= 365) {
							money += timemoneybean.getYear();
							v -= 365;
						} else if (v >= 181) {
							money += timemoneybean.getHalfyear();
							v -= 181;
						} else if (v >= 91) {
							money += timemoneybean.getSeason();
							v -= 91;
						} else if (v >= 31) {
							money += timemoneybean.getMonth();
							v -= 31;
						} else if (v >= 7) {
							money += timemoneybean.getWeek();
							v -= 7;
						} else {
							money += v * timemoneybean.getDay();
							v = 0;
						}
						if (temp == money) {
							return 0;
						}
					}
				}

			} catch (IllegalArgumentException | IllegalAccessException | NoSuchMethodException | SecurityException | InvocationTargetException e) {
				e.printStackTrace();
			}

		}
		return money;
	}

	// 时间转换成剩余天数
	private int timeToDay(String zeroTimes, int nowTime) {
		// 2018-01-31 03:42:53.0
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.0");
		long temp = 0;
		Date date = null;
		try {
			date = format.parse(zeroTimes);
			date.setSeconds(0);
			date.setSeconds(0);
			date.setMinutes(0);
			date.setHours(1);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		Date date2 = new Date(System.currentTimeMillis());
		date2.setSeconds(0);
		date2.setSeconds(0);
		date2.setMinutes(0);
		date2.setHours(1);
		int time3 = (int) (date.getTime() / 1000 / 60 / 60 / 24);
		int time4 = (int) (date2.getTime() / 1000 / 60 / 60 / 24);
		int time = nowTime - time4 + time3;
		return time;
	}

	private UserTimeBean getFillUserTime(UserTimeBean bean) {
		UserTimeBean bean2 = SQLModel.getUserTimerBean(bean);
		Field fields[] = bean.getClass().getDeclaredFields();
		boolean bool = false;
		for (Field f : fields) {
			if (f.getType().getName().equals("int"))
				try {
					StringBuilder nameString = new StringBuilder(f.getName());
					if (nameString.charAt(0) > 'Z') {
						nameString.replace(0, 1, (char) (nameString.charAt(0) - 'z' + 'Z') + "");
					}
					Method getMethod = bean.getClass().getMethod("get" + nameString);
					Method setMethod = bean.getClass().getMethod("set" + nameString, int.class);
					if ((int) getMethod.invoke(bean) <= 0)
						continue;
					int temp = (int) getMethod.invoke(bean2);
					temp = timeToDay(bean2.getZTime(), temp);
					if (temp < 0)
						temp = 0;
					if ((int) temp > 9999) {
						return null;
					}
					setMethod.invoke(bean, (int) getMethod.invoke(bean) - temp);
					int day = (int) getMethod.invoke(bean);
					if (day > 9999 || day < 0) {
						return null;
					}
					if (f.getName().equals("Mytime") && day > 31) {
						return null;
					}
					if (!f.getName().equals("Dstime") && day > 0) {
						bool = true;
					}

				} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
					e.printStackTrace();
				}
		}
		if (bool) {
			bean.setDstime(0);
		} else if (bean.getDstime() == 0) {
			return null;
		}
		return bean;
	}

	public boolean updateUserTimes(UserTimeBean bean) {
		UserTimeBean bean2 = SQLModel.getUserTimerBean(bean);
		Field fields[] = bean.getClass().getDeclaredFields();
		for (Field f : fields) {
			if (f.getType().getName().equals("int"))
				try {
					StringBuilder nameString = new StringBuilder(f.getName());
					if (nameString.charAt(0) > 'Z') {
						nameString.replace(0, 1, (char) (nameString.charAt(0) - 'z' + 'Z') + "");
					}
					Method getMethod = bean2.getClass().getMethod("get" + nameString);
					Method setMethod = bean2.getClass().getMethod("set" + nameString, int.class);
					int temp = (int) getMethod.invoke(bean2);
					temp = timeToDay(bean2.getZTime(), temp);
					if (temp < 0)
						temp = 0;
					setMethod.invoke(bean2, (int) getMethod.invoke(bean) + temp);
				} catch (Exception e) {
				}
		}
		return SQLModel.updateUserTimeBean(bean2);
	}

	public boolean testFrequency(HTTPBag bag, HttpSession session, PrintWriter writer) {
		Object time = session.getAttribute("time_frequency");
		if (time == null) {
		} else if (System.currentTimeMillis() - (long) time < 3 * 1000) {
			sendError(bag, "服务器不允许过于频繁的请求,请稍后重试", writer);
			return false;
		}
		time = System.currentTimeMillis();
		session.setAttribute("time_frequency", time);
		return true;
	}

}
