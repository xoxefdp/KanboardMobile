    app.controller('loginCtrl', ['$scope', 'AuthenticationService', '$location', function ($scope, AuthenticationService, $location) {
        $scope.remember_me_disabled = false;
        var secure_storage = new cordova.plugins.SecureStorage(
          function () { console.log('Success') },
          function (error) {
              console.log('Error ' + error);
              $scope.remember_me_disabled = true;
          },
          'kanboard_app');

      $scope.init = function () {
          $scope.protocols = [
            { id: 0, label: "http://" },
            { id: 1, label: "https://" }
          ];

          $scope.username = "";
          $scope.password = "";
          $scope.protocol = {};
          $scope.server = "";
          $scope.remember_me = false;
          recallCredentials();
      }

      $scope.login = function () {
          AuthenticationService.authenticate($scope.username, $scope.password, $scope.protocol.label + $scope.server)
          .then(
            function (response) {
              if ($scope.remember_me)
                storeCredentials();
              $location.path('/mainscreen');
            }, function (error) {
              navigator.notification.alert('Username or Password is incorrect', null);
            }
          );
      };

      $scope.remember_me_clicked = function () {
          if ($scope.remember_me_disabled = true) {
              alert('Secure Remember Me functionality requires that you have a lock screen. Please enable the lock screen and try again.');
          }
      }

      function recallCredentials() {
          secure_storage.get(function (value) {
              $scope.username = value;
              $scope.remember_me = true;
              $scope.$applyAsync();
          }, function (error) { $scope.username = ""; },
            'username'
          );
          secure_storage.get(function (value) {
              $scope.password = value;
              $scope.remember_me = true;
              $scope.$applyAsync();
          }, function (error) { $scope.password = ""; },
            'password'
          );
          secure_storage.get(function (value) {
              for (var i = 0; i < $scope.protocols.length; i++) {
                if ($scope.protocols[i].id === JSON.parse(value).id) {
                    $scope.protocol = $scope.protocols[i];
                    break;
                }
              }
              $scope.remember_me = true;
              $scope.$applyAsync();
          }, function (error) { $scope.protocol = $scope.protocols[1]; },
            'protocol'
          );
          secure_storage.get(function (value) {
              $scope.server = value;
              $scope.remember_me = true;
              $scope.$applyAsync();
          }, function (error) { $scope.server = ""; },
            'server'
          );
      }

      function storeCredentials() {
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'username',                       // key
            $scope.username                   // value
          );
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'password',                       // key
            $scope.password                   // value
          );
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'protocol',                       // key
            JSON.stringify($scope.protocol)   // value
          );
          secure_storage.set(
            function (key) { console.log('Set ' + key); },
            function (error) { console.log('Error ' + error); },
            'server',                         // key
            $scope.server                     // value
          );
      }

  }]);
