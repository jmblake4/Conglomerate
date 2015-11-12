Conglom.controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', '$log', 'VideosService', 'TMDBFactory', 'Guardian', 'Weather',  function($scope, $http, $rootScope, $window, $cacheFactory, $log, VideosService, TMDBFactory, Guardian, Weather) {

	if ($rootScope.currentUser === null || $rootScope.currentUser.attributes === undefined) {
		$window.location.href = '#login';
	}

	$scope.userName = $rootScope.currentUser.attributes.username;
	$scope.guardianHidden = true;
	$scope.weatherHidden = true;
	$scope.youtubeHidden = true;
	$scope.imdbHidden = true;
	$scope.movieTestHidden = true;
	var visibleStreams = 0;
	$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
	$scope.movieList = []
    var pendingTask;

	$scope.toggle = function(streamName) {
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
			var icon = res.data.weather[0].icon;
			$scope.fahrenheit = (((res.data.main.temp - 273) * 9.0 / 5.0) + 32).toFixed(1);
			if (icon === '01d') {
				console.log('daytime clear');
				$scope.textStyle = {
					'color': 'black',
				};
				$scope.weatherImage = '../images/sunnysmall.jpg';
			} else if (icon === '02d' || icon === '03d' || icon === '04d') {
				console.log('daytime cloudy');
				$scope.textStyle = {
					'color': 'black',
				};
				$scope.weatherImage = '../images/cloudy2small.jpg';
			} else if (icon === '09d' || icon === '10d' || icon === '11d') {
				console.log('daytime stormy');
				$scope.textStyle = {
					'color': 'white',
				};
				$scope.weatherImage = '../images/rainsmall.jpg';
			} else if (icon === '01n') {
				console.log('night clear');
				$scope.textStyle = {
					'color': 'white',
				};
				$scope.weatherImage = '../images/nightsmall.jpg';
			} else if (icon === '02n' || icon === '03n' || icon === '04n') {
				console.log('night cloudy');
				$scope.textStyle = {
					'color': 'white',
				};
				$scope.weatherImage = '../images/nightcloudy.jpg';
			} else if (icon === '09n' || icon === '10n' || icon === '11d') {
				console.log('night stormy');
				$scope.textStyle = {
					'color': 'white',
				};
				$scope.weatherImage = '../images/rainsmall.jpg';
			}
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
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////// Test movie section //////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	
    if ($scope.search === undefined) {
      $scope.search = "";
      fetch();
    }

    $scope.change = function() {
      if (pendingTask) {
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    function fetch() {
      $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&tomatoes=true&plot=full")
        .success(function(response) {
          $scope.details = response;
        });

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
        .success(function(response) {
          $scope.related = response;
        });
    }

    $scope.update = function(movie) {
      $scope.search = movie.Title;
      $scope.change();
    };

    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }

	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////// End Test movie section ////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////
	
}]);
