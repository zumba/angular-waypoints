/**
 * Waypoint slugs parsed into objects and stored by key:
 * {
 *     'example.point' : { namespace : 'example', waypoint : 'point' },
 *     'noNamespace' : { namespace : 'globals', waypoint : 'noNamespace' }
 * }
 *
 * @type Object
 */
var parsedWaypoints = {};

/**
 * Waypoint Controller
 *
 * @param Object $scope
 */
var WaypointController = function WaypointController($scope) {
	$scope.waypoints = {};
	this.$scope = $scope;
};

/**
 * Get a namespace for the waypoint
 *
 * @param String qualifiedWaypoint
 * @return String
 */
var parseWaypoint = function parseWaypoint(qualifiedWaypoint) {
	var parts;
	if (!parsedWaypoints[qualifiedWaypoint]) {
		parts = qualifiedWaypoint.split('.');
		if (parts.length === 1) {
			parts.unshift('globals');
		}
		parsedWaypoints[qualifiedWaypoint] = {
			namespace : parts.shift(),
			waypoint : parts.join('.')
		};
	}
	return parsedWaypoints[qualifiedWaypoint];
};

/**
 * Sets all waypoints in the colleciton to false, and sets the indicated waypoint to true.
 *
 * @param Object collection
 * @param String waypoint
 */
var setWaypoint = function setWaypoint(collection, waypoint) {
	angular.forEach(collection, function (value, waypoint) {
		collection[waypoint] = false;
	});
	collection[waypoint] = true;
};

/**
 * Clear all waypoints in the same namespace as qualifiedWaypoint,
 * and set qualifiedWaypoint.
 *
 * @param String qualifiedWaypoint
 * @return void
 */
WaypointController.prototype.processWaypoint = function processWaypoint(qualifiedWaypoint) {
	var waypoints = this.$scope.waypoints;
	var data = parseWaypoint(qualifiedWaypoint);
	var namespace = data.namespace;

	if (!waypoints[namespace]) {
		waypoints[namespace] = {};
	}

	setWaypoint(waypoints[namespace], data.waypoint);
};
