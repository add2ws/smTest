/*******************************************************************************
 * c //盒子
 * 
 * @param p
 ******************************************************************************/
function comboxEdit(p) {
	var o=new Object();
	var html='<input id="combox_content" type="text"/><div style="float:left;margin:2px 0px;"><img class="combox-image" src="../skins/default/images/common/searchbox_button.png"/></div><input type="hidden" id="combox_hide"/><select id="combox_list" size="10"></select>';
	var c = $("div[id='" + p + "']");
	var _cn = c.attr("name")==undefined?"":c.attr("name");
	var _cv = c.attr("value")==undefined?"": c.attr("value");
	var _ct = c.attr("text")==undefined?"":c.attr("text");
	var _cue = c.attr("url_exact")==undefined?"":c.attr("url_exact");
	var _cuf = c.attr("url_fuzzy")==undefined?"":c.attr("url_fuzzy");
	var _w = c.width();
	var _t = c.offset().top;
	var _l = c.offset().left;
	var _f =true;
	c.html(html);
	var cc = $("div[id='" + p + "'] input:text");
	var ch = $("div[id='" + p + "'] input:hidden");
	var ci = $("div[id='" + p + "'] div img.combox-image");
	var cl = $("div[id='" + p + "'] select");
	var clo = $("div[id='" + p + "'] select option");
	c.css({
		fontSize : '12px',
		color : 'red',
		paddingTop : '0px',
		height : '22px',
		border : '1px solid #99BBE8'
	});
	cc.css({
		color : 'gray',
		marginTop : '0px',
		height : '20px',
		float : 'left',
		border : '0px',
		width : (_w - 22) + 'px',
		fontStyle:'italic'
	});
	cl.css({
		position : 'absolute',
		float : 'left',
		display : "none",
		width : _w + 'px',
		left : (_l + 1) + 'px'
	});
	ch.attr("name", _cn);
	cc.val("请输入完成按Enter查询");
	ch.val(_cv);
	
	if(_cue!=undefined && _cv!='9999999999'&&_cv!='999999999999'){
		
		cc.val("");
		init(_cue);
	}
		
	c.ajaxSuccess(function() {
		_f=true;
		ci.attr('src', '../skins/default/images/common/searchbox_button.png');
		$('body').height() - _t - 15 >= cl.height() ? cl.css('top', (_t + 15)
				+ 'px') : cl.css('top', (_t - cl.height() - 15) + 'px');
	});
	c.ajaxSend(function() {
		_f=false;
		ci.attr('src', '../skins/default/images/common/loading.gif');
	});
	c.ajaxError(function() {
		c.html('数据加载失败！');
	});
	cc.keypress(function(event) {
		if (cc.val() != ""&&event.keyCode == 13&&_f) {
			search();
		}
	});
	cc.keyup(function() {
		if ($(this).val() == "") {
			cl.css('display', 'none');
			ch.val('');
		}
	});
	cc.focus(function() {
		if ($(this).val() == "请输入完成按Enter查询" || $(this).val()=="没有查询结果!") {
			$(this).val('');
		}
		$(this).css({color:'black',fontStyle:'normal'});
	});
	ci.click(function() {
		if (cc.val() != ""&&_f) {
			search();
		}
	});
	cl.click(function(index) {
		cc.val($(this).find("option:selected").text());
		ch.val($(this).find("option:selected").val());
		$(this).css('display', 'none');
	});
	$("body").click(function() {
		cl.css('display', 'none');
	});
	function search() {
		$.post(_cuf, {
			name : cc.val()
		}, function(d) {
			if (d != null) {
				if (d.length > 0) {
					var o = "";
					cl.css('display', 'block');
					for ( var i = 0; i < d.length; i++) {
						o = o + "<option value=" + d[i].id + ">" + d[i].text
								+ "</option>";
					}
					cl.html(o);
					cl.attr('size', d.length);
				}
			} else {
				cc.val('没有查询结果!');
				cc.css('color', 'gray');
			}
		}, 'json');
	};
	o.init=function(url){
		$.post(url, {sid:_cv}, function(d) {
			if(d==""){
				cc.val("");
			}else{
				cc.val(d.text);
			}

			cc.css({color:'black',fontStyle:'normal'});
		}, 'json') ;
		
	};
	return o;
}
