angular.module('fullstack').config(($urlRouterProvider, $stateProvider) => {

    $urlRouterProvider.otherwise('/');

    // in the resolve, request the user, if no user, catcth the error (401, 404, etc.);
    // the user method gives access to a user prop in the homeCtrl
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './component/home/homeTmpl.html',
            controller: 'homeCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })
        .state('login', {
            url: '/',
            templateUrl: './component/login/login.html',
            controller: 'mainCtrl'
        })

        .state('timesheet', {
            url: '/timesheet',
            templateUrl: './component/timesheet/timesheet.html',
            controller: 'timesheetCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })


        .state('project', {
            url: '/project',
            templateUrl: './component/project/project.html',
            controller: 'projectCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })


        .state('reports', {
            url: '/reports',
            templateUrl: './component/reports/reports.html',
            controller: 'reportsCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
            }
        })


        .state('manageProj', {
            url: '/manageProject',
            templateUrl: './component/manageProject/manageproject.html',
            controller: 'manageProjCtrl',
            resolve: {
                user: (mainSrvc, $state) => mainSrvc.getUser()
                .then(response => response.data)
                .catch(err => {
                    $state.go('/login')
                })
            }
        })


        .state('signup', {
            templateUrl: './component/signup/signup.html',
            controller: 'signupCtrl'
        })

        .state('users', {
            url: "/users",
            templateUrl: './component/manageUsers/users.html',
            controller: 'usersCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })

        .state("userdetails", {
            url: "/users/detail/:id",   
            templateUrl: './component/manageUsers/userdetails.html',
            controller: 'userdetailsCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })

        .state("newuser", {
            url: "/users/new",   
            templateUrl: './component/manageUsers/userdetails.html',
            controller: 'userdetailsCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })

        .state("newproject", {
            url: "/manageProject/new",   
            templateUrl: './component/manageProject/projectdetails.html',
            controller: 'projDetailsCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })

        .state("projectdetails", {
            url: "/manageProject/detail/:id",   
            templateUrl: './component/manageProject/projectdetails.html',
            controller: 'projDetailsCtrl',
            resolve: {
                user: mainSrvc => mainSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => err)
            }
        })






});
