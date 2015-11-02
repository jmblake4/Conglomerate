var BlogSite = angular.module('BlogSite', ['ngRoute', 'ngResource']);

BlogSite.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl : 'views/blogposts.html',
		controller  : 'blogpostsController'
	})
	.when('/login', {
		templateUrl : 'views/login.html',
		controller  : 'loginController'
	})
	.when('/blogposts', {
		templateUrl : 'views/blogposts.html',
		controller  : 'blogpostsController'
	})
	.when('/newpost', {
		templateUrl : 'views/newpost.html',
		controller  : 'newpostController'
	})
	.when('/blogposts/:blogId', {
		templateUrl : 'views/blogdetail.html',
		controller  : 'blogdetailController'
	});
}]);