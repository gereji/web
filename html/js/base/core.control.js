core.control  = {
	render : function(template, records){
		var output = new Array();
		for(i in records){
			var row = "\t"+this.compile(template, records[i]);
			output.push(row);
		}
		return output.join("\r");
	},
	compile : function(html, record){
		var pattern = /{{([^}]*)}}/g;
		html= html.replace(pattern, function(tag){
			var key = tag.replace('{{', '').replace('}}', '');
			var value = record[key];
			if(value && value.length && value.length === 0) {
				return ' ';
			}
			return value ? value : '';
		});
		return html;			
	},
	getDate: function(value){
		var dateObject = new Date(value*1000);
		return dateObject.getDay() + ' - ' + (dateObject.getMonth() + 1) + ' - ' + dateObject.getFullYear() + ' ' + dateObject.getHours() + ':' + dateObject.getMinutes();
	},
	getHTML: function(){
		return $('<em>It works</em>');
	},
	extend : function(name, extension){
		extension.prototype = core.control;
		extension.prototype.constructor = extension;
		core.control[name] = extension;					
	}
};