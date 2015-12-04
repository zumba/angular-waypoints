/* globals angular, Waypoint */
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

		var addedElements;

		beforeEach(module('zumWaypointTest', function($provide) {
			$provide.decorator('WaypointService', function($delegate) {
				$delegate.getHandlerSync = getHandlerSyncSpy = jasmine.createSpy('getHandlerSync')
					.and.returnValue(function() {});
				return $delegate;
			});
		}));

		beforeEach(inject(function($compile, $rootScope) {
			addedElements = [];
			injectWaypoint = function(template) {
				var scope = $rootScope.$new();

				template = angular.element(template);
				angular.element(document).find('body').append(template);
				addedElements.push(template);

				$compile(template)(scope);
				scope.$digest();

				return {scope: scope.$$childHead, element: template};
			};
		}));

		afterEach(function() {
			Waypoint.destroyAll();
			angular.element(addedElements).remove();
		});

		it('creates a waypoint for the element with the directive attribute',function() {
			var element = injectWaypoint('<div zum-waypoint />').element;
			expect(Waypoint.Context.findByElement(element)).not.toBeNull();
		});

		it('requests a handler function from the Waypoint service', function() {
			var scope = injectWaypoint('<div id="myWaypoint" zum-waypoint />').scope;
			expect(getHandlerSyncSpy).toHaveBeenCalledWith(scope, jasmine.any(Function));
		});

		it('retrieves the up, down, and offset attributes', function() {
			var scope = injectWaypoint('<div zum-waypoint up="a" down="b" offset="c" poop="💩" />').scope;
			expect(scope.up).toBe('a');
			expect(scope.down).toBe('b');
			expect(scope.offset).toBe('c');
			expect(scope.poop).toBeUndefined();
		});

		it('binds the directive waypoints to the parent scope attribute defined by the template', function() {
			var scope = injectWaypoint('<div zum-waypoint="testPoints" />').scope;
			expect(scope.waypoints).toBe(scope.$parent.testPoints);
		});
	});
}());
