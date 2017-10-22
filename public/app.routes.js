angular.module('fullstack').config(($urlRouterProvider, $stateProvider) => {

    $urlRouterProvider.otherwise('/');

    // in the resolve, request the user, if no user, catcth the error (401, 404, etc.);
    // the user method gives access to a user prop in the homeCtrl
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: './component/home/home.html',
            controller: 'homeCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // console.log(err)
                        // $state.go('/login')
                    })
            }
        })
        .state('login', {
            url: '/',
            templateUrl: './component/login/login.html',
            controller: 'loginCtrl'
        })


        .state('timesheet', {
            url: '/timesheet',
            templateUrl: './component/timesheet/timesheet.html',
            controller: 'timesheetCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })


        .state('timeentry', {
            url: '/timeentry/:id',
            templateUrl: './component/timesheet/timeentry.html',
            controller: 'timeentryCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state('project', {
            url: '/project',
            templateUrl: './component/project/project.html',
            controller: 'projectCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })


        .state('reports', {
            url: '/reports',
            templateUrl: './component/reports/reports.html',
            controller: 'reportsCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })


        .state('manageProj', {
            url: '/manageProject',
            templateUrl: './component/manageProject/manageproject.html',
            controller: 'manageProjCtrl',
            resolve: {
                user: (loginSrvc, $state) => loginSrvc.getUser()
                .then(response => response.data)
                .catch(err => {
                    // $state.go('/login')
                })
            }
        })


        .state('signup', {
            templateUrl: './component/signup/signup.html',
            controller: 'signupCtrl'
        })

        .state('users', {
            url: "/users",
            templateUrl: './component/manageUsers/manageuser.html',
            controller: 'manageUserCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state("userdetails", {
            url: "/users/detail/:id",   
            templateUrl: './component/manageUsers/userdetails.html',
            controller: 'userdetailsCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state("newuser", {
            url: "/users/new",   
            templateUrl: './component/manageUsers/userdetails.html',
            controller: 'userdetailsCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state("newproject", {
            url: "/manageProject/new",   
            templateUrl: './component/manageProject/projectdetails.html',
            controller: 'projDetailsCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state("projectdetails", {
            url: "/manageProject/detail/:id",   
            templateUrl: './component/manageProject/projectdetails.html',
            controller: 'projDetailsCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state("security", {
            url: "/manageSecurity",   
            templateUrl: './component/manageSecurity/security.html',
            controller: 'securityCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })

        .state("manageLists", {
            url: "/manageLists",   
            templateUrl: './component/managelists/managelists.html',
            controller: 'manageListsCtrl',
            resolve: {
                user: loginSrvc => loginSrvc.getUser()
                    .then(response => response.data)
                    .catch(err => {
                        // $state.go('/login')
                    })
            }
        })






});
