'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus',
    function($scope, $rootScope, Global, Menus) {
        $scope.global = Global;
        $scope.menus = {};

        // Default hard coded menu items for main menu
        var defaultMainMenu = [{
            'roles': ['authenticated'],
            'title': 'Articles',
            'link': 'all articles'
        }, {
            'roles': ['authenticated'],
            'title': 'Create New Article',
            'link': 'create article'
        }];

        $scope.menus.main = defaultMainMenu;

        $scope.isCollapsed = false;

        $rootScope.$on('loggedin', function() {

            $scope.global = {
                authenticated: !! $rootScope.user,
                user: $rootScope.user
            };
        });

    }
]);