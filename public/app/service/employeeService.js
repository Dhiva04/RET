angular.module('employeeService', [])

    .factory('Employee', function($http) {
        var employeeFactory = {};

        employeeFactory.create = function(regData) {
            return $http.post('/api/employee', regData);
        }
        employeeFactory.getEmployee= function() {
            return $http.get('/api/employee');
        }
        employeeFactory.getEmployeeById = function(id) {
            return $http.get('/api/employee'+ id);
        }
        employeeFactory.updateEmployee = function(view){
            return $http.put('/api/employee/update',view);
        }
        employeeFactory.deleteEmployee = function(id){
            return $http.delete('/api/employee/delete'+id);
        }
        employeeFactory.send = function (view) {
            return $http.post('/api/employee/payroll', view);

        }

        return employeeFactory;
    });
