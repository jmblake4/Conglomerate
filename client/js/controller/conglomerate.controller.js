Conglom.controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', '$log', 'VideosService', 'Guardian', 'Weather',  function($scope, $http, $rootScope, $window, $cacheFactory, $log, VideosService, Guardian, Weather) {

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

	Weather.getCurrentPositionDeferred()
	.then(function(position) {
		console.log(position);
		return Weather.getPosts(position.coords.latitude, position.coords.longitude);
	}).then(function(res) {
		console.log(res);
	}).catch(function(err) {
		alert('Error: ' + err.message);
	});
	// Weather.getPosts()
    // .then(function(res) {
        // $scope.weatherStream = res.data;
		// $scope.fahrenheit = (((res.data.main.temp - 273) * 9.0 / 5.0) + 32).toFixed(1);
		// console.log(res);
    // }).catch(function(err) {
        // alert('There was an error with the Weather Feed!\n' + err.message);
    // });
	
// --------------------------- Youtube Below --------------------------
	// Controller
    
    // init();

    // function init() {
    //   $scope.youtube = VideosService.getYoutube();
    //   $scope.results = VideosService.getResults();
    //   $scope.history = VideosService.getHistory();
    // }

    // $scope.launch = function (video, archive) {
    //   VideosService.launchPlayer(video.id, video.title);
    //   if (archive) {
    //   	VideosService.archiveVideo(video);
    //   }
    //   $log.info('Launched id:' + video.id + ' and title:' + video.title);
    // };

    // $scope.nextPageToken = '';
    // $scope.label = 'You haven\'t searched for any video yet!';
    // $scope.loading = false;

    // $scope.search = function (isNewQuery) {
    //   $scope.loading = true;
    //   $http.get('https://www.googleapis.com/youtube/v3/search', {
    //     params: {
    //       key: 'AIzaSyC92qoRfAKCCxkAudodL0RlLNQPRBXcTTE',
    //       type: 'video',
    //       maxResults: '5',
    //       pageToken: isNewQuery ? '' : $scope.nextPageToken,
    //       part: 'id,snippet',
    //       fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
    //       q: this.query
    //     }
    //   })
    //   .success( function (data) {
    //     if (data.items.length === 0) {
    //       $scope.label = 'No results were found!';
    //     }
    //     VideosService.listResults(data, $scope.nextPageToken && !isNewQuery);
    //     $scope.nextPageToken = data.nextPageToken;
    //     $log.info(data);
    //   })
    //   .error( function () {
    //     $log.info('Search error');
    //   })
    //   .finally( function () {
    //     $scope.loadMoreButton.stopSpin();
    //     $scope.loadMoreButton.setDisabled(false);
    //     $scope.loading = false;
    //   })
    //   ;
    // };
    
//    ------------------------ End Youtube ---------------------------------

}]);
