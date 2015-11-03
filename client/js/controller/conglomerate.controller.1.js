angular.module('app').controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'UserService',  function($scope, $http, $rootScope, $window, $cacheFactory, UserService) {

	$scope.deck1Hide = false;
	$scope.deck2Hide = false;
	$scope.deck3Hide = false;
	$scope.deck4Hide = false;

	var vm = this;

	vm.user = null;

	loadCurrentUser();

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
					console.log(user);
                });
        }

	// Parse.getPosts()
	// .then(function(res) {
	// 	$scope.blogPosts = res.data.results.reverse();
	// }).catch(function(err) {
	// 	console.log(err);
	// 	alert('There was an error!');
	// });

	// $scope.createBlogEntry = function() {
	// 	$window.location.href = '#newpost';
	// }

}]);

// Conglomerate.controller('newpostController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {

// 	$scope.newPost = funkkkkkkction() {
// 		var blogAuthor = $scope.blogAuthor, blogTitle = $scope.blogTitle, blogContent = $scope.blogContent;
// 		if ( blogAuthor === '' || blogTitle === '' || blogContent === '' || blogAuthor === undefined || blogTitle === undefined || blogContent === undefined) {
// 			alert('Invalid blog entry!')
// 			$window.location.href = '#blogposts';
// 		} else {
// 			var blogPost = {
// 				author: blogAuthor,
// 				title: blogTitle,
// 				content: blogContent
// 			};
// 			Parse.submitPost(blogPost)
// 			.then(function(res) {
// 				console.log(res.data);
// 				$window.location.href = '#blogposts';
// 			}).catch(function(err) {
// 				console.log(err);
// 				alert('There was an error!');
// 				$window.location.href = '#blogposts';
// 			});
// 		}
// 	}

// }]);

// Conglomerate.controller('blogdetailController', ['$scope', '$http', '$rootScope', '$window', 'Parse', '$routeParams', function($scope, $http, $rootScope, $window, Parse, $routeParams) {

// 	Parse.getPost($routeParams.blogId)
// 	.then(function(res) {
// 		$scope.blogPost = res.data;
// 	}).catch(function(err) {
// 		console.log(err);
// 		alert('There was an error!');
// 	});

// 	$scope.returntoBlog = function() {
// 		$window.location.href = '#blogposts';
// 	}

// }]);

// Conglomerate.controller('loginController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {



// }]);