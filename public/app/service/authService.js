angular.module('authService', [])

    .factory('Auth', function ($http, AuthToken) {
        var authFactory = {};

        authFactory.login = function (loginData) {
            return $http.post('/api/authenticate', loginData).then(function (data) {
            AuthToken.setToken(data.data.token)
             return data;
            });
            };

        authFactory.forgotPassword =function(forgotData){
        return $http.post('/api/forgotPassword', forgotData).then(function (data) {
          return data;
        })
        }
        authFactory.isLoggedIn=function () {
            if(AuthToken.getToken()){
                return true;
            }else{
                return false;
            }
         };
        authFactory.getUser=function () {
            if(AuthToken.getToken()){
                return $http.post('/api/me');
            }else{
                $q.reject({message:'Admin has no Token'});
            }
            
        };

        authFactory.logout=function () {
          AuthToken.setToken();
        };
           return authFactory;
        })

   .factory('AuthToken',function ($window) {
       var authtokenFactory={};

       authtokenFactory.setToken=function (token) {
           if(token){
           $window.localStorage.setItem('token',token);}
           else{
               $window.localStorage.removeItem('token');
           }
       };
       authtokenFactory.getToken=function (token) {
           return $window.localStorage.getItem('token');

       };

       return authtokenFactory;
   })
    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {};

        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) config.headers['x-access-token'] = token;

            return config;
        };

        return authInterceptorsFactory;

    });