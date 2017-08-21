angular.module('allowanceService', [])

    .factory('Allow', function($http) {
        var AllowFactory = {};

         AllowFactory.getEmpAllow = function() {
                    return $http.get('/api/admin/allowance');
                }
         AllowFactory.getRejectAllowance=function(id){
        	 return $http.post('/api/admin/getRejectAllowance'+id);
         }
         AllowFactory.rejectAllowance=function(allow){
        	 return $http.post('/api/admin/rejectAllowance',allow);
         }

        return AllowFactory;
    });
