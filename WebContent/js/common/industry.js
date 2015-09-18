//大类小类级联
function getHydl(arghydl, arghyzxl) {
	var hydlSelect = $('#' + (arghydl || "sel_hydl"));
	hydlSelect.empty();
	$("<option value=''>请选择行业大类</option>").appendTo(
			'#' + (arghydl || "sel_hydl"));
	$.ajax({
		type : "POST",
		url : "../common/getHydl.action",
		success : function(data) {
			dataObj = eval(data);
			var len = dataObj.length;
			var selIndex ;
			for ( var i = 0; i < len; i++) {
				obj = dataObj[i];
				if(obj.hydlDm == hydlSelect.attr('val'))
					{
					selIndex = i+1;
					}
				$("<option value='" + obj.hydlDm + "'>" + obj.mc + "</option>")
						.appendTo('#' + (arghydl || "sel_hydl"));
			}
			hydlSelect.get(0).selectedIndex=selIndex||0;
			getHyzxl(arghydl, arghyzxl);
			},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert(textStatus + "," + errorThrown);
		}
	});
}
function getHyzxl(arghydl, arghyzxl) {
	var hydlSelect = $('#' + (arghydl || "sel_hydl"));
	var hyzxlSelect = $('#' + (arghyzxl || "sel_hyzxl"));
	var hydlDm = hydlSelect.val();
	if (hydlDm && hydlDm != '') {
		hyzxlSelect.empty();
		$("<option value=''>请选择行业小类</option>").appendTo(
				'#' + (arghyzxl || "sel_hyzxl"));
		$.ajax({
			type : "POST",
			url : "../common/getHyzxl.action",
			data : 'hydlDm=' + hydlDm,
			success : function(data) {
				dataObj = eval(data);
				var len = dataObj.length;
				for ( var i = 0; i < len; i++) {
					obj = dataObj[i];
					if(obj.hyzxlDm == hyzxlSelect.attr('val'))
					{
					selIndex = i+1;
					}
					$(
							"<option value='" + obj.hyzxlDm + "'>" + obj.mc
									+ "</option>").appendTo(
							'#' + (arghyzxl || "sel_hyzxl"));
				}
				hyzxlSelect.get(0).selectedIndex = selIndex||1;
			}
		});
	} else {
		hyzxlSelect.empty();
		$("<option value=''>请选择行业小类</option>").appendTo(
				'#' + (arghyzxl || "sel_hyzxl"));
	}
}


