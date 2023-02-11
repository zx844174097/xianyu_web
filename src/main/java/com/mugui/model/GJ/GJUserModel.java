package com.mugui.model.GJ;

import java.io.PrintWriter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import javax.servlet.http.HttpSession;

import com.alipay.util.UtilDate;
import com.mugui.http.Bean.InfoBean;
import com.mugui.http.Bean.JsonBean;
import com.mugui.http.Bean.OrderBean;
import com.mugui.http.Bean.TimeMoneyBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.http.Bean.GJ.GJUserTimeBean;
import com.mugui.http.pack.HTTPBag;
import com.mugui.tool.Other;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class GJUserModel {
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
		GJUserTimeBean bean = GJUserTimeBean.newInstanceBean(GJUserTimeBean.class, bag.getBody());
		if (bean == null) {
			sendError(bag, "数据解析错误", writer);
			return;
		}
		if (!Other.isMailString(bean.getMail())) {
			sendError(bag, "错误的mail，以禁止该ip对服务器的访问", writer);
			return;
		}
		String mailString = bean.getMail();
		UserBean user = new UserBean();
		user.setUser_mail(bean.getMail());
		String name = com.mugui.model.SQLModel.getUserName(user);
		if (name == null) {
			sendError(bag, "查询：" + mailString + "失败，请确认盒子邮箱正确", writer);
			return;
		}
		GJUserTimeBean temp = SQLModel.getUserTimerBean(bean);
		if (temp == null) {
			bean.setDytime("0,0");
			SQLModel.addUserTimeBean(bean);
			temp = bean;
		}
		bean = temp;
		sendBean(bag, bean.toJsonObject(), writer);
	}

	public void addOrder(HTTPBag bag, PrintWriter writer, HttpSession httpSession) {
		// 数据合法判断
		GJUserTimeBean bean = GJUserTimeBean.newInstanceBean(GJUserTimeBean.class, bag.getBody());
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
			sendError(bag, "金额检测未通过，请检查自己提交的天数", writer);
			return;
		}
		System.out.println("订单信息:" + bean.toString());
		// 计算金额
		int money = getFillTimeMoney(bean);
		if (money <= 0) {
			sendError(bag, "金额检测未通过，请检查自己提交的天数", writer);
			return;
		}
		System.out.println("订单金额:" + money);
		// 向数据库搜索是否有未完成的订单，并提醒用户是否重新提交
		OrderBean notFinishBean = SQLModel.getNotFinishOrder(bean.getMail());
		if (notFinishBean != null) {
			String[] input = notFinishBean.getInput().split("\\|");
			if (input.length == 2) {
				if (input[0].equals(GJUserTimeBean.class.getName())) {
					bean = GJUserTimeBean.newInstanceBean(GJUserTimeBean.class, input[1]);
					sendInfo(bag, InfoBean.USER_NOT_ORDER, "发现有未完成的订单,请先支付未完成订单", bean.toJsonObject(), writer);
					httpSession.setAttribute("order_code", notFinishBean.getCode());
					return;
				}
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

	private GJUserTimeBean getFillUserTime(GJUserTimeBean bean) {
		GJUserTimeBean bean2 = SQLModel.getUserTimerBean(bean);
		if (bean2 == null)
			return null;
		Field fields[] = bean.getClass().getDeclaredFields();
		boolean bool = false;
		for (Field f : fields) {
			try {
				StringBuilder nameString = new StringBuilder(f.getName());
				if (nameString.charAt(0) > 'Z') {
					nameString.replace(0, 1, (char) (nameString.charAt(0) - 'z' + 'Z') + "");
				}
				Method getMethod = bean.getClass().getMethod("get" + nameString);
				String[] temp = ((String) getMethod.invoke(bean2)).split(",");
				if (temp.length != 2) {
					continue;
				}
				long chongzhi = Long.parseLong((String) getMethod.invoke(bean)) * 24 * 60 * 60 * 1000;
				if (chongzhi > 0) {
					bool = true;
				} else {
					continue;
				}
				long now = System.currentTimeMillis();
				long end = Long.parseLong(temp[1]);
				long shengyu = end - now;
				if (shengyu < 0) {
					shengyu = 0;
				}
				if (shengyu + chongzhi > 9999l * 24 * 60 * 60 * 1000l) {
					return null;
				}

			} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
				e.printStackTrace();
			}
		}
		if (!bool)
			return null;
		return bean;
	}

	private int getFillTimeMoney(GJUserTimeBean bean) {
		Field fields[] = bean.getClass().getDeclaredFields();
		int money = 0;
		for (Field f : fields) {
			if (!f.getName().equals("mail"))
				try {
					StringBuilder nameString = new StringBuilder(f.getName());

					if (nameString.charAt(0) > 'Z') {
						nameString.replace(0, 1, (char) (nameString.charAt(0) - 'z' + 'Z') + "");
					}
					Method getMethod = bean.getClass().getMethod("get" + nameString);

					int v = Integer.parseInt(getMethod.invoke(bean).toString());
					while (v > 0) {
						TimeMoneyBean timemoneybean = new TimeMoneyBean();
						timemoneybean.setName("GJ_" + f.getName());
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

				} catch (IllegalArgumentException | IllegalAccessException | NoSuchMethodException | SecurityException | InvocationTargetException e) {
					e.printStackTrace();
				}

		}
		return money;
	}

	// 时间转换成剩余天数
	// private int timeToDay(String zeroTimes, int nowTime) {
	// return 0;
	// }

	public boolean updateUserTimes(GJUserTimeBean bean) {
		if (bean == null)
			return false;
		GJUserTimeBean bean2 = SQLModel.getUserTimerBean(bean);
		Field fields[] = bean.getClass().getDeclaredFields();
		for (Field f : fields) {
			if (f.getName().equals("mail"))
				continue;
			try {
				StringBuilder nameString = new StringBuilder(f.getName());
				if (nameString.charAt(0) > 'Z') {
					nameString.replace(0, 1, (char) (nameString.charAt(0) - 'z' + 'Z') + "");
				}
				Method getMethod = bean2.getClass().getMethod("get" + nameString);
				String[] temp = ((String) getMethod.invoke(bean2)).split(",");
				if (temp.length != 2) {
					continue;
				}
				long chongzhi = Long.parseLong(getMethod.invoke(bean).toString()) * 24 * 60 * 60 * 1000;
				long now = System.currentTimeMillis();
				long end = Long.parseLong(temp[1]);
				long shengyu = end - now;
				if (shengyu < 0) {
					shengyu = 0;
				}
				shengyu += chongzhi;
				long time = System.currentTimeMillis();
				bean2.setDytime(time + "," + (time + shengyu));
			} catch (Exception e) {
				e.printStackTrace();
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
