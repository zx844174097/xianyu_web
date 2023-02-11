$(".fhNav").hover(function() {}, function() {
	$(".bottomLine").css("width", parseFloat($(".selectedNav").eq(0).width() + 20) + "px");
	$(".bottomLine").css("left", parseFloat($(".selectedNav").eq(0)[0].offsetLeft) + "px");
})
$(".nav li").hover(function() {
	$(".bottomLine").css("width", parseFloat($(this).width() + 20) + "px");
	$(".bottomLine").css("left", parseFloat($(this)[0].offsetLeft) + "px");
});
$(".nav li").on("click", function() {
	$(".nav li").removeClass("selectedNav");
	$(this).addClass("selectedNav");
	var stra = $(this).text();
	if(stra == "列表") {
		viewURL("select.html");
	} else if(stra == "充值") {
		viewURL("pay.html");
	} else if(stra == "修改") {
		viewURL("modification.html");
	}
	$(".bottomLine").css("width", parseFloat($(this).width() + 20) + "px");
	$(".bottomLine").css("left", parseFloat($(this)[0].offsetLeft) + "px");
})

var btnq = function() {
	login();
}
var btns = function() {
	var body = {};
	body["mail"] = $("#userSmail").text();
	body["Qptime"] = $("#qpntime").val();
	body["Dstime"] = $("#dsntime").val();
	body["Jgtime"] = $("#jgntime").val();
	body["Mytime"] = $("#myntime").val();
	body["Ljtime"] = $("#ljntime").val();
	body["time"] = $("#dyntime").val();
	body["money"] = $("#paynum").val();
	body["remerk"] = $("#bztext").val();
	view3("update_user_time", JSON.stringify(body), function(d) {
		 
		var data = JSON.parse(d);
		if(data.info.type == "success") {
			alert("充值成功");
			var zerotime = data.info.body.zTime;
			var mail = data.info.body.mail;
			var qptime = data.info.body.Qptime;
			var dstime = data.info.body.Dstime;
			var jgtime = data.info.body.Jgtime;
			var mytime = data.info.body.Mytime;
			var ljtime = data.info.body.Ljtime;
			var dytime = data.info.body.time;
			$("#userSmail").text(mail);
			$("#qpntime").val(timesss(zerotime, qptime));
			$("#dsntime").val(timesss(zerotime, dstime));
			$("#jgntime").val(timesss(zerotime, jgtime));
			$("#myntime").val(timesss(zerotime, mytime));
			$("#ljntime").val(timesss(zerotime, ljtime));
			$("#dyntime").val(timesss(zerotime, dytime));
			$("#paynum").val(0);
			$("#bztext").val("");

		} else {
			if(data.info.message == "out") {
				viewLoginURL("login.html");
			}
		}
	}, function() { //失败
		viewLoginURL("login.html");
	});
}

var timesss = function(zeroTimes, nowTime) {

	var date1=new Date(zeroTimes);
	if(isNaN(date1.getTime())){
		var t1 = zeroTimes.split(" ")[0].split("-");
		date1 = new Date(t1[1]+"-"+t1[2]+"-"+t1[0]);	
	}
	if(isNaN(date1.getTime())){
		var lin=zeroTimes.replace(/\-/g, "/");
		date1=new Date(lin);
	}
	if(isNaN(date1.getTime())){
		var arr = zeroTimes.split(/[- : \/]/),
		date1 = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
	}
	if(isNaN(date1.getTime()))
		alert("时间转换彻底失败了"); 
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
	var time3 = parseInt(date1.getTime() / 1000 / 60/ 60 / 24);
	var time4 = parseInt(date2.getTime() / 1000 / 60 / 60 / 24);
	//alert(time3+" "+time4);
	var time = nowTime-time4+time3;
	return time;
}

var selectUserinfo = function() {
	var userName = $("#texta").val();
	var body = {};
	body["user_mail"] = userName;
	view3("selectUserid", JSON.stringify(body), function(d) {
		var data = JSON.parse(d);
		if(data.info.type == "success") {
			var zerotime = data.info.body.zTime;
			var mail = data.info.body.mail;
			var qptime = data.info.body.Qptime;
			var dstime = data.info.body.Dstime;
			var jgtime = data.info.body.Jgtime;
			var mytime = data.info.body.Mytime;
			var ljtime = data.info.body.Ljtime;
			var dytime = data.info.body.time;
			$("#mail").text(mail);
			$("#qptime").text(timesss(zerotime, qptime));
			$("#dstime").text(timesss(zerotime, dstime));
			$("#jgtime").text(timesss(zerotime, jgtime));
			$("#mytime").text(timesss(zerotime, mytime));
			$("#ljtime").text(timesss(zerotime, ljtime));
			$("#dytime").text(timesss(zerotime, dytime));
		} else {
			if(data.info.message == "out") {
				viewLoginURL("login.html");
			}
		}
	}, function() { //失败
		viewLoginURL("login.html");
	});
}

var seltUserinfo = function() {
	var userName = $("#texta").val();
	var body = {};
	body["user_mail"] = userName;
	view3("selectUserid", JSON.stringify(body), function(d) {
		var data = JSON.parse(d);
		if(data.info.type == "success") {
			var zerotime = data.info.body.zTime;
			var mail = data.info.body.mail;
			var qptime = data.info.body.Qptime;
			var dstime = data.info.body.Dstime;
			var jgtime = data.info.body.Jgtime;
			var mytime = data.info.body.Mytime;
			var ljtime = data.info.body.Ljtime;
			var dytime = data.info.body.time;
			$("#userSmail").text(mail);
			$("#qpntime").val(timesss(zerotime, qptime));
			$("#dsntime").val(timesss(zerotime, dstime));
			$("#jgntime").val(timesss(zerotime, jgtime));
			$("#myntime").val(timesss(zerotime, mytime));
			$("#ljntime").val(timesss(zerotime, ljtime));
			$("#dyntime").val(timesss(zerotime, dytime));
		} else {
			if(data.info.message == "out") {
				viewLoginURL("login.html");
			}
		}
	}, function() { //失败
		viewLoginURL("login.html");
	});
}