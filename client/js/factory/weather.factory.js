Conglom.factory('Weather', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

	var WeatherFeed = {};

	WeatherFeed.getCurrentPositionDeferred = function(options) {
		var deferred = $.Deferred();
		navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
		return deferred.promise();
	};

	WeatherFeed.getPosts = function(latitude, longitude) {
		// var urlPath = 'https://api.forecast.io/forecast/d3d401dc67aec486351218d22b74b819/' + latitude + ',' + longitude;
		// var urlPath = encodeURI('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=26c35d41ead43cdf58f2b5b32d00cd45');
		var urlPath = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=26c35d41ead43cdf58f2b5b32d00cd45';
		return $http.get(urlPath);
	};

	return WeatherFeed;

}]);