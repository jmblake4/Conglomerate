Conglom.controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', '$log', 'VideosService', 'TMDBFactory', 'Guardian', 'Weather',  function($scope, $http, $rootScope, $window, $cacheFactory, $log, VideosService, TMDBFactory, Guardian, Weather) {

	if ($rootScope.currentUser === null || $rootScope.currentUser.attributes === undefined) {
		$window.location.href = '#login';
	}

	$scope.userName = $rootScope.currentUser.attributes.username;
	$scope.guardianHidden = true;
	$scope.weatherHidden = true;
	$scope.youtubeHidden = true;
	$scope.imdbHidden = true;
	var visibleStreams = 0;
	$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
	$scope.movieList = [];

	$scope.toggle = function(streamName) {
		console.log(streamName);
		var hidden = eval('$scope.' + streamName + 'Hidden');
		if (visibleStreams === 4 && hidden) {
			alert('Maximum number of streams already visible!');
			return;
		}
		hidden ? visibleStreams++ : visibleStreams--;
		eval('$scope.' + streamName + 'Hidden = !$scope.' + streamName + 'Hidden;');
		$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
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

	Weather.getCurrentPositionDeferred()
	.then(function(position) {
		Weather.getPosts(position.coords.latitude, position.coords.longitude)
		.then(function(res) {
			$scope.weatherStream = res.data;
			$scope.fahrenheit = (((res.data.main.temp - 273) * 9.0 / 5.0) + 32).toFixed(1);
		});
	});
    
    $scope.movieSearch = function() {
        var movieTitle = $scope.movieTitle;
        TMDBFactory.getMovieInfo(movieTitle)
        .then(function(res) {
			$scope.movieList = res.data.results;
        }).catch(function(err) {
            alert('Error: ' + err.message);
        });

    }
	
}]);
