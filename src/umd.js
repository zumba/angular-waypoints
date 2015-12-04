// https://github.com/umdjs/umd
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['angular'], factory);
	} else {
		// Browser globals
		root.WaypointModule = factory(root.angular);
	}
}(this, function (angular) {
	/** src files **/
	return angular.module('zumba.angular-waypoints', [])
		.controller('WaypointController', ['$scope', WaypointController])
		.directive('zumWaypoint', ['$window', 'WaypointService', zumWaypoint])
		.service('WaypointService', ['$timeout', WaypointService]);
}));
