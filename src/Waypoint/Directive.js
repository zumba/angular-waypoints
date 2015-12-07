var zumWaypoint = function zumWaypoint($window, WaypointService) {
	return {
		controller : 'WaypointController',
		scope : {
			up : '@',
			down : '@',
			offset : '@',
			waypoints : '=?zumWaypoint'
		},
		link : function zumWaypointLink(scope, element, attrs, ctrl) {
			var callback = angular.bind(ctrl, ctrl.processWaypoint);
			/*jshint -W031 */
			new $window.Waypoint({
				element: element[0],
				handler : WaypointService.getHandlerSync(scope, callback),
				offset : scope.offset || 0
			});
			/*jshint +W031 */
		}
	};
};
