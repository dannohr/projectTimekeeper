angular.module('fullstack').controller('projectCtrl', function($scope, user, manageProjSrvc, usersService, ModalService) {
    
    $scope.projectTest = "Test of Projects"

    $scope.user = user
    $scope.userFilter = user.id
    // console.log('logged in user is')
    // console.log(user)

    $scope.getProjects = function () {
        manageProjSrvc.readAll().then(function (response) {
            console.log('all projects:')
            console.log(response.data)
            $scope.allprojects = response.data
            });
    }


    // get list of users to populate ng-option
    $scope.getUsers = function () {
        usersService.readAll().then(function (response) {
            $scope.allusers = response.data
            console.log($scope.allusers)
            });
    }
    $scope.getUsers()
    

    $scope.getProjectUser = function (id) {
        manageProjSrvc.getProjectUser(id).then(function (response) {
            $scope.projectuser = response
            console.log($scope.projectuser)
            });
    }
    
    //Initially loaded data when page opens
    $scope.getProjectUser($scope.userFilter)




    $scope.addNotes = function() {
        
            ModalService.showModal({
              templateUrl: "/component/modal/addnotes.html",
              controller: "modalController",
              preClose: (modal) => { modal.element.modal('hide'); },
              inputs: {
                title: "Add Notes"
              }
            }).then(function(modal) {
              modal.element.modal();
            //   modal.close.then(function(result) {
            modal.closeAddNotes.then(function(result) {
                if (!result) {
                  $scope.complexResult = "Modal forcibly closed..."
                } else {
                  $scope.complexResult  = "Name: " + result.name + ", age: " + result.age;
                }
              });
            });
        
          };




    // Delete will pop open a modal asking you to confirm
    $scope.deleteNote = function() {
    
    $scope.modalData = 'Testing'
    modalData = 'Another Test'
    console.log($scope.modalData)
    // console.log($scope.modalData.projectname)
      
    ModalService.showModal({
        templateUrl: "/component/modal/confirmdelete.html",
        controller: "modalController",
        inputs: { modalData: $scope.modalData,
                  message: 'Are you sure you want to hours for project' },
        preClose: (modal) => { modal.element.modal('hide'); }
    })

    .then(function(modal) {
        modal.element.modal();
        modal.close
            .then(function(result) {  
                if(result) {
                    console.log('Deleted Something')   
                    // timesheetSrvc.deleteTimeEntry( $scope.modalData.timeentryid).then(function (response) {
                    //     timesheet();
                    //     });
                }
            })
        })
};

  

});