var baseThemeURI = themeSettings.themeUri;
var SBM = angular.module('SBM', ['ngRoute', 'ngSanitize'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        /**
         *    Configure routes
         */
        $routeProvider
            .when('/', {
                templateUrl: baseThemeURI + '/partials/index.html',
                controller: 'GetIndex'
            })
            .when('/contact/', {
                templateUrl: baseThemeURI + '/partials/contact.html',
                controller: 'GetPage'
            })
            .when('/:page/', {
                templateUrl: baseThemeURI + '/partials/page.html',
                controller: 'GetPage'
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
    .controller('GetIndex', function ($scope, $rootScope) {
        $scope.baseThemeURI = baseThemeURI;
    })
    .controller('GetPage', function ($scope, $rootScope, $http, $location, $window) {

        /**
         *    Perform a GET request on the API and pass the slug to it using $location.url()
         *    On success, pass the data to the view through $scope.page
         */
        $http.get('/api/get_page/?slug=' + $location.url(), {cache: true})
            .success(function (data) {
                $scope.page = data.page;

                $scope.content = targetLinks(data.page.content);

                // Inject the title into the rootScope
                $rootScope.title = data.page.title;
            })
            .error(function () {
                console.log("We have been unable to access the feed :-(");
            })

    })
    .controller('ContactController', function ($scope, $http) {
        $scope.isSaving = undefined;

        $scope.contact = {
            name: '',
            email: '',
            message: ''
        };
        var contactOriginal = angular.copy($scope.contact);

        $scope.submitForm = function (isValid) {

            // check to make sure the form is completely valid
            if (isValid) {
                $scope.isSaving = true;

                $http.post('/api/contact/send_message/', $scope.contact).
                    then(function (response) {
                        $scope.isSaving = false;
                        $scope.contact = angular.copy(contactOriginal);
                        $scope.contactForm.$setPristine();
                        if (response.error) {
                            alert(response.error);
                        }
                    }, function (response) {
                        $scope.isSaving = false;
                        if (response.error) {
                            alert(response.error);
                        }
                    });
            }

        };
    })
    .directive('initParallax', function () {
        return function () { initParallax(); };
    })
