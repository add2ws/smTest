/**
 *@author mj
 *@date 2011-06-09 
 */
//省市县三级联动
//若给下拉框赋值，只须设置val属性即可
var basePath,loadingCount=0;
function getProvinces(argproid,argcityid,argdisid){
//	       if(!argproid||argproid==''){
//	    	    alert('请补写省直辖市文本框ID!');
//	    	   return;
//	       }
//	       if(!argcityid||argcityid==''){
//	    	    alert('请补写地市文本框ID!');
//	    	   return;
//	       }
//	       if(!argdisid||argdisid==''){
//	    	    alert('请补写县区文本框ID!');
//	    	   return;
//	       }
			var proSelect = $('#'+(argproid||"sel_province"));
			proSelect.empty();
			$("<option value=''>请选择省直辖市</option>").appendTo('#'+(argproid||"sel_province"));
			loading1(proSelect,(argproid||"sel_province"));
			loadingCount++;
			 $.ajax({
			        type: "POST",
			        url: "../common/getProvinces.action",
			        success: function (data) {
			        	loadingCount--;
			        	dataObj = eval(data);
			        	var len = dataObj.length;
			        	var selIndex,defaultChecked = true;
			        	for(var i=0;i<len;i++){
			        		obj = dataObj[i];
			        		if(proSelect.attr('val')==undefined){
			        			defaultChecked = false;
			        		}
			        		if(obj.xzqhszxsDm==proSelect.attr('val')){
			        			selIndex = i+1;
			        		}
			        		$("<option value='"+obj.xzqhszxsDm+"'>"+obj.mcJ+"</option>").appendTo('#'+(argproid||"sel_province"));
			        	}
			        	if(defaultChecked)
			        	proSelect.get(0).selectedIndex=selIndex||0;
			        	loaded(proSelect,(argproid||"sel_province"));
			        	getCitys(argproid,argcityid,argdisid);
			        },
			        error:function(XMLHttpRequest, textStatus, errorThrown){
			        	loadError((argproid||"sel_province"));
			        }
			    });
		}
		function getCitys(argproid,argcityid,argdisid){
			var citySelect = $('#'+(argcityid||"sel_city"));
			var disSelect = $('#'+(argdisid||"sel_district"));
			var proid = $('#'+(argproid||"sel_province")).val();
		    if(proid&&proid!=''){
		    	citySelect.empty();
		    	loading1(citySelect,(argcityid||"sel_city"));
		    	loadingCount++;
		    	$("<option value=''>请选择地市</option>").appendTo('#'+(argcityid||"sel_city"));
					 $.ajax({
					        type: "POST",
					        url: "../common/getCitiesById.action",
					        data:'proId='+proid,
					        success: function (data) {
					        	dataObj = eval(data);
					        	var len = dataObj.length;
					        	var selIndex,defaultChecked = true;
					        	for(var i=0;i<len;i++){
					        		obj = dataObj[i];
					        		if(citySelect.attr('val')==undefined){
					        			defaultChecked = false;
					        		}
					        		if(obj.xzqhdsDm==citySelect.attr('val')){
					        			selIndex = i+1;
					        		}
					        		$("<option value='"+obj.xzqhdsDm+"'>"+obj.mcJ+"</option>").appendTo('#'+(argcityid||"sel_city"));
					        	}
					        	loaded(citySelect,(argcityid||"sel_city"))
					        	loadingCount--;
					        	if(defaultChecked)
					        	citySelect.get(0).selectedIndex=selIndex||1;
					        	getDistricts(argcityid,argdisid);
					        },
					        error:function(){
					        	loadError((argcityid||"sel_city"));
					        }
					    });
		    }else{
		    	citySelect.empty();
		    	disSelect.empty();
		    	$("<option value=''>请选择地市</option>").appendTo('#'+(argcityid||"sel_city"));
		    	$("<option value=''>请选择县区</option>").appendTo('#'+(argdisid||"sel_district"));
		    }
		}
		function getDistricts(argcityid,argdisid){
			var citySelect = $('#'+(argcityid||"sel_city"));
			var disSelect = $('#'+(argdisid||"sel_district"));
			var cityid = citySelect.val();
		    if(cityid&&cityid!=''){
		    	disSelect.empty();
		    	loading1(disSelect,(argdisid||"sel_district"));
		    	loadingCount++;
		    	$("<option value=''>请选择县区</option>").appendTo('#'+(argdisid||"sel_district"));
					 $.ajax({
					        type: "POST",
					        url: "../common/getCountiesById.action",
					        data:'cityId='+cityid,
					        success: function (data) {
					        	dataObj = eval(data);
					        	var len = dataObj.length;
					        	var selIndex,defaultChecked = true;
					        	for(var i=0;i<len;i++){
					        		obj = dataObj[i];
					        		if(disSelect.attr('val')==undefined){
					        			defaultChecked = false;
					        		}
					        		if(obj.xzqhxqDm==disSelect.attr('val')){
					        			selIndex = i+1;
					        		}
					        		$("<option value='"+obj.xzqhxqDm+"'>"+obj.mcJ+"</option>").appendTo('#'+(argdisid||"sel_district"));
					        	}
					        	loaded(disSelect,(argdisid||"sel_district"));
					        	loadingCount--;
					        	if(defaultChecked)
					        	disSelect.get(0).selectedIndex=selIndex||1;
					        },
					        error:function(){
					        	loadError(disSelect,(argdisid||"sel_district"));
					        }
					    });
		    }else{
		    	disSelect.empty();
		    	$("<option value=''>请选择县区</option>").appendTo('#'+(argdisid||"sel_district"));
		    }
		}
		function loading1(c,id){
			if(!basePath){
				basePath = this.getBasePath();
			}
			c.css('display','none');
			c.after("<div id='"+id+"loading'>正在加载...<img heigth='12px' width='12px' border='0' src='"+basePath+"skins/default/images/loading.gif'></img></div>");
		};
		function loaded(c,id){
			$("div[id='"+id+"loading']").css("display","none");
			c.css("display","block");
		};
		function loadError(id){
			$("div[id='"+id+"loading']").html("初始化列表出错！").css("color","red");
		}
		function isLoaded(){return loadingCount==0?true:false};
		function getBasePath(){
			var href = top.window.location.href;
			var firstIndex = href.substring(7).indexOf("/")+1;
			var secIndex = href.substring(firstIndex+7).indexOf("/")+1;
			return href.substring(0, firstIndex+secIndex+7);
		}
	/*
	 * 根据行业大类的ID来获取行业中小类的集合
	 */
		function getTDmGyHyzxlsByID(argHydlId,argHyzxlID){
			var hydl = document.getElementById(argHydlId||"industry_big_type");
			var hyzxl = document.getElementById(argHyzxlID||"industry_small_type");
			var hydlDm = hydl.value;
			 if(hydlDm&&hydlDm!=''){
				 hyzxl.options.length=1;
						 $.ajax({
						        type: "POST",
						        url: "commonAction.do?method=getTDmGyHyzxlsByID",
						        data:'hydlDm='+hydlDm,
						        success: function (data) {
						        	dataObj = eval(data);
						        	for(var i in dataObj){
						        		obj = dataObj[i];
						        		hyzxl.options.add(new Option(obj.mcJ,obj.hyzxlDm));
						        	}
						        	hyzxl.options[1].selected=true;
						        }
						    });
			    }else{
			    	hyzxl.options.length=1;
			    }
		}
		