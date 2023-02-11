//viewURL("index.html");
var message_info = "";
var menuFrame = "";

function view(u) {
	view1(u, null);
}
// 加载页面
function view1(u, d) {
	view2(u, d, menuFrame);
}
// 数据处理
function view2(u, d, s) {
	view3(u, d, function(data) {
		isOutLogin(data);
		$("#" + s).html(data);
	}, function() {
		$("#" + menuFrame).html(error);
	});
}
// 数据处理3 
function view3(bag_id, body, succ, err) {
	view4("user.do", bag_id, body, succ, err);
}
//数据处理4
function view4(url, bag_id, body, succ, err) {
	view5(url, bag_id, body, succ, err, true);
}

function view5(url, bag_id, body, succ, err, bool) {
	message_detail("")
	var bag = {};
	var key = {};
	bag["bag_id"] = bag_id;
	bag["version"] = "v1.0";
	if(body != null) {
		for(var c in body) {
			if(body[c] == null || body[c] == "") {
				delete d[c];
			}
		}
		bag["body"] = body;
	}
	$.ajax({
		type: "post",
		url: "./" + url,
		async: bool,
		data: bag,
		success: succ,
		error: err
	});
}

function viewURL(u, init) {
	viewURL2(u, function(data) {
		document.getElementById("menuFrame").innerHTML = data
		if(init != null)
			init();
	}, function(error) {
		document.getElementById("menuFrame").innerHTML = error.responseText
	})
}

function viewURL2(u, cess, err) {
	$.ajax({
		type: "post",
		url: "./" + u,
		async: true,
		success: cess,
		error: err
	});
}

function pageJump(url) {
	//	window.open("./"+url);
	window.location.href = "./" + url;
	//		$('body').append($('<a href="./'+url+'" target="_blank" id="openWin"></a>'))  
	//	    document.getElementById("order").click();//点击事件  
	//	    $('#openWin').remove(); 
}

function message_detail(html) {
	$("#" + message_info).html(html);
}

function setMessage_info(message_info1) {
	message_info = message_info1;
}

function setMenuFrame(menuFrame1) {
	menuFrame = menuFrame1;
}

function error() {
	return "页面访问错误";
}

function isMail(mail) {
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!myreg.test(mail)) {
		message_detail("邮箱格式错误")
		return false;
	}
	return true;
}
/**
 * 动态加载js
 */
function loadJavascript(url, functi) {
	$.getScript("./js/" + url, functi);
}

function toHS() {
	viewURL("hs_index.html", function() {
		loadJavascript("hs_js.js", function() {
			hsInit()
		})
	});
}

function toGJ() {
	viewURL("gj_index.html", function() {
		loadJavascript("gj_js.js", function() {
			gjInit()
		})
	});
}
function errorHtml() {
	message_detail("网络连接错误，无法连接到服务器，如你进行过非法操作，可能被服务器禁止了ip")
}