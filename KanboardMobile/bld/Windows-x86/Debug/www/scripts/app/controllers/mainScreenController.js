app
  .controller('mainScreenController', ['$scope', 'ProjectService', '$location', function ($scope, ProjectService, $location) {

      ProjectService.getMyProjects().then(function (response) {
          $scope.projects = response;
          $scope.$apply();
      });

      $scope.openProject = function (project) {
          ProjectService.setCurrentProject(project.id);
          $location.path('/workitemlist');
      }
  }]);