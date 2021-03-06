<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>信息管理系统</title> 
<jsp:include page="/page/inc_header.jsp"></jsp:include>
<link rel="stylesheet" type="text/css" href="<%=path%>/css/homePage.css?a=<%=Math.random() %>" >
<script type="text/javascript">

$(document).ready(function() {

	var url = contextPath + '/loginMenuTree.do?rid=1';
	$.post(url, {}, function(data) {
		var root = data[0];
		
		if (!root.children) {
			return;
		}
		
		//菜单排序
		root.children.sort(function(a, b) {
			return a.sortId - b.sortId;
		});
		
		//加载顶部导航菜单（一级菜单组）
		$('#navMenu').empty();
		var curOpen = null;//当前打开的菜单
		var isFirstMenu = true;//默认打开第一个菜单
		$.each(root.children, function(i, e) {
			if (e.visible == '1') {
				var li = $('<li class="unSelected">' + e.name + '</li>');
				//绑定打开左侧菜单事件
				li.click(function() {
					if (curOpen != e.id) {
						$('#mainPage').attr('src', '');
						openLeftMenu(e);
						curOpen = e.id;
						$('.navMenuList li[class="selected"]').removeClass('selected').addClass('unSelected');
						$(this).removeClass('unSelected').addClass('selected');
					}
				});
				$('#navMenu').append(li);
				if (isFirstMenu) {
					li.click();
					isFirstMenu = false;
					curOpen = e.id;
				}
			}
		});
		
	}, 'json');
	
});

//展开左侧菜单
function openLeftMenu(navMenuNode) {
	$('#leftLayout').empty();
	/*
	$('#leftLayout').panel({
		title: navMenuNode.name,
		iconCls: navMenuNode.iconClass
	});
	*/
	if (!navMenuNode.children || navMenuNode.children.length == 0) return;
	//二级菜单排序
	navMenuNode.children.sort(function(a, b) {
		return a.sortId - b.sortId;
	});
	
	//创建菜单组容器
	var leftMenu = $('<div class="easyui-accordion" style="width: 100%;" ></div>').appendTo($('#leftLayout'));
	leftMenu.accordion({border: false});
	//创建子菜单容器
	var menuLv2 = $('<ul class="menuAccordion"></ul>').appendTo($('#leftLayout'));
	//遍历二级菜单
	$.each(navMenuNode.children, function(j, o) {
		//是菜单组
		if (o.menuType == '0') {
			
			if (o.visible != '1') return true;
			var menuLv2Group = null;
			//按sort_id菜单排序
			if (o.children) {
				o.children.sort(function(a, b) {
					return a.sortId - b.sortId;
				});
			
				menuLv2Group = $('<ul class="menuAccordion"></ul>');
				//遍历三级菜单
				$.each(o.children, function(idx, node) {
					
					if (node.visible == '1') {
						var liStr = '<li class="unSelected"><span class="icon ' + node.iconClass + '"></span>';
						liStr += '<span class="text">' + node.name + '</span></li>';
						
						var li = $(liStr);
						li.click(function() {
							$('.menuAccordion li[class="selected"]').removeClass('selected').addClass('unSelected');
							$(this).removeClass('unSelected').addClass('selected');
							
							$('#mainPage').attr('src', contextPath + '/forwardPage.do?address=' + node.address);
						});
						
						
						menuLv2Group.append(li);
					}
				});
			}
			leftMenu.accordion('add', {
				title: o.name,
				iconCls: o.iconClass,
				content: menuLv2Group,
				selected: false
			});
			
		
		//是子菜单
		} else {
			if (o.visible == '1') {
				var liStr = '<li class="unSelected"><span class="icon ' + o.iconClass + '"></span>';
				liStr += '<span class="text">' + o.name + '</span></li>';
				
				var li = $(liStr);
				li.click(function() {
					$('.menuAccordion li[class="selected"]').removeClass('selected').addClass('unSelected');
					$(this).removeClass('unSelected').addClass('selected');
					$('#mainPage').attr('src', contextPath + '/forwardPage.do?address=' + o.address);
					
					/*
					$('#page').panel({
						href: contextPath + '/forwardPage.do?address=' + o.address
					});
					*/
				});
				
				menuLv2.append(li);
			}
		
		}
	
	});
	
	//二级子菜单展开时的动画效果
	menuLv2.hide();
	menuLv2.slideDown();
	//默认展开第一个菜单组
	leftMenu.accordion('select', 0);
	
}

function test() {
	
	$.messager.prompt('My Title', 'Please type something', function(r){
		if (r){
			alert('you type: '+r);
		}
	});
}
</script>
</head>
<body class="easyui-layout" >
	<div data-options="region:'north', border:true" style="height: 126px; position: relative; background-image: url('images/banner.jpg'); background-repeat: repeat-x;">
		<!-- 
		<div style="padding:3px;  position: absolute; top: 0px; right: 0px;">
			<a href="http://localhost:8080/ums/index.do" class="easyui-linkbutton topMenu" data-options="plain:true">Home</a>
			<a href="javascript:;" class="easyui-linkbutton topMenu" data-options="plain:true,iconCls:'icon-help'" onclick="test()">测试按钮</a>
			<a href="#" class="easyui-menubutton topMenu" data-options="menu:'#mm2',iconCls:'icon-gear'">系统配置</a>
			<div id="mm2" style="width:100px;">
				<div onclick="$('#dlg').dialog('open')">logo配置</div>
				<div>项目名称配置</div>
				<div onclick="$('#page').panel({href: 'menu.jsp'})">数据库连接管理</div>
				<div onclick="$('#page').panel('refresh', 'showViewList.do?conId=0')">视图配置</div>
	        	<div onclick="$('#page').panel({href: 'disabled.jsp'})">统计模型</div>
	        	<div onclick="$('#page').panel({href: 'test.jsp'})">测试界面</div>
	        	<div onclick="$('#page').panel({href: 'framework.jsp'})">菜单配置</div>
	        	<div onclick="initMenu();">加载菜单</div>
	        	<div onclick="clearMenu();">清除菜单</div>
			</div>
			<a href="#" class="easyui-menubutton topMenu" data-options="menu:'#mm3',iconCls:'icon-help'">关于</a>
			<div id="mm3" class="menu-content" style="background:#f0f0f0;padding:10px;text-align:left">
				<img src="jquery-easyui-1.3.2/1589403196.jpg" style="width:150px;height:90px">
				<p style="">信息管理系统</p>
			</div>
		</div>
		 -->
		<ul id="navMenu" class="navMenuList" style="">
			<li>菜单加载中...</li>
		</ul>
	</div>
	
	<div id="leftLayout" data-options="region:'west',split:true,title:'',iconCls:'',border:true" style="width: 210px;">
		
	</div>
	<div id="page" data-options="region:'center', border:true, maximizable:true" > 
		<iframe id="mainPage" style="width: 100%; height: 100%; border: 0;"></iframe>
	</div>

	<div data-options="region:'south', border:true" style="height: 20px;"></div>
</body>

</html>
