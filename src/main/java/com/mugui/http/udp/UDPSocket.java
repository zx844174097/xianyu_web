package com.mugui.http.udp;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.IOException;
import java.net.DatagramPacket;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.concurrent.LinkedBlockingDeque;

import net.sf.json.JSONObject;

import com.mugui.http.tcp.Bag;
import com.mugui.tool.HttpTool;
import com.mugui.tool.Other;

public class UDPSocket extends Thread {
	private UDPServer server = null;
	private UdpHandle tcpHandle = null;

	public UDPServer getServer() {
		return server;
	}

	public UDPSocket(int port) {
		this(port, null);

	}

	public UDPSocket() {
		this(-1);
	}

	public UDPSocket(int port, UdpHandle tcpHandle) {
		this(port, tcpHandle, null);
	}

	public UDPSocket(int port, UdpHandle tcpHandle, Bag bag) {
		server = new UDPServer(port);
		receive();
		this.tcpHandle = tcpHandle;
	}

	private void receive() {
		new Thread(new Runnable() {
			// 创建一个用于接收的
			public void run() {
				isTrue = true;
				udpAccpetThreadsSIze = 0;
				while (server.isClose() && isTrue) {
					try {
						DatagramPacket dPacket = new DatagramPacket(new byte[1024], 1024);
						dPacket = server.receive(dPacket);
						if (dPacket == null)
							continue;
						UDPAccpetThread thread = null;
						while ((thread = udpAccpetThreads.pollFirst()) == null) {
							if (udpAccpetThreadsSIze < 50) {
								thread = new UDPAccpetThread();
								thread.start();
								break;
							} else {
								Other.sleep(50);
							}
						}
						udpAccpetThreadsSIze++;
						thread.setDPacket(dPacket);
					} catch (Exception e) {
						e.printStackTrace();
					}

				}
			}
		}).start();
	}

	LinkedBlockingDeque<UDPAccpetThread> udpAccpetThreads = new LinkedBlockingDeque<UDPAccpetThread>();
	int udpAccpetThreadsSIze = 0;
	private boolean isTrue = false;

	class UDPAccpetThread extends Thread {
		private DatagramPacket dPacket = null;
		private Object sem = new Object();

		public void close() {
			isTrue = false;
		}

		public void setDPacket(DatagramPacket dPacket) {
			synchronized (sem) {
				this.dPacket = dPacket;
				sem.notifyAll();
			}
		}

		private void byteArraysHandle() throws IOException {
			int j = dq_len;
			int len = 0;
			while (data[dq_len++] != '<') {
				len++;
			}
			String bag_id = new String(data, j, len, "UTF-8");
			dq_len += body.length - 1;
			bag.setByteArrays(bag_id, Arrays.copyOfRange(data, dq_len, data.length));
		}

		private void stringHandle() throws IOException {
			bag.setJsonObject(JSONObject.fromObject(new String(data, dq_len, data.length - dq_len, "UTF-8")));
		}

		@Override
		public void run() {
			while (isTrue) {
				try {
					synchronized (sem) {
						while (dPacket == null && isTrue) {
							sem.wait();
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				if (!isTrue)
					return;
				byte[] data = dPacket.getData();
				Accpet(data, dPacket);
				dPacket = null;
				try {
					udpAccpetThreads.putLast(UDPAccpetThread.this);
					udpAccpetThreadsSIze--;
				} catch (InterruptedException e) {
					e.printStackTrace();
				}

			}

		}

		private byte[] tou = new byte[64];
		private DataInputStream ois = null;
		private byte[] data = null;
		private Bag bag = null;
		int dq_len = 0;

		public void Accpet(byte[] body, DatagramPacket dPacket) {
			ois = new DataInputStream(new ByteArrayInputStream(body));
			try {
				byte[] bodylen = new byte[4];
				ois.readFully(bodylen);
				int data_len = Other.byteArrayint(bodylen);
				if (data_len < 5 || data_len > 8192*10) {
					return;
				}
				data = new byte[data_len];
				ois.readFully(data);
				dq_len = 0;
				if (data[dq_len++] != '<')
					return;
				byte b = data[dq_len++];
				boolean isTrue = true;
				int len = 0;
				if (b == 'S') {
					for (int j = 2; j < string.length; j++) {
						if (data[dq_len++] != string[j])
							isTrue = false;
					}
					if (!isTrue)
						return;
					len = 0;
					while ((tou[len++] = data[dq_len++]) != '<')
						;
					len--;
					String s = new String(tou, 0, len, "UTF-8");
					bag = (Bag) Class.forName(s).newInstance();
					dq_len++;
					dq_len++;
					stringHandle();
				} else if (b == 'B') {
					if (!new String(data, dq_len, 10, "utf-8").equals("yteArrays>")) {
						return;
					}
					dq_len += 10;
					len = dq_len;
					for (; dq_len < data_len; dq_len++) {
						if (data[dq_len] == '<') {
							if (data[dq_len + 1] == '|' && data[dq_len + 2] == '>') {
								break;
							}
						}
					}
					bag = (Bag) Class.forName(new String(data, len, dq_len - len, "utf-8")).newInstance();
					dq_len += 3;
					byteArraysHandle();
				}
				bag.setHost(dPacket.getAddress().getHostAddress());
				bag.setPort(dPacket.getPort());
				tcpHandle.getClass().newInstance().manage(bag, UDPSocket.this);
				return;
			} catch (Exception e) {
				e.printStackTrace();
			}
			return;
		}
	}

	private final static byte[] body = "<body>".getBytes();
	private final static byte[] string = Bag.String.getBytes();

	public synchronized void send(byte[] b, String host, int port) {
		DatagramPacket dPacket = new DatagramPacket(new byte[b.length], b.length);
		dPacket.setAddress(HttpTool.getInetAddress(host));
		dPacket.setPort(port);
		dPacket.setData(b);
		server.send(dPacket);
	}

	public void Send(Bag bag) {
		try {
			byte[] b = bag.toString().getBytes(Charset.forName("UTF-8"));
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			out.write(Other.intToByteArray(b.length));
			out.write(b);
			send(out.toByteArray(), bag.getHost(), bag.getPort());
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void SendByteArrays(Bag bag) {
		try {
			byte b[] = bag.toByteArrays();
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			out.write(Other.intToByteArray(b.length));
			out.write(b);
			send(out.toByteArray(), bag.getHost(), bag.getPort());
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public void close() {
		isTrue = false;
		if (server != null)
			server.close();
	}

	public boolean isClose() {
		return server.isClose();
	}
}
