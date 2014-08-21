var zumWaypoint = function zumWaypoint(WaypointService) {
	return {
		controller : 'WaypointController',
		scope : {
			up : '@',
			down : '@',
			offset : '@',
			waypoints : '=?zumWaypoint'
		},
		link : function zumWaypointLink(scope, element, attrs, ctrl) {
			var callback = _.bind(ctrl.processWaypoint, ctrl);
			element.waypoint({
				handler : WaypointService.getHandlerSync(scope, callback),
				offset : scope.offset || 0
			});
		}
	};
};