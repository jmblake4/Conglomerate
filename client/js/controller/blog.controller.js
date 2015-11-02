BlogSite.controller('blogpostsController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {

	Parse.getPosts()
	.then(function(res) {
		$scope.blogPosts = res.data.results.reverse();
	}).catch(function(err) {
		console.log(err);
		alert('There was an error!');
	});

	$scope.createBlogEntry = function() {
		$window.location.href = '#newpost';
	}

}]);

BlogSite.controller('newpostController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {

	$scope.newPost = function() {
		var blogAuthor = $scope.blogAuthor, blogTitle = $scope.blogTitle, blogContent = $scope.blogContent;
		if ( blogAuthor === '' || blogTitle === '' || blogContent === '' || blogAuthor === undefined || blogTitle === undefined || blogContent === undefined) {
			alert('Invalid blog entry!')
			$window.location.href = '#blogposts';
		} else {
			var blogPost = {
				author: blogAuthor,
				title: blogTitle,
				content: blogContent
			};
			Parse.submitPost(blogPost)
			.then(function(res) {
				console.log(res.data);
				$window.location.href = '#blogposts';
			}).catch(function(err) {
				console.log(err);
				alert('There was an error!');
				$window.location.href = '#blogposts';
			});
		}
	}

}]);

BlogSite.controller('blogdetailController', ['$scope', '$http', '$rootScope', '$window', 'Parse', '$routeParams', function($scope, $http, $rootScope, $window, Parse, $routeParams) {

	Parse.getPost($routeParams.blogId)
	.then(function(res) {
		$scope.blogPost = res.data;
	}).catch(function(err) {
		console.log(err);
		alert('There was an error!');
	});
	
	$scope.returntoBlog = function() {
		$window.location.href = '#blogposts';
	}
	
}]);

BlogSite.controller('loginController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'Parse', function($scope, $http, $rootScope, $window, $cacheFactory, Parse) {



}]);