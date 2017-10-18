angular.module('fullstack')
        .controller('userdetailsCtrl', function($scope, $http, usersService, $stateParams, $state, user, ModalService) {

    
    $scope.getUserDetails = function (id) {
        console.log(id);
        if (id === '' || typeof id === 'undefined') {
            $scope.userDetails = {}
            $scope.userDetails.userstatus_id = 1

        } else {
            usersService.readOne(id).then(function (response) {
            $scope.userDetails = response.data
            console.log('here it is')
            console.log($scope.userDetails)
            $scope.created = new Date($scope.userDetails.created_at)
            $scope.lastLogin = new Date($scope.userDetails.lastlogin)
            // https://stackoverflow.com/questions/30537886/error-ngmodeldatefmt-expected-2015-05-29t190616-693209z-to-be-a-date-a
            });
        }   
    }
    $scope.getUserDetails($stateParams.id)


    $scope.cancel = function() {
        $state.go('users');
    }


    $scope.save = function(id) {
            
        if(typeof id === 'undefined') {  //add new
            usersService.create($scope.userDetails).then (function(response) {
            $scope.newCustomer = response;
            })

        } else {  //edit existing     delete stuff not needed
            delete $scope.userDetails.userstatus
            delete $scope.userDetails.usersecuritygroup
            delete $scope.userDetails.password
            delete $scope.userDetails.created_at
            usersService.update(id.id, $scope.userDetails).then (function(response) {
            })
        }
        $state.go('users');  // go back to all users screen
    }

    $scope.deleteUser = function (id) {
        usersService.delete(id.id).then(function (response) {
            $state.go('users');
            });
        }

    $scope.updatePW = function(id) {
        $scope.custForApi = {
        password: $scope.userDetails.password  
        }

    
    usersService.update(id.id, $scope.custForApi).then (function(response) {
        $state.go('users');  // go back to all users screen
        })
    }

    $scope.getUserStatus = function () {
        usersService.getStatus().then(function (response) {
            $scope.options = response.data
            console.log($scope.options)
            });
    }

    $scope.getUserStatus()

    $scope.getSecurityGroup = function () {
        usersService.getSecurityGroup().then(function (response) {
            $scope.securityGroup = response.data
            console.log($scope.options)
            });
    }

    $scope.getSecurityGroup()


  // Delete will pop open a modal asking you to confirm
    $scope.delete = function(user) {
        $scope.modalData = user.userDetails

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
                            $state.go('users');
                            });
                    }
                })
            })
    };    



    
});


