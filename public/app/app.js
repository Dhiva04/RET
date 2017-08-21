angular.module('userApp',['appRoutes','adminController','adminService','toastr','mainController','authService','employeeController','employeeService','payrollController','payrollService','empAllowController','allowanceController','allowanceService','empAllowService'])

    .config(function($httpProvider,toastrConfig) {
        $httpProvider.interceptors.push('AuthInterceptors');
        angular.extend(toastrConfig, {
            autoDismiss: false,
            containerId: 'toast-container',
            maxOpened: 0,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body'
        });
    })


