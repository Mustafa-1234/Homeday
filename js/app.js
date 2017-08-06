//Initilize the Angular application and added the angularGrid module
var app = angular.module("testApp", ['angularGrid']);

//controller of view which handles all the data binding and information regarding the page variables
app.controller("appCtrl", function ($scope, $http, $sce) {

//The templates selection array where a template file is named which will dynamically change template files using ng-include directive
    $scope.templates = [
        {name: 'Grid', url: 'grid.tpl.html'},
        {name: 'Blog', url: 'blog.tpl.html'},
        {name: 'Masonry', url: 'masonry.tpl.html'}
    ];

// A Promise call to retrieve the JSON file and their success and error functions with the chaining of "then" method
    var newsPromise = $http.get('data/news.json').then(function (response) {
        $scope.news = response.data.data;
    }, function () {
        $scope.news = [];
    });

//by default lets select the first template from the array of template
    $scope.template = $scope.templates[0];

//filter function which uses the angular directive for parsing the URLs coming in the json
}).filter('trustUrl', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };
});
