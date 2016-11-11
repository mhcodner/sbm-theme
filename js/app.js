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
            .when('/blog/', {
                templateUrl: baseThemeURI + '/partials/blog.html',
                controller: 'ListPost'
            })
            .when('/blog/page/:page', {
                templateUrl: baseThemeURI + '/partials/blog.html',
                controller: 'ListPost'
            })
            .when('/post/:post/', {
                templateUrl: baseThemeURI + '/partials/post.html',
                controller: 'GetPost'
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
    .controller('GetIndex', function ($scope, $rootScope, $http) {
        $scope.baseThemeURI = baseThemeURI;

        $http.get('/api/get_posts/?posts_per_page=5', {cache: true}).success(function (data) {
            $scope.posts = data.posts;
        });

        $scope.$on('$viewContentLoaded', function() {
            initParallax();
        });
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
    .controller('GetPost', function ($scope, $rootScope, $http, $location, $routeParams) {

        /**
         *  Call the get_post method from the API and pass to it the
         *  value of $routeParams.post, which is actually the post slug
         */
        var url = '/api/get_post/?slug=' + $routeParams.post;
        if ($location.search().preview === 'true') {
            url += '&preview=true&preview_id=' + $location.search().preview_id + '&preview_nonce=' + $location.search().preview_nonce;
        }
        var currentPost;

        /**
         *    Perform a GET request on the API and pass the slug to it using $location.url()
         *    On success, pass the data to the view through $scope.page
         */
        $http.get(url, {cache: true})
            .success(function (data) {
                $scope.post = data.post;

                // Inject the title into the rootScope
                $rootScope.title = data.post.title;
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
    .directive('initCollapse', function () {
        return {
            restrict: 'A',
            transclude: false,
            link: function(scope) {
                if (scope.$last) {
                    setTimeout(initCollapse, 0);
                }
            }
        }
    })
