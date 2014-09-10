# SwiftClick

SwiftClick is a library created to eliminate the 300ms click event delay on touch devices that support orientation change and is designed to be super lightweight.


### Teeny-tiny
Only 957 bytes minified & gzipped :-)

## Usage

Firstly, grab either the [minified](https://raw2.github.com/tmwagency/swiftclick/master/js/dist/swiftclick.min.js), or [non-minified](https://raw2.github.com/tmwagency/swiftclick/master/js/libs/swiftclick.js) source from Github.

Alternatively, if you can use npm with the following command in your command prompt:

```sh
npm install swiftclick --save
```

Or you can install via Bower instead, if that's your thing:

```sh
bower install swiftclick
```

### Include SwiftClick in your application
```html
<script type="application/javascript" src="path/to/swiftclick.min.js"></script>
```

If using CommonJS then simply require SwiftClick as per usual:

```javascript
var SwiftClick = require("swiftclick");
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
swiftclick.addNodeNamesToTrack(["p", "h1", "nav"]);
```

### Replacing all stored node names to track

```js
var swiftclick = SwiftClick.attach(someElement);
swiftclick.replaceNodeNamesToTrack(["a", "div", "h1"]);
```

Doing this will remove all default node names, as well as any that have been added, and replace them with the node names within the array that is passed in, resulting in only the new node names being tracked.


### Automatically disabled when not needed
SwiftClick only intercepts events for touch devices that support orientation change, otherwise it just sits there looking pretty.

## About the Project
SwiftClick was developed and is currently maintained by [Ivan Hayes](https://twitter.com/munkychop).