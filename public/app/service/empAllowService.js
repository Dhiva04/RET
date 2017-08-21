angular.module('empAllowService', [])

    .factory('EmpAllow', function($http) {
        var EmpAllowFactory = {};

        EmpAllowFactory.createAllowance = function(applyData) {
            return $http.post('/api/employee/empAllow', applyData);
        }

         EmpAllowFactory.getEmpAllow = function(id) {
                    return $http.get('/api/employee/empAllow'+ id);
                }
        return EmpAllowFactory;
    });
