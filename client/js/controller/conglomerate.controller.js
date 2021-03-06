Conglom.controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', '$log', 'VideosService', 'TMDBFactory', 'Guardian', 'Weather',  function($scope, $http, $rootScope, $window, $cacheFactory, $log, VideosService, TMDBFactory, Guardian, Weather) {

	var currentUser = Parse.User.current();
	if ( currentUser === null ) {
		$window.location.href = '#login';
	}

	var visibleStreams = 0;

	var guardianHidden = currentUser.get('guardianHidden');
	var weatherHidden = currentUser.get('weatherHidden');
	var youtubeHidden = currentUser.get('youtubeHidden');
	var imdbHidden = currentUser.get('imdbHidden');
	var redditHidden = currentUser.get('redditHidden');
	var twitterHidden = currentUser.get('twitterHidden');
	var gmailHidden = currentUser.get('gmailHidden');
	var yahooHidden = currentUser.get('yahooHidden');

	$scope.userName = currentUser.attributes.username;
	$scope.guardianHidden = isTrue(guardianHidden);
	$scope.weatherHidden = isTrue(weatherHidden);
	$scope.youtubeHidden = isTrue(youtubeHidden);
	$scope.imdbHidden = isTrue(imdbHidden);
	$scope.redditHidden = isTrue(redditHidden);
	$scope.twitterHidden = isTrue(twitterHidden);
	$scope.gmailHidden = isTrue(gmailHidden);
	$scope.yahooHidden = isTrue(yahooHidden);

	function isTrue(hiddenStr) {
		if (hiddenStr === 'true') {
			return true;
		} else {
			visibleStreams++;
			return false;
		}
	}
	
	console.log(visibleStreams);

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

	$scope.logout = function() {
		currentUser.set('guardianHidden', $scope.guardianHidden.toString());
		currentUser.set('weatherHidden', $scope.weatherHidden.toString());
		currentUser.set('youtubeHidden', $scope.youtubeHidden.toString());
		currentUser.set('imdbHidden', $scope.imdbHidden.toString());
		currentUser.set('redditHidden', $scope.redditHidden.toString());
		currentUser.set('twitterHidden', $scope.twitterHidden.toString());
		currentUser.set('gmailHidden', $scope.gmailHidden.toString());
		currentUser.set('yahooHidden', $scope.yahooHidden.toString());
		currentUser.save();
		Parse.User.logOut();
		$window.location.href = '#login';
	}

	Guardian.getPosts()
    .then(function(res) {
        $scope.guardianStream = res.data.response.results;
    }).catch(function(err) {
        alert('There was an error with the Guardian Feed!');
    });

	Weather.getCurrentPositionDeferred()
	.then(function(position) {
		console.log(position);
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
	
}]);
