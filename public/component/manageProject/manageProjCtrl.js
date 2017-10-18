angular.module('fullstack').controller('manageProjCtrl', function($scope, user, manageProjSrvc, ModalService) {
    
    $scope.manageProjTest = "Test of Project Management Page in Angular"
    console.log('user from manageProjCtrl is');
    console.log(user);
    
    


    $scope.getProjects = function () {
        manageProjSrvc.readAll().then(function (response) {
            console.log(response.data)
            $scope.allprojects = response.data
            });
    }
    
    $scope.getProjects()
    
    // $scope.deleteProject = function (id) {
    //     manageProjSrvc.delete(id.id).then(function (response) {
    //         $scope.getProjects()
    //         });
    //     }

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
    $scope.modalData = project.project
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
                        $scope.getProjects()
                        });
                }
            })
        })
};

});