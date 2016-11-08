app
  .controller('workItemListController', ['$scope', 'ProjectService', 'WorkItemService', '$location', function ($scope, ProjectService, WorkItemService, $location) {

      ProjectService.getAllTasksInCurrentProject().then(function (response) {
          $scope.workitems = response;
          $scope.$apply();
      });

    $scope.openWorkItem = function (item) {
        WorkItemService.setCurrentWorkItem(item.id);
        $location.path('/workitemdetail');
    }

    $scope.createTask = function () {
        $location.path('/createworkitem');
    }
  }]);