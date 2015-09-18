/**
 * 城市参数设置
 */
var winTitle="城市参数设置";
var winWidth=800;
var winHeigth=420;

$(document).ready(function(){

	
	$('#queryDiv').css("width",fixWidth(0.3));
	var rowCount = parseInt((document.body.clientHeight - 144)/22, 10); //175:是除去数据行的高度;22:行高
	//初始化列表
	$('#dataList').datagrid({
		width:fixWidth(1),
		height:fixHeight(1,34),
		nowrap: true,
		striped: true,
		collapsible:true,
		url:'admin/citySetList.action',
		loadMsg:'数据加载中......',
		onLoadSuccess: function() {
			$('#dataList').datagrid('clearSelections');
		},
		remoteSort: false,
		singleSelect:true,
		idField:'sid',
		columns:[[
		    {field:'ck',width:fixWidth(0.05),checkbox:true}, 
			{field:'name',title:'地区名称',width:fixWidth(0.1),align:'center'},
			{field:'dafaultTransactor',title:'默认审核办理人',width:fixWidth(0.15),align:'center'} //,
			//{field:'peopleAmount',title:'人口总数',width:fixWidth(0.1),align:'center'}
		]],
		rownumbers:true,
		toolbar:[
		{
			id:'btnEdit',
			text:'编辑',
			iconCls:'icon-edit',
			handler:openEditDiv
		}]
	});
	// 初始化城市下拉框
	Select.initCascadeComboBox1("city", "T_DM_GY_XZQHDS_CITY12");
	//Select.initCascadeComboBox11("city","3405","T_DM_GY_XZQHXQ");
	$('#editDiv').dialog({
		title:'编辑城市参数',
		closed:true,
		minimizable:false,
		maximizable:true,
		width:400,
		height:250,
		modal:true,
		resizable:true,
		iconCls:"icon-blank",
		buttons:[{
			text:'保存',
			iconCls:'icon-ok',
			handler:function(){
				$("#ifr_edit").contents().find("#btnSubmit").click();
				$.messager.alert('提示','数据保存成功！');
				closeDialog();
//				var ifr_saveEdit = document.getElementById("ifr_edit");
//				ifr_saveEdit.contentWindow.submitEdit();
			}
		},{
			text:'取消',
			iconCls:'icon-cancel',
			handler:function(){
				$('#editDiv').dialog('close');
			}
		}]
	});

	$(window).wresize(function(){
		$('#dataList').datagrid('resize', {
			width:fixWidth(1),
			height:fixHeight(1,68)
		});
		$(".searchTableStyle").css("width","100%");
	});
});

	/**
	 * 查询函数
	 */
	function QueryData(){
		var querySid = $('#city').combobox('getValue');
		var queryParams = $('#dataList').datagrid('options').queryParams; 
		queryParams.queryCitySetting = new Object();
		queryParams.queryCitySetting.sid = querySid;
		$("#dataList").datagrid('reload');  
	}
	
	/**
	 * 关闭弹出的修改窗口
	 */
	function closeDialog(){
		$('#editDiv').dialog('close');
		$("#dataList").datagrid('reload');  
	}
	
	//修改
	function openEditDiv(){
		var row = $('#dataList').datagrid("getSelected");
		if(!row){
			$.messager.alert("提示","请先选择一项数据！");
			return;
		}
		if(row>1){
			$.messager.alert("提示","不能同时编辑多条数据,请先选择一项数据！");
			return;
		}
		if (navigator.userAgent.indexOf('Firefox') >= 0) {
	        $('#editFrame').attr('src', "");
	        setTimeout(function () { 
	        	$("#ifr_edit").attr("src", "admin/citySetEdit.action?cityId="+row.sid);
				$('#editDiv').dialog('open');
	        }, 300);
	    }
	    else {
	    	$("#ifr_edit").attr("src", "admin/citySetEdit.action?cityId="+row.sid);
			$('#editDiv').dialog('open');
	    }
	}
