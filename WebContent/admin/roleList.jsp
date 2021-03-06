<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>	 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<title>信息管理系统</title>
<jsp:include page="/page/inc_header.jsp"></jsp:include>
<script type="text/javascript">
var contextPath = '<%=path%>';

$(function() {
	$('#list').datagrid({
//		title: '用户管理',
		url : contextPath + '/roleList.do',
		loadMsg : '数据加载中......',
		fit: true,
    	striped: false,
		remoteSort: false,
		toolbar: '#divToolbar',
		pagination: true,
		rownumbers: true,
		fitColumns: true,
		singleSelect:true,
		queryParams: {},
		onLoadSuccess: function(data) {
			$(".datagrid-cell .easyui-linkbutton").linkbutton({plain: false});
			$(this).datagrid('clearSelections');
			$(this).datagrid('resize');
		},
		/*
		frozenColumns: [ [ {
			field : 'sbxxsid',
			checkbox : false
		} ] ],
		*/
		columns: [ [  {
			field: 'roleName',
			title: '角色名称',
			width: 120,
			align: 'center'
			
		}, {
			field: 'isvalid',
			title: '有效',
			width: 120,
			align: 'center'
			
		}, {
			field: 'operatorField',
			title: '操作',
			width: 230,
			align: 'center',
			fixed: true,
			formatter: function(val, row, idx) {
				return '<a class="easyui-linkbutton" iconCls="icon-menu" onclick="setMenu(' + row.sid + ')">分配菜单</a>&nbsp;<a class="easyui-linkbutton" iconCls="icon-edit" onclick="editRow(true, ' + idx + ')">编辑</a>&nbsp;<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="deleteRow(\'' + row.sid + '\')">删除</a>';
			}
		}
	   ] ]

	});
});

function doSearch(value) {
	$('#list').datagrid('load', {"roleName": value});
}

function addUser() {
	$("#editJd").dialog({
		iconCls : "icon-edit",
		width : 600,
		modal : true,
		title : "专家信息编辑",
		maximizable : false,
		minimizable : false,
		resizable : false,
		buttons : [ {
			text : "保存",
			iconCls : "icon-ok",
			handler : function() {
				$("#editJdxx_form").trigger('submit');
			}

		}, {
			text : "取消",
			iconCls : "icon-cancel",
			handler : function() {
				$("#editJd").dialog("close");
			}
		} ]
	});
	
	$("#editJd").dialog('center');
	$("#editJd").dialog('open');
}

function setMenu(roleSid) {
	
	$('#setMenuTree').tree({
		url: contextPath + '/menuTree.do',
		lines: true,
		animate: true,
		checkbox: true,
		onLoadSuccess: function(node, data) {
			
		},
		formatter: function(node) {
			if (node.memo) {
				return node.text + '(' + node.memo + ')';
			} else {
				return node.text;
			}
		},
		onCheck: function(node, checked) {

		},
		onSelect: function(node) {
		
		}
	});


	$('#setMenuWindow').dialog('center');
	$('#setMenuWindow').dialog('open');
}
</script>
</head>

<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'center',split:false, border:false">
		<div id="divToolbar">
			<table  >
				<tr>
					<td>
						<a id="btnAddYj" href="javascript:;" class="easyui-linkbutton" icon="icon-add" plain="true" onclick="addUser()">新增</a>
					</td>
					<td>
						<a class="datagrid-btn-separator"></a>
					</td>
					<td>
						<input class="easyui-searchbox" id="xm" data-options="prompt:'按角色名搜索', searcher:doSearch" style="width:135px" />
					</td>
				</tr>
			</table>
		</div>
		<table id="list"></table>
	</div>
</div>

<div id="setMenuWindow" class="easyui-dialog" data-options="closed:true, modal:true, title:'分配菜单', width:800, height: 600, resizable:true">
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'west', split:true, border:true, title:'所有菜单'" style="width: 350px;">
			<ul id="setMenuTree" class="easyui-tree"></ul>
		</div>
		<div data-options="region:'center', split:true, border:true, title:'权限设置'">
			是发顺丰松岛枫松岛枫松岛枫
		
		</div>
	</div>
</div>



<div id="editJd" class="easyui-dialog" data-options="closed:true">
	<form method="post" id="editJdxx_form">
		<input name="pszjxx.sid" id="sidEdit" type="hidden" style="display: none;"/>
		<input name="pszjxx.userSid" id="userSidEdit" type="hidden" style="display: none;"/>
		<table class="formTableStyle">
			<tr>
				<th>
					<font color="red">*</font>姓名：
				</th>
				<td>
					<input name="pszjxx.xm"  id="xmEdit" class="easyui-validatebox textbox" required="true" style="width: 90%;" validType="maxLength[15]" missingMessage="名称不能为空"/>	
				</td>
				<th>
					性别：
				</th>
				<td>
					<select name="pszjxx.xb"  id="xbEdit" class="easyui-validatebox textbox" style="width: 90%;"></select>	
				</td>
			</tr>
			<tr>
				<th>
					出生年月：
				</th>
				<td>
					 <input name="pszjxx.csnyStr" id="csnyEdit" style="width: 90%" class="easyui-validatebox textbox"  data-options="required:false"  />			
				</td>
				<th>
					工作单位：
				</th>
				<td>
					<input name="pszjxx.gzdw"  id="gzdwEdit" class="easyui-validatebox textbox" style="width: 90%;" validType="maxLength[15]"/>	
				</td>
			</tr>
		</table>
	</form>
</div>
</body>