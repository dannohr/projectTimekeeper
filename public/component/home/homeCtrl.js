angular.module('fullstack').controller('homeCtrl', function($scope, $state, user) {
    // user comes from resolve, will either be the user obj or error message we send from server
    // console.log(user);
    // if user.data and user.data.err then user = err
    // else user = user object from database
    
    if (typeof user == "undefined") {
        console.log('no user')
        // $state.go('/login')
    } else {
        // console.log('user')
        $scope.user = user.data && user.data.err ? user.data.err : user;
    }


})
