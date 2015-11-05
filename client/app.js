// Use APP ID and Javascript ID keys here
// Parse.initialize('hsXwaCbf8H826BYlOGVPEDIkOG0dHC4sU17RFwqE','fLPbB6DwBnxmyHmcyXbEgkK9aNV3C2AzEkogDvJC');

var Conglom = angular.module('Conglom', ['ngRoute', 'ngCookies'])

Conglom.run(['$rootScope', '$location', '$cookieStore', '$http', function($rootScope, $location, $cookieStore, $http) {
	// Use APP ID and Javascript ID keys here
	Parse.initialize('2vrwNvHrsNAFxQiLGpzqmqaogyyhbzarZuCYa1Mw','tnh6UEIFa5R6eJgdzF2Q2NS6VOQhJH0Xhz6qY9Z0');
	$rootScope.currentUser = Parse.User.current;
}]);

Conglom.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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