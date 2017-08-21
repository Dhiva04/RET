angular.module('mainController',['authService','toastr'])
.controller('mainCtrl',function (Auth,$timeout, $location,$rootScope,toastr) {

    var app = this;


    $rootScope.$on('$routeChangeStart',function () {

       if(Auth.isLoggedIn()){
        app.isEmployee=false;
            app.isLoggedIn=true;
            console.log('admin is logged In');
            Auth.getUser().then(function (data) {
                if(data.data.empId){
                console.log(data);
                app.isEmployee=true;

                app.userName =data.data.firstName;
                app.empId=data.data.empId;

                }else{

                  app.userName =data.data.firstName;
                   app.adminId=data.data.adminId;

                                }


            });
        }
        else{
            console.log('admin is not logged In');
            app.isLoggedIn=false;
            app.userName='';
            app.adminId='';
            app.empI='';
        }
    });

  app.doLogin = function (isValid,loginData) {

  console.log(isValid);
  if(isValid){

            Auth.login(app.loginData).then(function (data) {
                console.log(data.data.success);
                console.log(data.data.message);
                if (data.data.success) {

                    toastr.success(data.data.message,'success');

                    $timeout(function () {
                        $location.path('/home');
                    }, 1000);
                } else {
                    toastr.error(data.data.message,'Error');
                }

            });

  }
  else{

     toastr.error('Ensure that all information were provided','Error');
    }};
  this.logout=function () {
      Auth.logout();
      toastr.success('Logout Successfully','success');
      $timeout(function ()
      {
          $location.path('/login');
      },2000)
  }
  app.forgotPassword = function (isValid,forgotData) {
    console.log(isValid);
    if(isValid){
              Auth.forgotPassword(app.forgotData).then(function (data) {
                  console.log(data.data.success);
                  console.log(data.data.message);
                  if (data.data.success) {

                      toastr.success(data.data.message,'success');

                      $timeout(function () {
                          $location.path('/home');
                      }, 1000);
                  } else {
                      toastr.error(data.data.message,'Error');
                  }

              });

    }
    else{
       toastr.error('Ensure that all information were provided','Error');
      }};
      app.savePass = function (isValid,resetData) {
          console.log(isValid);
          if(isValid){
          console.log(resetData);
          }
          else if(!isValid){
             toastr.error('Ensure that all information were provided ','Error');
            }};
});