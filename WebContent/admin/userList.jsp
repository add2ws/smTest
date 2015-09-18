<%@page import="com.bky.util.Const"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String uid = (String) request.getSession().getAttribute(Const.LOGIN_UID_SESSION_KEY);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<script type="text/javascript">
$(function() {
	$('#list').datagrid({
//		title: '用户管理',
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
		/*
		frozenColumns: [ [ {
			field : 'sbxxsid',
			checkbox : false
		} ] ],
		*/
		columns: [ [  {
			field: 'userid',
			title: '登陆ID',
			width: 120,
			align: 'center'
			
		}, {
			field: 'username',
			title: '用户名',
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
				return '<table cellpadding="0" cellspacing="0" border="0"><tr><td><a  class="easyui-linkbutton" iconCls="icon-role" onclick="editRole(\'' + row.sid + '\')">分配角色</a></td><td><a class="datagrid-btn-separator"></a></td><td><a  class="easyui-linkbutton" iconCls="icon-edit" onclick="editRow(true, ' + idx + ')">编辑</a></td><td><a class="datagrid-btn-separator"></a></td><td><a   class="easyui-linkbutton" iconCls="icon-cancel" onclick="deleteRow(\'' + row.sid + '\')">删除</a></td></tr></table>';
//				return '<a class="easyui-linkbutton" iconCls="icon-role" onclick="editRole(\'' + row.sid + '\')">分配角色</a>&nbsp;<a class="easyui-linkbutton" iconCls="icon-edit" onclick="editRow(true, ' + idx + ')">编辑</a>&nbsp;<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="deleteRow(\'' + row.sid + '\')">删除</a>';

			}
		}
	   ] ]

	});
});

function editRole(sid) {
}

function doSearch(value) {
	$('#list').datagrid('load', {
		username: value
	});
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

</script>

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
						<input class="easyui-searchbox" id="xm" data-options="prompt:'按用户名搜索', searcher:doSearch" style="width:150px" />
					</td>
				</tr>
			</table>
		</div>
		<table id="list"></table>
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
						<input name="pszjxx.xm"  id="xmEdit" class="easyui-textbox" required="true" style="width: 90%;" validType="maxLength[5]" missingMessage="名称不能为空"/>	
					</td>
					<th>
						性别：
					</th>
					<td>
						<select name="pszjxx.xb"  id="xbEdit" class="easyui-textbox" style="width: 90%;"></select>	
					</td>
				</tr>
				<tr>
					<th>
						出生年月：
					</th>
					<td>
						 <input name="pszjxx.csnyStr" id="csnyEdit" style="width: 90%" class="easyui-datebox" data-options="editable:false" />			
					</td>
					<th>
						工作单位：
					</th>
					<td>
						<input name="pszjxx.gzdw"  id="gzdwEdit" class="easyui-textbox" style="width: 90%;" validType="maxLength[15]"/>	
					</td>
				</tr>
				<tr>
					<th>
						行政职务：
					</th>
					<td>
						<input name="pszjxx.xzzw"  id="xzzwEdit" class="easyui-textbox" style="width: 90%;" validType="maxLength[15]" missingMessage="名称不能为空"/>	
					</td>
					<th>
						手机号码：
					</th>
					<td>
						<input name="pszjxx.sjhm"  id="sjhmEdit" class="easyui-textbox" style="width: 90%;" validType="maxLength[15]" />	
					</td>
					
				</tr>
				<tr>
					<th>
						取得时间：
					</th>
					<td>
						<input name="pszjxx.qdsjStr" id="qdsjEdit" style="width: 90%" class="easyui-datebox" data-options="editable:false"/>	
					</td>
					<th>
						评审专业：
					</th>
					<td>
						<select name="pszjxx.zpzy"  id="zpzyEdit" class="easyui-combobox" data-options="editable:false" style="width: 90%;"></select>	
					</td>
				</tr>
				<tr>
					<th>
						职称资格：
					</th>
					<td>
						<select name="pszjxx.zczg"  id="zczgEdit" class="easyui-textbox" style="width: 90%;"></select>	
					</td>
					<th>
						聘任时间：
					</th>
					<td>
						<input name="pszjxx.prsjStr" id="prsjEdit" style=" width: 90%" class="easyui-datebox" data-options="editable:false" />
					</td>
				</tr>
				<tr>
					<th>
						参加工作时间：
					</th>
					<td>
						<input name="pszjxx.cjgzsjStr"id="cjgzsjEdit"  style="width: 90%" class="easyui-textbox"  />	
					</td>
					<th>
						毕业时间：
					</th>
					<td>
						<input name="pszjxx.bysjStr" id="bysjEdit" style=" width: 90%" class="easyui-textbox"  />
					</td>
				</tr>
				<tr>
					<th>
						现从事专业：
					</th>
					<td>
						<select name="pszjxx.xcszy"  id="xcszyEdit" class="easyui-textbox" style="width: 90%;"></select>	
					</td>
					<th>
						现从事专业年限：
					</th>
					<td>
						<input name="pszjxx.xcszynx"  id="xcszynxEdit" class="easyui-numberbox" style="width: 90%;" />	
					</td>
					
				</tr>
				<tr>
					<th>
						毕业院校：
					</th>
					<td>
						<input name="pszjxx.byyx"  id="byyxEdit" class="easyui-textbox" style="width: 90%;" validType="maxLength[15]" />	
					</td>
					
					<th>
						学历：
					</th>
					<td>
						<select name="pszjxx.xl"  id="xlEdit" class="easyui-textbox" style="width: 90%;"></select>	
					</td>
					
				</tr>
				<tr>
					
					<th>
						学位：
					</th>
					<td>
						<select name="pszjxx.xw"  id="xwEdit" class="easyui-textbox" style="width: 90%;"></select>	
					</td>
					
					<th>
						状态：
					</th>
					<td>
						<select name="pszjxx.zjzt"  id="zjztEdit" class="easyui-textbox" style="width: 90%;"></select>	
					</td>
				</tr>
			</table>
		</form>
	</div>