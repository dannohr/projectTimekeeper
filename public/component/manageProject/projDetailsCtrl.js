angular.module('fullstack').controller('projDetailsCtrl', function($scope, $http, manageProjSrvc, $stateParams, $state, user, ModalService ) {

    $scope.getProjectDetails = function (id) {
    console.log(id);
    if (id === '' || typeof id === 'undefined') {
        $scope.projDetails = {}
        $scope.projDetails.projectstatusid = 1
        console.log($scope.projDetails)

    } else {
      console.log(id)
        manageProjSrvc.readOne(id).then(function (response) {
        $scope.projDetails = response.data
        console.log($scope.projDetails)
        });
    }
}

$scope.getProjectDetails($stateParams.id)

$scope.cancel = function() {
    $state.go('manageProj');
}


$scope.save = function(id) {
     $scope.projForApi = {
        projectstatus_id: $scope.projDetails.projectstatus_id,
        projecttype_id: $scope.projDetails.projecttype_id,
        projectname: $scope.projDetails.projectname
        }
        

    if(typeof id === 'undefined') {  //add new
        manageProjSrvc.create($scope.projForApi).then (function(response) {
        $scope.newProject = response;
        })

    } else {  //edit existing
        manageProjSrvc.update(id.id, $scope.projForApi).then (function(response) {
        })
    }
    $state.go('manageProj');  // go back to all projects screen

}


    $scope.getProjectStatus = function () {
        manageProjSrvc.getStatus().then(function (response) {
            $scope.statusoptions = response.data
            console.log($scope.statusoptions)
            });
    }

    $scope.getProjectStatus()

    $scope.getProjectType = function () {
        manageProjSrvc.getType().then(function (response) {
            $scope.typeoptions = response.data
            console.log($scope.typeoptions)
            });
    }

    $scope.getProjectType()

  // Delete will pop open a modal asking you to confirm
  $scope.deleteProject = function(project) {
    
    console.log(project)
    $scope.modalData = project.projDetails
    console.log($scope.modalData)
      
    ModalService.showModal({
        templateUrl: "/component/modal/confirmdelete.html",
        controller: "modalController",
        inputs: { modalData: $scope.modalData,
                  message: 'Are you sure you want to delete project: ' + $scope.modalData.projectname + '?' },
        preClose: (modal) => { modal.element.modal('hide'); }
    })

    .then(function(modal) {
        modal.element.modal();
        modal.close
            .then(function(result) {  
                if(result) {   
                    manageProjSrvc.delete($scope.modalData.id).then(function (response) {
                        $state.go('manageProj');
                        });
                }
            })
        })
};


});