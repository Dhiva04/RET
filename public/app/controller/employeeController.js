angular.module('employeeController',['employeeService','toastr'])
    .controller('empCtrl',function ($window,$timeout,Employee,$scope,toastr ) {
        var app=this;

        app.regUser=function (regData) {
            app.errorMsg=false;

            Employee.create(app.regData).then(function (data) {

                if (data.data.success) {
                    toastr.success(data.data.message,'success');
                    $timeout(function () {
                        $window.location.reload();
                    },1000);
                } else {
                    toastr.error(data.data.message,'Error');
                }

            });
        }

        var refresh= function(){Employee.getEmployee().then(function (data) {

            app.employees=data.data;
        });
        };
        refresh();


        $scope.viewEmployee = function(id) {
            Employee.getEmployeeById(id)
                .then(function (data) {
                    $scope.view = data.data;
                    refresh();
                });
        }
        $scope.updateEmployee = function(view){

            Employee.updateEmployee(view)
                .then(function (data) {
                    app.errorMsg=false;

                    if (data.data.success) {
                        toastr.success(data.data.message,'Success');
                        $timeout(function () {
                            $window.location.reload();
                        },1000);
                    } else {
                        toastr.error(data.data.message,'Error');

                    }

                });

        };
        $scope.deleteEmployee=function(view){
            Employee.deleteEmployee(view._id).then(function (data) {
                app.errorMsg=false;

                if (data.data.success) {

                    toastr.success(data.data.message,'Success');

                    $timeout(function () {
                        $window.location.reload();
                    },1000);
                } else {
                    toastr.error(data.data.message,'Error');

                }

            });
        }



    });