// Use APP ID and Javascript ID keys here
// Parse.initialize('hsXwaCbf8H826BYlOGVPEDIkOG0dHC4sU17RFwqE','fLPbB6DwBnxmyHmcyXbEgkK9aNV3C2AzEkogDvJC');

var Conglom = angular.module('Conglom', ['ngRoute', 'ngCookies', 'onsen'])

Conglom.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
	
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  // Use APP ID and Javascript ID keys here
	Parse.initialize('2vrwNvHrsNAFxQiLGpzqmqaogyyhbzarZuCYa1Mw','tnh6UEIFa5R6eJgdzF2Q2NS6VOQhJH0Xhz6qY9Z0');
	$rootScope.currentUser = Parse.User.current;
	
}]);

// Conglom.run(function () {
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/iframe_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// });

// Conglom.config( function ($httpProvider) {
//   delete $httpProvider.defaults.headers.common['X-Requested-With'];
// });

Conglom.config(['$routeProvider', '$locationProvider','$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	
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
    $log.info('Youtube API is ready');
    youtube.ready = true;
    service.bindPlayer('placeholder');
    service.loadPlayer();
    $rootScope.$apply();
  };

  this.bindPlayer = function (elementId) {
    $log.info('Binding to ' + elementId);
    youtube.playerId = elementId;
  };

  this.createPlayer = function () {
    $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
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
    if (youtube.ready && youtube.playerId) {
      if (youtube.player) {
        youtube.player.destroy();
      }
      youtube.player = service.createPlayer();
    }
  };

  this.launchPlayer = function (id, title) {
    // console.log(id);
    youtube.player.loadVideoById(id);
    youtube.videoId = id;
    youtube.videoTitle = title;
    return youtube;
  }

  this.listResults = function (data, append) {
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
    history.unshift(video);
    return history;
  };

  this.getYoutube = function () {
    return youtube;
  };

  this.getResults = function () {
    return results;
  };

  this.getHistory = function () {
    return history;
  };

}]);