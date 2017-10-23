angular.module('fullstack').controller("navCtrl", function($scope, loginSrvc ) {
   
    loginSrvc.getUser().then(function(user){
      $scope.user = (user.data);
      console.log('nav ctrl ran') 
      console.log(($scope.user));
    });


  });