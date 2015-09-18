/*
 * 共通校验脚本
 * 
 * @auther lilanfei
 * @since 2010-08-28
 * @version 1.0
 */


// 字母数字及指定字符
var Regex_NumberLetterMarks = /^[0-9a-zA-Z`\-\\~!@#$%^&*()_+{}|:\"<>?]+$/;
// 字母数字下划线
var Regex_NumberOr_Letter = /^[0-9a-zA-Z\_\-]+$/;
// 字母数字
var Regex_NumberLetter = /^[0-9a-zA-Z]+$/;
// 数字
var Regex_AllNumber = /^[0-9]+$/;
// 字母
var Regex_Letter = /^[a-zA-Z]+$/;
// 小写字母
var Regex_LowerLetter = /^[a-z]+$/;
// 大写字母
var Regex_UpperLetter = /^[A-Z]+$/;
// 金额
var Regex_Money = /^[0-9]+[\.][0-9]{0,3}$/;
// 汉字
var Regex_CH = /^[\u4e00-\u9fa5]+$/;
// 包含汉字
var Regex_ExistCH = /[\u4E00-\u9FA5]/;
// 包含全角符号
var Regex_ExistQJMarks = /[\uFE30-\uFFA0]/;
// Email
var Regex_Email = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 手机
var Regex_Mobile = /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/;
// 电话
var Regex_Tel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

/**
 * 判断是否都是数字
 */
String.prototype.isAllNumber = function() {
	return (Regex_AllNumber.test(this));
};

/**
 * 检测字符串是否字母数字及指定字符
 */
String.prototype.isNumberLetterMarks = function(){
	return (Regex_NumberLetterMarks.test(this));
};

/**
 * 判断是否是字母
 */
String.prototype.isLetter = function() {
	return (Regex_Letter.test(this));
};

/**
 * 判断是否是小写字母
 */
String.prototype.isLowerLetter = function() {
	return (Regex_LowerLetter.test(this));
};

/**
 * 判断是否是大写字母
 */
String.prototype.isUpperLetter = function() {
	return (Regex_UpperLetter.test(this));
};

/**
 * 判断是否是数字或字母
 */
String.prototype.isNumberOrLetter = function() {
	return (Regex_NumberLetter.test(this));
};

/**
 * 检查是否只由英文字母和数字和下划线组成
 */
String.prototype.isNumberOr_Letter = function() {
	return (Regex_NumberOr_Letter.test(this));
};

/**
 * 检查是否符合金额格式
 * 格式定义为带小数的正数，小数点后最多三位
 */
String.prototype.isMoney = function() {
	return (Regex_Money.test(this));
};

/**
 * 检查是否是汉字
 */
String.prototype.isChinese = function(){
	return (Regex_CH.test(this));
};

/**
 * 判断是否包含汉字
 */
String.prototype.existChinese = function() {
	// [\u4E00-\u9FA5]为汉字﹐[\uFE30-\uFFA0]为全角符号
	return (Regex_ExistCH.test(this));
};

/**
 * 判断是否是数字
 * @param flag 数字区分
 * @return
 */
String.prototype.isNumeric = function(flag) {
	// 验证是否是数字
	if(isNaN(this)) {
		return false;
	}

	switch(flag) {
		case null:		// 数字
		case "":
			return true;
		case "+":		// 正数
			return (/(^\+?|^\d?)\d*\.?\d+$/.test(this));
		case "-":		// 负数
			return (/^-\d*\.?\d+$/.test(this));
		case "i":		// 整数
			return (/(^-?|^\+?|\d)\d+$/.test(this));
		case "+i":		// 正整数
			return (/(^\d+$)|(^\+?\d+$)/.test(this));
		case "-i":		// 负整数
			return (/^[-]\d+$/.test(this));
		case "f":		// 浮点数
			return (/(^-?|^\+?|^\d?)\d*\.\d+$/.test(this));
		case "+f":		// 正浮点数
			return (/(^\+?|^\d?)\d*\.\d+$/.test(this));
		case "-f":		// 负浮点数
			return (/^[-]\d*\.\d$/.test(this));
		default:        // 缺省
			return true;
	}
};

/**
 * 检查输入字符串是否符合时间格式
 */ 
String.prototype.isTime = function() {
	var regex = /^[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/;
	if(!regex.test(this)){
		return false;
	}
	var hour = time.substring(0,2);
	var minute = time.substring(3,5);
	var second = time.substring(6);
	if(hour>23 || hour <0){
		return false;
	}
	if(minute > 60 ||minute < 0){
		return false;
	}
	if(second > 60 ||second < 0){
		return false;
	}
	
	return true;
};

/**
 * 判断是否是正确的长日期
 */
String.prototype.isLongDate = function() {
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	if (r == null) {
		return false;
	}
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3]
			&& d.getDate() == r[4] && d.getHours() == r[5]
			&& d.getMinutes() == r[6] && d.getSeconds() == r[7]);

};

/**
 * 判断是否是正确的短日期
 */
String.prototype.isShortDate = function() {
	var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) {
		return false;
	}
	var d = new Date(r[1], r[3] - 1, r[4]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
};

/**
 * 判断是否是yyyy/MM/dd格式的日期
 * 
 */
function isRealDate(str){ 
	var reg = /^((((1[6-9]|[2-9]\d)\d{2})\/(0?[13578]|1[02])\/(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})\/(0?[13456789]|1[012])\/(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})\/0?2\/(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\/0?2\/29))$/;
	if (reg.test(str)) return true;
	return false;
}

/**
 * 判断是否是yyyy/MM格式的日期
 * 
 */
function isYYYYMMDate(str){ 
	var reg = /^\d{4}\/((0[1-9])|(1[0-2]))/;
	if (reg.test(str)) return true;
	return false;
};
/**
 * 判断是否是正确的日期
 */
String.prototype.isDate = function() {
	return this.isLongDate() || this.isShortDate();
};

/**
 * 判断是否是邮编(中国)
 */
String.prototype.isZipCode = function() {
	return (/^[\\d]{6}$/.test(this));
};

/**
 * 判断是否是有效的身份证(中国)
 */
String.prototype.isIDCard = function() {
	var iSum=0;
	var info="";
	var sId = this;

    var aCity = {
    			11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
    			21:"辽宁",22:"吉林",23:"黑龙 江",31:"上海",32:"江苏",
    			33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",
    			41:"河南",42:"湖 北",43:"湖南",44:"广东",45:"广西",
    			46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",
    			54:"西 藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
    			65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国 外"
    			};

    if(!(/^\d{17}(\d|x)$/i.test(sId))) {
    	return false;
	}
    sId=sId.replace(/x$/i,"a");
    // 非法地区
	if(aCity[parseInt(sId.substr(0,2))]==null) {
		return false;
	}

	var sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));

	var d=new Date(sBirthday.replace(/-/g,"/"));

	// 非法生日
	if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())) {
		return false;
	}
	for(var i = 17;i>=0;i--) {
		iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11);
	}

	if(iSum%11!=1) {
		return false;
	}
	
	return true;
};

/**
 * 判断是否是正确的IP地址
 */
String.prototype.isIP = function() {
	// IP校验正则表达式
	var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;

	if (reSpaceCheck.test(this)) {
		this.match(reSpaceCheck);
		if (RegExp.$1 <= 255 && RegExp.$1 >= 0 && RegExp.$2 <= 255
				&& RegExp.$2 >= 0 && RegExp.$3 <= 255 && RegExp.$3 >= 0
				&& RegExp.$4 <= 255 && RegExp.$4 >= 0) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

/**
 * 判断是否是合法的文件名/目录名
 */
String.prototype.isFileName = function() {
	return !(/[\\\/\*\?\|:"<>]/g.test(this));
};

/**
 * 判断是否是有效链接
 */
String.prototype.isUrl = function() {
	var regu = "^((http:[/][/])?\w+([.]\w+|[/]\w*)*)?$";
	var re = new RegExp(regu);
	if (re.test(this)) {
		return true;
	} else {
		return false;
	}
};

/**
 * 判断是否是颜色(#FFFFFF形式)
 */
String.prototype.IsColor = function() {
	var temp = this;
	if (temp=="") return true;
	if (temp.length!=7) return false;
	return (temp.search(/\#[a-fA-F0-9]{6}/) != -1);
};

/**
 * 判断是否是Email
 */
String.prototype.isEmail = function() {
    return (Regex_Email.test(this.Trim()));
};

/**
 * 判断是否是手机号码
 */
String.prototype.isMobile = function() {  
	return (Regex_Mobile.test(this.Trim()));   
};

/**
 * 判断是否是电话号码
 */
String.prototype.isTel = function() {
    // "兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
    return (Regex_Tel.test(this.Trim()));
};

