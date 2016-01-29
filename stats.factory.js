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
                    //url: 'stats.csv',
                    url: 'http://www.admobitec.com/send/stats.csv',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
        };
    }

})();
