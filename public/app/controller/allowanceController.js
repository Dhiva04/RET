angular.module('allowanceController',['authService','allowanceService','toastr'])
    .controller('allowCtrl',function (Auth,$window,$timeout,Allow,$scope,toastr ) {

var refresh= function (){
Allow.getEmpAllow().then(function (data) {
            $scope.allowance=data.data;
         })
}
        refresh();
        $scope.rejectAllowance = function(allowance) {
        	console.log(allowance);
            Allow.getRejectAllowance(allowance)
                .then(function (data) {    	
                    $scope.allow = data.data;
                    console.log(data.data);
                    refresh();
                });
        }
        
        $scope.rejectAllow = function(allow) {
        	console.log(allow);
            Allow.rejectAllowance(allow)
                .then(function (data) {
                	console.log(data)
            });
        }
        
});
