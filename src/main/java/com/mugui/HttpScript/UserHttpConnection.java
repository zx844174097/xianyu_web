package com.mugui.HttpScript;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class UserHttpConnection {
	public HttpURLConnection connection;

	public UserHttpConnection(URL url) throws IOException {
		connection = (HttpURLConnection) url.openConnection();
		connection.setDoInput(true);
		connection.setDoOutput(true);
		connection.setUseCaches(false);
		connection.setRequestMethod("POST");
		connection.setRequestProperty("Accept", "application/json, text/javascript, */*; q=0.01");
		connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		connection.setRequestProperty("Origin", "http://question.clifelong.com");
		connection.setRequestProperty("Referer", "http://question.clifelong.com/index");
		connection.setRequestProperty("User-Agent",
				"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/6.2.3964.2 Safari/537.36");
		requestMap = connection.getRequestProperties();

	}

	public void setDoOutput(Boolean bool) {
		connection.setDoOutput(bool);
	}

	public void setDoInput(Boolean bool) {
		connection.setDoOutput(bool);
	}

	public Map<String, List<String>> requestMap = null;

	public Map<String, List<String>> getRequestPropertys() {

		return requestMap;
	}

	public void setRequestProperty(String key, String value) {
		connection.setRequestProperty(key, value);
		requestMap = connection.getRequestProperties();

	}

	public void send(String string) throws IOException {
		OutputStream outputStream = connection.getOutputStream();
		outputStream.write(string.toString().getBytes(Charset.forName("UTF-8")));
		outputStream.flush();
		outputStream.close(); 
	}

	public int getResponseCode() throws IOException {
		return connection.getResponseCode();
	}

	public String accpet() throws IOException {
		InputStream inputStream = connection.getInputStream();
		InputStreamReader reader = new InputStreamReader(inputStream);
		BufferedReader reader2 = new BufferedReader(reader);
		String data = "";
		String string = null;
		while ((string = reader2.readLine()) != null) {
			data += string;
		}

		inputStream.close();
		return data;
	}

	public String getErr() throws IOException {

		requestMap = getRequestPropertys();
		Set<Entry<String, List<String>>> set = requestMap.entrySet();
		for (Entry<String, List<String>> list : set) {
			System.out.print(list.getKey() + ":");
			List<String> list2 = list.getValue();
			for (String str : list2) {
				System.out.print(str);
			}
			System.out.println();
		}
		InputStream inputStream = connection.getErrorStream();
		InputStreamReader reader = new InputStreamReader(inputStream);
		BufferedReader reader2 = new BufferedReader(reader);
		String data = "";
		String string = null;
		while ((string = reader2.readLine()) != null) {
			data += string;
		}
		inputStream.close();
		return data;
	}

	public HttpURLConnection getConnection() {
		return connection;
	}

}
