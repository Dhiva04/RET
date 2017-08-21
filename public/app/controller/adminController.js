angular.module('adminController',['adminService','toastr','authService'])
.controller('adminCtrl',function ($window,$timeout,Admin,$scope,toastr,Auth) {
    var app=this;
    if(!Auth.isLoggedIn()){

    }
    app.regUser=function (regData) {
    console.log("hi");
        app.errorMsg=false;
        console.log(app.regData);
        console.log("form Submitted")
        Admin.create(app.regData).then(function (data) {
            console.log(data.data.success);
            console.log(data.data.message);
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

    var refresh= function(){Admin.getAdmin().then(function (data) {
        console.log(data.data);
        app.admins=data.data;
    });};
     refresh();


    $scope.viewAdmin = function(id) {
        Admin.getAdminById(id)
            .then(function (data) {
                $scope.view = data.data;
                refresh();
            });
    }
    $scope.updateAdmin = function(view){
        console.log("form submitted");
        Admin.updateAdmin(view)
            .then(function (data) {
                app.errorMsg=false;
                console.log(data.data.success);
                console.log(data.data.message);
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
    $scope.deleteAdmin=function(view){
        Admin.deleteAdmin(view._id).then(function (data) {
            app.errorMsg=false;
            console.log(data.data.success);
            console.log(data.data.message);
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