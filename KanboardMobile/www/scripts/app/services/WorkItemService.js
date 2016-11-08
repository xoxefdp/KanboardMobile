app.factory('WorkItemService', ['$http', 'AuthenticationService', 'ProjectService', function ($http, AuthenticationService, ProjectService) {

    var current_workitem_id = 0;

    function _getComments() {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "getAllComments",
                    "id": 148484683,
                    "params": {
                        "task_id": current_workitem_id
                    }
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                // Success
                resolve(response.data.result);
            }, function (response) {
                // Failure
                console.log('Unable to get Comments');
                reject(null);
            });
        });
    }

    function _createComment(comment_content) {
        return new Promise(function (resolve, reject) {
            AuthenticationService.getMyDetails().then(function (response) {
                sendCommentCreationRequest(response.id, comment_content).then(function(response){
                    resolve(null);
                });
            });
        });
    }

    function sendCommentCreationRequest(id, comment_content) {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "createComment",
                    "id": 1580417921,
                    "params": {
                        "task_id": current_workitem_id,
                        "user_id": id,
                        "content": comment_content
                    }
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                // Success
                resolve(response.data.result);
            }, function (response) {
                // Failure
                console.log('Unable to create Comment');
                reject(null);
            });
        });
    }

    function _updateWorkItem(title, description) {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "updateTask",
                    "id": 1406803059,
                    "params": {
                        "id": current_workitem_id,
                        "title": title,
                        "description": description
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                // Success
                resolve(response.data.result);
            }, function (response){
                // Failure
                reject(null);
            });
        });
    }

    function _moveWorkItem(to_project, to_column, to_swimlane) {
        return new Promise(function (resolve, reject) {
            if (to_project == null)
                to_project = getCurrentWorkItem().project_id;
            if (to_column == null)
                to_column = getCurrentWorkItem().column_id;
            if (to_swimlane == null)
                to_swimlane = getCurrentWorkItem().swimlane_id;

            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "moveTaskPosition",
                    "id": 117211800,
                    "params": {
                        "project_id": to_project,
                        "task_id": current_workitem_id,
                        "column_id": to_column,
                        "position": 1,
                        "swimlane_id": to_swimlane
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                // Success
                resolve(response.data.result);
            }, function (response) {
                // Failure
                reject(null);
            });
        });
    }

    function _closeWorkItem() {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "closeTask",
                    "id": 1654396960,
                    "params": {
                        "task_id": current_workitem_id
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response){
                resolve();
            });
        });
    }

    function _createWorkItem(title, owner_id, description, date, column_id, swimlane_id) {
        return new Promise(function (resolve, reject) {
            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "createTask",
                    "id": 1406803059,
                    "params": {
                        "title": title,
                        "project_id": ProjectService.getCurrentProjectID(),
                        "owner_id": owner_id,
                        "description": description,
                        "date_due": date.toISOString().substring(0, 10),
                        "column_id": column_id,
                        "swimlane_id": swimlane_id
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        });
    }

    function _getTask(task_id) {
        return new Promise(function (resolve, reject) {

            $http({
                method: 'POST',
                url: AuthenticationService.getBaseURL() + '/jsonrpc.php',
                data: {
                    "jsonrpc": "2.0",
                    "method": "getTask",
                    "id": 700738119,
                    "params": {
                        "task_id": task_id
                    }
                },
                headers: { 'Content-Type': 'application/json' }
            }).then(function (response) {
                // Success
                resolve(response.data.result);
            }, function (response) {
                // Failure
                console.log('Unable to get Task');
                reject(null);
            });
        });
    }

    function _getCurrentWorkItem() {
        return new Promise(function (resolve, reject) {
            resolve(_getTask(current_workitem_id));
        });
    }

    function _setCurrentWorkItem(workitem_id) {
        current_workitem_id = workitem_id;
    }

    return {
        getComments: _getComments,
        createComment: _createComment,
        updateWorkItem: _updateWorkItem,
        moveWorkItem: _moveWorkItem,
        closeWorkItem: _closeWorkItem,
        createWorkItem: _createWorkItem,
        getTask: _getTask,
        getCurrentWorkItem: _getCurrentWorkItem,
        setCurrentWorkItem: _setCurrentWorkItem
    };

}]);