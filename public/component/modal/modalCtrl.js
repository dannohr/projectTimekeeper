angular.module('fullstack').controller('modalController', ['$scope', 'close', 'modalData','message', function($scope, close, modalData, message) {
    
    // http://www.dwmkerr.com/the-only-angularjs-modal-service-youll-ever-need/

    // these two are passed in from the controller calling the modal:
    $scope.modalData = modalData  
    $scope.modalMessage = message  
    // $scope.modalData = 'Data'  
    // $scope.modalMessage = 'Message'
 
    $scope.close = function(result) {
         close(result, 500); // close, but give 500ms for bootstrap to animate
    };
    


    // Beloe is for the Add Notes Modal

    $scope.name = null;
    $scope.age = null;
    // $scope.title = title;
    $scope.title = 'Modal Title';
    
    //  This close function doesn't need to use jQuery or bootstrap, because
    //  the button has the 'data-dismiss' attribute.
    $scope.closeAddNotes = function() {
         close({
        name: $scope.name,
        age: $scope.age
      }, 500); // close, but give 500ms for bootstrap to animate
    };
  
    //  This cancel function must use the bootstrap, 'modal' function because
    //  the doesn't have the 'data-dismiss' attribute.
    $scope.cancel = function() {
  
      //  Manually hide the modal.
      $element.modal('hide');
      
      //  Now call close, returning control to the caller.
      closeAddNotes({
        // console.log('Something')
        
        // name: $scope.name,
        // age: $scope.age
      }, 500); // close, but give 500ms for bootstrap to animate
    };
  







    }]);