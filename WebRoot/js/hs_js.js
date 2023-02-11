var timefillins;

function hsInit() {
	setMessage_info("message_info");
	setMenuFrame("otherFrame");
	document.getElementById("main").style.display = "none"
	timefillins = getTimeFillins()
	for(var i in timefillins) {
		var v = $("#" + timefillins[i]).children("select");
		v.change(filluserTime);
		v = $("#" + timefillins[i]).children("input");
		v.bind("input", filluserTime)
	}
}
$("#user-mail").bind("input", function() {
	document.getElementById("main").style.display = "none"
})
//时间转换成剩余天数
function timeToDay(zeroTimes, nowTime) {
	var date1 = new Date(zeroTimes);
	if(isNaN(date1.getTime())) {
		var t1 = zeroTimes.split(" ")[0].split("-");
		date1 = new Date(t1[1] + "-" + t1[2] + "-" + t1[0]);
	}
	if(isNaN(date1.getTime())) {
		var lin = zeroTimes.replace(/\-/g, "/");
		date1 = new Date(lin);
	}
	if(isNaN(date1.getTime())) {
		var arr = zeroTimes.split(/[- : \/]/),
			date1 = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
	}
	if(isNaN(date1.getTime()))
		message_detail("网站发生严重错误，请联系管理员QQ:844174097")
	date1.setMilliseconds(0);
	date1.setSeconds(0);
	date1.setMinutes(0);
	date1.setHours(1);
	var date2 = new Date();
	date2.setMilliseconds(0);
	date2.setSeconds(0);
	date2.setMinutes(0);
	date2.setHours(1);
	//alert(date1.getTime()+" "+date2.getTime()+" "+date1.toUTCString()+" "+date2.toUTCString());
	var time3 = parseInt(date1.getTime() / 1000 / 60 / 60 / 24);
	var time4 = parseInt(date2.getTime() / 1000 / 60 / 60 / 24);
	//alert(time3+" "+time4);
	var time = nowTime - time4 + time3;
	return time;
}

function getTimes() {
	var times = ["Qptime", "Dstime", "Jgtime", "Mytime", "Ljtime", "time"];
	return times;
}

function getTimeFillins() {
	var times = ["Qptimein", "Dstimein", "Jgtimein", "Mytimein", "Ljtimein", "timein"]
	return times;
}

function getTimeFillouts() {
	var times = ["Qptimeout", "Dstimeout", "Jgtimeout", "Mytimeout", "Ljtimeout", "timeout"]
	return times;
}

function filluserTime() {
	var time = $(this).val();
	time = parseInt(time);
	if(isNaN(time)) {
		time = 0;
	}
	if(time > 9999) {
		time = 9999;
	}
	if(time < 0) {
		time = 0;
	}
	$(this).val(time)
	var parent = $(this).parent()
	var id = parent.attr("id");
	if(!updateOutTime(id, time)) return;
	parent.children("input").val(time)
}

function updateOutTime(id, time) {
	id = id.split("in")[0];
	var yuan = $("#" + id).text()
	var day = parseInt(yuan) + parseInt(time);
	if(isNaN(day)) return false;
	if(day > 9999) return false;
	if(id == "Mytime" && day > 35) {
		return false;
	}
	$("#" + id + "out").text(day);
	countMoney();
	return true;
}

function countMoney() {
	var times = getTimes();
	var money = 0;
	for(var i in times) {
		var v = $("#" + times[i]).text();
		if(v == "永久") continue;
		if(times[i] == "Dstime") continue;
		var v2 = $("#" + times[i] + "out").text();
		if(v2 <= 0) continue;
		v = parseInt(v);
		v2 = parseInt(v2);
		v = v2 - v;
		//"Qptime", "Dstime", "Jgtime", "Mytime", "Ljtime", "time"
		i = parseInt(i);
		while(v > 0) {
			if(v >= 365) {
				switch(i) {
					case 0:
					case 2:
					case 4:
						money += 180;
						v -= 365;
						break;
					case 5:
						money += 315;
						v -= 365;
						break;
				}
			} else if(v >= 181) {
				switch(i) {
					case 0:
					case 2:
					case 4:
						money += 100;
						v -= 181;
						break;
					case 5:
						money += 165;
						v -= 181;
						break;
				}
			} else if(v >= 91) {
				switch(i) {
					case 0:
					case 2:
					case 4:
						money += 55;
						v -= 91;
						break;
					case 5:
						money += 90;
						v -= 91;
						break;
				}
			} else if(v >= 31) {
				switch(i) {
					case 0:
					case 2:
					case 4:
						money += 20;
						v -= 31;
						break;
					case 5:
						money += 35;
						v -= 31;
						break;
					case 3:
						money += 200;
						v -= 31;
						break;
				}
			} else if(v >= 7) {
				switch(i) {
					case 0:
					case 2:
					case 4:
						money += 7;
						v -= 7;
						break;
					case 5:
						money += 12;
						v -= 7;
						break;
					case 3:
						money += 55;
						v -= 7;
						break;
				}
			} else {
				switch(i) {
					case 0:
					case 2:
					case 4:
						money += v * 1;
						break;
					case 5:
						money += v * 2;
						break;
					case 3:
						money += v * 12;
						break;
				}
				v = 0;
			}
		}
	}
	if(money == 0) {
		v = $("#" + "Dstime").text();
		if(v == "永久") return;
		v2 = $("#" + "Dstime" + "out").text();
		v = v2 - v;
		while(v > 0) {
			if(v >= 365) {
				money += 180;
				v -= 365;
			} else if(v >= 181) {
				money += 100;
				v -= 181;
			} else if(v >= 91) {
				money += 55;
				v -= 91;
			} else if(v >= 31) {
				money += 20;
				v -= 31;
			} else if(v >= 7) {
				money += 7;
				v -= 7;
			} else {
				money += v * 2;
				v = 0;
			}
		}
	}
	if(money < 7) {
		$("#money").val(0 + ".00");
		message_detail("总金额小于7无法充值")
	} else {
		$("#money").val(money + ".00");
		message_detail("")
	}

}

function clearTimeView() {
	for(var i in timefillins) {
		var v = $("#" + timefillins[i]).children("input");
		v.val(0)
	}
	$("#money").val(0 + ".00");
}

function selectUserTime() {
	var usermail = $("#user-mail").val();
	if(usermail == null || !isMail(usermail)) {
		return;
	}
	var body = {};
	body["mail"] = usermail;
	clearTimeView();

	view3("select_user_time", JSON.stringify(body), function(d) {
		var data = JSON.parse(d);
		if(data.info.type == "error") {
			message_detail(data.info.message);
			localStorage.removeItem("user_data")
			return;
		}
		localStorage.setItem("user_data", JSON.stringify(data.info))
		document.getElementById("main").style.display = ""
		//"Qptime":9979,"Dstime":1105,"Jgtime":1,"Mytime":979,"Ljtime":438,"time":9979,"zTime":"2018-01-31 03:42:53.0"
		var zerotime = data.info.zTime;
		var times = getTimes();
		for(var t in times) { //844174097@qq.com
			var daytime = data.info[times[t]];
			daytime = timeToDay(zerotime, daytime);
			if(daytime > 9999) {
				daytime = "永久";
				$("#" + times[t] + "in").children("select").attr("disabled", "disabled");
				$("#" + times[t] + "in").children("input").attr("disabled", "disabled");
			}else {
				$("#" + times[t] + "in").children("select").attr("disabled", false);
				$("#" + times[t] + "in").children("input").attr("disabled", false);
			}
			if(times[t] == "Dstime" && daytime > 0) {
				$("#" + times[t] + "in").children("select").attr("disabled", "disabled");
				$("#" + times[t] + "in").children("input").attr("disabled", "disabled");
			}
			if(daytime < 0)
				daytime = 0;
			if(times[t] == "Dstime") {
				$("#Cjtime").text(daytime)
			}
			$("#" + times[t] + "out").text(daytime)
			$("#" + times[t]).text(daytime);
		}
	}, function() {
		errorHtml();
	})
}



function addOrder() {
	var usermail = $("#user-mail").val();
	if(usermail == null) {
		return;
	}
	var body = {};
	body["mail"] = usermail;
	var times = getTimes();
	var user_data = JSON.parse(localStorage.getItem("user_data"))
	for(var t in times) {
		var time = $("#" + times[t] + "out").text()
		if(time == "永久") {
			body[times[t]] = user_data[times[t]];
		} else
			body[times[t]] = time;
	}
	view3("add_order", JSON.stringify(body), function(d) {
		var data = JSON.parse(d);
		message_detail(data.info.message);
		if(data.info.type == "error") {
			return;
		}
		document.getElementById('fade').style.display = 'block';
		if(data.info.type == "user_not_order") {
			$("#light-head").html(data.info.message);
		} else {
			$("#light-head").html("确认订单信息");
		}
		var body = data.info.body;
		var times = getTimes();
		for(var i in times) {
			$("#" + times[i] + "py").text(body[times[i]]);
		}
		//pageJump("order.do"); 
	}, function() {
		errorHtml()
	})
}

function payOrder() {
	document.getElementById('fade').style.display = 'none';
	$("#orderform").attr("action", "./order.do?bag_id=pay");
	$("#orderform").submit();
}

function removeOrder() {
	document.getElementById('fade').style.display = 'none';
	view5("order.do", "remove", null, function(d) {
		var data = JSON.parse(d);
		if(data == null) {
			message_detail("服务器数据解析错误");
		} else
			message_detail(data.info.message);
	}, function() {
		errorHtml()
	}, false)
}