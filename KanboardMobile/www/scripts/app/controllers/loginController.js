app
  .controller('loginCtrl', ['$scope', 'AuthenticationService', '$location', function ($scope, AuthenticationService, $location) {
      var secure_storage = new cordova.plugins.SecureStorage(
          function () { console.log('Success') },
          function (error) { console.log('Error ' + error); },
          'kanboard_app');

      $scope.init = function () {
          $scope.username = "";
          $scope.password = "";
          $scope.server = "";
          recallCredentials();
      }

      $scope.login = function () {
          AuthenticationService.authenticate($scope.username, $scope.password, 'https://' + $scope.server).then(function (response) {
              if ($scope.remember_me)
                storeCredentials();
              $location.path('/mainscreen');
              $scope.$apply();
          }, function (error) {
              alert('Username or Password is incorrect');
          });
      };

      function recallCredentials() {
          secure_storage.get(function (value) {
              $scope.username = value;
              $scope.remember_me = true;
              $scope.$apply();
          }, function (error) { $scope.username = ""; }, 'username');
          secure_storage.get(function (value) {
              $scope.password = value;
              $scope.remember_me = true;
              $scope.$apply();
          }, function (error) { $scope.password = ""; }, 'password');
          secure_storage.get(function (value) {
              $scope.server = value;
              $scope.remember_me = true;
              $scope.$apply();
          }, function (error) { $scope.server = ""; }, 'server');
      }

      function storeCredentials() {
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'username', $scope.username);
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'password', $scope.password);
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'server', $scope.server);
      }

  }]);