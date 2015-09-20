<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>信息管理系统</title> 
<jsp:include page="/page/inc_header.jsp"></jsp:include>

<script type="text/javascript">

$(function() {
	$('#list').datagrid({
//		title: '账户管理',
		url : '<%=path%>/userList.do',
		loadMsg : '数据加载中......',
		fit: true,
		remoteSort: true,
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
		columns: [ [  {
			field: 'userid',
			title: '登陆ID',
			width: 120,
			align: 'center'
			
		}, {
			field: 'username',
			title: '账户名',
			width: 120,
			align: 'center'
			
		}, {
			field: 'regTime',
			title: '注册时间',
			width: 150,
			align: 'center',
			sortable : true,
			formatter: function(val) {
				return val;
			}
		}, {
			field: 'lastIp',
			title: '最后登陆IP',
			width: 120,
			align: 'center'
		}, {
			field: 'lastLoginTime',
			title: '最后登陆时间',
			width: 150,
			align: 'center',
			sortable : true
		}, {
			field: 'roles',
			title: '所属角色',
			width: 150,
			align: 'center',
			sortable : true
		}, {
			field: 'operatorField',
			title: '操作',
			width: 230,
			align: 'center',
			fixed: true,
			formatter: function(val, row, idx) {
//				return '<table cellpadding="0" cellspacing="0" border="0"><tr><td><a  class="easyui-linkbutton" iconCls="icon-role" onclick="selectRoles(\'' + row.sid + '\')">分配角色</a></td><td><a class="datagrid-btn-separator"></a></td><td><a  class="easyui-linkbutton" iconCls="icon-edit" onclick="editRow(true, ' + idx + ')">编辑</a></td><td><a class="datagrid-btn-separator"></a></td><td><a   class="easyui-linkbutton" iconCls="icon-cancel" onclick="deleteRow(\'' + row.sid + '\')">删除</a></td></tr></table>';
				return '<a class="easyui-linkbutton" iconCls="icon-role" onclick="selectRoles(\'' + row.sid + '\')">分配角色</a>&nbsp;<a class="easyui-linkbutton" iconCls="icon-edit" onclick="editUser(' + idx + ')">编辑</a>&nbsp;<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="deleteUser(\'' + row.sid + '\')">删除</a>';

			}
		}
	   ] ]

	});
});

//删除账户
function deleteUser(userSid) {
	$.messager.confirm('提示信息', '确认删除该账户吗？', function(r) {
		if (r) {
			var url = contextPath + '/deleteUser.do';
			$.post(url, {sid: userSid}, function(data) {
				if (data.success) {
					$('#list').datagrid('reload');
				}
				$.messager.show({
		       		title: '提示信息',
		       		msg: data.message,
		       		timeout: 5000,
		       		showType: 'slide'
		       	});
			}, 'json');
		}
	});
}

var changedRoles = {};
//角色列表载入
function roleListInit(userSid) {
	
	userSid = (userSid == undefined) ? null : userSid;
	$('#roleList').datagrid({
//		title: '账户管理',
		url : contextPath + '/setRolesList.do',
		loadMsg : '数据加载中......',
		fit: true,
    	striped: false,
		remoteSort: false,
		toolbar: '',
		pagination: true,
		pageNumber: 1,
		rownumbers: true,
		fitColumns: true,
		singleSelect:true,
		queryParams: {userSid: userSid},
		onLoadSuccess: function(data) {
			
			$(".datagrid-cell .easyui-switchbutton").switchbutton({
				onChange: function(r) {
					var sid = $(this).attr('id').split('@')[0];
					var name = $(this).attr('id').split('@')[1];
					changedRoles[sid] = [r, name];
					$('#saveRolesBtn').linkbutton('enable');
				}
			});
			
			$(this).datagrid('clearSelections');
			$(this).datagrid('resize');
		},
		columns: [ [  {
			field: 'roleName',
			title: '角色名称',
			width: 120,
			align: 'center'
			
		}, {
			field: 'userSid',
			title: '操作',
			width: 100,
			align: 'center',
			fixed: true,
			formatter: function(val, row, idx) {
				var checked = '';
				if (changedRoles[row.sid] == undefined) {
					checked = val?'checked':'';
				} else {
					checked = changedRoles[row.sid][0]?'checked':'';
				}
				
				var html = '<input id="'+ row.sid +'@' + row.roleName + '" class="easyui-switchbutton" onText="已分配" offText="未分配" style="width: 70px;" ' + checked + '/>';
				return html;
			
			}
		}
	   ] ]

	});

}
//点击分配角色按钮
function selectRoles(userSid) {
	changedRoles = {};
	
	$("#roleWindow").dialog({closable: true});
	$('#cancelSaveRolesBtn').show();
	$('#saveRolesBtn').linkbutton('disable');
	$('#saveRolesBtn').linkbutton({
		onClick: function() {
			var rs = JSON.stringify(changedRoles);
			$('#roles').val(rs);
			$('#roleWindow').dialog('close');
		}
	});
	roleListInit(userSid);
	$("#roleWindow").dialog('center');
	$("#roleWindow").dialog('open');
}

//点击添加所属角色按钮
function addRoles() {
	$("#roleWindow").dialog({closable: false});
	$('#cancelSaveRolesBtn').hide();
	$('#saveRolesBtn').linkbutton('enable');
	$('#saveRolesBtn').linkbutton({
		onClick: function() {
			var rs = JSON.stringify(changedRoles);
			$('#roles').val(rs);
			var names = '';
			$.each(changedRoles, function(i, e) {
				if (e[0]) {
					names += e[1] + ',';
				}
			});
			names = names.substring(0, names.length-1);
			$('#roleNames').html(names);
			$('#roleWindow').dialog('close');
		}
	});
	roleListInit(null);
	$("#roleWindow").dialog('center');
	$("#roleWindow").dialog('open');
}


//点击编辑账户按钮
function editUser(idx) {
	var row = $('#list').datagrid('getRows')[idx];
	$('#useridEdit').textbox('setValue', row.userid);
	$('#roleNames').html(row.roles);
	
	$("#editUserWindow").dialog('center');
	$("#editUserWindow").dialog('open');
}

//点击新增账户按钮
function addUser() {
	$('#useridEdit').textbox('setValue', '');
	$('#passwordEdit').textbox('setValue', '');
	$('#passwordConfirmEdit').textbox('setValue', '');
	$('#roles').val('');
	$('#roleNames').html('');
	changedRoles = {};
	$("#editUserWindow").dialog('center');
	$("#editUserWindow").dialog('open');
}

//提交保存账户信息
function saveUser(add) {
	var url = contextPath + '/addUser.do'; 
	if (!add) {
		
	}
	
	 $('#editUserForm').form('submit',{
    	url: url,
        onSubmit: function(){
            return $(this).form('enableValidation').form('validate');
        },
        success: function(data) {
        	data = $.parseJSON(data);
        	$.messager.show({
        		title: '提示信息',
        		msg: data.message,
        		timeout: 5000,
        		showType: 'slide'
        	});
        	
        	if (data.success) {
	        	changedRoles = {};
        		$('#list').datagrid('reload');
	        	$("#editUserWindow").dialog("close");
        	}
        }
    });
	
}

//取消保存账户信息
function cancelSaveUser() {
	changedRoles = {};
	$("#editUserWindow").dialog('close');
}

function doSearch(value) {
	var queryParams = {
		username: value
	};
	$('#list').datagrid('load', queryParams);
}

</script>
</head>

<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'center', split:false, border:false">
		<div id="divToolbar">
			<table cellpadding="0" cellspacing="0" border="0">
				<tr>
					<td>
						<a id="btnAddYj" href="javascript:;" class="easyui-linkbutton" icon="icon-add" plain="true" onclick="addUser()">新增</a>
					</td>
					<td>
						<a class="datagrid-btn-separator"></a>
					</td>
					<td>
						<input class="easyui-searchbox" id="xm" data-options="prompt:'按账户名搜索', searcher:doSearch" style="width:150px" />
					</td>
				</tr>
			</table>
		</div>
		<table id="list"></table>
	</div>
</div>


<!-- 角色分配窗口 -->
<div id="roleWindow" class="easyui-dialog"  data-options="closed:true, iconCls:'icon-role', width:600, height: 400, modal:true, title:'分配角色', maximizable:false, minimizable:false, resizable:true, buttons:'#btns'">
	<table id="roleList" class="easyui-datagrid" data-options=""></table>
</div>
<div id="btns">
	<a id="saveRolesBtn" class="easyui-linkbutton" iconCls="icon-ok" onclick="confirmRoles()">确定</a>
	<a id="cancelSaveRolesBtn" class="easyui-linkbutton" iconCls="icon-cancel" onclick="$('#roleWindow').dialog('close')">取消</a>
</div>

<!-- 账户编辑窗口 -->
<div id="editUserWindow" class="easyui-dialog" data-options="closed:true, iconCls:'icon-user', width:350, modal:true, title:'新增账户', maximizable:false, minimizable:false, resizable:false, buttons:'#userBtns'">
	<form method="post" id="editUserForm">
		<input name="userSid" id="userSidEdit" type="hidden" style="display: none;"/>
		<table class="formTableStyle">
			<tr>
				<th style="width: 40%;">
					登录名
				</th>
				<td style="">
					<input name="userid"  id="useridEdit" class="easyui-textbox" required="true" style="width: 90%;" validType="maxLength[5]" missingMessage="名称不能为空"/>	
				</td>
			</tr>
			<tr>
				<th>
					密码
				</th>
				<td>
					<input type="password" name="password" id="passwordEdit" class="easyui-textbox" required="true" style="width: 90%;">	
				</td>
			</tr>
			<tr>
				<th>
					确认密码
				</th>
				<td>
					<input type="password" id="passwordConfirmEdit" class="easyui-textbox" required="true" style="width: 90%;">	
				</td>
			</tr>
			<!-- 
			<tr>
				<th>
					状态
				</th>
				<td>
					<input class="easyui-switchbutton" data-options="onText:'启用', offText:'禁用'" checked>
				</td>
			</tr>
			 -->
			<tr>
				<th>
					<a class="easyui-linkbutton" iconCls="icon-role" onclick="addRoles()">所属角色</a>
				</th>
				<td>
					<input type="hidden" style="display: none;" name="roles" id="roles"/>
					<span id="roleNames"></span>
				</td>
			</tr>
		</table>
	</form>
</div>
<div id="userBtns">
	<a id="saveUserBtn" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveUser()">确定</a>
	<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="cancelSaveUser()">取消</a>
</div>
</body>