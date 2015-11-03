var Conglomerate = angular.module('Conglomerate', ['ngRoute', 'ngResource']);

Conglomerate.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'views/login.html',
		controller  : 'loginController'
	})
	.when('/login', {
		templateUrl : 'views/login.html',
		controller  : 'loginController'
	})
	.when('/deck', {
		templateUrl : 'views/deck.html',
		controller  : 'deckController'
	});
}]);