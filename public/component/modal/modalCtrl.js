angular.module('fullstack').controller('modalController', ['$scope', 'close', 'modalData','message', function($scope, close, modalData, message) {
    
    // these two are passed in from the controller calling the modal:
    $scope.modalData = modalData  
    $scope.modalMessage = message  
 
    $scope.close = function(result) {
         close(result, 500); // close, but give 500ms for bootstrap to animate
    };
    
    }]);