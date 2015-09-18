function doAction(formObj, actionNm) {

	formObj.action = actionNm;
	formObj.submit();
}

   

// 重写alert函数
function alert(data, callback) {

	if (data.indexOf("温馨提示：") != -1) {
		data = data.replace("温馨提示：", "");
	}
  	jAlert(data, '系统提示', callback);
}

// 重写confirm函数
function confirm(data, fun) {
	jConfirm(data, '确认', function(r) {

				if (r) {
					fun();
				}
			});
}


//jggrid 公共属性
	 jQuery.extend(jQuery.jgrid.defaults,{
		rowNum : 10,
					rowList : [10, 20, 30],

					height: 240,
					prmNames : {
						page : "page", // 表示请求页码的参数名称   
						rows : "pageRows" // 表示请求行数的参数名称     
					},
					emptyrecords : "无数据显示",
					resizable: true,
					loadtext : "读取中...",
						jsonReader : {
						root : "data",
						page : "page",
						total : "totalPage",
						records : "totalCount",
						repeatitems : false

					},
					
					loadError : function(ret, st, error) {
						ret = eval("(" + ret.responseText + ")");
						alert(ret.data.errorContent);
					//	alert(this.id);
						
						/*this.jqGrid('setGridParam', {
									loadtext : ''
								});
						this.trigger('reloadGrid');*/

					}

	 })

//jggrid 封装

function myJqGrid(listId, pageId, url, dataType, colNames, colModel) {
	if (url != "") {
		$(listId).jqGrid({
					url : url,
					datatype : dataType,
					colNames : colNames,
					colModel : colModel,
					width : "100%",
					rowNum : 10,
					rowList : [10, 20, 30],
					pager : pageId,
					height: 240,
					prmNames : {
						page : "page", // 表示请求页码的参数名称   
						rows : "pageRows" // 表示请求行数的参数名称     
					},
					

					viewrecords : true, //是都想显示总数
					//recordtext: "显示  {2} 条中的第 {0} 条到 第 {1} 条 ",
					emptyrecords : "无数据显示",
					resizable: true,
					loadtext : "读取中...",
					//  pgtext : "第{0}页 共 {1}页",	

					jsonReader : {
						root : "data",
						page : "page",
						total : "totalPage",
						records : "totalCount",
						repeatitems : false

					},

					loadError : function(ret, st, error) {
						ret = eval("(" + ret.responseText + ")");
						alert(ret.data.errorContent);
						$(listId).jqGrid('setGridParam', {
									loadtext : ''
								});
						$(listId).trigger('reloadGrid');

					}

				});
	} else {

		$(listId).jqGrid({
					datatype : "jsonString",
					colNames : colNames,
					colModel : colModel,
					rowNum : 10,
					rowList : [10, 20, 30],
					pager : pageId,
					height: 240,
					prmNames : {
						page : "page", // 表示请求页码的参数名称   
						rows : "pageRows" // 表示请求行数的参数名称     
					},

					//	position:'center',
					//recordpos:'right',
					viewrecords : true,

					//	recordtext: "显示  {2} 条中的第 {0} 条到 第 {1} 条 ",
					emptyrecords : "无数据显示",
					loadtext : "读取中...",
					//   pgtext : "第{0}页 共 {1}页",	
					jsonReader : {
						root : "data",
						page : "page",
						total : "totalPage",
						records : "totalCount",
						repeatitems : false

					},

					loadError : function(ret, st, error) {
						ret = eval("(" + ret.responseText + ")");
						alert(ret.data.errorContent);
						$(listId).jqGrid('setGridParam', {
									loadtext : ''
								});
						$(listId).trigger('reloadGrid');

					}

				});

	}

	jQuery(listId).jqGrid('navGrid', pageId, {
				edit : false,
				add : false,
				del : false,
				search : false
			});

}



function reinitIframe(name) {
	var iframe = document.getElementById(name);
	try {
		iframe.height = iframe.contentWindow.document.documentElement.scrollHeight;
	} catch (ex) {
	}
}

/**
 * 链接跳转
 * @param targ
 * @param selObj
 * @param restore
 * @return
 */
function MM_jumpMenu(targ, selObj, restore) {
	eval(targ + ".location='" + selObj.options[selObj.selectedIndex].value
			+ "'");
	if (restore)
		selObj.selectedIndex = 0;
}

/**
 * 密码安全等级检测
 * 
 * （大写字母、小写字母、数字、其他符号）
 * 包含四种类型字符中的任意一种，安全等级为低安全等级，
 * 包含两种字符安全等级为中，
 * 包含三种字符及以上，安全等级为高。
 * 
 * @param pwd 密码
 * @return 0：低；1：中；2：高
 */
function checkPasswordLevel(pwd) {
	var S_level = checkStrong(pwd);
	switch (S_level) {
		case 1 :
			return 0; // 低
		case 2 :
			return 1; // 中
		case 3 :
		case 4 :
			return 2; // 高
		default :
			return -1;
	}
}

/**
 * 测试某个字符是属于哪一类
 * 
 * @param ch
 * @return 1：数字；2：大写字母；4：小写字母；8：特殊字符
 */
function CharMode(ch) {
	if (ch >= 48 && ch <= 57) // 数字
		return 1;
	if (ch >= 65 && ch <= 90) // 大写字母
		return 2;
	if (ch >= 97 && ch <= 122) // 小写 字母
		return 4;
	else
		return 8; // 特殊字符
}

/**
 * 计算出密码中一共有多少种模式
 * 
 * @param num
 * @return
 */
function bitTotal(num) {
	modes = 0;
	for (i = 0; i < 4; i++) {
		if (num & 1)
			modes++;
		num >>>= 1;
	}
	return modes;
}

/**
 * 返回密码的强度级别
 * 
 * @param sPW
 * @return
 */
function checkStrong(sPW) {
	var Modes = 0;
	for (i = 0; i < sPW.length; i++) {
		// 测试每一个字符的类别并统计一共有多少种模式.
		Modes |= CharMode(sPW.charCodeAt(i));
	}
	return bitTotal(Modes);
}

/**
 * 空串判断
 * @return true：空；false：非空
 */
function isEmptyStr(str) {
	if (str.match(/^\s*$/g)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 去除字符串空白
 */
String.prototype.Trim = function() {
	var m = this.match(/^\s*(\S+(\s+\S+)*)\s*$/);
	return (m == null) ? "" : m[1];
};

/**
 * 取字符串长度。
 * 中文包含两个字节
 * @param str
 * @return
 */
function getLen(str) {
	var len = 0;
	for (var i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);

		if (!(char > 255)) {
			len = len + 1;
		} else {
			len = len + 2;
		}
	}
	return len;
}

/**
 * 显示系统日期
 */
function getSysDateWeek() {
	return (new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月"
			+ new Date().getDate() + "日 " + ' 星期' + '日一二三四五六'.charAt(new Date()
			.getDay()));
}

/**
 * 显示系统日期时间
 */
function getSysDateWeekTime() {
	return new Date().toLocaleString() + ' 星期'
			+ '日一二三四五六'.charAt(new Date().getDay());
}

/** 获取Table的行数*/
function getTableRows(tableId) {
	tableRows = document.getElementById(tableId).rows.length;
	return tableRows
}

/** 前台js的msg替换*/
function formatStr() {
	var ary = [];
	for (i = 1; i < arguments.length; i++) {
		ary.push(arguments[i]);
	}
	return arguments[0].replace(/\{(\d+)\}/g, function(m, i) {
				return ary[i];
			});
}

/**
 * 点击全选复选框
 * 
 * @param allChkId 全选复选框ID
 * @param chkGroupName 复选框组名称
 */
function clickAllChk(allChkId, chkGroupName) {
	// 全选复选框
	var allChkObj = document.getElementById(allChkId);

	if (allChkObj.checked) {
		chkAll(chkGroupName);
	} else {
		unChkAll(chkGroupName);
	}
}

/**
 * 全选
 * 
 * @param chkGroupName 复选框组名称
 */
function chkAll(chkGroupName) {
	var key = "input[name$=" + chkGroupName + "]";
	var selects = $(key)

	// 复选框个数
	var cnt = selects.length;
	for (var i = 0; i < cnt; i++) {
		selects[i].checked = true;
	}
}

/**
 * 全不选
 * 
 * @param chkGroupName 复选框组名称
 */
function unChkAll(chkGroupName) {
	// 复选框组
	var key = "input[name$=" + chkGroupName + "]";
	var selects = $(key)

	// 复选框个数
	var cnt = selects.length;
	for (var i = 0; i < cnt; i++) {
		selects[i].checked = false;
	}
}

/**
 * 反选
 * 
 * @param chkGroupName 复选框组名称
 */
function invertChk(chkGroupName) {
	// 复选框组
	var key = "input[name$=" + chkGroupName + "]";
	var selects = $(key)

	// 复选框个数
	var cnt = selects.length;
	for (var i = 0; i < cnt; i++) {
		if (selects[i].checked) {
			selects[i].checked = false;
		} else {
			selects[i].checked = true;
		}
	}
}

/**
 * 根据复选框组选中个数，改变全选复选框状态
 * @param allChkId 全选复选框ID
 * @param chkGroupName 复选框组名称
 */
function changeAllChkStatus(allChkId, chkGroupName) {
	// 复选框组
	var key = "input[name$=" + chkGroupName + "]";
	var selects = $(key);
	// 复选框个数
	var cnt = selects.length;
	// 选中个数
	var selCnt = 0;

	$.each(selects, function(i, checkbox) {
				if (checkbox.id == allChkId) {

				} else if (checkbox.checked == true) {
					selCnt++;
				}
			});
	if (selCnt < cnt) {
		document.getElementById(allChkId).checked = false;
	} else {
		document.getElementById(allChkId).checked = true;
	}
}

var loadMask;
var srcButton
function showmessage(message, e, buttonpos) {
	srcButton = e.srcElement;
	srcButton.disabled = true;
	var winH = ($(window).height()) / 2 - 50;
	var winW = ($(window).width()) / 2 - 50;
	if (buttonpos && e != undefined) {
		winH = e.clientY;
		winW = e.clientX;
	}

	var length = message.length;
	var messagewidth = length * 20 - 20;
	loadMask = $('<div>', {
				"class" : "loadmask",
				"id" : "mask",
				"name" : "mask",
				text : message
			}).css({
				'width' : messagewidth,
				'height' : '100px'
			}).css('top', winH).css('left', winW).appendTo("body");
	loadMask.fadeIn(1000);
	loadMask.fadeTo("slow", 0.8);
}

function closemessage(e) {
	srcButton.disabled = false;
	var offset = loadMask.offset();
	loadMask.hide();
}

/**
 * 给Lable标签设定值
 * 
 * @param id Lable标签ID
 * @param value 值
 */
function setLableValue(id, value) {
	if (navigator.appName.indexOf("Explorer") > -1) {
		document.getElementById(id).innerText = value;
	} else {
		document.getElementById(id).textContent = value;
	}
}