<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>	 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<style>
.switchbutton-on {
  background: #FF6666;
  color: #fff;
}
</style>
<script type="text/javascript">
var contextPath = "<%=path%>";

$(function() {
	reloadMenu();
	
	 $('#searchBox').textbox({
		 prompt: '输入名称过滤',
		 onChange: function(newVal, oldVal) {
			 $('#sysMenuTree').tree('doFilter', newVal);
		 }
		 
	 });

	$('#menuIcon').combobox({
		editable: false,
		textField: 'name',
		valueField: 'code',
		url: contextPath + '/js/jquery-easyui-1.4.3/themes/icon_list_data.json',
		formatter: function(row) {
			var s = '<div style="cursor: pointer;"><span class="icon ' + row.name + '" style="float: left; width: 16px; height: 16px;"></span>&nbsp;' + row.name + '</div>';
			s += '<div style="clear: both;"></div>';
			return s;
		},
		onSelect: function(row) {
		},
		onLoadSuccess: function () {
		}
		
	});
	
	$('#menuIconEdit').combobox({
		editable: false,
		textField: 'name',
		valueField: 'code',
		url: contextPath + '/js/jquery-easyui-1.4.3/themes/icon_list_data.json',
		formatter: function(row) {
			var s = '<div style="cursor: pointer;"><span class="icon ' + row.name + '" style="float: left; width: 16px; height: 16px;"></span>&nbsp;' + row.name + '</div>';
			s += '<div style="clear: both;"></div>';
			return s;
		},
		onSelect: function(row) {
		},
		onLoadSuccess: function () {
		}
		
	});
	
});

function reloadMenu() {
	$('#sysMenuTree').tree({
		url: contextPath + '/menuTree.do',
		lines: true,
		animate: true,
		checkbox: true,
		onLoadSuccess: function(node, data) {
			var id = $('#sidEdit').val();
			if (!id) {
				id = 0;
			}
			var n = $(this).tree('find', id);
			$(this).tree('select', n.target);
			
		},
		formatter: function(node) {
			if (node.memo) {
				return node.text + '(' + node.memo + ')';
			} else {
				return node.text;
			}
		},
		onSelect: function(node) {
			
			var parent = $(this).tree('getParent', node.target);
			var isValid = node.isValid == '1'?'有效':'无效';
			var visible = node.visible == '1'?'可见':'不可见';
			var menuType = '';
			if (node.menuType == '0') {
				menuType = '菜单组';
			} else if (node.menuType == '1') {
				menuType = '脚本';
			} else if (node.menuType == '2') {
				menuType = 'iframe页面';
			}
			
			$('#menuSid').val(node.sid);
			$('#name').html(node.name);
			$('#address').html(node.address);
			$('#memo').html(node.memo);
			$('#iconClassImg').removeClass().addClass(node.iconCls);
//			$('#iconClass').html(node.iconClass);
			$('#isValid').html(isValid);
			$('#visible').html(visible);
			$('#menuType').html(menuType);
			
			//选择了一级菜单
			if (node.id == 0) {
				$('#editBtn').linkbutton('disable');
				$('#deleteBtn').linkbutton('disable');
				$('#roleBtn').linkbutton('disable');
			} else {
				$('#editBtn').linkbutton('enable');
				$('#deleteBtn').linkbutton('enable');
				$('#roleBtn').linkbutton('enable');
			}
			
			//如果选择了三级菜单则禁用添加子菜单按钮
			var isBottomMenu = false;
			if (parent) {
				var pp = $(this).tree('getParent', parent.target);
				if (pp) {
					pp = $(this).tree('getParent', pp.target);
					if (pp) {
						isBottomMenu = true;
					} 
				}
			}
			if (isBottomMenu) {
				$('#childBtn').linkbutton('disable');
			} else {
				$('#childBtn').linkbutton('enable');
			}
		}
	});
}

function submitForm(){
    $('#editForm').form('submit',{
    	url: contextPath + '/saveMenu.do',
        onSubmit: function(){
            return $(this).form('enableValidation').form('validate');
        },
        success: function(data) {
        	data = $.parseJSON(data);
        	$.messager.show({
        		title: '提示信息',
        		msg: data.message,
        		timeout: 3000,
        		showType: 'slide'
        	});
        	reloadMenu();
        }
    });
}

function deleteMenu() {
	
}
function addChildMenu() {
	editMenu(true);
}
function editMenu(add) {
	
	if (add) {
		obj2Form('#editForm', null);	
	} else {
		var node = $('#sysMenuTree').tree('getSelected');
		obj2Form('#editForm', node);
	}
	
	$("#editMenu").dialog({
		buttons : [ {
			text : "保存",
			iconCls : "icon-ok",
			handler : function() {
				 $('#editForm').form('submit',{
				    	url: contextPath + '/saveMenu.do',
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
					        	reloadMenu();
					        	$("#editMenu").dialog("close");
				        	}
				        }
				    });
			}

		}, {
			text : "取消",
			iconCls : "icon-cancel",
			handler : function() {
				$("#editMenu").dialog("close");
			}
		} ]
	});
	
	$('#editMenu').dialog('center');
	$('#editMenu').dialog('open');
	
}

var modifyAuths;
function authority() {
	modifyAuths = null;

	$('#roleWindow').dialog({
		buttons : [ {
			text : "保存",
			iconCls : "icon-ok",
			handler : function() {
				var url = contextPath + '/modifyAuths.do';
				var auths = JSON.stringify(modifyAuths);
				$.post(url, {menuSid: $('#menuSid').val(), auths: auths}, function(data) {
					
					$.messager.show({
		        		title: '提示信息',
		        		msg: data.message,
		        		timeout: 5000,
		        		showType: 'slide'
		        	});
		        	
					if (data.success) {
						$('#roleWindow').dialog('close');
					} else {
						
					}
				
				}, 'json');
			}

		}, {
			text : "取消",
			iconCls : "icon-cancel",
			handler : function() {
				if (modifyAuths == null) {
					$("#roleWindow").dialog("close");
				} else {
					$.messager.confirm('提示信息', '确定取消更改吗？', function(r) {
						if (r) {
							$("#roleWindow").dialog("close");
						}
					});
				}
			}
		} ]
	});

	$('#roleWindow').dialog('open');
	
	$('#roleList').datagrid({
		url : contextPath + '/menu2RoleList.do',
		loadMsg : '数据加载中......',
		fit: true,
    	striped: false,
		remoteSort: false,
		toolbar: '#divToolbar',
		pagination: true,
		rownumbers: false,
		fitColumns: true,
		singleSelect:true,
		queryParams: {"menuSid": $('#menuSid').val()},
		onLoadSuccess: function(data) {
			$(".datagrid-cell .easyui-linkbutton").linkbutton({plain: false});
			$(".datagrid-cell .easyui-combobox").combobox({
				onSelect: function (row) {
					var t = row.value.split('@');
					var roleSid = t[0];
					var right = t[1];
					if (modifyAuths == null) {
						modifyAuths = {};
					}
					modifyAuths[roleSid] = right;
				}
				
			});
			$('#list').datagrid('clearSelections');

		}, columns: [ [  {
			field: 'roleName',
			title: '角色名称',
			width: 120,
			align: 'center'
			
		}, {
			field: 'right',
			title: '权限',
			width: 80,
			align: 'center',
			fixed: true,
			formatter: function(val, row, idx) {
				var html = '<select class="easyui-combobox" editable="false" panelHeight="80">';
				if (val == '0') {
					html += '<option selected="true" value="' + row.roleSid + '@0" >无权限</option>';
				} else {
					html += '<option value="' + row.roleSid + '@0" >无权限</option>';
				}
				if (val == '1') {
					html += '<option selected="true" value="' + row.roleSid + '@1">可读</option>';
				} else {
					html += '<option value="' + row.roleSid + '@1">可读</option>';
				}
				if (val == '2') {
					html += '<option selected="true" value="' + row.roleSid + '@2">可写</option>';
				} else {
					html += '<option value="' + row.roleSid + '@2">可写</option>';
				}
				
				html += '</select>';
				return html;
			}
		}
	   ] ]

	});
}

function authorityAll() {
	
}
</script>
<div class="easyui-layout" fit="true">
	<div id="lm" data-options="region:'west', split:true, border:true, collapsible:false" style="width: 350px; padding: 8px; ">
		<input id="searchBox" style=""/>
		<ul id="sysMenuTree">
		</ul>
	</div> 
	<div data-options="region:'center', split:true, border:true, title:'菜单信息', collapsible:false" style="position: relative;" >
		<input type="hidden" id="menuSid" value="" style="display: none;">
          <table class="formTableStyle">
          	<tr>
                  <th width="120">菜单类型:</th>
                  <td>
                  	<span id="menuType"></span> 
			</td>
              </tr>
              <tr>
                  <th>菜单名称:</th>
                  <td><span id="name" ></span></td>
              </tr>
              <tr>
                  <th>模块地址:</th>
                  <td><span id="address"></span> </td>
              </tr>
              <tr>
                  <th>是否有效:</th>
                  <td><span id="isValid"></span> </td>
              </tr>
              <tr>
                  <th>是否可见:</th>
                  <td><span id="visible"></span> </td>
              </tr>
              <tr>
                  <th>菜单图标:</th>
                  <td><span id="iconClassImg" style="width: 16px; height: 16px; display: inline-block;"></span><span id="iconClass"></span> </td>
              </tr>
              <tr>
                  <th>说明:</th>
                  <td><span id="memo"></span> </td>
              </tr>
              <tr>
                  <th>操作:</th>
                  <td> 
                  	<a id="editBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" onclick="editMenu()" plain="true">编辑</a>
                  	<a id="deleteBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cross" onclick="deleteMenu()" plain="true">删除</a>
                  	<a id="roleBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-role" onclick="authority()" plain="true">分配角色权限</a>
                  	<a id="roleBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-role" onclick="authorityAll()" plain="true">批量分配角色权限</a>
                  	<a id="childBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-menu" onclick="addChildMenu()" plain="true">增加子菜单</a>
                  </td>
              </tr>
          </table>
		
	</div>
	
	<!-- 子菜单编辑窗口 -->
	<div id="editMenu" class="easyui-dialog" data-options="closed:true, iconCls:'icon-menu', width:500, modal:true, title:'编辑菜单', maximizable:false, minimizable:false, resizable:false">
		<form class="easyui-form" id="editForm" method="post">
  			<input type="hidden" style="display: none;" name="sid" id="sidEdit" value=""/>
  			<input type="hidden" style="display: none;" name="pSid" id="pSidEdit" value=""/>
            <table class="formTableStyle">
            	<tr>
                    <th width="120">菜单类型:</th>
                    <td>
                    	<label>
							<input name="menuType" type="radio" checked="checked" value="1"/>脚本
						</label>&nbsp;
						<label>
							<input name="menuType" type="radio" value="2"/>iframe页面
						</label>&nbsp;
						<label>
							<input name="menuType" type="radio" value="0"/>菜单组
						</label>
					</td>
                </tr>
                <tr>
                    <th>菜单名称:</th>
                    <td><input name="name" id="nameEdit" class="easyui-textbox" data-options="required:true"></input></td>
                </tr>
                <tr>
                    <th>模块地址:</th>
                    <td><input name="address" id="addressEdit" class="easyui-textbox"></input></td>
                </tr>
                <tr>
                    <th>是否有效:</th>
                    <td>
                    	<label>
							<input name="isValid" id="isValid1Edit" type="radio" value="1"/>是&nbsp;
						</label>
						<label>
							<input name="isValid" id="isValid0Edit" type="radio" value="0"/>否&nbsp;
						</label>
					</td>
                </tr>
                <tr>
                    <th>是否可见:</th>
                    <td>
						<label>
							<input name="visible" id="visible1Edit"  type="radio" value="1" />是&nbsp;
						</label>
						<label>
							<input name="visible" id="visible0Edit" type="radio" value="0"/>否&nbsp;
						</label>
					</td>
                </tr>
                <tr>
                    <th>菜单图标:</th>
                    <td>
                    	<select name="iconClass" id="menuIconEdit" class="easyui-combobox" style="width: 142px;" ></select>
					</td>
                </tr>
                <tr>
                    <th>说明:</th>
                    <td><input name="memo" id="memoEdit" class="easyui-textbox"></input></td>
                </tr>
            </table>
        </form>
	</div>
	
	
	<!-- 角色分配窗口 -->
	<div id="roleWindow" class="easyui-dialog"  data-options="closed:true, iconCls:'icon-menu', width:600, height: 400, modal:true, title:'权限分配', maximizable:false, minimizable:false, resizable:true">
		<table id="roleList" class="easyui-datagrid" data-options="fit:true"></table>
	</div>
	
</div>