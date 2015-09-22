
$(document).ready(function() {

	var url = contextPath + '/loginMenuTree.do?rid=1900';
	$.post(url, {}, function(data) {
		var root = data[0];
		
		if (!root.children) {
			return;
		}
		
		//菜单排序
		root.children.sort(function(a, b) {
			return a.sortId - b.sortId;
		});
		
		//加载顶部导航菜单（一级菜单组）
		$('#navMenu').empty();
		var curOpen = null;//当前打开的菜单
		var isFirstMenu = true;//默认打开第一个菜单
		$.each(root.children, function(i, e) {
			if (e.visible == '1') {
				var li = $('<li class="unSelected">' + e.name + '</li>');
				//绑定打开左侧菜单事件
				li.click(function() {
					if (curOpen != e.id) {
						$('#mainPage').attr('src', '');
						openLeftMenu(e);
						curOpen = e.id;
						$('.navMenuList li[class="selected"]').removeClass('selected').addClass('unSelected');
						$(this).removeClass('unSelected').addClass('selected');
					}
				});
				$('#navMenu').append(li);
				if (isFirstMenu) {
					li.click();
					isFirstMenu = false;
					curOpen = e.id;
				}
			}
		});
		
	}, 'json');
	
});

//展开左侧菜单
function openLeftMenu(navMenuNode) {
	$('#leftLayout').empty();
	/*
	$('#leftLayout').panel({
		title: navMenuNode.name,
		iconCls: navMenuNode.iconClass
	});
	*/
	if (!navMenuNode.children || navMenuNode.children.length == 0) return;
	//二级菜单排序
	navMenuNode.children.sort(function(a, b) {
		return a.sortId - b.sortId;
	});
	
	//创建菜单组容器
	var leftMenu = $('<div class="easyui-accordion" style="width: 100%;" ></div>').appendTo($('#leftLayout'));
	leftMenu.accordion({border: false});
	//创建子菜单容器
	var menuLv2 = $('<ul class="menuAccordion"></ul>').appendTo($('#leftLayout'));
	//遍历二级菜单
	$.each(navMenuNode.children, function(j, o) {
		//是菜单组
		if (o.menuType == '0') {
			
			if (o.visible != '1') return true;
			var menuLv2Group = null;
			//按sort_id菜单排序
			if (o.children) {
				o.children.sort(function(a, b) {
					return a.sortId - b.sortId;
				});
			
				menuLv2Group = $('<ul class="menuAccordion"></ul>');
				//遍历三级菜单
				$.each(o.children, function(idx, node) {
					
					if (node.visible == '1') {
						var liStr = '<li class="unSelected"><span class="icon ' + node.iconClass + '"></span>';
						liStr += '<span class="text">' + node.name + '</span></li>';
						
						var li = $(liStr);
						li.click(function() {
							$('.menuAccordion li[class="selected"]').removeClass('selected').addClass('unSelected');
							$(this).removeClass('unSelected').addClass('selected');
							
							$('#mainPage').attr('src', contextPath + '/forwardPage.do?address=' + node.address);
						});
						
						
						menuLv2Group.append(li);
					}
				});
			}
			leftMenu.accordion('add', {
				title: o.name,
				iconCls: o.iconClass,
				content: menuLv2Group,
				selected: false
			});
			
		
		//是子菜单
		} else {
			if (o.visible == '1') {
				var liStr = '<li class="unSelected"><span class="icon ' + o.iconClass + '"></span>';
				liStr += '<span class="text">' + o.name + '</span></li>';
				
				var li = $(liStr);
				li.click(function() {
					$('.menuAccordion li[class="selected"]').removeClass('selected').addClass('unSelected');
					$(this).removeClass('unSelected').addClass('selected');
					$('#mainPage').attr('src', contextPath + '/forwardPage.do?address=' + o.address);
					
					/*
					$('#page').panel({
						href: contextPath + '/forwardPage.do?address=' + o.address
					});
					*/
				});
				
				menuLv2.append(li);
			}
		
		}
	
	});
	
	//二级子菜单展开时的动画效果
	menuLv2.hide();
	menuLv2.slideDown();
	//默认展开第一个菜单组
	leftMenu.accordion('select', 0);
	
}