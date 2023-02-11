/*** Eclipse Class Decompiler plugin, copyright (c) 2016 Chen Chao (cnfree2000@hotmail.com) ***/
package com.mugui.model;

import com.mugui.MAIN.MAIN;
import com.mugui.http.Bean.FileBean;
import com.mugui.http.pack.TcpBag;
import com.mugui.http.tcp.TcpSocketUserBean;
import com.mugui.tool.Other;
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.sql.Time;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import org.apache.commons.lang.NullArgumentException;

public class FileDownModel {
	private static HashMap<String, DownloadFileThread> map = new HashMap<String, DownloadFileThread>();

	public static void startDownloadFile(TcpBag bag, TcpSocketUserBean tcpSocket) {
		FileBean bean = FileBean.newInstanceBean(FileBean.class, bag.getBody());
		String ss[] = bean.getOther_description().split(":");
		if (ss[0].trim().equals("App")) {
			File file = new File(MAIN.JARFILEPATH + "/WEB-INF/App/" + ss[1].trim() + "/" + bean.getFile_name());
			if (!(file.isFile())) {
				throw new NullArgumentException("空的目录结构:  " + file.getPath());
			}
			DownloadFileThread thread = (DownloadFileThread) map.get(file.getPath());
			if ((thread != null) && (thread.isAlive())) {
				thread.addBag(bag, tcpSocket);
			} else {
				thread = new DownloadFileThread(file, bag, tcpSocket);
				map.put(file.getPath(), thread);
				thread.start();
			}
		}
	}

	public static void reDownloadFile(TcpBag bag, TcpSocketUserBean tcpSocket) {
		FileBean bean = FileBean.newInstanceBean(FileBean.class, bag.getBody_description());
		String ss[] = bean.getOther_description().split(":");
		if (ss[0].trim().equals("App")) {
			File file = new File(MAIN.JARFILEPATH + "/WEB-INF/App/" + ss[1] + "/" + bean.getFile_name());
			if (!(file.exists()))
				return;
			DownloadFileThread thread = (DownloadFileThread) map.get(file.getPath());
			if ((thread == null) || (!(thread.isAlive()))) {
				thread = new DownloadFileThread(file, bag, tcpSocket, bag.getBody().toString().toCharArray());
				map.put(file.getPath(), thread);
				thread.start();
			} else {  
				thread.reDownFile(bag.getBody().toString().toCharArray(), bag, tcpSocket);
			}
		}
	}

	private static class DownloadFileThread extends Thread {
		private File file = null;
		private FileBean bean = null;
		private ConcurrentHashMap<Integer, ConcurrentHashMap<String, TcpSocketUserBean>> list = new ConcurrentHashMap<Integer, ConcurrentHashMap<String, TcpSocketUserBean>>();
		private boolean[] bool = null;
		private byte[] b = new byte[768];
		private RandomAccessFile randomAccessFile = null;

		public DownloadFileThread(File file, TcpBag bag, TcpSocketUserBean tcpSocket) {
			this.file = file;
			this.bean = new FileBean();
			this.bean.setFile_name(file.getName());
			this.bean.setFile_page_all_size((int) (file.length() / this.b.length) + ((file.length() % this.b.length == 0L) ? 0 : 1));
			this.bool = new boolean[this.bean.getFile_page_all_size()];
			for (int i = 0; i < this.bool.length; ++i) {
				bool[i] = false;
				ConcurrentHashMap<String, TcpSocketUserBean> linkedList = new ConcurrentHashMap<String, TcpSocketUserBean>();

				linkedList.put(bag.getBody_description().toString(), tcpSocket);
				this.list.put(i, linkedList);
			}
		}

		public DownloadFileThread(File file, TcpBag bag, TcpSocketUserBean tcpSocket, char[] body) {
			this.file = file;
			this.bean = new FileBean(); 
			this.bean.setFile_name(file.getName());
			this.bean.setFile_page_all_size((int) (file.length() / this.b.length) + ((file.length() % this.b.length == 0L) ? 0 : 1));
			this.bool = new boolean[this.bean.getFile_page_all_size()];
			for (int i = 0; i < this.bool.length; ++i)
				if (body[i] == '0') {
					this.bool[i] = false;
					ConcurrentHashMap<String, TcpSocketUserBean> linkedList = new ConcurrentHashMap<String, TcpSocketUserBean>();
					linkedList.put(bag.getBody_description().toString(), tcpSocket);
					this.list.put(i, linkedList);
				}
		}

		public void addBag(TcpBag bag, TcpSocketUserBean tcpSocket) {
			for (int i = 0; i < this.bool.length; ++i) {
				this.bool[i] = false;
				ConcurrentHashMap<String, TcpSocketUserBean> linkedList = this.list.get(i);

				linkedList.put(bag.getBody_description().toString(), tcpSocket);
			}
		}

		public void reDownFile(char[] body, TcpBag bag, TcpSocketUserBean tcpSocket) {
			// System.out.println("body_size:" + body.length);
			for (int i = 0; i < body.length; ++i)
				if (body[i] == '0') {
					this.bool[i] = false;
					ConcurrentHashMap<String, TcpSocketUserBean> linkedList = this.list.get(i);
					linkedList.put(bag.getBody_description().toString(), tcpSocket);
				}
		}

		public void run() {
			TcpBag bag = new TcpBag();
			bag.setBody_description(this.bean);
			bag.setBag_id("file_");
			try {
				this.randomAccessFile = new RandomAccessFile(this.file, "r");
				long file_length = this.file.length();
				boolean isTrue = true;
				while (isTrue) {
					isTrue = false;
					for (int i = 0; i < this.bool.length; ++i) {
						if (this.bool[i] == false) {
							isTrue = true;
							this.randomAccessFile.seek(i * this.b.length);
							this.bean.setFile_seek(i * this.b.length);
							this.bean.setFile_page_number(i);
							if (file_length - ((i + 1) * this.b.length) >= 0L) {
								this.randomAccessFile.read(this.b);
								bag.setBody(this.b);
							} else {
								int len = this.randomAccessFile.read(this.b);
								if (len < 0) {
									return;
								}
								byte[] bb = new byte[len];
								System.arraycopy(this.b, 0, bb, 0, len);
								bag.setBody(bb);
							}
							ConcurrentHashMap<String, TcpSocketUserBean> value = this.list.get(Integer.valueOf(i));
							Iterator<Entry<String, TcpSocketUserBean>> iterator2 = value.entrySet().iterator();
							while (iterator2.hasNext()) {
								Entry<String, TcpSocketUserBean> udpBag = iterator2.next();
									if (udpBag.getValue().isSocketRun()) 
										udpBag.getValue().sendByteArray(bag);
							} 
							value.clear();
							this.bool[i] = true;
						}
					}
					if (!(isTrue)) {
						long time = System.currentTimeMillis();
						while (System.currentTimeMillis()-time<5*60*1000) {
							Other.sleep(1); 
							for (int i = 0; i < this.bool.length; ++i)
								if (this.bool[i] == false) {
									isTrue = true; 
									break;
							}
							if(isTrue){
								break; 
							}
						} 
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				Iterator<Entry<Integer, ConcurrentHashMap<String, TcpSocketUserBean>>> iterator = this.list.entrySet().iterator();
				while (iterator.hasNext()) {
					((Entry<Integer, ConcurrentHashMap<String, TcpSocketUserBean>>) iterator.next()).getValue().clear();
					iterator.remove();
				}
				this.list.clear();
				if (this.randomAccessFile != null)
					try {
						this.randomAccessFile.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
			}
		}
	}
}