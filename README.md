# SwiftClick

SwiftClick is a library created to eliminate the 300ms click event delay on touch devices that support orientation change and is designed to be super lightweight.


### Teeny-tiny
~1KB minified & gzipped :-)


## Usage

You can install SwiftClick using npm:

```sh
npm i swiftclick --save
```

You can install via Bower instead, if that's your thing:

```sh
bower install swiftclick
```

You can also use CDNJS: https://cdnjs.com/libraries/swiftclick

Otherwise, you can grab either the [minified](https://raw.githubusercontent.com/munkychop/swiftclick/master/dist/swiftclick.min.js), or [non-minified](https://raw.githubusercontent.com/munkychop/swiftclick/master/dist/swiftclick.js) source from Github.

### Include SwiftClick in your application

If using CommonJS then simply require SwiftClick as per usual:

```javascript
var SwiftClick = require('swiftclick');
```

Otherwise, use a script tag:

```html
<script type="application/javascript" src="path/to/swiftclick.min.js"></script>
```

### Setup SwiftClick

Setting up SwiftClick is a very easy process, which mirrors that of FastClick in that instances must be attached to a context element. Touch events from all elements within the context element are automatically captured and converted to click events when necessary, minus the delay.

Start by creating a reference to a new instance of SwiftClick using the 'attach' helper method and attach it to a context element. Attaching to document.body is easiest if you only need a single instance of SwiftClick:

```js
var swiftclick = SwiftClick.attach(document.body);
```

If necessary, multiple instances of SwiftClick can be created for specific context elements which, although not really necessary in most cases, can sometimes be useful for optimising applications with a large amount of HTML:

```js
var navigationSwiftClick = SwiftClick.attach(someNavElement);
var uiSwiftClick = SwiftClick.attach(someOtherElement);
```


### Default Elements
Once attached, by default SwiftClick will track events originating from the following element types:

- `<a>`
- `<div>`
- `<span>`
- `<button>`


### Adding non-default element types
If necessary you can make SwiftClick track events originating from additional element types by adding an array of node names. This requires a reference to an instance of SwiftClick:

```js
var swiftclick = SwiftClick.attach(someElement);
swiftclick.addNodeNamesToTrack(['p', 'h1', 'nav']);
```


### Replacing all stored node names to track

```js
var swiftclick = SwiftClick.attach(someElement);
swiftclick.replaceNodeNamesToTrack(['a', 'div', 'h1']);
```

Doing this will remove all default node names, as well as any that have been added, and replace them with the node names within the array that is passed in, resulting in only the new node names being tracked.


### Updating the maximum drift distance
It is possible to set the maximum pixel distance that a touchmove can travel before SwiftClick no longer considers it a click:

```js
var swiftclick = SwiftClick.attach(someElement);
swiftclick.setMaxTouchDrift(10);
```

The default value is 16 and the minimum value is 4. A value between 10 and 30 is recommended.


### Ignoring swift clicks on specific elements

The parsing of CSS class names is disabled by default to improve performance, so in order to use this feature, it must be explicity switched on:

```js
var swiftclick = SwiftClick.attach(document.body);
swiftclick.useCssParser(true);
```

Adding the `swiftclick-ignore` class to an element will disable swift clicks on the element and all off its children:

```html
<div class="swiftclick-ignore">
    This element and its children will not get swift clicks.
</div>
```


### Enabling swift clicks on specific elements within an ignored element

Turn on CSS class name parsing:

```js
var swiftclick = SwiftClick.attach(document.body);
swiftclick.useCssParser(true);
```

Within any element containing the `swiftclick-ignore` class, swift clicks can be enabled for specific child elements by adding the `swiftclick-force` class:

```html
<div class="swiftclick-ignore">
    <button>First</button>
    <button class="swiftclick-force">Second</button>
</div>
```

In this example, the first button will not get swift clicks, but the second button will.


### Automatically disabled when not needed
SwiftClick only intercepts events for touch devices that support orientation change, otherwise it just sits there looking pretty.

## About the Project
SwiftClick was developed and is currently maintained by [Ivan Hayes](https://twitter.com/munkychop).
