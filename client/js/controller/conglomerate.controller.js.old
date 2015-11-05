angular.module('app').controller('DeckController', ['Guardian', 'Weather', '$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'UserService',  function(Guardian, Weather, $scope, $http, $rootScope, $window, $cacheFactory, UserService) {
// angular.module('app').controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'UserService',  function($scope, $http, $rootScope, $window, $cacheFactory, UserService) {
	$scope.stream1Hide = false;
	$scope.stream2Hide = false;
	$scope.stream3Hide = false;
	$scope.stream4Hide = false;
	var visibleStreams = 1;	
	$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';

	var vm = this;

	vm.user = null;

	loadCurrentUser();
	
	Guardian.getPosts()
    .then(function(res) {
        $scope.blogPosts = res.data.response.results;
        console.log(res);
    }).catch(function(err) {
        console.log(err);
        alert('There was an error with the Guardian Feed!');
    });
	
	Weather.getPosts()
    .then(function(res) {
        $scope.blogPosts = res.data.city;
        console.log(res);
    }).catch(function(err) {
        console.log(err);
        alert('There was an error with the Weather Feed!');
    });

	function loadCurrentUser() {
		UserService.GetByUsername($rootScope.globals.currentUser.username)
			.then(function (user) {
				vm.user = user;
				console.log(user);
			});
	}
	
	$scope.addStream = function() {
		console.log('adding stream');
		if ( visibleStreams === 4 ) {
			alert('Maximum number of streams already visible!')
		} else {
			visibleStreams++;
			$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
			eval('$scope.stream' + visibleStreams.toString() + 'Hide = false;');
		}
	}
	
	$scope.removeStream = function() {
		if ( visibleStreams === 1 ) {
			alert('Only one stream remaining!')
		} else {
			eval('$scope.stream' + visibleStreams.toString() + 'Hide = true;');
			visibleStreams--;
			$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
		}
	}
	
	$scope.logout = function() {
		$window.location.href = '#login';
	}

}]);