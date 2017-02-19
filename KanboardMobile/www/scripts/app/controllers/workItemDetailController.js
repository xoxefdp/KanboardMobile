app
  .controller('workItemDetailController', ['$scope', 'WorkItemService', 'ProjectService', '$location', '$route', function ($scope, WorkItemService, ProjectService, $location, $route) {

      ProjectService.getCurrentProjectBoard().then(function (response) {
          $scope.board_details = response;
          initialise();
      });

      WorkItemService.getComments().then(function (response) {
          $scope.commentList = response;
      });

      $scope.closeTask = function () {
          navigator.notification.confirm('Are you sure you want to close this task?', closeTask, 'Close this task?', ['Yes', 'No']);
      }



      $scope.submitChanges = function () {
          WorkItemService.updateWorkItem($scope.newItem.title, $scope.newItem.description);

          WorkItemService.getCurrentWorkItem().then(function(response){
              WorkItemService.moveWorkItem($scope.newItem.project_id, $scope.newItem.column_id, $scope.newItem.swimlane_id);
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

      function closeTask(returnValue) {
          if (returnValue !== 1)
              return;
          WorkItemService.closeWorkItem().then(function (response) {
              $location.path('/workitemlist');
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
                  project_id: response.project_id,
                  description: response.description
              };
              getSwimlaneName(response.swimlane_id);
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