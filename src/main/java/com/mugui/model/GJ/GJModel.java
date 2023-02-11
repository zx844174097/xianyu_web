package com.mugui.model.GJ;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

import com.mugui.MAIN.MAIN;
import com.mugui.http.Bean.DataTypeBean;
import com.mugui.http.Bean.UserBean;
import com.mugui.tool.DataClassLoader;

public class GJModel {

	private static Object getClassData(DataTypeBean bean) {
		Object bodyObject = null;
		DataClassLoader loader = null;
		try {
			URL[] urls = new URL[] { new File(MAIN.JARFILEPATH + "/WEB-INF/Data/GJ.jar").toURI().toURL() };
			loader = new DataClassLoader(urls);
			String clss = bean.getBody();
			InputStream inputStream = loader.getResourceAsStream(clss);
			System.out.println(clss); 
			if (inputStream == null) {  
				System.out.println(clss);
				return bodyObject; 
			} 
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			byte[] bs = new byte[1024];
			int len = 0;
			while ((len = inputStream.read(bs)) != -1) {
				outputStream.write(bs, 0, len);
			}
			bodyObject = outputStream.toByteArray();
			outputStream.close();
			inputStream.close(); 
			loader.clearAssertionStatus();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
		
		}
		return bodyObject;
	}

	public static Object getData(UserBean userBean, DataTypeBean bean) {
		if (bean.getType().equals(DataTypeBean.CLASS))
			return getClassData(bean);
		else if (bean.getType().equals(DataTypeBean.GET_TIME))
			return getSQLData(userBean.getUser_mail(), bean);
		return null;
	}

	private static Object getSQLData(String mail, DataTypeBean bean) {
		if (bean.getBody().equals("dy")) {
			return SQLModel.getDyTime(mail);
		}
		return null;
	}
}
