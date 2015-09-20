<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<base href="<%=basePath%>">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="信息管理系统">
<meta http-equiv="description" content="This is my page"> 
<link rel="stylesheet" type="text/css" href="<%=path%>/js/jquery-easyui-1.4.3/themes/bootstrap/easyui.css?a=<%=Math.random() %>" >
<link rel="stylesheet" type="text/css" href="<%=path%>/js/jquery-easyui-1.4.3/themes/icon.css" >
<link rel="stylesheet" type="text/css" href="<%=path%>/css/common.css" >
<script type="text/javascript" src="<%=path%>/js/jquery-easyui-1.4.3/jquery.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/jquery-easyui-1.4.3/jquery.easyui.min.js"></script>
<script type="text/javascript" src="<%=path%>/js/jquery-easyui-1.4.3/locale/easyui-lang-zh_CN.js" ></script>
<script type="text/javascript" src="<%=path%>/js/common/common.js" ></script>
<script type="text/javascript">
var contextPath = '<%=path%>';
</script>