/* globals angular */
;(function() {
	"use strict";

	/**
	 * Test Module
	 */
	angular.module('zumWaypointTest', ['ngMock', 'zumba.angular-waypoints']);

	/**
	 * zumWaypoint Directive Test Suite
	 */
	describe('zumWaypoint Directive', function() {

		/**
		 * Function used to inject directive into template
		 *
		 * @param String template
		 * @return Object scope The directive scope
		 */
		var injectWaypoint;

		/**
		 * Spy helper to verify directive functionality
		 */
		var getHandlerSyncSpy;

		beforeEach(module('zumWaypointTest', function($provide) {
			$provide.decorator('WaypointService', function($delegate) {
				$delegate.getHandlerSync = getHandlerSyncSpy = jasmine.createSpy('getHandlerSync');
				return $delegate;
			});
		}));

		beforeEach(inject(function($compile, $rootScope) {
			injectWaypoint = function(template) {
				var scope = $rootScope.$new();

				template = angular.element(template);
				angular.element('body').append(template);

				$compile(template)(scope);
				scope.$digest();

				return scope.$$childHead;
			};
		}));

		afterEach(function() {
			$.waypoints('destroy');
			$('[zum-waypoint]').remove();
		});

		it('attaches a jQuery waypoint to the element with the directive attribute', function() {
			var waypoints;

			injectWaypoint('<div zum-waypoint />');
			waypoints = $.waypoints();

			expect(waypoints.vertical[0]).toBe($('[zum-waypoint]').get(0));
		});

		it('requests a handler function from the Waypoint service', function() {
			var scope = injectWaypoint('<div zum-waypoint />');
			expect(getHandlerSyncSpy).toHaveBeenCalledWith(scope, jasmine.any(Function));
		});

		it('retrieves the up, down, and offset attributes', function() {
			var scope = injectWaypoint('<div zum-waypoint up="a" down="b" offset="c" poop="💩" />');
			expect(scope.up).toBe('a');
			expect(scope.down).toBe('b');
			expect(scope.offset).toBe('c');
			expect(scope.poop).toBeUndefined();
		});

		it('binds the directive waypoints to the parent scope attribute defined by the template', function() {
			var scope = injectWaypoint('<div zum-waypoint="testPoints" />');
			expect(scope.waypoints).toBe(scope.$parent.testPoints);
		});
	});
}());