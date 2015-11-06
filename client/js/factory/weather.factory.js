Conglom.factory('Weather', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

	var WeatherFeed = {};
	
	var reqHeaders = {
		"x-api-key": "26c35d41ead43cdf58f2b5b32d00cd45",
		"Content-Type": "application/json"
	};

	var urlPath = encodeURI('http://api.openweathermap.org/data/2.5/forecast/city?id=524901');

	WeatherFeed.getPosts = function() {
		console.log('making get request to: ' + urlPath);
		return $http({
			url: urlPath,
			method: 'GET',
			headers: reqHeaders
		}).then(function(success) {
			console.log('success!');
			console.log(success);
			return success;
		}, function (err) {
			console.log('error!');
			console.error(err);
		});
	};

	return WeatherFeed;
}]);