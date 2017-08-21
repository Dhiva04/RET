angular.module('appRoutes',['ngRoute','authService'])
.config(function($routeProvider, $locationProvider) {
    $routeProvider
            .when('/home', {

                templateUrl: 'app/views/pages/home.html',
                data: { activeTab: 'home' },
                authRequired:false

            })
            .when('/administrator', {

                templateUrl: 'app/views/pages/admin.html',
                controller:'adminCtrl',
                controllerAs:'admin',
                data: { activeTab: 'administrator' },
                authRequired:true

            })
            .when('/employee', {

                templateUrl: 'app/views/pages/employee.html',
                controller:'empCtrl',
                controllerAs:'employee',
                data: { activeTab: 'employee' },
               authRequired:true
            })

            .when('/payroll', {

                templateUrl: 'app/views/pages/payroll.html',
                controller:'payCtrl',
                controllerAs:'employee',
                data: { activeTab: 'payroll' },
                authRequired:true

            })
            .when('/allowance', {

                templateUrl: 'app/views/pages/allowance.html',
                controller:'allowCtrl',
                data: { activeTab: 'allowance' },
               authRequired:true

            })
            .when('/login', {

                templateUrl: 'app/views/pages/login.html',
                data: { activeTab: 'login' },
              authRequired:false
            })

            .when('/empAllowance' ,{

              templateUrl:'app/views/pages/empAllowance.html',
               controller:'empAllowCtrl',
               data:{activeTab:'allow'},
               authRequired:true
            })
            .when('/forgotPassword',{
            templateUrl:'app/views/pages/forgotPassword.html',
             authRequired:false
            })
        .when('/resetPassword',{
                   templateUrl:'app/views/pages/resetPassword.html',
             authRequired:false
                   })

            .otherwise({ redirectTo: '/home' });
        $locationProvider.html5Mode({ enabled: true, requireBase: false });
    })
    .run(function($rootScope,$route, $location, Auth) {
      $rootScope.$on('$routeChangeStart', function(event, nextRoute,$route) {

        if (nextRoute.authRequired && !Auth.isLoggedIn()) {
          $location.path( "/login" );
                 }
         else if(Auth.isLoggedIn()){
           Auth.getUser().then(function(data){

            if(data.data.empId && Auth.isLoggedIn()){
            if(nextRoute.templateUrl=="app/views/pages/admin.html"||nextRoute.templateUrl=="app/views/pages/employee.html"||nextRoute.templateUrl=="app/views/pages/payroll.html"||nextRoute.templateUrl=="app/views/pages/allowance.html"){
            $location.path( "/home" );
            }
            else if(nextRoute.templateUrl=="app/views/pages/empAllowance.html"){
            }
             else{
                         $location.path( "/home" );
                        }
                        }

             else if(data.data.adminId && Auth.isLoggedIn()){

            if(nextRoute.templateUrl=="app/views/pages/admin.html"||nextRoute.templateUrl=="app/views/pages/employee.html"||nextRoute.templateUrl=="app/views/pages/payroll.html"||nextRoute.templateUrl=="app/views/pages/allowance.html"){

            }
            else if(nextRoute.templateUrl=="app/views/pages/empAllowance.html"){
                        $location.path( "/home" );
                        }


                else{
                         $location.path( "/home" );
                        }


            }
            }

          )
          };
    })
    })

