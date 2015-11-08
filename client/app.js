var Conglom = angular.module('Conglom', ['ngRoute', 'ngCookies', 'onsen'])

Conglom.run(['$rootScope', '$location', '$cookieStore', '$http', function ($rootScope, $location, $cookieStore, $http) {
	
	// Use APP ID and Javascript ID keys here
	Parse.initialize('2vrwNvHrsNAFxQiLGpzqmqaogyyhbzarZuCYa1Mw', 'tnh6UEIFa5R6eJgdzF2Q2NS6VOQhJH0Xhz6qY9Z0');
	$rootScope.currentUser = Parse.User.current;

}]);

Conglom.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
		.when('/', {
			controller: 'HomeController',
			templateUrl: 'home/home.view.html',
		})
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'login/login.view.html',
		})
		.when('/register', {
			controller: 'RegisterController',
			templateUrl: 'register/register.view.html',
		})
		.when('/deck', {
			controller: 'DeckController',
			templateUrl: 'views/deck.html',
		})
		.otherwise({ redirectTo: '/login' });

}]);

// ------------------------- Service  Youtube ------------------------------------

Conglom.service('VideosService', ['$window', '$rootScope', '$log', function ($window, $rootScope, $log) {

	var service = this;

	var youtube = {
		ready: false,
		player: null,
		playerId: null,
		videoId: null,
		videoTitle: null,
		playerHeight: '100%',
		playerWidth: '100%',
		state: 'stopped'
	};
	var results = [];
	var history = [];

	$window.onYouTubeIframeAPIReady = function () {
		console.log('Youtube API is ready');
		// $log.info('Youtube API is ready');
		youtube.ready = true;
		service.bindPlayer('placeholder');
		service.loadPlayer();
		$rootScope.$apply();
	};

	this.bindPlayer = function (elementId) {
		console.log('Binding to ' + elementId);
		// $log.info('Binding to ' + elementId);
		youtube.playerId = elementId;
	};

	this.createPlayer = function () {
		console.log('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
		// $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
		return new YT.Player(youtube.playerId, {
			height: youtube.playerHeight,
			width: youtube.playerWidth,
			playerVars: {
				rel: 0,
				showinfo: 0
			}
		});
	};

	this.loadPlayer = function () {
		console.log("loadPlayer");
		if (youtube.ready && youtube.playerId) {
			if (youtube.player) {
				youtube.player.destroy();
			}
			youtube.player = service.createPlayer();
		}
	};

	this.launchPlayer = function (id, title) {
		console.log("launchPlayer");
		youtube.player.loadVideoById(id);
		youtube.videoId = id;
		youtube.videoTitle = title;
		return youtube;
	}

	this.listResults = function (data, append) {
		console.log("listResults");
		if (!append) {
			results.length = 0;
		}
		for (var i = data.items.length - 1; i >= 0; i--) {
			results.push({
				id: data.items[i].id.videoId,
				title: data.items[i].snippet.title,
				description: data.items[i].snippet.description,
				thumbnail: data.items[i].snippet.thumbnails.default.url,
				author: data.items[i].snippet.channelTitle
			});
		}
		return results;
	}

	this.archiveVideo = function (video) {
		console.log("archiveVideo");
		history.unshift(video);
		return history;
	};

	this.getYoutube = function () {
		console.log("getYouTube");
		return youtube;
	};

	this.getResults = function () {
		console.log("getResults");
		return results;
	};

	this.getHistory = function () {
		console.log("getHistory");
		return history;
	};

}]);