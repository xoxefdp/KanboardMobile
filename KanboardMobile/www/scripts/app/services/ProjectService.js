app.factory('ProjectService', ['$http', 'AuthenticationService', '$q', function ($http, AuthenticationService, $q) {

    var current_project_id = 0;

    function _getMyProjects() {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: { "jsonrpc": "2.0", "method": "getMyProjects", "id": 1 },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                // Success
                resolve(response.data.result);
            }, function (error) {
                //Failure
                console.log('Unable to get Projects');
                reject(null);
            });
        });
    };

    function _getBoard(project_id) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "getBoard",
                    "id": 887036325,
                    "params": [project_id]
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                //Success
                resolve(response.data.result);
            }, function (response) {
                //Failure
                console.log('Unable to get Board');
                reject(null);
            });
        });
    }

    function _getAllTasks(project_id) {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "getAllTasks",
                    "id": 887036325,
                    "params": {
                        "project_id": project_id,
                        "status_id": 1
                    }
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                //Success
                resolve(response.data.result);
            }, function (response) {
                //Failure
                console.log('Unable to get Board');
                reject(null);
            });
        });
    }

    function _getCurrentProjectBoard() {
        return $q(function (resolve, reject) {
            _getBoard(current_project_id).then(function (response) {
                resolve(response);
            })
        });
    }

    function _getAllTasksInCurrentProject() {
        return $q(function (resolve, reject) {
            _getAllTasks(current_project_id).then(function (response) {
                resolve(response);
            })
        });
    }

    function _getCurrentProjectID() {
        return current_project_id;
    }

    function _setCurrentProject(project_id) {
        current_project_id = project_id;
    }

    function _getCurrentProjectUsers() {
        return $q(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "getAssignableUsers",
                    "id": 1601016721,
                    "params": [
                        current_project_id
                    ]
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                //Success
                resolve(response.data.result);
            }, function (response) {
                //Failure
                console.log('Unable to get Board');
                reject(null);
            });
        });
    }

    return {
        getMyProjects: _getMyProjects,
        getBoard: _getBoard,
        getCurrentProjectBoard: _getCurrentProjectBoard,
        getAllTasks: _getAllTasks,
        getAllTasksInCurrentProject: _getAllTasksInCurrentProject,
        getCurrentProjectID: _getCurrentProjectID,
        setCurrentProject: _setCurrentProject,
        getCurrentProjectUsers: _getCurrentProjectUsers
    };
}]);