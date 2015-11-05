Conglom.factory('Guardian', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

	var GuardianFeed = {};

	var urlPath = 'http://content.guardianapis.com/search?api-key=9uhgzw5cgu3mq82e2ymu5jxz';

	GuardianFeed.getPosts = function() {
		return $http.get(urlPath);
	};

	return GuardianFeed;

}]);