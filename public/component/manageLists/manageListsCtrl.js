angular.module('fullstack').controller('manageListsCtrl', function($scope, user, manageProjSrvc, securityService, usersService, timesheetSrvc, ModalService, manageListsSrvc) {
    
    $scope.getUserStatus = () => { usersService.getStatus().then(function (response) { $scope.userStatus = response.data });}
    $scope.getUserStatus();
    
    
    $scope.getUserGroup = () => { usersService.getUserGroup().then(function (response) { $scope.userGroup = response.data });}
    $scope.getUserGroup();
    

    $scope.getSecurityGroup = () => { securityService.getSecurityGroup().then(function (response) { $scope.securityGroups = response.data})}
    $scope.getSecurityGroup();


    $scope.getProjectType = () => { manageProjSrvc.getType().then(function (response) { $scope.projectTypeOptions = response.data })}
    $scope.getProjectType();


    $scope.getProjectTasks = () => { timesheetSrvc.getProjectTasks().then(function (response) { $scope.projectTasks = response });}
    $scope.getProjectTasks();

    
    $scope.getProjectStatus = () => { manageProjSrvc.getStatus().then(function (response) {$scope.projectStatusOptions = response.data});}
    $scope.getProjectStatus();
    
    
    $scope.getProjectRole = () => { manageProjSrvc.getProjectRole().then(function (response) {$scope.projectRoleOptions = response.data});}
    $scope.getProjectRole();

    $scope.getUsers= () => { usersService.readAll().then(function (response) {$scope.allusers = response.data});}
    $scope.getUsers();

    $scope.refreshData = () => {    $scope.getUserStatus();     $scope.getProjectType();    $scope.getProjectStatus();
                                    $scope.getUserGroup();      $scope.getProjectTasks();   $scope.getProjectRole();
                                    $scope.getSecurityGroup();
                                }



    $scope.deleteListItem = function(item) {        // Delete will pop open a modal asking you to confirm
        //item has to be in the form: { id: status.id,              <--- The primary key to delete
        //                              message: status.status,     <--- What shows on the modal delete confirmation 
        //                              table: 'userstatus'}        <--- Part of the API url that is unique
      
        ModalService.showModal({
            templateUrl: "/component/modal/confirmdelete.html",
            controller: "modalController",
            inputs: { modalData: $scope.modalData,
                    message: 'Are you sure you want to delete: ' + item.message + '?' },
            preClose: (modal) => { modal.element.modal('hide'); }
        })

        .then(function(modal) {
            modal.element.modal();
            modal.close
                .then(function(result) {  
                    if(result) {   
                        manageListsSrvc.deleteListItem(item.id, item.table).then(function (response) {   
                                $scope.refreshData();
                            });
                    }
                })
            })
    }



    $scope.addListItem = function(api, data) {
        manageListsSrvc.addListItem(api.api, data).then (function(response) {
            $scope.refreshData();
        })
    }
 
    
    $scope.updateListItem = function(id, api, data) {
        console.log(id)
        console.log(api)
        console.log(data)
        manageListsSrvc.updateListItem(id.id, api.api, data).then (function(response) {
            $scope.refreshData();
        })
    }    


});

