angular.module('fullstack').controller('manageUserCtrl', function($scope, user, $http, usersService, $stateParams, ModalService, $state) {
    
    $scope.usersTest = "Test of Users Angular"

        
    $scope.getUsers = function () {
        usersService.readAll().then(function (response) {
            console.log(response.data)
            $scope.allusers = response.data
            });
    }
    
    $scope.getUsers()

    
    $scope.getUserStatus = function () {
        usersService.getStatus().then(function (response) {
            $scope.options = response.data
            console.log($scope.options)
        });
    }
    
    $scope.getUserStatus()
    
    
    $scope.getFilter = function() {
        var result = {};
        result[$scope.allusers.lastname] = $scope.usersearch;
        console.log(result)
        return result;
    }
    
    // Delete will pop open a modal asking you to confirm
    $scope.deleteUser = function(user) {
        $scope.modalData = user.user
        console.log($scope.modalData)
        ModalService.showModal({
            templateUrl: "/component/modal/confirmdelete.html",
            controller: "modalController",
            inputs: { modalData: $scope.modalData,
                message: 'Are you sure you want to delete user ' + $scope.modalData.firstname + ' ' +  $scope.modalData.lastname + '?' },
            preClose: (modal) => { modal.element.modal('hide'); }
        })
        
        .then(function(modal) {
            modal.element.modal();
            modal.close
            .then(function(result) {  
                if(result) {   //if user selected Yes
                    usersService.delete($scope.modalData.id).then(function (response) {
                        $scope.getUsers();
                    });
                }
            })
        })
    };
    
    
    

    
    
});



