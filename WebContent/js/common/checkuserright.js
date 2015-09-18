function CheckRight(json){
	if(json == null || json.address == null){
		$.messager.alert("检查用户权限时出现参数错误！","出错了：参数为空！");
		return false;
	}
	 
	$.ajax({
		url:contextRoot + 'admin/getUserRight.action',
		data:'address=' + json.address,
		dataType:'text',
		success:function(ret){
			 
			var right = parseInt( $.trim(ret));
			//alert(right);
			//新增
			if((right & 2) ==  0){
				 
				for(var index in json.addbuttons){
					
					$("#" + json.addbuttons[index]).remove();
				}
			}
			//删除
			if((right & 4) ==  0){
				for(var index in json.delbuttons){
					$("#" + json.delbuttons[index]).remove();
				}
			}
			//打印
			if((right & 8) ==  0){
				for(var index in json.printbuttons){
					$("#" + json.printbuttons[index]).remove();
				}
			}
			//审批
			if((right & 16) ==  0){
				for(var index in json.approvalbuttons){
					$("#" + json.approvalbuttons[index]).remove();
				}
			}
			//导出
			if((right & 32) ==  0){
				for(var index in json.expbuttons){
					$("#" + json.expbuttons[index]).remove();
				}
			}
			if(right == 0){
				location.href = contextRoot + "pages/common/error.jsp?code=oa-90001";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.alert("检查用户权限时出现错误！",textStatus);
		}		
	});
	
}

function ShowPage(url){
	if(url.indexOf('/',0) == 0){
		url = url.substring(1);
	}
	$("#iframecenter").attr("src",contextRoot + url);
	
}
function ShowPage2(url){
	if(url.indexOf('/',0) == 0){
		url = url.substring(1);
	}
	$("#iframecenter").attr("src",contextRoot + url);
}
