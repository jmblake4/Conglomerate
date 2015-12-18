Conglom.controller('HomeController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory',  function($scope, $http, $rootScope, $window, $cacheFactory) {

	if ( Parse.User.current() === null ) {
		$window.location.href = "#login";
	} else {
		$window.location.href = "#deck";
	}

}]);
