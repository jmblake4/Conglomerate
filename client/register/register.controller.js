Conglom.controller('RegisterController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory',  function($scope, $http, $rootScope, $window, $cacheFactory) {

	$scope.register = function () {
		
		var user = new Parse.User();
		user.set("username", $scope.user.username);
		user.set("password", $scope.user.password);
		user.set("email", $scope.user.email);
		
		// other fields can be set just like with Parse.Object
		// user.set("streamList", { guardianHidden: true,
		user.set('guardianHidden', 'true');
		user.set('weatherHidden', 'true');
		user.set('youtubeHidden', 'true');
		user.set('imdbHidden', 'true');
		user.set('redditHidden', 'true');
		user.set('twitterHidden', 'true');
		user.set('gmailHidden', 'true');
		user.set('yahooHidden', 'true');
		user.set('weatherHidden', 'true');
			// youtubeHidden: true,
			// imdbHidden: true,
			// redditHidden: true,
			// twitterHidden: true,
			// gmailHidden: true,
			// yahooHidden: true
		// });
		
		user.signUp(null, {
			success: function(user) {
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