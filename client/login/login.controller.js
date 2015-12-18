Conglom.controller('LoginController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory',  function($scope, $http, $rootScope, $window, $cacheFactory) {

	$scope.login = function () {
		Parse.User.logIn($scope.user.username, $scope.user.password, {
			success: function(user) {
				$window.location.href = "#deck";
			},
			error: function(user, error) {
				alert(error.message);
			}
		})
	}

}]);