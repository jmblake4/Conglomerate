Conglom.controller('VideosController', function ($window, $scope, $http, $log, VideosService) {

	init();

	function init() {
		console.log("init");
		$scope.youtube = VideosService.getYoutube();
		$scope.results = VideosService.getResults();
		$scope.history = VideosService.getHistory();
		$window.onYouTubeIframeAPIReady();
	}

	$scope.launch = function (video, archive) {
		console.log("launch");
		VideosService.launchPlayer(video.id, video.title);
		if (archive) {
			VideosService.archiveVideo(video);
		}
		$log.info('Launched id:' + video.id + ' and title:' + video.title);
	};

	$scope.nextPageToken = '';
	$scope.label = 'You haven\'t searched for any videos yet!';
	$scope.loading = false;

	$scope.search = function (isNewQuery) {
		console.log("search");
		$scope.loading = true;
		$http.get('https://www.googleapis.com/youtube/v3/search', {
			params: {
				key: 'AIzaSyC92qoRfAKCCxkAudodL0RlLNQPRBXcTTE',
				type: 'video',
				maxResults: '5',
				pageToken: isNewQuery ? '' : $scope.nextPageToken,
				part: 'id,snippet',
				fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
				q: this.query
			}
		})
			.success(function (data) {
				if (data.items.length === 0) {
					$scope.label = 'No results were found!';
				}
				VideosService.listResults(data, $scope.nextPageToken && !isNewQuery);
				$scope.nextPageToken = data.nextPageToken;
				$log.info(data);
			})
			.error(function () {
				$log.info('Search error');
			})
			.finally(function () {
				$scope.loadMoreButton.stopSpin();
				$scope.loadMoreButton.setDisabled(false);
				$scope.loading = false;
			})
		;
	};
});