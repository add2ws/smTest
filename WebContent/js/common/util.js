
//将百分比宽度转为固定宽度 如:0.1 -> px
function fixWidth(percent,offset)  
{ 
    return (document.body.clientWidth-(offset==undefined?0:offset)) * percent ; 
} 
// 将百分比高度转为固定宽度 如:0.1 -> px
function fixHeight(percent,offset)  
{ 
    return (document.body.clientHeight-(offset==undefined?0:offset)) * percent ; 
} 
// 获取父控件宽度
function fixWidth2(obj,percent,offset){
	var w = (obj.parent().css("width").substring(0,obj.parent().css("width").length-2)-(offset==undefined?0:offset)) * percent;
	return parseInt(w, 10);
}
// 获取url 参数
function getURLParam(paras){ 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} ;
	for (i=0; j=paraString[i]; i++){ 
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
	if(typeof(returnValue)=="undefined"){ 
		return ""; 
	}else{ 
		return returnValue; 
	} 
} 
 
function getBasePath(){
	var href = top.window.location.href;
	var firstIndex = href.substring(7).indexOf("/")+1;
	var secIndex = href.substring(firstIndex+7).indexOf("/")+1;
	return href.substring(0, firstIndex+secIndex+7);
}

// 验证浏览器版本
function checkBrowser(){
	var Sys = {}; 
    var ua = navigator.userAgent.toLowerCase(); 
    var s,version,flag; 
	   (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : 
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0; 
if(Sys.ie)
{
    version = userSubStr(Sys.ie);
    if(version<=6){
    	flag = "您所使用的是IE"+Sys.ie+"版本，由于版本太低，暂不支持！为了您使用的方便,我们建议您使用IE7.0或更高版本、火狐3.5或更高版本、Google Chrome 4或更高版本!";
    }
}
else if(Sys.firefox)
{
	version = userSubStr(Sys.firefox);
    if(version<=3.5){
    	flag = "您所使用的是火狐"+Sys.firefox+"版本，由于版本太低，暂不支持！为了您使用的方便,我们建议您使用IE7.0或更高版本、火狐3.5或更高版本、Google Chrome 4或更高版本!";
    }
}
else if(Sys.chrome)
{
	version = userSubStr(Sys.chrome);
    if(version<=4){
    	flag = "您所使用的是Google Chrome"+Sys.chrome+"版本，由于版本太低，暂不支持！为了您使用的方便,我们建议您使用IE7.0或更高版本、火狐3.5或更高版本、Google Chrome 4或更高版本!";
    }
}
else
{
   flag = "无法检测出您正在使用的浏览器版本!为了您使用的方便,我们建议您使用IE7.0或更高版本、火狐3.5或更高版本、Google Chrome 4或更高版本!";
}
 return flag;
}
function userSubStr(text){
	var subText;
	if(text.length>=4){
		subText = text.substring(0,4);
	}else{
		subText = text;
	}
	return subText;
}
var initSelectCount=0;
var errorSelectCount=0;
var Select = {
		validate:function(){
			if(initSelectCount>0){
				$.messager.alert('警告','下拉列表初始化没有全部完成！');
				return false;
			} 
			if(errorSelectCount>0){
				$.messager.alert('警告','下拉列表加载出现错误！');
				return false;
			}
			return true;
		},
		// 初始化combotree菜单
		initComboTree:function (id,url){
			initSelectCount++;
			var obj = $("input[id='"+id+"']");
			if(obj==null){
				$.messager.alert('初始化出错','参数错误！');

				initSelectCount--;
				errorSelectCount++;
				return;
			}
			var comboDisplay = obj.parent().find(".combo").css("display");
			var inputDisplay = obj.parent().find("input[id='"+id+"']").css("display");
			obj.parent().find("input[id='"+id+"']").css("display","none");
			obj.parent().find(".combo").css("display","none");
			obj.parent().append("<div id='"+id+"loading'>正在加载...<img heigth='12px' width='12px' border='0' src='"+getBasePath()+"skins/default/images/loading.gif'></img></div>");

			obj.combotree({
					url:url,
					width:fixWidth2(obj,1),
					onLoadSuccess:function(){
						obj.parent().find("input[id='"+id+"']").css("display",inputDisplay);
						obj.parent().find(".combo").css("display",comboDisplay);
						$("div[id='"+id+"loading']").html("");	
						initSelectCount--;
					},
					onLoadError:function(){
						$("div[id='"+id+"loading']").html("初始化列表出错！").css("color","red");	

						initSelectCount--;
						errorSelectCount++;
					}
			});

		},
		// 初始化combobox菜单
		initComboBox:function (id,url,callback){
			initSelectCount++;
			var obj = $("input[id='"+id+"']");
			if(obj==null){
				$.messager.alert('初始化出错','参数错误！');

				initSelectCount--;
				errorSelectCount++;
				return;
			}
			var comboDisplay = obj.parent().find(".combo").css("display");
			var inputDisplay = obj.parent().find("input[id='"+id+"']").css("display");
			obj.parent().find("input[id='"+id+"']").css("display","none");
			obj.parent().find(".combo").css("display","none");
			
			var objRequied = (obj.attr("required")?(obj.attr("required")=="required"||obj.attr("required")=="true"||obj.attr("required")==true):undefined);
			var loadDiv = $("input[id='"+id+"loading']");
			if(loadDiv)
				loadDiv.html("<div id='"+id+"loading'>正在加载...<img heigth='12px' width='12px' border='0' src='"+getBasePath()+"skins/default/images/loading.gif'></img></div>");
			else
				obj.parent().append("<div id='"+id+"loading'>正在加载...<img heigth='12px' width='12px' border='0' src='"+getBasePath()+"skins/default/images/loading.gif'></img></div>");

			obj.combobox({
					url:url+"&blank="+(objRequied ?"0":"1"),
					valueField:'id',
					textField:'text',
					editable:false,
					width:fixWidth2(obj,1),
					onLoadSuccess:function(){
						obj.parent().find("input[id='"+id+"']").css("display",inputDisplay);
						obj.parent().find(".combo").css("display",comboDisplay);
						$("div[id='"+id+"loading']").html("");	
						initSelectCount--;
						
						if(callback!=undefined)
							callback();
					},
					onLoadError:function(){
						$("div[id='"+id+"loading']").html("初始化列表出错！").css("color","red");

						initSelectCount--;
						errorSelectCount++;
					}
			});
		},	
		// 初始化1级combobox菜单
		initCascadeComboBox1:function (id,key){
			$("input[id='"+id+"']").combobox({
	 			onChange:function(){
	 				$("input[id='"+id+"']").attr("value",$("input[name='"+id+"']").val());
	 			}
	 		});
			Select.initComboBox(id,getBasePath()+"person/personHouseAction!getSqsy.action?typeKey="+ key);
		},
		// 初始化2级级联combobox菜单
		initCascadeComboBox2:function (id,childId,key,childKey){
			$("input[id='"+childId+"']").combobox({
	 			onChange:function(){
	 				$("input[id='"+childId+"']").attr("value",$("input[name='"+childId+"']").val());
	 			}
	 		});
			$("input[id='"+id+"']").combobox({
	 			onChange:function(){
	 				var pid = $("input[id='"+id+"']").combobox('getValue');
	 				$("input[id='"+id+"']").attr("value",pid);
	 				if(pid!=""){
	 					Select.initComboBox(childId,
		 									getBasePath()+"common/domainList.action?typeKey="+childKey+"&psid="+pid ,
		 									function (){
					 							$("input[id='"+childId+"']").combobox('setValue',"");
					 						});	 	 
		 			}
	 				else{	 	 
	 					Select.initComboBox(childId,
	 							getBasePath()+"common/domainList.action?typeKey="+childKey+"&psid="+pid);
	 				}
	 			}
	 		});
			Select.initComboBox(id,
						getBasePath()+"common/domainList.action?typeKey="+ key ,
						function(){
							var pid = $("input[id='"+id+"']").combobox('getValue');
							Select.initComboBox(childId,getBasePath()+"common/domainList.action?typeKey="+childKey+"&psid="+pid);
						});
		},
 
		// 初始化3级级联combobox菜单
		initCascadeComboBox3:function (id,childId,grandchildId,key,childKey,grandchildKey){
			$("input[id='"+grandchildId+"']").combobox({
	 			onChange:function(){
	 				$("input[id='"+grandchildId+"']").attr("value",$("input[name='"+grandchildId+"']").val());
	 			}
	 		});
			$("input[id='"+id+"']").combobox({
	 			onChange:function(){
	 				var pid = $("input[id='"+id+"']").combobox('getValue');
	 				$("input[id='"+id+"']").attr("value",pid);
	 				if(pid!=""){
	 					Select.initComboBox(childId,
	 										getBasePath()+"common/domainList.action?typeKey="+childKey+"&psid="+pid,
	 										function (){
													$("input[id='"+childId+"']").combobox('setValue',"");	
													$("input[id='"+grandchildId+"']").combobox('setValue',"");
	 										}
	 					);
	 				}
	 				else{
	 					Select.initComboBox(childId,getBasePath()+"common/domainList.action?typeKey="+childKey+"&psid="+pid);
	 					Select.initComboBox(grandchildId,getBasePath()+"common/domainList.action?typeKey="+grandchildKey+"&psid="+pid);
	 				}
	 			}
	 		});
	 		$("input[id='"+childId+"']").combobox({
	 			onChange:function(){
	 				var pid = $("input[id='"+childId+"']").combobox('getValue');
	 				$("input[id='"+childId+"']").attr("value",pid);
	 				if(pid!=""){
						Select.initComboBox(grandchildId,
											getBasePath()+"common/domainList.action?typeKey="+grandchildKey+"&psid="+pid,
		 									function (){
												$("input[id='"+grandchildId+"']").combobox('setValue',"");
											}
						);
					}
	 				else{
	 					Select.initComboBox(grandchildId,getBasePath()+"common/domainList.action?typeKey="+grandchildKey+"&psid="+pid);
	 				}
	 			}
	 		});
	 		Select.initComboBox(id,
	 							getBasePath()+"common/domainList.action?typeKey="+key,
	 							function(){
						 			var pid = $("input[id='"+id+"']").combobox('getValue');
						 		  	Select.initComboBox(childId,
						 		  						getBasePath()+"common/domainList.action?typeKey="+childKey+"&psid="+pid,
					 									function(){
											 		  		var pid = $("input[id='"+childId+"']").combobox('getValue');
											 			  	Select.initComboBox(grandchildId,getBasePath() +"common/domainList.action?typeKey="+grandchildKey+"&psid="+pid);
											 		  	});
	 	  
	 							});
	 		
	 		
		},

		// 设置easyui控件宽度
		fixWidth:function(id,type,offset){
			var obj = $("input[id='"+id+"']");
			if("combotree"==type){
				obj.combotree({	width:fixWidth2(obj,1,(offset==undefined?0:offset))});
			}
			else if("datebox"==type){
				obj.datebox({width:fixWidth2(obj,1,(offset==undefined?0:offset))});
			}
			else if("combobox"==type){
				obj.combobox({width:fixWidth2(obj,1,(offset==undefined?0:offset))});
			}
		}

};


// select扩展
$.fn.extend({
	domains: function(options) {
		if (options == 'getValue') {
			
			
		} else {
			var obj = $(this);
			var url = "";
			if (options.basePath) url = options.basePath + 'admin/containChildlist.action?typeKey=';
			else return 1;
			obj.hide();
			var loading = $("<div>正在加载...<img heigth='12px' width='12px' border='0' src='"+options.basePath+"skins/default/images/loading.gif'></img></div>");
			obj.after(loading);
			if (options.typeKey) url = url + options.typeKey;
			else return 1;
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'json',
				context: {obj: obj, options: options, loading: loading},
				success: function(data) {
					var obj = this.obj;
					var loading = this.loading;
					var options = this.options;
					$.each(data, function() {
						var code = $.trim(this.code);
						var value = options.value?$.trim(options.value):null;
						var o = new Option();
						o.innerHTML = this.name;
						o.value = code;
						if (value && code == value) o.selected = true;
						obj.append(o);
					});
					obj.data('initialized', true);
					obj.show();
					loading.remove();
					if (options.loadSuccess) options.loadSuccess();
				}
			});
			
		}
			
	}
});
{}


 /* 
     *ajax调用封装，返回json。
     * handle 服务路径
     * data一般为js对象
     * callback 回调函数
     */
    function ajaxAction(url, dataType, data, callback) {
    	$.ajax({
    				url : url + "?r=" + (new Date().getTime()),
    				dataType : dataType,
    				data : data,
    				method : "post",
    				success : function(ret) {
    					if (dataType == 'json') {
    						if(ret.success==false)
    						{
    							alert(ret.error);
    						}else{
    						callback.call(this, ret);
    						}
    					} else {
    						ret = eval("(" + ret + ")");
    						if (ret.success == 'undefined'
    								|| ret.success == undefined) {
    							callback.call(this, ret);
    						} else {

    							if (ret.success == true) {

    								callback.call(this, ret);

    							} else {

    								alert(ret.error);
    							}
    						}
    					}
    				},
    				error : function(ret, textStatus, errorThrown) {

    					//ret = eval("(" + ret.responseText + ")");
    					alert(ret.responseText);
    				}
    			});
    }
    
function getValue(rows,area,type)
{
	if(type == 1){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spfjymj;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 2){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spfjyts;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 3){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spfjyjg;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 4){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfjyts;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	
	if(type == 5){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spfksts;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	
	if(type ==6){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfjymj;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	
	if(type ==7){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfTaoshu;
			   }
		}
		
			if(i==rows.length)
			{
			return "-100.00%";
			}
	}

	
	if(type == 9){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfksts;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}

	if(type == 8){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfjyjg;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	
	if(type == 10){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spfksmj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
	}
	
	if(type == 11){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfksmj;
			   }
		}
		if(i==rows.length)
		{
		return 0;
		}
	}

	if(type == 20){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spzftsone;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 21){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spzftstwo;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 22){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].spzftsthree;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type ==23){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==area)
			   {
			   	return rows[i].zfTaoshu;
			   }
		}
		
			if(i==rows.length)
			{
			return "-";
			}
	}
	
}

function getxqValue(rows,type,mc){

    if(type==1)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].spfjymj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
    if(type==2)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].spfjyts;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
    if(type==3)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].spfjyjj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
    if(type==4)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].zfjyts;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
     if(type==5)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].zfjymj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
    if(type ==7){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].zfTaoshu;
			   }
		}
		
			if(i==rows.length)
			{
			return "-100.00%";
			}
	}
    
    if(type==8)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].zfjyjj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    if(type == 20){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].spzftsone;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 21){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].spzftstwo;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type == 22){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].spzftsthree;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	if(type ==23){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].mc ==mc)
			   {
			   	return rows[i].zfTaoshu;
			   }
		}
		
			if(i==rows.length)
			{
			return "-";
			}
	}
}


function getxqValueGxqk(rows,type,xqhb){

    if(type==10)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==xqhb)
			   {
			   	return rows[i].spfksmj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
    if(type==11)
    {
       for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==xqhb)
			   {
			   	return rows[i].zfksmj;
			   }
		}		
		if(i==rows.length)
		{
		return 0;
		}
    }
    
    if(type == 9){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==xqhb)
			   {
			   	return rows[i].zfksts;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
	
	 if(type == 5){
		for(var i =0;i<rows.length;i++)
		{
			 if(rows[i].dsbh ==xqhb)
			   {
			   	return rows[i].spfksts;
			   }
		}
		
			if(i==rows.length)
			{
			return 0;
			}
	}
    
}
function getValue2(array,value)
{
	for(var i =0;i<array.length;i++)
	{
	   if(array[i][0]==value)
	   {
	      return array[i][1];
	   }
	}

}

function toolTipFunc(id,position,url,type,unit)
{
	id ='#'+id;
    $(id).tooltip({
    		    onShow: function(){ 		    	
    		    	$.ajax({
    		    	   type:'post',
			           url:url,
			           dataType:'json',
			           data:{startTime:$('#startTime').val().substr(0,4)+$('#startTime').val().substr(5,2),endTime: $('#endTime').val().substr(0,4)+$('#endTime').val().substr(5,2)},
			           success:function(ret){
					$(id).tooltip({
    		    		position:position,
    	    		    trackMouse:true,     //阜阳没有
    	    		    content:  '<div>合肥市：'+getValue(ret.rows,'3401',type)+unit+'</div><div>芜湖市：'+getValue(ret.rows,'3402',type)+unit+'</div>'+
    	    		              '<div>蚌埠市：'+getValue(ret.rows,'3403',type)+unit+'</div><div>淮南市：'+getValue(ret.rows,'3404',type)+unit+'</div>'+
    	    		              '<div>马鞍山市：'+getValue(ret.rows,'3405',type)+unit+'</div><div>淮北市：'+getValue(ret.rows,'3406',type)+unit+'</div>'+
    	    		              '<div>铜陵市：'+getValue(ret.rows,'3407',type)+unit+'</div><div>安庆市：'+getValue(ret.rows,'3408',type)+unit+'</div>'+
    	    		              '<div>黄山市：'+getValue(ret.rows,'3410',type)+unit+'</div><div>滁州市：'+getValue(ret.rows,'3411',type)+unit+'</div>'+
    	    		              '<div>阜阳市：'+getValue(ret.rows,'3412',type)+unit+'</div><div>宿州市：'+getValue(ret.rows,'3413',type)+unit+'</div>'+
    	    		              '<div>六安市：'+getValue(ret.rows,'3415',type)+unit+'</div><div>亳州市：'+getValue(ret.rows,'3416',type)+unit+'</div>'+
    	    		              '<div>池州市：'+getValue(ret.rows,'3417',type)+unit+'</div><div>宣城市：'+getValue(ret.rows,'3418',type)+unit+'</div>'
    	    		              });
			          },
					error : function(ret, textStatus, errorThrown) {
						ret = eval("(" + ret.responseText + ")");
						alert(ret.data.errorContent);
					}
    		    	});
    		        $(this).tooltip('tip').css({
    		            backgroundColor: '#FFFFCC',
    		            borderColor: '#000000'
    		        });
    		    }
    		});
}


function jsChartsLine(id,data1,data2,YValueNumber,startY,EndY,XValueNumber,StartX,EndX,title,AxisPaddingRight,AxisPaddingLeft,AxisNameX,AxisNameY,firstYear,twoYear)
{
    var myChart = new JSChart(id, 'line');	
    if(firstYear!=twoYear)
    {   
     if(data1.length<=12)
       {
       	 myChart.setDataArray(data1, 'red');
       }else{
       
       	for(var i=1;i<data1.length;i =i+2)
       	{
       	       data1[i][0] ="  ";
       	}
        myChart.setDataArray(data1, 'red');
       }       
       myChart.setLineColor('#FF0000', 'red');
       myChart.setLegendForLine('red', firstYear);
    }
	if(StartX!=null)
	{
		myChart.setAxisValuesNumberX(XValueNumber);
	    myChart.setIntervalStartX(StartX);
	    myChart.setIntervalEndX(EndX);
	    myChart.setLegendShow(true);
	    for(var i=1;i<=12;i++)
	    {
	     // myChart.setTooltip([i,' ']);
	  //    myChart.setTooltip([i,'<div>月份:'+data1[i-1][0]+'</div><div>数值：'+data1[i-1][1]+'</div>','red']);
	        myChart.setTooltip([i,data1[i-1][1],'red']);
	    }
	    for(var i=1;i<=data2.length;i++)
	    {
	        // myChart.setTooltip([data2[i-1][0],'<div>月份:'+data2[i-1][0]+'</div><div>数值：'+data2[i-1][1]+'</div>','green']);
	         myChart.setTooltip([data2[i-1][0],data2[i-1][1],'green']);
	    }

	}else{
		 if(data1.length<=12)
       {
       	   // myChart.setDataArray(data1, 'red');
       	    for(var i=0;i<data1.length;i++)
		    {
		    //  myChart.setTooltip([i,'<div>月份:'+data1[i][0]+'</div><div>数值：'+data1[i][1]+'</div>']);
		      myChart.setTooltip([i,data1[i][1]]);
		      myChart.setLabelX([i, data1[i][0]]);
		    }  	
       }else{
       
       	for(var i=1;i<data1.length;i =i+2)
       	{
       	       data1[i][0] ="  ";
       	}
        myChart.setDataArray(data1, 'red');
         for(var i=0;i<data1.length;i++)
		    {
		    //  myChart.setTooltip([i,'<div>月份:'+data1[i][0]+'</div><div>数值：'+data1[i][1]+'</div>']);
		      myChart.setTooltip([i,data1[i][1]]);
		   //   myChart.setLabelX([i, data1[i][0]]);
		    }  
		    for(var i=1;i<data1.length;i=i+2)
		    {
		    //  myChart.setTooltip([i,'<div>月份:'+data1[i][0]+'</div><div>数值：'+data1[i][1]+'</div>']);
		      myChart.setLabelX([i, "  "]);
		    }  	
       }    
				 
	
		myChart.setAxisValuesAngle(20);
		
		if(data1.length<=4&&data1.length>1)
		{
		   myChart.setIntervalStartX(-2);
		   myChart.setIntervalEndX(data1.length+2);
		}
	}		
	myChart.setSize(fixWidth(0.5,40), 180);
	//myChart.setAxisValuesNumberY(YValueNumber);
	myChart.setIntervalStartY(startY);
	//myChart.setIntervalEndY(EndY);
	myChart.setTitleColor('#454545');
	myChart.setTitle(title);
	myChart.setTitleColor("#000000");
	myChart.setAxisValuesColor('#454545');
    myChart.setTooltipPosition("nw");
	
	var flag =false;
	if(data2.length==1)
	{
		var tempArray =new Array();
		tempArray[0] = data2[0][0]+1;
		tempArray[1] = data2[0][1];
		data2.push(tempArray);
	    flag =true;
	}

	myChart.setDataArray(data2, 'green');
	myChart.setLineColor('#33FF00', 'green');
	if(flag)
	{
	   myChart.setLineWidth(0, 'green');
	}
	
	myChart.setLegendForLine('green', twoYear);
	
	myChart.setFlagColor('#9D16FC');
	myChart.setFlagRadius(2);
	myChart.setAxisPaddingRight(AxisPaddingRight);
	myChart.setAxisPaddingLeft(AxisPaddingLeft);
	myChart.setAxisNameY(AxisNameY);
	myChart.setAxisNameX(AxisNameX);
	myChart.setAxisNameColor('#000000');
	myChart.setLegendPosition('bottom center');
	
	

	myChart.draw();

}

function jsChartsLine2(id,array1,array2,startY,title,AxisPaddingRight,AxisPaddingLeft,AxisNameX,AxisNameY)
{
	var myChart = new JSChart(id, 'line');
	var arrayTb = new Array();
	var arrayHb = new Array();
	var x=0,y=0;
	var i=0,j =0;
	for(var m=0;m<=i;m++){
		var tempArray = new Array();
		for(var k=0;j<array1.length;j++){
			 if(array1[j][1]!=-200){
				 tempArray[k] =array1[j];
				 k++;
				 }
			 //else{
				 //i=i+1;
				 //j=j+1;
				//break;	}
		}
		arrayTb[m]=tempArray;
		x=x+1;
		myChart.setDataArray(arrayTb[m],x+'tb');
		myChart.setLineColor('#FF0000', x+'tb');
		
		for(var a=0;a<arrayTb[m].length;a++){
			myChart.setTooltip([arrayTb[m][a][0],arrayTb[m][a][1],x+'tb']);
			myChart.setLabelX([arrayTb[m][a][0], +arrayTb[m][a][0]]);
		}
	}
	var q=0,r=0;
	for(var n=0;n<=q;n++){
		var tempArray = new Array();
		for(var k=0;r<array2.length;r++){
			 if(array2[r][1]!=-200){
				 tempArray[k] =array2[r];
				 k++;}
			 //else{
				// q=q+1;
				 //r=r+1;
				 //break;}
		}
		arrayHb[n]=tempArray;
		y=y+1;
		myChart.setDataArray(arrayHb[n],y+'hb');
		myChart.setLineColor('#33FF00', y+'hb');
		
		for(var a=0;a<arrayHb[n].length;a++){
			myChart.setTooltip([arrayHb[n][a][0],arrayHb[n][a][1],y+'hb']);
			myChart.setLabelX([arrayHb[n][a][0], +arrayHb[n][a][0]]);
		}
	}
	myChart.setLegend("#FF0000",'同比');
	myChart.setLegend("#33FF00",'环比');
	myChart.setLegendShow(true);
	myChart.setLegendDetect(false);
    myChart.setLegendColor('#000000');
	myChart.setSize(fixWidth(0.5,40), 180);
	myChart.setAxisValuesAngle(20);
	myChart.setAxisValuesNumberY(0);
	myChart.setAxisValuesNumberX(1);
	//myChart.setIntervalStartY(startY);
	if(array1.length<=4&&array1.length>1)
	{
	   myChart.setIntervalStartX(array1[0][0]-1);
	   myChart.setIntervalEndX(array1[array1.length-1][0]+1);
	}
	myChart.setTitleColor('#000000');
	myChart.setTitle(title);
	myChart.setTitleFontSize(12);
	myChart.setAxisPaddingRight(AxisPaddingRight);
	myChart.setAxisPaddingLeft(AxisPaddingLeft);
	myChart.setAxisNameY(AxisNameY);
	myChart.setAxisNameX(AxisNameX);
	myChart.setAxisValuesColor('#454545');
	myChart.setShowXValues(false);
	myChart.setErrors(false);
	myChart.setTooltipPosition("nw");
	myChart.setFlagColor('#9D16FC');
	myChart.setFlagRadius(2);
	myChart.setAxisNameColor('#000000');
	myChart.setLegendPosition('bottom center');
	myChart.draw();
}

function jsChartsOneMonth(id,array1,array2,array3,YValueNumber,startY,EndY,title,AxisPaddingRight,AxisPaddingLeft,AxisNameX,AxisNameY){
	var myChart = new JSChart(id, 'line');
    myChart.setDataArray(array1,'red');
	myChart.setDataArray(array2,'green');
	//myChart.setLegendShow(true);
    myChart.setLegendForLine('red', '同比');
    myChart.setLegendForLine('green', '环比');
    myChart.setLegendColor('#000000');
	myChart.setSize(fixWidth(0.5,40), 150);
	myChart.setAxisValuesAngle(20);
	myChart.setLineWidth(0, 'red');
	myChart.setLineWidth(0, 'green');
	//myChart.setIntervalStartY(startY);
	myChart.setAxisValuesNumberX(4);
	myChart.setIntervalEndX(3);
	myChart.setTitleColor('#000000');
	myChart.setTitle(title);
	myChart.setTitleFontSize(12);
	myChart.setAxisPaddingRight(AxisPaddingRight);
	myChart.setAxisPaddingLeft(AxisPaddingLeft);
	myChart.setAxisNameY(AxisNameY);
	myChart.setAxisNameX(AxisNameX);
	myChart.setAxisValuesColor('#454545');
	myChart.setShowXValues(false);
	myChart.setLineColor('#FF0000', 'red');
	myChart.setLineColor('#33FF00', 'green');
	myChart.setFlagColor('#9D16FC');
	//myChart.setFlagFillColor('#33FF00');
	//myChart.setFlagColor('#33FF00', 'green');
	myChart.setFlagRadius(2);
	//myChart.setFlagShape("square");
	myChart.setTooltip([''+array3[0][0],'<div>月份:'+array3[0][0]+'</div><div>同比:'+array1[0][1]+'%</div>','red']);
	myChart.setTooltip([''+array3[0][0],'<div>月份:'+array3[0][0]+'</div><div>环比:'+array2[0][1]+'%</div>','green']);
	myChart.setAxisNameColor('#000000');
	//myChart.setLegendPosition('bottom center');
	myChart.setErrors(false);
	myChart.draw();
}

function jsChartsBar(id,array,array1,title,NameY,AxisValuesNumberY,IntervalStartY,IntervalEndY){
	var myChart = new JSChart(id, 'bar');
	myChart.setDataArray(array);
	myChart.setTitle(title);
	myChart.setTitleColor('#000000');
	myChart.setTitleFontSize(12);
	myChart.setBarValues(false);
	myChart.setAxisNameX('');
	myChart.setAxisNameY(NameY);
	myChart.setAxisValuesColor('#454545');
	myChart.setAxisNameFontSize(10);
	myChart.setAxisNameColor('#000000');
	myChart.setAxisValuesNumberY(0); 
	myChart.setIntervalStartY(IntervalStartY);
	myChart.setAxisValuesAngle(20);
	myChart.setAxisColor('#B5B5B5'); //轴颜色
	myChart.setAxisWidth(2);	//X轴线条宽度 默认为2
	myChart.setBarValuesColor('#2F6D99');  //柱体数值字体颜色 
	myChart.setAxisPaddingRight(10);
	myChart.setAxisPaddingLeft(60);
	myChart.setBarColor('#00ff00', 1);
	myChart.setBarColor('#0099FF', 2);
	myChart.setBarBorderWidth(0);
	myChart.setBarSpacingRatio(40);//柱体的宽度
	myChart.setBarOpacity(1);		//柱体的透明度
	myChart.setFlagOpacity(0);
	myChart.setFlagRadius(12);
	for(var i=0;i<array1.length;i++){
      myChart.setTooltip([array[i][0],array1[i][1],1]);
      myChart.setTooltip([array[i][0],array1[i][2],2]);
	}
	myChart.setLegendShow(true);
	myChart.setLegendPosition('bottom center');
	myChart.setLegendColor('#000000');
	myChart.setLegendForBar(1, '商品房');
	myChart.setLegendForBar(2, '商品住房');
	myChart.setSize(fixWidth(0.5,50), 180);
	myChart.setTooltipPosition("nw");
	myChart.setGridColor('#C6C6C6');  //线条颜色 默认#C6C6C6
	myChart.setErrors(false);
	myChart.draw(); 
}

function jsChartsBar2(id,array,array1,title,NameY,AxisValuesNumberY,IntervalStartY,IntervalEndY){
	var myChart = new JSChart(id, 'bar');
	myChart.setDataArray(array);
	myChart.setTitle(title);
	myChart.setTitleColor('#000000');
	myChart.setTitleFontSize(12);
	myChart.setBarValues(false);
	myChart.setAxisNameX('');
	myChart.setAxisNameY(NameY);
	myChart.setAxisValuesColor('#454545');
	myChart.setAxisNameFontSize(10);
	myChart.setAxisNameColor('#000000');
	myChart.setAxisValuesNumberY(0); 
	myChart.setIntervalStartY(IntervalStartY);
	//myChart.setIntervalEndY(IntervalEndY);
	myChart.setAxisValuesAngle(20);
	myChart.setAxisColor('#B5B5B5'); //轴颜色
	myChart.setAxisWidth(2);	//X轴线条宽度 默认为2
	myChart.setBarValuesColor('#2F6D99');  //柱体数值字体颜色 
	myChart.setAxisPaddingRight(10);
	myChart.setAxisPaddingLeft(60);
	myChart.setBarColor('#00ff00', 1);
	myChart.setBarColor('#0099FF', 2);
	myChart.setBarColor('#FF3300', 3);
	myChart.setBarBorderWidth(0);
	myChart.setBarSpacingRatio(40);//柱体的宽度
	myChart.setBarOpacity(1);		//柱体的透明度
	myChart.setFlagOpacity(0);
	myChart.setFlagRadius(12);
	for(var i=0;i<array1.length;i++){
      myChart.setTooltip([array[i][0],array1[i][1],1]);
      myChart.setTooltip([array[i][0],array1[i][2],2]);
      myChart.setTooltip([array[i][0],array1[i][3],3]);
	}
	myChart.setLegendShow(true);
	myChart.setLegendPosition('bottom center');
	myChart.setLegendColor('#000000');
	myChart.setLegendForBar(1, '90㎡(及以下)');
	myChart.setLegendForBar(2, '90-144㎡');
	myChart.setLegendForBar(3, '144㎡以上');
	myChart.setSize(fixWidth(0.5,50), 180);
	myChart.setGridColor('#C6C6C6');  //线条颜色 默认#C6C6C6
	myChart.setErrors(false);
	myChart.draw(); 
}

function getdsmc(data,dsbm)
{
   	for(var i =0;i<data.length;i++)
	{
	   if(data[i][0]==dsbm)
	   {
	      return data[i][1];
	   }
	}
}


function monthDeal(time)
{
    if(time.charAt(5)=='0')
    {
       return time.charAt(6);
    }else{
    	return time.substr(5,2);
    	
    }
}

function jsChartsPie(id,a,b,c,title){
	var myData = new Array(['',a],['',b],['',c]);
	var colors = ['#00ff00', '#0099FF', '#FF3300'];
	var myChart = new JSChart(id, 'pie');
	myChart.setDataArray(myData);
	myChart.colorizePie(colors);
	myChart.setTitle(title);
	myChart.setTitleColor('#000000');
	myChart.setTitleFontSize(12);
	myChart.setPieValuesColor('#6A0000');
	myChart.setPiePosition(180, 100); 
	myChart.setPieRadius(55);
	myChart.setPieValuesSuffix('%');
	myChart.setShowXValues(false);
	myChart.setLegendShow(true);
	myChart.setLegend('#00ff00', '90㎡(及以下)');
	myChart.setLegend('#0099FF', '90-144㎡');
	myChart.setLegend('#FF3300', '144㎡以上');
	myChart.setLegendColor('#000000');
	myChart.setLegendPosition('right');
	myChart.setLegendPadding(90); 
	myChart.setSize(fixWidth(0.5,50), 180);
	myChart.setGridColor('#C6C6C6');
	myChart.draw();
}

function jsChartsPie2(id,a,b,c,title){
	var myData = new Array(['',a],['',b],['',c]);
	var colors = ['#E7F7FD', '#E7F7FD', '#E7F7FD'];
	var myChart = new JSChart(id, 'pie');
	myChart.setDataArray(myData);
	myChart.colorizePie(colors);
	myChart.setTitle(title);
	myChart.setTitleColor('#000000');
	myChart.setTitleFontSize(15);
	myChart.setPieValuesColor('#E7F7FD');
	myChart.setPiePosition(180, 100); 
	myChart.setPieRadius(0);
	myChart.setLegendShow(false);
	myChart.setLegend('#E7F7FD', '');
	myChart.setLegend('#E7F7FD', '');
	myChart.setLegend('#E7F7FD', '');
	myChart.setLegendColor('#000000');
	myChart.setLegendPosition('right');
	myChart.setLegendPadding(90); 
	myChart.setSize(fixWidth(0.5,120), 90);
	myChart.setGridColor('#C6C6C6');
	myChart.draw();
}

function toolTipDsFunc(id,position,url,type,unit,DSqxData,dsbm)
{
	id ='#'+id;
    $(id).tooltip({
    		    onShow: function(){ 		    	
    		    	$.ajax({
    		    	   type:'post',
			           url:url,
			           dataType:'json',
			           data:{startTime:$('#startTime').val().substr(0,4)+$('#startTime').val().substr(5,2),endTime: $('#endTime').val().substr(0,4)+$('#endTime').val().substr(5,2),dsbm:dsbm},
			           success:function(ret){
			           	var xqPanel='';
			           	for(var i=0;i<DSqxData.rows.length;i++)
						{
							xqPanel += '<div>'+DSqxData.rows[i].mc +':'+ getxqValue(ret.rows,type,DSqxData.rows[i].mc)+unit+	'</div>';			          
						}	
					$(id).tooltip({
    		    		position:position,
    	    		    trackMouse:true,    
    	    		    content: xqPanel
    	    		              });
			          },
					error : function(ret, textStatus, errorThrown) {
						ret = eval("(" + ret.responseText + ")");
						alert(ret.data.errorContent);
					}
    		    	});
    		        $(this).tooltip('tip').css({
    		            backgroundColor: '#FFFFCC',
    		            borderColor: '#000000'
    		        });
    		    }
    		});
}


function toolTipDsFuncGxqk(id,position,url,type,unit,DSqxData,dsbm)
{
	id ='#'+id;
    $(id).tooltip({
    		    onShow: function(){ 		    	
    		    	$.ajax({
    		    	   type:'post',
			           url:url,
			           dataType:'json',
			           data:{startTime:$('#startTime').val().substr(0,4)+$('#startTime').val().substr(5,2),endTime: $('#endTime').val().substr(0,4)+$('#endTime').val().substr(5,2),dsbm:dsbm},
			           success:function(ret){
			           	var xqPanel='';
			           	for(var i=0;i<DSqxData.rows.length;i++)
						{
							xqPanel += '<div>'+DSqxData.rows[i].mc +':'+ getxqValueGxqk(ret.rows,type,DSqxData.rows[i].xzqhxqDm)+unit+	'</div>';			          
						}	
					$(id).tooltip({
    		    		position:position,
    	    		    trackMouse:true,    
    	    		    content: xqPanel
    	    		              });
			          },
					error : function(ret, textStatus, errorThrown) {
						ret = eval("(" + ret.responseText + ")");
						alert(ret.data.errorContent);
					}
    		    	});
    		        $(this).tooltip('tip').css({
    		            backgroundColor: '#FFFFCC',
    		            borderColor: '#000000'
    		        });
    		    }
    		});
}

function getMonadyAndSunday(){
	var startStop=new Array();
	var currentDate=new Date();
    var week=currentDate.getDay(); 
    var millisecond=1000*60*60*24; 
    var minusDay=week!=0?week-1:6; 
    var monday=new Date(currentDate.getTime()-(minusDay*millisecond)); 
    var sunday=new Date(monday.getTime()+(6*millisecond)); 
    startStop.push(monday);
    startStop.push(sunday);
    return startStop; 
}

function getMonadyAndSunday2(){
	var startStop=new Array();
	var currentDate=new Date();
    var week=currentDate.getDay(); 
    var millisecond=1000*60*60*24; 
    var minusDay=week!=0?week-1:6; 
    var monday=new Date(currentDate.getTime()-((minusDay+3)*millisecond)); 
    var sunday=new Date(monday.getTime()); 
    startStop.push(monday);
    startStop.push(sunday);
    return startStop; 
	
}

function getPreMonadyAndSunday(){
	var startStop=new Array();
	var currentDate=new Date();
    var week=currentDate.getDay(); 
    var millisecond=1000*60*60*24; 
    var minusDay=week!=0?week+6:13; 
    var monday=new Date(currentDate.getTime()-(minusDay*millisecond)); 
    var sunday=new Date(monday.getTime()+(6*millisecond)); 
    startStop.push(monday);
    startStop.push(sunday);
    return startStop; 
}
function getPreMonadyAndSunday1(){
	var startStop=new Array();
	var currentDate=new Date();
    var week=currentDate.getDay(); 
    var millisecond=1000*60*60*24; 
    var minusDay=week!=0?week+6:13; 
    var monday=new Date(currentDate.getTime()-((minusDay+9)*millisecond)); 
    var sunday=new Date(monday.getTime()+(6*millisecond)); 
    startStop.push(monday);
    startStop.push(sunday);
    return startStop; 
}
function getMonadyAndSunday1(){
	var startStop=new Array();
	var currentDate=new Date();
    var week=currentDate.getDay(); 
    var millisecond=1000*60*60*24; 
    var minusDay=week!=0?week-1:6; 
    var monday=new Date(currentDate.getTime()-((minusDay+9)*millisecond)); 
    var sunday=new Date(monday.getTime()+(6*millisecond)); 
    startStop.push(monday);
    startStop.push(sunday);
    return startStop; 
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