package com.mugui.tool;

import java.net.URL;
import java.net.URLClassLoader;

public class DataClassLoader extends URLClassLoader {

	public DataClassLoader(URL[] urls) {
		super(urls);
	}
	public void addJar(URL url){
		this.addURL(url); 
	}
}
