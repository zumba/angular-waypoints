[![Build Status](https://travis-ci.org/zumba/angular-waypoints.svg?branch=master)](https://travis-ci.org/zumba/angular-waypoints)

**Angular Waypoints** is an AngularJS module for working with [Waypoints](http://imakewebthings.com/waypoints/) (formerly [jQuery Waypoints](https://github.com/imakewebthings/jquery-waypoints)).

## Dependencies
* [AngularJS](https://angularjs.org/)
* [Waypoints](http://imakewebthings.com/waypoints/)

## Non-Angular Waypoints Example

> Waypoints is the easiest way to trigger a function when you scroll to an element.

```js
// example from http://imakewebthings.com/waypoints/

var waypoint = new Waypoint({
  element: document.getElementById('waypoint'),
  handler: function(direction) {
    console.log('Scrolled to waypoint!');
  }
});
```

The above example from the waypoints homepage works well for most situations.  However, if you were to put the above code inside an AngularJS directive, you end up with a couple of drawbacks:

* The waypoints implementation is hidden from the HTML.  All you know is that a directive is doing *something*, but you do not know the contents of the callback function.
* If you modify a scope property in your callback, you'll need to manually call `$scope.$digest` to let angular process this new information.

## Angular Waypoints Example
With Angular Waypoints, your template becomes declarative.  For example, you could toggle between two CSS classes (`sticky` and `notSticky`) by attatching a waypoint and using `ngClass` to listen to the waypoint flags:

```html
<div zum-waypoint="waypoints"
    down="flags.on"
    up="flags.off"></div>
<div ng-class="{
    sticky : waypoints.flags.on,
    notSticky : waypoints.flags.off
}"></div>
```

Angular Waypoints works by taking the control of the waypoints callback away from the developer.  When a waypoint is triggered by scrolling the page, the directive executes an internal callback that toggles a boolean flag based on the direction of the scroll.  These flags can be used by other directives (like `ngClass` or `ngIf`) to modify application state.

## Installation
Install Angular Waypoints via [bower](http://bower.io/):

```bash
$ bower install angular-waypoints
```

Angular Waypoints comes with several packaged versions:

* `dist/angular-waypoints.js` **Development** &mdash; AMD compatable, commented.
* `dist/angular-waypoints.min.js` **Production** &mdash; Minified, stripped of comments.
* `dist/angular-waypoints.all.js` **Standalone** &mdash; Same as the Development version, but includes unminified version of Waypoints.
* `dist/angular-waypoints.all.min.js` **Standalone Compressed** &mdash; Same as the Standalone version, but minified.
* `dist/angular-waypoints.raw.js` **Raw** &mdash; This is a simple version that isn't very useful by itsself.  There is no `zumba.angular-waypoints` module.  The directive, controller, and service functions are all exposed to the global scope.  Use this if you want to package our code into another library, register individual components yourself, or do something custom.

### Register the module as a dependency:

```js
angular.module('YourModule', ['zumba.angular-waypoints']);
```

Attach the `zum-waypoint` directive to each element for which you want to trigger a waypoint flag.  Each waypoint can be configured to use one flag for scrolling up, one flag for scrolling down, and an offset value if needed.  See the [Waypoints Documentation](http://imakewebthings.com/waypoints/api/offset-option/) for an explanation of offset.

`up`, `down`, and `offset` are HTML attributes that are bound to the isolated scope of the directive.  Here is a full example of a template:

```html
<div zum-waypoint="waypoints"
    down="name.down"
    up="name.up"
    offset="20%"></div>
```
#### Breakdown of the above example

1. The `waypoints` property of the parent scope will be used to hold the flags triggered by the directive.  This is indicated by the expression passed to the bltWaypoint directive.  It will be initialized to an empty javascript object `{}`.
2. When the element is 20% away from the top of the viewport while scrolling down, `waypoints.name.down` will be set to `true`, and `waypoints.name.up` will be set to `false`.
3. If the direction was scrolling up, `waypoints.name.down` will be set to `false`, and `waypoints.name.up` will be set to `true`.

## Namespaced Flags

Notice that the examples have included a "namespace" for the flags (in the first exmaple `flags.up` has the `flags` namespace).  This allows you to use several groups of waypoints on the same view. When toggling a waypoint flag to `true`, all other flags that share the same namespace will be toggled to `false`.  Flags that exist in another namespace are left unchanged.

If you do not use a namespace, the directive will store the flags inside a namespace called `globals`:

```html
<div zum-waypoint="waypoints"
    down="someFlag"
    up="anotherFlag"></div>
```

The above flags would be accessed via `waypoints.globals.someFlag` and `waypoints.globals.anotherFlag`
