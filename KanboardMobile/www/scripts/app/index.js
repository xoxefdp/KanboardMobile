// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener("backbutton", onBackKeyDown.bind(this), false);


        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        angular.bootstrap($('body'), ['kanboard_app']);
    };

    function onBackKeyDown() {
        // Handle the back button
        var location = window.location.href.substring(window.location.href.lastIndexOf('/'),window.location.href.length);
        switch (location) {
            case '/workitemdetail':
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/workitemlist';
                break;
            case '/createworkitem':
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/workitemlist';
                break;
            case '/workitemlist':
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/mainscreen';
                break;
            case '/mainscreen':
                window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/login';
                break;
        }
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.

    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };


} )();