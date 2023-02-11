package com.mugui.model;

import java.util.concurrent.ConcurrentHashMap;

import com.mugui.Dui.DimgFile;
import com.mugui.http.Bean.UserBean;
import com.mugui.model.FishPrice.XianluBody;
import com.mugui.model.FishPrice.YuAllBody;

public class BossModel {
	private static ConcurrentHashMap<Integer, ConcurrentHashMap<String, Object>> boss_ = new ConcurrentHashMap<Integer, ConcurrentHashMap<String, Object>>();

	public static boolean isUpdateTime(String boss_name, int line_id) {
		YuAllBody yuAllBody= FishPrice.allbody.get(line_id);
		if(yuAllBody==null) return false;
		XianluBody temp =yuAllBody.xianluBody;
		if (temp == null) 
			return false;
		int server_id = temp.server_id;
		ConcurrentHashMap<String, Object> body = boss_.get(server_id);
		if (body == null)
			return true;
		Object object = body.get(boss_name);
		if (object == null)
			return true;
		if (object instanceof DimgFile) {
			DimgFile temp3 = (DimgFile) object;
			long time = Long.parseLong(temp3.objectPRI);
			if (System.currentTimeMillis() - time > 8 * 60 * 60 * 1000) {
				return true;
			} else {
				return false;
			}
		} else {
			@SuppressWarnings("unchecked")
			ConcurrentHashMap<Integer, DimgFile> concurrentHashMap = (ConcurrentHashMap<Integer, DimgFile>) object;
			DimgFile temp3 = concurrentHashMap.get(line_id);
			if(temp3==null) return true;
			long time = Long.parseLong(temp3.objectPRI);
			if (System.currentTimeMillis() - time > 8 * 60 * 60 * 1000) {
				return true;
			} else {
				return false;
			}
		}
	}

	public static DimgFile updateTime(String boss_name, int line_id, UserBean bean) {
		int server_id = FishPrice.getLineFeature(line_id).server_id;
		ConcurrentHashMap<String, Object> body = boss_.get(server_id);
		if (body == null) {
			body = new ConcurrentHashMap<String, Object>();
			boss_.put(server_id, body);
		}
		Object object = body.get(boss_name);
		if (object == null) {
			// 根据boss_name来初始化
			object = initBossOne(boss_name);
			body.put(boss_name, object);
		}
		DimgFile temp3 = null;
		if (object instanceof DimgFile) {
			temp3 = (DimgFile) object;
		} else {
			@SuppressWarnings("unchecked")
			ConcurrentHashMap<Integer, DimgFile> concurrentHashMap = (ConcurrentHashMap<Integer, DimgFile>) object;
			temp3 = concurrentHashMap.get(line_id);
			if (temp3 == null) {
				temp3 = new DimgFile();
				concurrentHashMap.put(line_id, temp3);
			}
		}
		temp3.objectname = boss_name;
		temp3.objectPRI = System.currentTimeMillis() + "";
		temp3.objectcolor = bean.getUser_name();
		temp3.objectlevel = line_id + "";
		temp3.objecttype = server_id + "";
		return temp3;
	}

	private static String[] world_boss = { "怒贝尔", "科扎卡", "库图姆", "卡兰达" };

	private static Object initBossOne(String boss_name) {
		for (String name : world_boss) {
			if (name.equals(boss_name)) {
				return new DimgFile();
			}
		}
		return new ConcurrentHashMap<Integer, DimgFile>();
	}

	public static ConcurrentHashMap<String, Object> getAllUpdateTime(int server_id) {
		return boss_.get(server_id);
	}

}
