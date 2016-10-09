var baseThemeURI = themeSettings.themeUri;
var SBM = angular.module('SBM', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        /**
         *    Configure routes
         */
        $routeProvider
            .when('/', {
                templateUrl: baseThemeURI + '/partials/index.html'
            })

        /**
         *    Remove # from the URL with $locationProvider
         */
        $locationProvider.html5Mode(true).hashPrefix('!');
    }])
    .controller('MenuController', function ($scope, $location, $http) {
        $scope.isActive = function (route) {
            return route.replace(themeSettings.siteURL, '') === $location.path();
        };

        $http.get('/api/menu/get_menu/').
            then(function (response) {
                $scope.menuItems = response.data.menuItems;
                if (response.error) {
                    console.log(response.error);
                }
            }, function (response) {
                if (response.error) {
                    console.log(response.error);
                }
            });

    })
