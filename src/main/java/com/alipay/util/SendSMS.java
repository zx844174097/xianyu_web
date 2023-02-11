package com.alipay.util;

import com.taobao.api.ApiException;
import com.taobao.api.DefaultTaobaoClient;
import com.taobao.api.TaobaoClient;
import com.taobao.api.request.AlibabaAliqinFcSmsNumSendRequest;

public class SendSMS {
	public static boolean sendSMSCode(String call, String code,String title,String sms) {
		String url = "	http://gw.api.taobao.com/router/rest";
		String appkey = "23569632";
		String secret = "2ddd84b2ee730a9b157f0b6d4f2b1f7c";
		TaobaoClient client = new DefaultTaobaoClient(url, appkey, secret);
		AlibabaAliqinFcSmsNumSendRequest req = new AlibabaAliqinFcSmsNumSendRequest();
		// 回传参数 
		// req.setExtend("123456");
		req.setSmsType("normal");
		req.setSmsFreeSignName(title);
		req.setSmsParamString("{\"code\":\"" + code + "\",\"product\":\""
				+ "咸鱼APP" + "\"}"); 
		req.setRecNum(call); 
		req.setSmsTemplateCode(sms);
		// AlibabaAliqinFcSmsNumSendResponse rsp;
		try {
			// rsp = client.execute(req);
			client.execute(req);
		} catch (ApiException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
