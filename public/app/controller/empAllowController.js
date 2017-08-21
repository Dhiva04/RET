angular.module('empAllowController',['authService','empAllowService','toastr'])
    .controller('empAllowCtrl',function (Auth,$window,$timeout,EmpAllow,$scope,toastr ) {



 Auth.getUser().then(function (data) {
     $scope.applyData=data.data;
});

var refresh= function (applyData){
Auth.getUser().then(function (data) {

EmpAllow.getEmpAllow(data.data.empId).then(function (data) {

            $scope.allowance=data.data;
            console.log(data.data);
        })
        });
}

        refresh();
      $scope.applyAllowance=function (applyData) {


             EmpAllow.createAllowance(applyData).then(function (data) {
                if (data.data.success) {
                    toastr.success(data.data.message,'success');
                    $timeout(function () {
                        $window.location.reload();
                    },1000);
                } else {
                    toastr.error(data.data.message,'Error');
                }

            });


         };
         });
