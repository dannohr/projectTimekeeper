angular.module("fullstack").service("loginSrvc", function($http, $state) {
  // you can use this function for every request to get user.
  // don't write new versions of this in every service, keep it DRY
  this.getUser = () => $http.get("/app1/auth/me");
});
