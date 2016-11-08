app
  .controller('workItemDetailController', ['$scope', 'WorkItemService', 'ProjectService', '$location', '$route', function ($scope, WorkItemService, ProjectService, $location, $route) {

      ProjectService.getCurrentProjectBoard().then(function (response) {
          $scope.board_details = response;
          initialise();
      });

      WorkItemService.getComments().then(function (response) {
          $scope.commentList = response;
          $scope.$apply();
      });

      $scope.closeTask = function () {
          if (confirm('Are you sure you want to close this task?'))
              closeTask();
      }

      $scope.submitChanges = function () {
          WorkItemService.updateWorkItem($scope.newItem.title, $scope.newItem.description);

          WorkItemService.getCurrentWorkItem().then(function(response){
              if (response.column_id != $scope.newItem.column_id) {
                  WorkItemService.moveWorkItem(null, $scope.newItem.column_id, $scope.newItem.swimlane_id);
              }
              $location.path('/workitemlist');
          });
      }

      $scope.submitComment = function () {
          if ($scope.new_comment.text == '') {
              return;
          }
          $scope.sending = true;
          WorkItemService.createComment($scope.new_comment.text).then(function (response) {
              $route.reload();
          }, function (error) {
              alert('Failed to add Comment!');
          });
      }

      function closeTask() {
          WorkItemService.closeWorkItem().then(function (response) {
              $location.path('/workitemlist');
              $scope.$apply();
          });
      }

      function initialise() {

          $scope.new_comment = {
              text: ''
          };

          WorkItemService.getCurrentWorkItem().then(function (response) {
              $scope.newItem = {
                  title: response.title,
                  column_id: response.column_id,
                  swimlane_id: response.swimlane_id,
                  description: response.description
              };
              getSwimlaneName(response.swimlane_id);
              $scope.$apply();
          });
      }

      function getSwimlaneName(swimlane_id) {
          for (var i = 0; i < $scope.board_details.length; i++)
              if ($scope.board_details[i].id == swimlane_id)
                  $scope.newItem.swimlane_name = $scope.board_details[i].name;
      }

  }]);

    app.filter('reverse', function () {
        return function (items) {
            if (items != null) {
                return items.slice().reverse();
            }
        };
    });