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
