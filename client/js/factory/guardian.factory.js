Conglom.factory('Guardian', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

	var GuardianFeed = {};

	GuardianFeed.getPosts = function() {
		var urlPath = 'https://localhost:3000/guardian';
		return $http.get(urlPath);
	};

	return GuardianFeed;

}]);