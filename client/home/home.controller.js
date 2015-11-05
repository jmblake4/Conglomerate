Conglom.controller('HomeController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory',  function($scope, $http, $rootScope, $window, $cacheFactory) {

	if ( $rootScope.currentUser.attributes === undefined ) {
		$window.location.href = "#login";
	} else {
		$window.location.href = "#deck";
	}

}]);