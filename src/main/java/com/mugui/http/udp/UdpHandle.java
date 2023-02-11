package com.mugui.http.udp;

import com.mugui.http.tcp.Bag;

public interface UdpHandle {
	void manage(Bag accpet, UDPSocket udpSocket);

	Bag getValue(String key);
}
