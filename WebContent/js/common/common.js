function obj2Form(formId, obj, attr) {
	if (!attr) {
		attr = 'name';
	}
	
	if (obj == null) {
		$(formId + ' input').each(function(i, e) {
			$(e).val('');
		});
		$(formId + ' select').each(function(i, e) {
			$(e).val('');
		});
	} else {
		$(formId + ' input').each(function(idx, e) {
			if ($(e).hasClass('easyui-textbox') ) {
				var key = $(e).next('.textbox').children('.textbox-value').attr(attr);
				$(e).textbox('setValue', obj[key]);
			
			} else if ($(e).is('[type="radio"]')) {
				var key = $(e).attr(attr);
				if ($(e).val() == obj[key]) {
					$(e).click();				
				}
			} else {
				var key = $(e).attr(attr);
				if (key) {
					$(e).val(obj[key]);
				}
			}
			
		});
		
		$(formId + ' select').each(function(idx, e) {
			
		 	if ($(e).hasClass('combobox-f') ) {
				var key = $(e).attr('comboname');
				$(e).combobox('setValue', obj[key]);
			} else {
				var key = $(e).attr(attr);
				$(e).val(obj[key]);
			}
		});
	}
	


}
