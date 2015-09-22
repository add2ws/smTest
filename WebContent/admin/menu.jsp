<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>	 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<head>
<title>信息管理系统</title>
<jsp:include page="/page/inc_header.jsp"></jsp:include>
<script type="text/javascript" src="<%=path%>/js/admin/menu.js"></script>

<style>
.modified {
	border: solid 2px red;
}
</style>
<script type="text/javascript">

</script>
</head>
<body>
<div class="easyui-layout" fit="true">
	<div data-options="region:'west', split:true, border:true, collapsible:false" style="width: 350px; padding: 8px; ">
		<!-- 
		<input id="searchBox" style=""/>
		 -->
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
                  <th>排序号:</th>
                  <td><span id="sortId"></span> </td>
              </tr>
              <tr>
                  <th>操作:</th>
                  <td> 
                  	<a id="editBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-edit" onclick="editMenu()" plain="true">编辑</a>
                  	<a id="deleteBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-cross" onclick="deleteMenu()" plain="true">删除</a>
                  	<a id="roleBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-role" onclick="authority()" plain="true">分配角色权限</a>
                  	<a id="childBtn" data-options="disabled:true" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-menu" onclick="addChildMenu()" plain="true">增加子菜单</a>
                  </td>
              </tr>
          </table>
		
	</div>
	
	<!-- 子菜单编辑窗口 -->
	<div id="editMenuWindow" class="easyui-dialog" data-options="closed:true, iconCls:'icon-menu', width:660, modal:true, title:'编辑菜单', maximizable:false, minimizable:false, resizable:true">
		<form class="easyui-form" id="editForm" method="post">
  			<input type="hidden" style="display: none;" name="sid" id="sidEdit" value=""/>
  			<input type="hidden" style="display: none;" name="pSid" id="pSidEdit" value=""/>
            <table class="formTableStyle">
             	<tr>
                    <th width="100">父菜单名称：</th>
                    <td width="160"><span id="parentNameEdit"></span></td>
                    <th width="100">菜单类型：</th>
                    <td width="220">
                    	<label>
							<input name="menuType" id="menuTypeEdit" type="radio" value="1"/>iframe页面
						</label>&nbsp;
						<label>
							<input name="menuType" id="menuTypeEdit" type="radio" checked="checked" value="2"/>脚本
						</label>&nbsp;
						<label>
							<input name="menuType" id="menuTypeEdit" type="radio" value="0"/>菜单组
						</label>
					</td>
                </tr>
                <tr>
                    <th>菜单名称：</th>
                    <td><input name="name" id="nameEdit" class="easyui-textbox" data-options="required:true"></input></td>
                    <th>模块地址：</th>
                    <td><input name="address" id="addressEdit" class="easyui-textbox"></input></td>
                </tr>
                <tr>
                    <th>是否有效：</th>
                    <td>
                    	<input class="easyui-switchbutton" id="isValidBtn" onText="是" offText="否" style="height: 23px; width: 45px;">
						<input name="isValid" id="isValidEdit" type="hidden" value="1" style="display: none;"/>
					</td>
                    <th>是否可见：</th>
                    <td>
						<input class="easyui-switchbutton" id="visibleBtn" onText="是" offText="否" style="height: 23px; width: 45px;" >
						<input name="visible" id="visibleEdit" type="hidden" value="1" style="display: none;"/>
					</td>
                </tr>
                <tr>
                    <th>菜单图标：</th>
                    <td>
                    	<select name="iconClass" id="iconClassEdit" class="easyui-combobox" style="width: 142px;" ></select>
					</td>
                    <th>说明：</th>
                    <td><input name="memo" id="memoEdit" class="easyui-textbox"></input></td>
                </tr>
                 <tr>
	                  <th>排序号:</th>
	                  <td colspan="3"><input name="sortId" id="sortIdEdit" value="0" class="easyui-numberspinner" style="width:142px;" required="required" data-options="max:9999,editable:true"/></td>
              	</tr>
            </table>
        </form>
	</div>
	
	
	<!-- 角色分配窗口 -->
	<div id="roleWindow" class="easyui-dialog"  data-options="closed:true, iconCls:'icon-menu', width:600, height: 400, modal:true, title:'权限分配', maximizable:false, minimizable:false, resizable:true, buttons:'#btns'">
		<table id="roleList" class="easyui-datagrid" data-options=""></table>
	</div>
	<div id="btns">
		<a id="saveAuthBtn" class="easyui-linkbutton" iconCls="icon-ok">确定</a>
		<a class="easyui-linkbutton" iconCls="icon-cancel" onclick="cancelSaveAuths()">取消</a>
	</div>
	
</div>
</body>