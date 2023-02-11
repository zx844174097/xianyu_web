
function view(u) {
	view1(u, null);
}
// 加载页面
function view1(u, d) {
	view2(u, d, "menuFrame");
}
// 数据处理
function view2(u, d, s) {
	view3(u, d, function(data) {
		isOutLogin(data);
		$("#" + s).html(data);
	}, function() {
		$("#menuFrame").html(error);
	});
}
// 数据处理3
function view3(bag_id, body, succ, err) {
	var bag = {};
	var key = {};
	bag["bag_id"] = bag_id;
	if (body != null) {
		for ( var c in body) {
			if (body[c] == null || body[c] == "") {
				delete body[c];
			}
		}
		bag["body"] = body;
	}
	 
	$.ajax({
		type : "post",
		url : "./hou.do",
		async : false,
		data : bag,
		success : succ,
		error : err
	});
}
function viewURL(u) {
	$.ajax({
		type : "post",
		url : "./all/" + u,
		async : true,
		success : function(data) {
			$("#content").html(data);
		},
		error : function() {
			$("#content").html(error);
		}
	});
}
function viewLoginURL(u) {
	 window.location.href=u;  
}

function viewshow() {
	message_detail("");
	switch (sessionStorage.getItem("table_type")) {
	case "merchant":
		merchant_view_list();
		break;
	}
}
function login() {
	var user = $("#login-username").val();
	var passwd = $("#login-passwd").val();
	var body = {};
	body["user_mail"] = user;
	body["user_passwd"] = passwd;
	view3("user_login", JSON.stringify(body), function(d) {
		var data = JSON.parse(d);
		if (data.info.type == "success") {
			viewLoginURL("rootindex.html"); 
		} else {
			alert(data.info.message);
			$("#content").html(data.info.message);
		} 

	}, function() {
		$("#content").html("连接服务器错误！");
	});
}
function outLogin() {
	view3("user_out", null, function(d) {
		viewURL("html/Login.jsp");
	}, function() {
		viewURL("html/Login.jsp");
	});
}
function isOutLogin(data) {
	if (data == null)
		return;
	try {
		var d = JSON.parse(data);
	} catch (e) {
		return;
	}
	if (d != null && d.info != null && d.info.type != null
			&& d.info.type == "error" && d.info.message == "out")
		viewURL("html/Login.jsp");
}
function message_detail(html) {
	$("#message_info").html(html);
}
// 信息修改界面状况
function create_view(title, body, id, start_value, end_value, start_c, end_c) {
	var model = $("#content_div");
	detait_view(model, title, body, id, start_value, end_value, start_c, end_c);
}
function detait_view(model, title, body, id, start_value, end_value, start_c,
		end_c) {
	var table_title = JSON.parse(sessionStorage.getItem("table_title"));
	var table_title_remark = JSON.parse(sessionStorage
			.getItem("table_title_remark"));
	_detait_view(model, title, table_title, table_title_remark, body, id,
			start_value, end_value, start_c, end_c);
}
function _detait_view(model, title, table_title, table_title_remark, body, id,
		start_value, end_value, start_c, end_c) {
	model.html($("#model_").html());
	_detait_view_body(title, table_title, table_title_remark, body, id);
	_detait_view_end(start_value, end_value, start_c, end_c);
}
function _detait_view_other(model_other) {
	$("#model_other").html(model_other);
}
function _detait_view_body(title, table_title, table_title_remark, body, id) {
	var model_body = "";
	for ( var t in title) {
		model_body += "<div style='margin-top:10px'>";
		if (t == "merchant_id") {
			continue;
		}
		if (t == "merchant_createtime") {
			break;
		}
		model_body += "<label>" + table_title[title[t]] + "：</label>";
		model_body += "<input type='text' id='"
				+ title[t]
				+ "' placeholder='请输入"
				+ table_title[title[t]]
				+ "' value='"
				+ (body != null && body[id] != null
						&& body[id][title[t]] != null ? body[id][title[t]] : "")
				+ "'>";
		model_body += "<span style='font-size:10px;color: red;'>"
				+ (table_title_remark[title[t]] == "*" ? "*"
						: table_title_remark[title[t]] + "*") + "</span>";
		model_body += "</div>";
	}
	$("#model_body").html(model_body);
}
function _detait_view_end(start_value, end_value, start_c, end_c) {
	if (start_c == null)
		return;
	var model_end = "<input type='button' onclick='" + start_c + "' value='"
			+ start_value + "' />";
	if (end_c != null)
		model_end += "<input style='margin-left:30px' type='button' onclick='"
				+ end_c + "' value='" + end_value + "' />";
	$("#model_end").html(model_end);
}

function _view_list(mainTitle, view_title, table_title, table_body, td_idname) {
	setTitle(mainTitle);
	$("#content_div").html(
			_view_list_html(view_title, table_title, table_body, td_idname));
}
function _view_list_html(view_title, table_title, table_body, td_idname) {
	var html = "<table id='table_body'><tbody>";
	for ( var t in view_title)
		html += "<th>" + table_title[view_title[t]] + "</th>";
	html += "<th id='th_one'>操作</th>";
	for ( var b in table_body) {
		if (table_body[b] == null) {
			continue;
		}
		html += "<tr>";
		for ( var t in view_title)
			html += "<td>" + table_body[b][view_title[t]] + "</td>";
		html += "<td id='td_"
				+ table_body[b][td_idname]
				+ "'><input class='btn btn-info' type=button value='详细' ></input></td>";
		html += "</tr>";
	}
	html += "</tbody></table>";
	return html;
}
function error() {
	return "页面访问错误";
}