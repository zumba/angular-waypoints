// https://github.com/umdjs/umd
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['lodash', 'angular'], factory);
    } else {
        // Browser globals
        root.WaypointModule = factory(root._, root.angular);
    }
}(this, function (_, angular) {
    /** src files **/
    return angular.module('zumba.angular-waypoints', [])
        .controller('WaypointController', ['$scope', WaypointController])
        .directive('zumWaypoint', ['WaypointService', zumWaypoint])
        .service('WaypointService', ['$timeout', WaypointService]);
}));