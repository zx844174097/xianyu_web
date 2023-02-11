package com.mugui.http.udp;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.mugui.tool.Other;

public class UDPServer {
	private DatagramSocket dSocket = null;

	public UDPServer(int port) {
		try {
			if (port == -1)
				dSocket = new DatagramSocket();
			else
				dSocket = new DatagramSocket(port);
		} catch (SocketException e) {
			e.printStackTrace();
		}
	}

	public UDPServer() {
		this(-1);
	}

	public DatagramPacket receive(DatagramPacket dPacket) {
		try {
			byte[] b = Dreceive(dPacket);
			if (b == null)
				return null;
			int yuan_len = (b[0] & 0xff) | ((b[1] << 8) & 0xff00) | ((b[2] << 24) >>> 8) | (b[3] << 24);
			int now_len = (b[4] & 0xff) | ((b[5] << 8) & 0xff00) | ((b[6] << 24) >>> 8) | (b[7] << 24);
			byte[] now = new byte[now_len];
			System.arraycopy(b, 8, now, 0, now_len);
			byte[] yuan = new byte[yuan_len];
			yuan=Other.ZIPDecompressor(now, yuan_len);
			yuan = Other.ArrayBytesDecrypt(yuan);
			dPacket.setData(yuan);
			return dPacket;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	private byte[] Dreceive(DatagramPacket dPacket) throws IOException {
		dSocket.receive(dPacket);
		byte b[] = dPacket.getData();
		DataInputStream dataInputStream = new DataInputStream(new ByteArrayInputStream(b));
		int i = dataInputStream.readInt();
		switch (i) {
		case 0:
			ReceiveZero(dataInputStream, dPacket);
			return null;
		case 1:
			return ReceiveOne(dataInputStream, dPacket);
		case 2:
			int map_n = dataInputStream.readInt();
			MapBodyBean bean = map.remove(map_n);
			if (bean != null) {
				bean.remove2();
			}
			return null;
		}
		return null;

	}

	private void ReceiveZero(DataInputStream dataInputStream, DatagramPacket dPacket) throws IOException {
		int map_n = dataInputStream.readInt();
		int i_leng = dataInputStream.readInt();
		byte i_body[] = new byte[i_leng];
		dataInputStream.readFully(i_body);
		String string = new String(i_body, "UTF-8");
		char[] string2 = new BigInteger(string, 32).toString(2).toCharArray();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
		MapBodyBean mapBodyBean = map.get(map_n);
		for (int j = 1; j < string2.length; j++) {
			if (string2[j] == '0') {
				dataOutputStream.writeInt(1);
				dataOutputStream.writeInt(mapBodyBean.map_n);
				dataOutputStream.writeInt(mapBodyBean.size);
				dataOutputStream.writeInt(j - 1);
				byte temp[] = mapBodyBean.getBody(j - 1);
				dataOutputStream.writeInt(temp.length);
				dataOutputStream.write(temp);
				dPacket.setData(outputStream.toByteArray());
				dSocket.send(dPacket);
				dataOutputStream.flush();
				outputStream.reset();
			}
		}
	}

	private byte[] ReceiveOne(DataInputStream dataInputStream, DatagramPacket dPacket) throws IOException {
		MapBodyBean temp = new MapBodyBean(dataInputStream.readInt(), dPacket);
		MapBodyBean bean = receive_map.get(temp.map_n);
		if (bean == null) {
			bean = temp;
			receive_map.put(bean.map_n, bean);
			// 开启时间检测，判断是否是bag未接受完整
			bean.startTimeMonitor();
			temp = null;
		}
		bean.setSize(dataInputStream.readInt());
		int i = dataInputStream.readInt();
		int i_length = dataInputStream.readInt();
		byte body[] = new byte[i_length];
		dataInputStream.readFully(body);
		bean.setBody(i, body);
		if (bean.isFinish()) {
			return bean.getBodys();
		}
		return null;
	}

	public void send(DatagramPacket dPacket) {
		try {
			byte[] b = dPacket.getData();
			b = Other.ArrayBytesEncryption(b);
			byte[] bb = Other.ZIPComperssor(b);
			byte[] body = new byte[bb.length + 8];
			System.arraycopy(Other.intToByteArray(b.length), 0, body, 0, 4);
			System.arraycopy(Other.intToByteArray(bb.length), 0, body, 4, 4);
			System.arraycopy(bb, 0, body, 8, bb.length);
			Dsend(dPacket, body);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private ConcurrentHashMap<Integer, MapBodyBean> map = new ConcurrentHashMap<Integer, MapBodyBean>();
	int map_size = 0;
	private ConcurrentHashMap<Integer, MapBodyBean> receive_map = new ConcurrentHashMap<Integer, MapBodyBean>();

	class MapBodyBean {
		private HashMap<Integer, byte[]> body = new HashMap<Integer, byte[]>();
		private long time = System.currentTimeMillis();
		private int map_n = -1;
		public int size;
		boolean bool[] = null;
		private DatagramPacket dPacket = null;

		public MapBodyBean(int map_n, DatagramPacket dPacket) {
			this.map_n = map_n;
			this.dPacket = dPacket;
		}

		private Thread thread = null;
		private boolean isTrue = false;
		private ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		private DataOutputStream dataOutputStream = new DataOutputStream(outputStream);

		public void startTimeMonitor() {
			isTrue = true;
			thread = new Thread(new Runnable() {
				@Override
				public void run() {
					while (isTrue) {
						Other.sleep(5000);
						if (System.currentTimeMillis() - time > 15 * 1000) {
							isTrue = false;
							remove();
							return;
						}
						if (!isTrue)
							return;
						try {
							dataOutputStream.writeInt(0);
							dataOutputStream.writeInt(map_n);
							byte[] b = getFinishBool();
							dataOutputStream.writeInt(b.length);
							dataOutputStream.write(b);
							dPacket.setData(outputStream.toByteArray());
							dSocket.send(dPacket);
							dataOutputStream.flush();
							outputStream.reset();

						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}

				private byte[] getFinishBool() throws UnsupportedEncodingException {
					String string = "1";
					for (int i = 0; i < size; i++) {
						string += bool[i] ? 1 : 0;
					}
					return new BigInteger(string, 2).toString(32).getBytes("UTF-8");
				}
			});
			thread.start();
		}

		public MapBodyBean(byte[] body, int map_n) throws IOException {
			this.map_n = map_n;
			int size = -1;
			if (body.length % 512 == 0) {
				size = body.length / 512;
			} else
				size = body.length / 512 + 1;
			setSize(size);
			if (size == 1) {
				this.body.put(0, body);
			} else {
				ByteArrayInputStream inputStream = new ByteArrayInputStream(body);
				byte b[] = new byte[512];
				int n = 0;
				int num = 0;
				while ((n = inputStream.read(b)) != -1) {
					if (n != 512) {
						byte bb[] = new byte[n];
						System.arraycopy(b, 0, bb, 0, n);
						this.body.put(num, bb);
					} else
						this.body.put(num, b);
					b = new byte[512];
					num++;
				}
			}
		}

		public byte[] getBody(int i) {
			return body.get(i);
		}

		public long getTime() {
			return time;
		}

		public void setSize(int size) {
			this.size = size;
			if (bool == null)
				bool = new boolean[size];
		}

		public void setBody(int i, byte[] body2) {
			bool[i] = true;
			body.put(i, body2);
			time = System.currentTimeMillis();
		}

		public boolean isFinish() {
			for (boolean b : bool) {
				if (!b) {
					return b;
				}
			}
			isTrue = false;
			return true;
		}

		public byte[] getBodys() throws IOException {
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			for (int i = 0; i < size; i++) {
				outputStream.write(body.get(i));
			}
			remove();
			return outputStream.toByteArray();
		}

		private void remove() {
			body.clear();
			receive_map.remove(map_n);
			bool = null;
			// 发送一个已完成的信号给上家。
			try {
				dataOutputStream.writeInt(2);
				dataOutputStream.writeInt(map_n);
				dPacket.setData(outputStream.toByteArray());
				dSocket.send(dPacket);
				dataOutputStream.flush();
				outputStream.reset();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		public void remove2() {
			bool = null;
			body.clear();
		}

	}

	private void Dsend(DatagramPacket dPacket, byte[] body) throws IOException {
		MapBodyBean mapBodyBean = new MapBodyBean(body, map_size);
		map_size = map_size % 12800;
		map_size++;
		map.put(mapBodyBean.map_n, mapBodyBean);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
		for (int i = 0; i < mapBodyBean.size; i++) {
			dataOutputStream.writeInt(1);
			dataOutputStream.writeInt(mapBodyBean.map_n);
			dataOutputStream.writeInt(mapBodyBean.size);
			dataOutputStream.writeInt(i);
			byte temp[] = mapBodyBean.getBody(i);
			dataOutputStream.writeInt(temp.length);
			dataOutputStream.write(temp);
			dPacket.setData(outputStream.toByteArray());
			dSocket.send(dPacket);
			dataOutputStream.flush();
			outputStream.reset();
		}
	}

	public boolean isClose() {
		return !dSocket.isClosed() || dSocket.isConnected();
	}

	public void close() {
		if (dSocket != null)
			dSocket.close();
	}
}
