/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.MAIN;

import com.mugui.DB.FileRead;
import com.mugui.http.tcp.TcpSocketPrivateMap;
import com.mugui.http.tcp.TcpSocketServer;
import com.mugui.http.udp.UDPSocket;
import com.mugui.tool.Other;

import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintStream;
import java.util.Date;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class MAIN implements ServletContextListener {
	public static String JARFILEPATH = null;
	public static TcpSocketServer tcpSocketServer = null;
	public static UDPSocket udpSocket = null;
	public static UDPSocket udpSocket2 = null;

	public void contextDestroyed(ServletContextEvent sce) {
		com.mugui.http.DataSave.delSocketAll();
		TcpSocketPrivateMap.clearTcpSocketAllUser();
		if (tcpSocketServer != null)
			tcpSocketServer.Stop();
		if (udpSocket != null)
			udpSocket.close();
		if (udpSocket2 != null)
			udpSocket2.close();
		if (outputStream != null)
			try {
				outputStream.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		object.notifyAll();
		System.out.println("关闭脚本");
	}

	static DataOutputStream outputStream = null;
	static Object object = new Object();
	static boolean bool = false;

	private synchronized static void init() {
		File file = new File(JARFILEPATH + "/log.txt");
		if (file.isFile()) {
			file.delete();
		}
		file = new File(JARFILEPATH + "/log");
		if (!file.isDirectory()) {
			file.mkdirs();
		}
		file.list(new FilenameFilter() {
			@Override
			public boolean accept(File dir, String name) {
				String s[] = name.split("_");
				s = s[1].split("\\.");
				long time = Long.parseLong(s[0]);
				if (System.currentTimeMillis() - time > 3 * 24 * 60 * 60 * 1000) {
					new File(dir.getPath() + "\\" + name).delete();
				}
				return false;
			}
		});
		try {
			if (outputStream == null) {
				synchronized (object) {
					if (!bool) {
						bool = true;
						outputStream = new DataOutputStream(new FileOutputStream(new File(JARFILEPATH + "/log/log_" + System.currentTimeMillis() + ".txt")));
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			if (outputStream != null) {
				try {
					outputStream.close();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
	}

	public void contextInitialized(ServletContextEvent sce) {
		JARFILEPATH = sce.getServletContext().getRealPath(File.separator);
		FileRead.Init(JARFILEPATH);
		TcpSocketPrivateMap.setOutTime(15 * 60 * 1000);
		TcpSocketPrivateMap.setOwnCode(Other.getShortUuid());
		tcpSocketServer = new TcpSocketServer(5100);
		tcpSocketServer.start();
		// udpSocket = new UDPSocket(8892, new HsUdpHandle());
		// udpSocket2 = new UDPSocket(8893, new HsUdpHandle());
		System.out.println("启动脚本");
		init();   
		System.setOut(new PrintStream(outputStream));
		System.setErr(new PrintStream(outputStream));  
		System.setOut(new PrintStream(System.out) {
			@Override
			public void println(String x) {
				super.print(new Date(System.currentTimeMillis()).toLocaleString() + ":" + x + "\r\n");
			}
		});  
	}
}