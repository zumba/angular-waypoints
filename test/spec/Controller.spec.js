/* globals angular */
;(function() {
	"use strict";
	/**
	 * Test Module
	 */
	angular.module('WaypointControllerTest', ['zumba.angular-waypoints']);

	/**
	 * Waypoint controller Test Suite
	 */
	describe("Waypoint Controller", function() {

		/**
		 * Helper method to generate new waypoint controllers for each test
		 */
		var createController;

		beforeEach(module('WaypointControllerTest'));
		beforeEach(inject(function($controller, $rootScope) {
			createController = function() {
				return $controller('WaypointController', { '$scope': $rootScope.$new() });
			};
		}));

		describe("Constructor", function() {
			it("should expose a waypoints object on the scope", function() {
				expect(createController().$scope.waypoints).toEqual(jasmine.any(Object));
			});
		});

		describe("processWaypoint", function() {
			it("should create namespaces for waypoints", function() {
				var Waypoint = createController();
				Waypoint.processWaypoint('test.point');
				expect(Waypoint.$scope.waypoints.test).toEqual(jasmine.any(Object));
			});

			it("should put waypoints under a global namespace if one is not provided", function() {
				var Waypoint = createController();
				Waypoint.processWaypoint('testPoint');
				expect(Waypoint.$scope.waypoints.globals).toEqual(jasmine.any(Object));
			});

			it("should set a boolean value true on a waypoint slug in a namespace", function() {
				var Waypoint = createController();
				Waypoint.processWaypoint('test.point');
				expect(Waypoint.$scope.waypoints.test.point).toBe(true);

				Waypoint.processWaypoint('testPoint');
				expect(Waypoint.$scope.waypoints.globals.testPoint).toBe(true);
			});

			it("should set other waypoints in the same namespace to false", function() {
				var Waypoint = createController();
				Waypoint.processWaypoint('test.a');
				expect(Waypoint.$scope.waypoints.test.a).toBe(true);

				Waypoint.processWaypoint('test.b');
				Waypoint.processWaypoint('test.c');

				expect(Waypoint.$scope.waypoints.test.a).toBe(false);
				expect(Waypoint.$scope.waypoints.test.b).toBe(false);
				expect(Waypoint.$scope.waypoints.test.c).toBe(true);
			});

			it("should not set waypoints to false if they belong to another namespace", function() {
				var Waypoint = createController();
				Waypoint.processWaypoint('test.a');
				Waypoint.processWaypoint('b');
				Waypoint.processWaypoint('another.c');

				expect(Waypoint.$scope.waypoints.test.a).toBe(true);
				expect(Waypoint.$scope.waypoints.globals.b).toBe(true);
				expect(Waypoint.$scope.waypoints.another.c).toBe(true);
			});
		});
	});
}());
