var geoservices = geoservices || {};

/** @see https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds */
geoservices.Bounds = geoservices.Bounds || function() { return (function() {
	var self = {};
	
	var northEast = null;
	var southWest = null;
	
	self.isEmpty = function() {
		return (northEast === null);
	};
	
	self.getNorthEast = function() {
		return northEast;
	};
	
	self.getSouthWest = function() {
		return southWest;
	};
	
	self.extend = function(latLng) {
		if (self.isEmpty()) {
			northEast = {
				lat : latLng.lat,
				lng : latLng.lng
			};
			southWest = {
				lat : latLng.lat,
				lng : latLng.lng
			};
		} else {
			northEast.lat = Math.max(northEast.lat, latLng.lat);
			northEast.lng = Math.max(northEast.lng, latLng.lng);
			southWest.lat = Math.min(southWest.lat, latLng.lat);
			southWest.lng = Math.min(southWest.lng, latLng.lng);
		}
	};

	self.contains = function(latLng) {
		return ((!self.isEmpty()) &&
				(latLng.lat <= northEast.lat) &&
				(latLng.lng <= northEast.lng) &&
				(latLng.lat >= southWest.lat) &&
				(latLng.lng >= southWest.lng));
	};
	
	return self;
}())};