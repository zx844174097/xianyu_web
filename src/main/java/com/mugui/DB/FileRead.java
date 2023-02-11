/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.DB;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

public class FileRead {
	private static String ROOT_PATH= null;
	private static ConcurrentHashMap<String, ConcurrentHashMap<String, String>> sqlStatements = null;
	
	public  static void Init(String root_path) {
		ROOT_PATH = root_path;
	}
	protected String configUrl="config.str";
	 long time = System.currentTimeMillis();

	public  synchronized String configLoad(String con) {
		if (sqlStatements == null) {
			sqlStatements = new ConcurrentHashMap<String, ConcurrentHashMap<String, String>>();
		}
		ConcurrentHashMap<String, String> map;
		if((map=sqlStatements.get(configUrl))==null){
			map=new ConcurrentHashMap<String, String>();
			sqlStatements.put(configUrl, map);
		}
		String sqlString = null;
		if (System.currentTimeMillis() - time < 60 * 1000 * 5 && (sqlString = map.get(con)) != null) {
			return sqlString;
		}
		time = System.currentTimeMillis();
		String s = null;
		String[] ss = new String[2];
		FileReader fr = null;
		BufferedReader br = null;
		try {
			fr = new FileReader(new File(ROOT_PATH + "/WEB-INF/"+configUrl));
			br = new BufferedReader(fr);
			while ((s = br.readLine()) != null) {
				ss = s.split(":");
				if (ss.length == 2){
					map.put(ss[0].trim(), ss[1]);
					if (ss[0].trim().equals(con))
						return ss[1];
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (br != null)
					br.close();
				if (fr != null)
					fr.close();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
		}
		return null;
	}
}