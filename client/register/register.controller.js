Conglom.controller('RegisterController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory',  function($scope, $http, $rootScope, $window, $cacheFactory) {

	$scope.register = function () {
		console.log($scope.user);
		
		var user = new Parse.User();
		user.set("username", $scope.user.username);
		user.set("password", $scope.user.password);
		user.set("email", $scope.user.email);
		
		// other fields can be set just like with Parse.Object
		user.set("somethingelse", "like this!");
		
		user.signUp(null, {
			success: function(user) {
				console.log(user);
				$rootScope.currentUser = user;
				$rootScope.$apply();
				$window.location.href = "#deck";
			},
			error: function(user, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
		
	}

}]);