(function () {
    'use strict';

    angular
        .module('admobitec')
        .factory('statsFactory', statsFactory);

    statsFactory.$inject = ['$http'];

    function statsFactory($http) {
        return {
            getStats: function () {
                return $http({
                    method: 'GET',
                    url: 'stats.csv',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
        };
    }

})();
