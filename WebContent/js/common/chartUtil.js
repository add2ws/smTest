var ChartUtil = {
	Create: function(options) {
		var width = options.width?options.width:500;
		var height = options.height?options.height:400;
		var chart = new FusionCharts(options.flashURL, options.id, width, height, "0", "1");
		var xml = generateXML(options);
		$('#'+options.id).data('xmlData', xml);
		$('#'+options.id).data('flashURL', options.flashURL);
		chart.setDataXML(xml);
		chart.render(options.id);
	},
	Resize: function(id, width, height, radius) {
		var url = $('#'+id).data('flashURL');
		var xml = $('#'+id).data('xmlData');
		if (radius) {
			var reg = new RegExp('pieRadius="[0-9]*"');
			xml = xml.replace(reg, 'pieRadius="'+radius+'"');
		}
		if (width>600) {
			var reg = new RegExp('showNames="0"');
			xml = xml.replace(reg, 'showNames="1"');
			reg = new RegExp('showValues="0"');
			xml = xml.replace(reg, 'showValues="1"');
		}
		var chart = new FusionCharts(url, id, width, height, "0", "1");
		chart.setDataXML(xml);
		chart.render(id);
		
	},
	Column: function(options) {
		this.Create(options);
	},
	Pie: function(options) {
		this.Create(options);
	},
	MSColumn: function(options) {
		var width = options.width?options.width:500;
		var height = options.height?options.height:400;
		var chart = new FusionCharts(options.flashURL, options.id, width, height, "0", "1");
		var xml = generateMSXML(options);
		$('#'+options.id).data('xmlData', xml);
		$('#'+options.id).data('flashURL', options.flashURL);
		chart.setDataXML(xml);
		chart.render(options.id);
	}
};

function generateMSXML(options) {
	var caption = options.caption?options.caption:'';
	var showNames = options.showNames? 1:0;
	var showValues = options.showValues? 1:0;
	var xml = '<graph caption="' + caption + '" decimalPrecision="0"  showPercentageValues="1" showNames="'+showNames+'"  showValues="'+showValues+'" showPercentageInLabel="1" yaxismaxvalue="10" yaxisminvalue="0" >';
	xml += "<categories>";
	$.each(options.data.categories, function(i, val) {
		xml += '<category name="'+val+'" />';
	});
	xml += "</categories>";

	$.each(options.data.dataset, function(i, val) {
		var color = getRandColor();
		xml += '<dataset seriesName="'+val.seriesName+'" color="'+color+'" >';
		$.each(val.set, function (i, val) {
			xml += '<set value="'+val+'"/>';
		});
		xml += '</dataset>';
	});
	
	xml += "</graph>";
	return xml;
}

function generateXML(options) {
	var caption = options.caption?options.caption:'';
	var radius = options.radius? 'pieRadius="'+options.radius+'"':'';
	var showNames = options.showNames? 1:0;
	var showValues = options.showValues? 1:0;
	var xml = '<graph caption="' + caption + '" decimalPrecision="0" showZeroPies="0" animation="1" showPercentageValues="1"  showNames="'+showNames+'"  showValues="'+showValues+'" showPercentageInLabel="1" yaxismaxvalue="10" yaxisminvalue="0" '+radius+' >"';
	$.each(options.data, function(i, val){
		var value = val[1]?val[1]:0;
		xml += '<set name="'+val[0]+'" value="'+value+'" color="'+getRandColor()+'"/>';
	});
	xml += "</graph>";
	return xml;
}

var jji = 0;
function getRandColor() {
	var colors = ["AFD8F8", "F6BD0F", "8BBA00", "FF8E46", "008E8E", "D64646", "588526", "B3AA00", "008ED6", "9D080D", "A186BE"];
	if ( jji>colors.length-1) {
		jji = 0;
	}
	return colors[jji++];
}