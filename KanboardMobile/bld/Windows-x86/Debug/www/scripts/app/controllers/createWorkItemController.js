app
  .controller('createWorkItemController', ['$scope', 'WorkItemService', 'ProjectService', '$location', function ($scope, WorkItemService, ProjectService, $location) {


      ProjectService.getCurrentProjectBoard().then(function (response) {
          $scope.board_details = response;
          initialise();
          $scope.$apply();
      });

      ProjectService.getCurrentProjectUsers().then(function (response) {
          $scope.userList = response;
          $scope.$apply();
      });

      $scope.submitChanges = function () {
          if ($scope.newItem.title != '' && $scope.newItem.swimlane_id != null
              && $scope.newItem.duedate != null && $scope.newItem.description != ''
              && $scope.newItem.duedate != '') {
              WorkItemService.createWorkItem($scope.newItem.title, $scope.newItem.owner_id, $scope.newItem.description, $scope.newItem.date_due, $scope.newItem.column_id, $scope.newItem.swimlane_id).then(function (response) {
                  $scope.$apply();
              });
          }
      }

      function initialise() {
          $scope.newItem = {
              title: '',
              description: '',
              owner_id: null,
              date_due: new Date(),
              column_id: null
          };
      }
  }]);