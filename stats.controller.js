(function() {
    'use strict';


    angular
        .module('admobitec')
        .controller('statsController', statsController);



    statsController.$inject = ['$http', 'uiGridGroupingConstants','statsFactory'];
    function statsController(uiGridGroupingConstants, statsFactory) {

        var vm = this;
        var csv;

        vm.gridOptions = {

            // Задаем наименование колонок, групирование и фильтрацию
            // groupPriority: 0  - используется для групирования по дате
            // groupPriority: 1  - используется для групирования по стране
            // priority: 0, direction: 'asc' - используется для объединения сгрупированых колонок
            // width: '10%' - минимальная ширина
            // uiGridGroupingConstants.aggregation.SUM - сумирует значение колонок
            // uiGridGroupingConstants.aggregation.AVG  - вычисляет среднее
            // enableColumnMenus: false, -  выключаем верхнее меню

            enableColumnMenus: false,
            columnDefs: [
                { name: 'date', grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, width: '10%'
                },
                { name: 'country', grouping: { groupPriority: 1 }, sort: { priority: 1, direction: 'asc' }, width: '10%'},
                { name: 'carrier', displayName: "carrier"},
                { field: 'views', displayName: 'views ',
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: function( aggregation ) {
                        aggregation.rendered = aggregation.value;
                    }
                },
                { field: 'bcpm', displayName: 'bcpm ', cellFilter: 'number: 4',
                    treeAggregationType: uiGridGroupingConstants.aggregation.AVG,
                    customTreeAggregationFinalizerFn: function( aggregation ) {
                        aggregation.rendered = aggregation.value;
                    }
                },
                { field: 'sent', displayName: 'sent ', cellFilter: 'number: 4',
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: function( aggregation ) {
                        aggregation.rendered = aggregation.value;
                    }
                },
                { field: 'earned', displayName: 'earned ', cellFilter: 'number: 4',
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: function( aggregation ) {
                        aggregation.rendered = aggregation.value;
                    }
                },
                { field: 'leads', displayName: 'leads ',
                    treeAggregationType: uiGridGroupingConstants.aggregation.SUM,
                    customTreeAggregationFinalizerFn: function( aggregation ) {
                        aggregation.rendered = aggregation.value;
                    }
                },
                { name: "adserver_id", displayName: "adserver_id" },
                { name: "offers_id", displayName: "offers_id"},
                { name: "partners_id", displayName: "partners_id" },
                { name: "status", displayName: "status" },
                { name: 'device', displayName: "device"},
                { name: 'cpm', displayName: "cpm"},
                { name: 'conversion', displayName: "conversion"},
                { name: 'roi', displayName: "roi"}
            ],


            // onRegisterApi - передаче данных в таблицу при инициализации


            onRegisterApi: function( gridApi ) {
                vm.gridApi = gridApi;
            }
        };



        statsFactory.getStats()
            .success(function(data){

               console.log('factoryData = '+angular.toJson(data));

                csv = Papa.parse(data,{
                    header: true
                });
                csv.data.pop();

                vm.gridOptions.data = csv.data;

            });
    }

})();