var geoservices = geoservices || {};

geoservices.Client = geoservices.Client || function(params) { return (function(params) {
	params = params || {};
	var apiUrl = params.apiUrl || "https://geoservices.openrest.com/v1.1";
	
	var self = {};
	
	self.request = function(params) {
		params = params || {};
		var request = params.request || null;
		var callback = params.callback || function(response) {};
		
		geoservices.Protocol.post({
			url : apiUrl,
			obj : request,
			callback : callback
		});
	};
	
	/** Deprecated, use "request" method */
	self.geocode = function(params) {
		var callback = params.callback || function(e) {};
		var args = params.params || {};
		var locale = args.locale || null;
		var query = args.query || null;
		
		self.request({
			request : {
				type : "geocode",
				locale : locale,
				query: query
			},
			callback : function(response) {
				callback({
					params : params,
					response : response
				});
			}
		});
	};
	
	/** Deprecated, use "request" method */
	self.search = function(params) {
		var callback = params.callback || function(e) {};
		var args = params.params || {};
		var locale = args.locale || null;
		var country = args.country || null;
		var locality = args.locality || null;
		var query = args.query || null;
		
		self.request({
			request : {
				type : "search",
				locale : locale,
				country : country,
				locality : locality,
				query : query
			},
			callback : function(response) {
				callback({
					params : params,
					response : response
				});
			}
		});
	};
	
	return self;
}(params))};