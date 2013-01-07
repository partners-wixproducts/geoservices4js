var geoservices = geoservices || {};

geoservices.Polygon = geoservices.Polygon || function(params) { return (function(params) {
	params = params || {};
	var points = params.points || null; // LatLng[]
	
	var self = {};
	
	self.getBounds = function() {
		var bounds = new geoservices.Bounds();
		for (var i = 0, l = points.length; i < l; ++i) {
			bounds.extend(points[i]);
		}
		return bounds;
	};
	
	self.contains = function(latLng) {
		var bounds = self.getBounds();
		if (!bounds.contains(latLng)) {
		    return false;
		}
		
		// Raycast point in polygon method
		var inPoly = false;
	    for(var i = 0, l = points.length, j = l - 1; i < l; ++i) {
	        var p1 = points[i];
	        var p2 = points[j];
	
	        if (p1.lng < latLng.lng && p2.lng >= latLng.lng || p2.lng < latLng.lng && p1.lng >= latLng.lng) {
	        	if (p1.lat + (latLng.lng - p1.lng) / (p2.lng - p1.lng) * (p2.lat - p1.lat) < latLng.lat) {
	        		inPoly = !inPoly;
	            }
	        }
	
	        j = i;
	    }		
		return inPoly;
	};
	
	return self;
}(params))};