angular.module('app').factory('Weather', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

	var WeatherFeed = {};
	
	var reqHeaders = { headers: {
		// "x-api-key": "26c35d41ead43cdf58f2b5b32d00cd45",
		"Content-Type": "application/json"
	}};

	var urlPath = 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=26c35d41ead43cdf58f2b5b32d00cd45';

	WeatherFeed.getPosts = function() {
		return $http.get(urlPath, reqHeaders);
	};

	return WeatherFeed;
}]);