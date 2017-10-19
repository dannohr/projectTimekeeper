// angular.module('fullstack').controller('loginCtrl', function (loginSrvc, $scope, $location, $http, $rootScope, $state) {
angular.module('fullstack').controller('loginCtrl', function (loginSrvc, $scope, $http, $state, Flash) {


  $scope.login = function(user) {
        $http({
                method: 'POST',
                url: '/login',
                data: user

        }).then(function (response) {
          $state.go('home');
        }).catch(function (response) {
          console.log(response)
        })
  }



  $scope.successAlert = function () {
    var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
    var id = Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }
    // First argument (string) is the type of the flash alert.
    // Second argument (string) is the message displays in the flash alert (HTML is ok).
    // Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
    // Fourth argument (object, optional) is the custom class and id to be added for the flash message created.
    // Fifth argument (boolean, optional) is the visibility of close button for this flash.
    // Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.


    //  NOT WORKING  ->  http://sachinchoolur.github.io/angular-flash/
});



