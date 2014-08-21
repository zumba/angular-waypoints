/* globals angular */
;(function() {
	"use strict";

	angular.module('WaypointServiceTest', ['ngMock', 'zumba.angular-waypoints']);

	/**
	 * Util/Waypoint Service Test Suite
	 */
	describe('Waypoint Service', function() {

		beforeEach(module('WaypointServiceTest'));

		describe('getHandlerSync', function() {
			it('returns a function', inject(function(WaypointService) {
				expect(WaypointService.getHandlerSync()).toEqual(jasmine.any(Function));
			}));

			describe('handler function', function() {
				it('will do nothing if the scope does not contain a valid property', function() {
					inject(function(WaypointService, $timeout) {
						var callback = jasmine.createSpy('callback');
						var handler = WaypointService.getHandlerSync({}, callback);

						handler('down');
						$timeout.verifyNoPendingTasks();
						expect(callback).not.toHaveBeenCalled();
					});
				});

				it('executes the callback on the next tick', function() {
					inject(function(WaypointService, $timeout) {
						var callback = jasmine.createSpy('callback');
						var handler = WaypointService.getHandlerSync({ down : 'test' }, callback);

						handler('down');
						$timeout.flush();
						expect(callback).toHaveBeenCalledWith('test');
					});
				});

				it('will not execute the callback imedeately', function() {
					inject(function(WaypointService) {
						var callback = jasmine.createSpy('callback');
						var handler = WaypointService.getHandlerSync({ down : 'test' }, callback);

						handler('down');
						expect(callback).not.toHaveBeenCalled();
					});
				});
			});
		});
	});
}());
