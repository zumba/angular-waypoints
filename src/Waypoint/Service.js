/**
 * Service for injecting a callback handler for the zumWaypoint Directive
 *
 * @param Function $timeout service
 */
var WaypointService = function WaypointService($timeout) {
	this.$timeout = $timeout;
};

/**
 * Get a waypoint handler that executes `callback` on next tick
 *
 * Callback will be passed the waypoint slug.
 *
 * @param Object scope
 * @param Function callback
 * @return mixed
 */
WaypointService.prototype.getHandlerSync = function getHandlerSync(scope, callback) {
	var timeout = this.$timeout;

	return function(direction) {
		var waypoint = scope[direction];
		if (waypoint) {
			timeout(angular.bind(null, callback, waypoint));
		}
	};
};
