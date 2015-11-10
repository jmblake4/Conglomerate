Conglom.factory('Weather', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

	var WeatherFeed = {};

	// var reqHeaders = {
	// 	"x-api-key": "26c35d41ead43cdf58f2b5b32d00cd45",
	// 	"Content-Type": "application/json"
	// };

	// var options = {
	// 	enableHighAccuracy: true,
	// 	timeout: 5000,
	// 	maximumAge: 0
	// };
	
	// function success(pos) {
	// 	var crd = pos.coords;
		
	// 	console.log('Your current position is:');
	// 	console.log('Latitude : ' + crd.latitude);
	// 	console.log('Longitude: ' + crd.longitude);
	// 	console.log('More or less ' + crd.accuracy + ' meters.');
	// };
	
	// function error(err) {
	// 	console.warn('ERROR(' + err.code + '): ' + err.message);
	// };
	
	// navigator.geolocation.getCurrentPosition(success, error, options);

	// var urlPath = encodeURI('http://api.openweathermap.org/data/2.5/weather?q=Birmingham,US&appid=26c35d41ead43cdf58f2b5b32d00cd45');
	// var urlPath = 'https://api.forecast.io/forecast/d3d401dc67aec486351218d22b74b819/' + latitude + ',' + longitude;
	// console.log(urlPath);

	WeatherFeed.getCurrentPositionDeferred = function(options) {
		var deferred = $.Deferred();
		navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);
		return deferred.promise();
	};

	WeatherFeed.getPosts = function(latitude, longitude) {
		var urlPath = 'https://api.forecast.io/forecast/d3d401dc67aec486351218d22b74b819/' + latitude + ',' + longitude;
		console.log(urlPath);
		return $http.get(urlPath);
		// return $http({
		// 	url: urlPath,
		// 	method: 'GET',
		// 	headers: reqHeaders
		// }).then(function(success) {
		// 	return success;
		// }, function (err) {
		// 	console.log(err);
	};

	return WeatherFeed;

}]);


// WeatherFeed.getPosts = function() {
// 		console.log('making get request to: ' + urlPath);
// 		return $http({
// 			url: urlPath,
// 			method: 'GET',
// 			headers: reqHeaders
// 		}).then(function(success) {
// 			console.log('success!');
// 			console.log(success);
// 			return success;
// 		}, function (err) {
// 			console.log('error!');
// 			console.error(err);
// 		});
// 	};