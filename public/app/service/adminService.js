angular.module('adminService', [])

    .factory('Admin', function($http) {
        var adminFactory = {};

        adminFactory.create = function(regData) {
            return $http.post('/api/admin', regData);
        }
        adminFactory.getAdmin = function() {
            return $http.get('/api/admin');
        }
        adminFactory.getAdminById = function(id) {
            return $http.get('/api/admin'+ id);
        }
        adminFactory.updateAdmin = function(view){
            return $http.put('/api/admin/update',view);
        }
        adminFactory.deleteAdmin = function(id){
            return $http.delete('/api/admin/delete'+id);
        }



        return adminFactory;
    });
