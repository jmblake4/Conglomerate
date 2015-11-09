Conglom.factory('TMDBFactory', ['$http', '$cacheFactory', '$rootScope', function($http, $cacheFactory, $rootScope) {

var TMDBFactory = {};

TMDBFactory.getMovieInfo = function(movieTitle) {        
        var url = 'https://api.themoviedb.org/3/';
        var mode = 'search/movie';
        var key = '?api_key=1d4c37637585bda03118806dcaf1cb38';
    
        var movieName = encodeURI(movieTitle);
    
        var urlPath = url + mode + key + '&query=' + movieName;
        return $http.get(urlPath);
};

return TMDBFactory;

}]);
