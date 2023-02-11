<%@page import="net.sf.json.JSONObject"%>
<%@page import="net.sf.json.JSONArray"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>

<html>
<body data-genuitec-lp-enabled="false" data-genuitec-file-id="wc1-4" data-genuitec-path="/jiaoben_test/WebRoot/WEB-INF/table.jsp">
	<span class="cp_title" id="title" data-genuitec-lp-enabled="false" data-genuitec-file-id="wc1-4" data-genuitec-path="/jiaoben_test/WebRoot/WEB-INF/table.jsp"></span>
	<div class="table_con" id="content_div">
	</div>
	
	<script type="text/javascript">
	
	<%JSONObject table_title = (JSONObject) request
					.getAttribute("tabletitle");
			JSONObject table_title_remark = (JSONObject) request
					.getAttribute("tabletitleremark"); 
			JSONArray table_body = (JSONArray) request
					.getAttribute("tablebody");
			String type = (String) request.getAttribute("type");
			int table_user = (Integer) request.getAttribute("tableuser");%>
 		sessionStorage.removeItem("table_type");
		sessionStorage.removeItem("table_body");
		sessionStorage.removeItem("table_title");
		sessionStorage.removeItem("table_user");
		sessionStorage.removeItem("table_title_remark"); 
		sessionStorage.setItem("table_type","<%=type%>");
		sessionStorage.setItem("table_user","<%=table_user%>");
		sessionStorage.setItem("table_body", JSON.stringify(<%=table_body.toString()%>));
		sessionStorage.setItem("table_title", JSON.stringify(<%=table_title.toString()%>));
		sessionStorage.setItem("table_title_remark", JSON.stringify(<%=table_title_remark.toString()%>));
		viewshow();
		<%
			request.removeAttribute("tabletitle");
			request.removeAttribute("tablebody");
			request.removeAttribute("type");
			request.removeAttribute("tabletitleremark");
		 %>
	</script>
</body>
<script>"undefined"==typeof CODE_LIVE&&(!function(e){var t={nonSecure:"8017",secure:"6615"},c={nonSecure:"http://",secure:"https://"},r={nonSecure:"127.0.0.1",secure:"gapdebug.local.genuitec.com"},n="https:"===window.location.protocol?"secure":"nonSecure";script=e.createElement("script"),script.type="text/javascript",script.async=!0,script.src=c[n]+r[n]+":"+t[n]+"/codelive-assets/bundle.js",e.getElementsByTagName("head")[0].appendChild(script)}(document),CODE_LIVE=!0);</script></html>