Conglom.controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Guardian', 'Weather',  function($scope, $http, $rootScope, $window, $cacheFactory, Guardian, Weather) {

	if ( $rootScope.currentUser === null || $rootScope.currentUser.attributes === undefined ) {
		$window.location.href = '#login';
	}

	$scope.userName = $rootScope.currentUser.attributes.username;
	$scope.stream1Hide = true;
	$scope.stream2Hide = true;
	$scope.stream3Hide = true;
	$scope.stream4Hide = true;
	var visibleStreams = 0;
	$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';

	$scope.addStream = function() {
		if ( visibleStreams === 4 ) {
			alert('Maximum number of streams already visible!')
		} else {
			visibleStreams++;
			$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
			eval('$scope.stream' + visibleStreams.toString() + 'Hide = false;');
		}
	}

	$scope.removeStream = function() {
		if ( visibleStreams === 0 ) {
			alert('No stream found to remove!');
		} else {
			eval('$scope.stream' + visibleStreams.toString() + 'Hide = true;');
			visibleStreams--;
			$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
		}
	}

	$scope.logout = function() {
		$window.location.href = '#login';
		Parse.User.logOut();
		$rootScope.currentUser = null;
	}

	Guardian.getPosts()
    .then(function(res) {
        $scope.guardianStream = res.data.response.results;
    }).catch(function(err) {
        alert('There was an error with the Guardian Feed!');
    });

	Weather.getPosts()
    .then(function(res) {
        $scope.blogPosts = res.data.city;
    }).catch(function(err) {
        alert('There was an error with the Weather Feed!');
    });

}]);
