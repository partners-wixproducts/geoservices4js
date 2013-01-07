var geoservices = geoservices || {};

geoservices.Protocol = geoservices.Protocol || (function() {
	var self = {};
	
	self.post = function(params) {
		var url = params.url;
		var obj = params.obj;
		var callback = params.callback || function(e){};
		var timeout = params.timeout || 30000;
		
		var client = http.create({
			onload : function(e) {
				callback(JSON.parse(this.responseText));
			},
			onerror : function(e) {
				callback({
					error : {
						code : "protocol",
						message : "protocol error"
					}
				});
			},
			timeout : timeout
		});
	
		client.open("POST", url);
		client.setRequestHeader("Accept", "application/json");
		client.setRequestHeader("Content-Type", "application/json");
		client.send(JSON.stringify(obj));
	};
	
	return self;
}());