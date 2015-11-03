Conglomerate.controller('deckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {

	$scope.deck1Visible = true;
	$scope.deck2Visible = true;
	$scope.deck3Visible = true;
	$scope.deck4Visible = true;

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

Conglomerate.controller('loginController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {



}]);