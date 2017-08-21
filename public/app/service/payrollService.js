angular.module('payrollService', [])

    .factory('Payroll', function($http) {
        var payrollFactory = {};


        payrollFactory.getEmployee= function() {
            return $http.get('/api/employee');
        }
        payrollFactory.getEmployeeById = function(id) {
            return $http.get('/api/employee'+ id);
        }

        payrollFactory.createPayslip = function (data) {
            return $http.post('/api/employee/payslip', data);
        }
        payrollFactory.viewPayslip= function(id) {
            return $http.get('/api/employee/payslip'+ id);
        }
        payrollFactory.getPayslip=function () {
            return $http.get('/api/employee/payslip');
        }
        payrollFactory.updatePayslip=function (data) {
                    return $http.put('/api/employee/payslip',data);
                }
        payrollFactory.refreshPayslip=function(){
            return $http.post('/api/employee/refreshPayslip');
        }

            return payrollFactory;

    });
