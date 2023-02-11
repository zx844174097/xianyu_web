var timefillins;

function gjInit() {
	setMessage_info("message_info");
	setMenuFrame("otherFrame");
	document.getElementById("main").style.display = "none"
	timefillins = gj_getTimeFillins()
	for(var i in timefillins) {
		var v = $("#" + timefillins[i]).children("select");
		v.change(gj_filluserTime);
		v = $("#" + timefillins[i]).children("input");
		v.bind("input", gj_filluserTime)
	}
}
$("#user-mail").bind("input", function() {
	document.getElementById("main").style.display = "none"
})

function gj_filluserTime() {
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
	if(!gj_updateOutTime(id, time)) return;
	parent.children("input").val(time)
}

function gj_updateOutTime(id, time) {
	id = id.split("in")[0];
	var yuan = $("#" + id).text()
	var day = parseInt(yuan) + parseInt(time);
	if(isNaN(day)) return false;
	if(day > 9999) return false;
	$("#" + id + "out").text(day);
	gj_countMoney();
	return true;
}

function gj_countMoney() {
	var times = gj_getTimes();
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
						money += 420;
						v -= 365;
						break;
				}
			} else if(v >= 181) {
				switch(i) {
					case 0:
						money += 210;
						v -= 181;
						break;
				}
			} else if(v >= 91) {
				switch(i) {
					case 0:
						money += 105;
						v -= 91;
						break;
				}
			} else if(v >= 31) {
				switch(i) {
					case 0:
						money += 35;
						v -= 31;
						break;
				}
			} else if(v >= 7) {
				switch(i) {
					case 0:
						money += 12;
						v -= 7;
						break;
				}
			} else {
				switch(i) {
					case 0:
						money += v * 2;
						break;
				}
				v = 0;
			}
		}
	}
	$("#money").val(money + ".00");
	message_detail("")
}

function gj_getTimes() {
	var times = ["dytime"];
	return times;
}

function gj_getTimeFillins() {
	var times = ["dytimein"]
	return times;
}

function gj_getTimeFillouts() {
	var times = ["dytimeout"]
	return times;
}

function gj_clearTimeView() {
	for(var i in timefillins) {
		var v = $("#" + timefillins[i]).children("input");
		v.val(0)
	}
	$("#money").val(0 + ".00");
}

function gj_selectUserTime() {
	var usermail = $("#user-mail").val();
	if(usermail == null || !isMail(usermail)) {
		return;
	}
	var body = {};
	body["mail"] = usermail;
	body["web_type"] = "GJ";
	gj_clearTimeView();
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

		var times = gj_getTimes();
		for(var t in times) { //844174097@qq.com
			var daytime = data.info[times[t]];
			daytime = gj_timeToDay(daytime);
			if(daytime > 9999) {
				daytime = "永久";
				$("#" + times[t] + "in").children("select").attr("disabled", "disabled");
				$("#" + times[t] + "in").children("input").attr("disabled", "disabled");
			} else {
				$("#" + times[t] + "in").children("select").attr("disabled", false);
				$("#" + times[t] + "in").children("input").attr("disabled", false);
			}
			if(daytime < 0)
				daytime = 0;
			$("#" + times[t] + "out").text(daytime)
			$("#" + times[t]).text(daytime);
		}
	}, function() {
		errorHtml();
	})
}

function gj_timeToDay(time) {
	var now = new Date().getTime();
	var end = parseInt(time.split(",")[1]);
	now = parseInt((end - now) / (24 * 60 * 60 * 1000));
	return now;

}

function gj_addOrder() {
	var usermail = $("#user-mail").val();
	if(usermail == null) {
		return;
	}
	var body = {};
	body["mail"] = usermail;
	body["web_type"] = "GJ";
	var times = gj_getTimes();
	var user_data = JSON.parse(localStorage.getItem("user_data"))
	var bool = false;
	for(var t in times) {
		var time = $("#" + times[t] + "out").text()
		if(time == "永久") {
			//body[times[t]] = user_data[times[t]];
		} else { 
			var ss = parseInt(time) - parseInt($("#" + times[t]).text());
			if(ss > 0){
				bool=true;
				body[times[t]] = (ss).toString();
			}
		}
	}
	if(!bool){
		message_detail("天数检测未通过")
		return;
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
		var times = gj_getTimes();
		console.log(body.toString()+""+times[0])
		for(var i in times) {
			$("#" + times[i] + "py").text(body[times[i]]);
		}
		//pageJump("order.do"); 
	}, function() {
		errorHtml()
	})
}

function gj_payOrder() {
	document.getElementById('fade').style.display = 'none';
	$("#orderform").attr("action", "./order.do?bag_id=pay");
	$("#orderform").submit();
}

function gj_removeOrder() {
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