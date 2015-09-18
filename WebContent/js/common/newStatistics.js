//隐藏和显示高级选项
function showdiv(){
 			var btn1=document.getElementById('modify');
 			var box1=document.getElementById('hiddenDIV');
 			var dis = document.getElementById("hiddenDIV").style.display;
 				if(dis==""){
 					document.getElementById("hiddenDIV").style.display="none";
 					$("#hiddenDIV input:checkbox:checked").each(function(){
 						if($(this).attr("checked")){
 							$(this).attr("customcheckProperty","no");
 							$(this).attr("checked",false);
 							$("#"+$(this).attr("id")+$(this).attr("value")).css("backgroundColor","#C3DDF5");
 						}
 					});
 					if($('#arearange1').combobox('getValue')!="df"){
 						$('#arearange1').combobox('setValue','df');
 					}
 					if($('#pricerange1').combobox('getValue')!="df"){
 						$('#pricerange1').combobox('setValue','df');
 					}
 					$('#startPrice').attr("value","");
 					$('#endPrice').attr("value","");
 					$('#startTime1').attr("value","");
 					$('#endTime1').attr("value","");
 					//btn1.name="默认";
 				}else{
 					document.getElementById("hiddenDIV").style.display="";
 					
 					//btn1.name="高级";
 			}
}
var csStr = "";
var countryStr = "";
var gjcsStr = "";
var xzStr = "";
//初始化
$(document).ready(function(){
	//关于行政区域的初始化
	var val = $('#cc').combotree('getValue');
		$.ajax({
			url:contextRoot+'/jcfx/jcfxAction!getCounty.action?sid='+val,
			type:'post',
			dataType:'text',
			success:function(ret){
				var dataObj=eval("{["+ret+"]}");
				$("#reback").html("");
			$.each(dataObj,function (i,n){
				$("#reback").append(
					"<li style='width:110px;'><div style='float: left;margin-right: 1px;'>"+
					"<input type='checkbox' title="+n.mc+" id='xzq' value="+n.xzqhxqDm+"  customcheckPropertycheckProperty= 'no' onclick='checkboxChkCity(this)'/>"+
					"</div>"+
					"<div id = 'div"+n.xzqhxqDm+"' style='width:65px; text-align:center; valign :center; float: left;border: 0px solid #cbcbcb;'>"
							+n.mc+
						"</div></li>"
				);
			});
			$.ajax({
				url:contextRoot+ '/jcfx/jcfxAction!getCountyList.action',
				type:'post',
				dataType:"json",
			    cache :false,
			    success : function(json){
					$("#countryDiv").html("");
					$.each(json.rows,function(n,m){
						$.each(m,function(k,v){
							if(k==0){
								$("#countryDiv").append("<div id='cityC"+v.cityId+"' style='display:none;'>" +
														"<div style='height:20px;font-weight:bold;padding:0;border-bottom: 1px #daa232 solid;'>"+
														"<div style=' float:left; width:100px;height:100%;padding:4px 0 0 20px;'>"+
														v.cityMc + "</div>" +
														"<div style='float: right;width:100px;text-align: right;padding-top: 3px;'>"+
														"<a href='javascript:void(0);' onclick='checkboxAllSelectFunction("+v.cityId+")'"+" style='font-weight: normal'>全选</a>&nbsp;"+
														"<a href='javascript:void(0);' onclick='checkboxNoSelectFunction("+v.cityId+")'"+" style='font-weight: normal'>反选</a>&nbsp;</div>"+
														"</div><div style='clear:both;'></div><ul id ='"+v.cityId+"ul'></ul></div><div style='clear:both;'></div>");
								
							}
							$("#"+v.cityId+"ul").append("<li style='width:110px;'><div style='float: left;margin-right: 1px;'>"+
									"<input type='checkbox'  id='country' value="+v.countryId+" customcheckPropertycheckProperty= 'no' onclick='checkboxChk(this)' />"+
									"</div>"+
									"<div id = 'div"+v.countryId+"' style='width:65px;text-align:center;float: left;border: 0px solid #cbcbcb;'>"
									+v.countryMc+
									"</div></li>"
								);
						});
					});
				}
			});
			}
			
		});
		
	

	/*$('#cc').combobox({
		onChange:function(){
			var val = $('#cc').combotree('getValue');
			$.ajax({
				url:contextRoot +  '/jcfx/jcfxAction!getCounty.action?sid='+val,
				type:'post',
				dataType:'text',
				success:function(ret){
					var dataObj=eval("{["+ret+"]}");
					$("#reback").html("");
					$.each(dataObj,function (i,n){
						$("#reback").append(
							"<li style='width:110px;'><div style='float: left;margin-right: 2px;'>"+
							"<input type='checkbox'  id='xzq' value="+n.xzqhxqDm+" customcheckPropertycheckProperty= 'no' onclick='checkboxChkCity(this)' />"+
							"</div>"+
							"<div id = 'div"+n.xzqhxqDm+"' style='width:65px;text-align:center;float: left;border: 1px solid #cbcbcb;background-color: #C3DDF5'>"
								+n.mc+
							"</div></li>"
						);
					});
				}
			});
		}
	});*/
	$("input:checkbox").each(function(){
		if($(this).attr("checked")){
			$("#div"+$(this).attr("value")).css("backgroundColor","");
		}
	});
	
	var dt =new Date();
	var month = ((dt.getMonth()+1)<10?"0":"")+ (dt.getMonth()+1);
	$("#startTime").attr("value",dt.getFullYear()+ "-" + month);
	$("#endTime").attr("value",dt.getFullYear()+ "-" + month);
	$("#startTime2").attr("value",dt.getFullYear()+ "-" + month + "-" +dt.getDate());
	$("#endTime2").attr("value",dt.getFullYear()+ "-" + month + "-" +dt.getDate());
});


function checkChk1(flag,id){
	if(flag=='type5' || flag =='type6'){
		$("#tjRange03").attr("checked",false);
		$("#fwqzxx").show();
		$("#ksfwxx").hide();
	}
	else if(flag=='type3')
	{
		$("#tjRange02").attr("checked",false);
		$("#tjRange03").attr("checked",false);
		$("#fwqzxx").hide();
		$("#ksfwxx").hide();
	}else
	{
		$("#ksfwxx").show();
		$("#fwqzxx").show();
	}
	$("#xzqarea").empty();
	$("#xzqarea_query").empty();
	$("#"+id+" input:radio").each(function(){
		if($(this).attr("checked")=="checked"){
			$("#"+$(this).attr("id")+$(this).attr("value")).css("backgroundColor","#FFE4B5");
			$("#xzqarea").append("<span id='"+$(this).val()+"'>&nbsp;"+$(this).attr("title")+"</span>");
			$("#xzqarea_query").append("&nbsp;<span id='"+$(this).val()+"_query'>&nbsp;"+$(this).attr("title")+"</span>");
		}else{
			$("#"+$(this).attr("id")+$(this).attr("value")).css("backgroundColor","");
		}
		
	});
}
function checkChk(obj){
	if($(obj).attr("customcheckProperty") =="yes"){
		$(obj).attr("customcheckProperty","no");
		$(obj).attr("checked",false);
		$("#"+$(obj).attr("id")+$(obj).attr("value")).css("backgroundColor","");
	}else{ 
		$(obj).attr("customcheckProperty","yes");
		$(obj).attr("checked",true);
		$("#"+$(obj).attr("id")+$(obj).attr("value")).css("backgroundColor","#FFE4B5");
		$("#xzqarea").append("<span id='"+$(obj).val()+"'>"+$(obj).attr("title")+"&nbsp;</span>");
		$("#xzqarea_query").append("<span id='"+$(obj).val()+"_query'>"+$(obj).attr("title")+"&nbsp;</span>");
	}
}
function checkChk21(obj){
	if($(obj).attr("customcheckProperty") =="no"){
		$(obj).attr("customcheckProperty","yes");
		$(obj).attr("checked",true);
		$("#"+$(obj).attr("id")+$(obj).attr("value")).css("backgroundColor","#FFE4B5");
	}else{ 
		$(obj).attr("customcheckProperty","no");
		$(obj).attr("checked",false);
		$("#"+$(obj).attr("id")+$(obj).attr("value")).css("backgroundColor","");
		
	}
}

function getAll(){
	$("#CityDiv input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			checkboxAllSelect("cityC"+$(this).attr("value"));		
		}
	});
}

function getNo(){
	$("#CityDiv input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			checkboxNoSelect("cityC"+$(this).attr("value"));		
		}
	});
}

function checkboxAllSelectForThis(id){
	$("#xzqarea").empty();
	$("#xzqarea_query").empty();
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			$(this).attr("checked",true);
			$(this).attr("customcheckProperty","yes");
			$("#"+$(this).attr("id")+$(this).attr("value")).css("backgroundColor","#FFE4B5");
			$("#xzqarea").append("<span id='"+$(this).val()+"'>&nbsp;"+$(this).attr("title")+"</span>");
			$("#xzqarea_query").append("<span id='"+$(this).val()+"_query'>"+$(this).attr("title")+"</span>");
		}
	});
}
function checkboxNoSelectForThis(id){
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			checkChk(this);
		}
	});
}

/**
 * 包含县辖区
 * @param obj
 * @return
 */
function countryCheck(obj){
	if($("#CityDiv input:checkbox:checked").size()<1){
		$(obj).attr("checked",false);
		alert("请选择查询行政区范围!");
		return;
	}
	checkChk(obj);
	if($(obj).attr("checked")){
		$("#selectAll").show();
		$("#countryDiv").show();
		$("#CityDiv input:checkbox:checked").each(function(){
			if($(this).attr("checked")){
				$("#cityC"+$(this).attr("value")).show();
			}
		});
	}else{
		$("#selectAll").hide();
		$("#countryDiv").hide();
		$("#CityDiv input:checkbox:checked").each(function(){
			if($(this).attr("checked")){
				$("#cityC"+$(this).attr("value")+" input:checkbox").each(function(){
					$(this).attr("checked",false);
					$("#div"+$(this).attr("value")).css("backgroundColor","");
				});
				$("#cityC"+$(this).attr("value")).hide();
			}
		});
	}
	
	
}
/**
 * 所有div选中的checkbox按类连接
 * @return
 */
function canShuSheZhi(){
	var gjcs = "";
	
	csStr = "";
	$("#CityDiv input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("CityDiv", 0)<0){
				csStr+="CityDiv,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("CityDiv", 0)<0)){
		csStr+="|";
	}
	$("#countryDiv input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("countryDiv", 0)<0){
				csStr+="countryDiv,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("countryDiv", 0)<0)){
		csStr+="|";
	}
	$("#tjType input:radio:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("tjType", 0)<0){
				csStr+="tjType,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("tjType", 0)<0)){
		csStr+="|";
	}
	$("#tjName input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("tjName", 0)<0){
				csStr+="tjName,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("tjName", 0)<0)){
		csStr+="|";
	}
	$("#thb input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("thb", 0)<0){
				csStr+="thb,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("thb", 0)<0)){
		csStr+="|";
	}
	$("#houseSource input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("houseSource", 0)<0){
				csStr+="houseSource,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("houseSource", 0)<0)){
		csStr+="|";
	}
	$("#tjRange input:checkbox:checked").each(function(){
		if($(this).attr("checked")){
			if(csStr.indexOf("tjRange", 0)<0){
				csStr+="tjRange,";
			}
			csStr+=$(this).attr("value")+",";
		}
	});
	if(!(csStr.indexOf("tjRange", 0)<0)){
		csStr+="|";
	}
	 $("#csDiv").attr("value",csStr);
}
/**
 * 高级条件设置
 * @return
 */
function gaojiTiaoJian(){
	gjcsStr = "";
}
/***
 * 统计
 * @return
 */
function tongJi(){
	if($("#CityDiv input:checkbox:checked").size()<1){
		alert("请选择查询行政区范围!");
		return;
	}
	if(startTime == ""){
		alert("开始时间不能为空!");
		return;
	} 
	
	if(endTime == ""){
		alert("结束时间不能为空!");
		return;
	} 
	
	if($("#tjType input:radio:checked").size()<1){
		alert("请选择统计类型!");
		return;
	}
	if($("#tjName input:checkbox:checked").size()<1){
		alert("请选择统计字段!");
		return;
	}
	if($("#houseSource input:checkbox:checked").size()<1){
		alert("请选择房屋数据源!");
		return;
	}
	if($("#tjRange input:checkbox:checked").size()<1){
		alert("请选择统计范围 !");
		return;
	}
	var startTime ="";
	var endTime ="";
	if($("#timeD2").attr("checked")){
		startTime = $.trim($('#startTime2').val().substr(0,4)+$('#startTime2').val().substr(5,2)+$('#startTime2').val().substr(8,2));
		endTime = $.trim($('#endTime2').val().substr(0,4)+$('#endTime2').val().substr(5,2)+$('#endTime2').val().substr(8,2));
		var Date1 = new Date(startTime.substr(0, 4),startTime.substr(4, 2)-1,startTime.substr(6, 2)); 
		var Date2 = new Date(endTime.substr(0, 4),endTime.substr(4, 2)-1,endTime.substr(6, 2)); 
		var iDays = parseInt(Math.abs(Date1 - Date2) / 1000 / 60 / 60 /24); 
//		if(iDays>30){
//			alert("只允许统计31天以内数据！");
//			return ;
//		}
	}else{
		startTime = $.trim($('#startTime').val().substr(0,4)+$('#startTime').val().substr(5,2));
		endTime = $.trim($('#endTime').val().substr(0,4)+$('#endTime').val().substr(5,2));
	}
	canShuSheZhi();
	$(function(){
		$('#addDiv').dialog({
			title:'统计报表',
			closed:true,
			minimizable:false,
			maximizable:true,
			maximized:true,
			width:800,
			height:420,
			modal:true,
			//onMove:function(){$(this).panel("move",{left:1,top:1});},
			//onMove:function(){$('#addDiv').draggable('disabled',true);},
			resizable:false,
			iconCls:"icon-blank"
		});
	});
	var url=contextRoot + '/jcfx/jcfxAction!tongJi.action';
	$("#ifr_addApply").hide();
	$("#addDiv").dialog('open');
	$("#loading").show();
	$.post(
			url,
		{
			startTime:startTime,
			endTime:endTime,
			csStr:csStr
		},
		function(date){
			 $("#loading").hide();
			 $("#ifr_addApply").attr("src", contextRoot+"/pages/jcfx/result.jsp");
			 $("#ifr_addApply").show();
		}
	);
}
/**
 * 查询
 * @return
 */
function chaXun(){
	if($("#CityDiv input:checkbox:checked").size()<1){
		alert("请选择查询行政区范围!");
		return;
	}
	if(startTime == ""){
		alert("开始时间不能为空!");
		return;	
	} 

	if(endTime == ""){
		alert("结束时间不能为空!");
		return;
	} 
	var startTime ="";
	var endTime ="";
	if($("#timeD2").attr("checked")){
		startTime = $.trim($("#startTime2").val());
		endTime = $.trim($("#endTime2").val());
	}else{
		startTime = $.trim($("#startTime").val());
		endTime = $.trim($("#endTime").val());
	}
	canShuSheZhi();
	$(function(){
		$('#addDiv').dialog({
			title:'统计报表',
			closed:true,
			minimizable:false,
			maximizable:true,
			maximized:true,
			width:800,
			height:420,
			modal:true,
			resizable:true,
			iconCls:"icon-blank"
		});
	});
	$("#ifr_addApply").hide();
	$("#addDiv").dialog('open');
	$("#loading").show();
	var url='/house/statistics/newStatistics_chaXun.action';
	$.post(
			url,
		{
			startTime:startTime,
			endTime:endTime,
			csStr:csStr
		},function(date){
			 $("#loading").hide();
			 $("#ifr_addApply").attr("src", "/house/statistics/newStatistics/queryList.jsp");
			 $("#ifr_addApply").show();
		}
	);
}

function checkboxNoSelectforc(id,str){
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			checkboxChkCity(this,str);
		}
	});
}
function checkboxAllSelectforc(id,str){
var newStr = (str==undefined?"":str);
	
	$("#xzqarea").empty();
	$("#xzqarea_query").empty();
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			checkboxChkCity(this,str);
		}
	});
}




function checkboxChkCity(obj){
	checkboxChk(obj);
	
	if($(obj).attr("customcheckProperty") =="yes"){
		if($("#xianDu").attr("checked"))
			$("#cityC"+$(obj).attr("value")).show();
	}else{
		if($("#xianDu").attr("checked")){
			$("#cityC"+$(obj).attr("value")+" input:checkbox").each(function(){
				$(this).attr("checked",false);
				$("#div"+$(this).attr("value")).css("backgroundColor","");
			});
			$("#cityC"+$(obj).attr("value")).hide();
		}
		
	}
	if($("#CityDiv input:checkbox:checked").size()<1){
		$("#xianDu").attr("checked",false);
	}
}
function checkboxNoSelectFunction(ob){
	checkboxNoSelect("cityC"+ob);
}
function checkboxAllSelectFunction(ob){
	checkboxAllSelect("cityC"+ob);
}

function checkboxChk(obj,str){
	var newStr = (str==undefined?"":str);
	if($(obj).attr("customcheckProperty") =="yes"){
		$(obj).attr("customcheckProperty","no");
		$(obj).attr("checked",false);
		$("#div"+$(obj).attr("value")+newStr).css("backgroundColor","");
//		$("#"+$(obj).val()).remove();
//		$("#"+$(obj).val()+"_query").remove();
	}else{ 
		$(obj).attr("customcheckProperty","yes");
		$(obj).attr("checked",true);
		$("#div"+$(obj).attr("value")+newStr).css("backgroundColor","#FFE4B5");
		
		$("#xzqarea").append("<span id='"+$(obj).val()+"'>"+$(obj).attr("title")+"&nbsp;</span>");
		$("#xzqarea_query").append("<span id='"+$(obj).val()+"_query'>"+$(obj).attr("title")+"&nbsp;</span>");
	}
}
function checkboxAllSelect(id,str){
	var newStr = (str==undefined?"":str);
	
	$("#xzqarea").empty();
	$("#xzqarea_query").empty();
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			$(this).attr("checked",true);
			$(this).attr("customcheckProperty","yes");
			$("#div"+$(this).attr("value")+newStr).css("backgroundColor","#FFE4B5");
			
			$("#xzqarea").append("<span id='"+$(this).val()+"'>&nbsp;"+$(this).attr("title")+"</span>");
			$("#xzqarea_query").append("&nbsp;<span id='"+$(this).val()+"_query'>&nbsp;"+$(this).attr("title")+"</span>");
		}
	});
}
function checkboxNoSelect(id,str){
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			checkboxChk(this,str);
		}
	});
}


function checkboxAllSelectNew(id,str){
	var newStr = (str==undefined?"":str);
	$("#"+id+" input:checkbox").each(function(){
		if($(this).attr("disabled")!="disabled"){
			$(this).attr("checked",true);
			$(this).attr("customcheckProperty","yes");
			$("#div"+$(this).attr("value")+newStr).css("backgroundColor","#FFE4B5");
		}
	});
}

/**
 * 选择时间精确度要做的调整
 * @return
 */
function changeTimeDu(flag){
	if(flag=='2'){
		
		$("#startTime").hide();
		$("#endTime").hide();
		$("#startTime2").show();
		$("#endTime2").show();
		$("#yuefen").hide();
		$("#meiri").show();
		$("#type4").attr("checked",false);
		$("#timeD202").css("backgroundColor","#FFE4B5");
		$("#timeD101").css("backgroundColor","#C3DDF5");
	}
	else {
		$("#startTime2").hide();
		$("#endTime2").hide();
		$("#startTime").show();
		$("#endTime").show();
		$("#yuefen").show();
		$("#meiri").hide();
		$("#timeD101").css("backgroundColor","#FFE4B5");
		$("#timeD202").css("backgroundColor","#C3DDF5");
	}
}