angular.module('app').controller('DeckController', ['$scope', '$http', '$rootScope', '$window', '$cacheFactory', 'UserService',  function($scope, $http, $rootScope, $window, $cacheFactory, UserService) {

	$scope.stream1Hide = false;
	$scope.stream2Hide = false;
	$scope.stream3Hide = false;
	$scope.stream4Hide = false;
	var visibleStreams = 4;	
	$scope.widthClass = 'inner-4-width';

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
	
	$scope.toggleDeck1 = function() {
		$scope.stream1Hide = !$scope.stream1Hide;
	}
	
	$scope.addStream = function() {
		console.log('adding stream');
		if ( visibleStreams === 4 ) {
			alert('Maximum number of streams already visible!')
		} else {
			visibleStreams++;
			$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
			console.log('$scope.stream' + visibleStreams.toString() + 'Hide = false;')
			eval('$scope.stream' + visibleStreams.toString() + 'Hide = false;');
		}
	}
	
	$scope.removeStream = function() {
		if ( visibleStreams === 1 ) {
			alert('Only one stream remaining!')
		} else {
			console.log('$scope.stream' + visibleStreams.toString() + 'Hide = true;');
			 eval('$scope.stream' + visibleStreams.toString() + 'Hide = true;');
			//$scope.deck4Hide = true;
			visibleStreams--;
			console.log('removing stream');
			$scope.widthClass = 'inner-' + visibleStreams.toString() + '-width';
		}
	}

}]);