package com.mugui.HttpScript;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;

public class PostHTTP {
	public final static void postMessage(HashMap<String, String> data) {

	}

	public final static String getURLData(URL url) {
		String data="";
		try {
			HttpURLConnection connection=(HttpURLConnection) url.openConnection();
			if(connection.getResponseCode()==HttpURLConnection.HTTP_OK) {
				System.out.println(HttpURLConnection.HTTP_OK);
				
				InputStream inputStream=connection.getInputStream();
				InputStreamReader reader=new InputStreamReader(inputStream);
				BufferedReader reader2=new BufferedReader(reader);
				String string=null;
				while((string=reader2.readLine())!=null) {
					data+=string;
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return data;
	}

	public final static String getURLData(String url) {
		try {
			return getURLData(new URL(url));
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return null;
	}
}
