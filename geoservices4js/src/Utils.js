var geoservices = geoservices || {};

geoservices.Utils = geoservices.Utils || (function() {
    var earthRadius = 3958.75;
    var meterConversion = 1609;
    
	var self = {};
	
	function toRadians(num) {
		return num * Math.PI / 180;
	}
	
	/** @see http://stackoverflow.com/questions/837872/calculate-distance-in-meters-when-you-know-longitude-and-latitude-in-java */
	function distanceImpl(lat1, lng1, lat2, lng2) {
	    var dLat = toRadians(lat2-lat1);
	    var dLng = toRadians(lng2-lng1);
	    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	               Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
	               Math.sin(dLng/2) * Math.sin(dLng/2);
	    return earthRadius * meterConversion * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }
    
	self.distance = function(latLng1, latLng2) {
		return distanceImpl(latLng1.lat, latLng1.lng, latLng2.lat, latLng2.lng);
	};
	
	return self;
}());