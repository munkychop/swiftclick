#SwiftClick

SwiftClick is a library created to eliminate the 300ms click event delay on touch devices that support orientation change.

It was designed for basic element types that are typically used in modern interactive development and so obscure bugs found in older browsers for elements such as form, select, and textarea are not a big concern at this time, so workarounds for these should be implemented separately from SwiftClick, if necessary.

###Teeny-tiny
417 bytes minified & gzipped :-)

###Usage

Firstly, grab either the [minified](https://raw2.github.com/tmwagency/swiftclick/master/js/dist/swiftclick.min.js), or [non-minified](https://raw2.github.com/tmwagency/swiftclick/master/js/libs/swiftclick.js) source from Github, or install via Bower using the following command in your command prompt:

	bower install swiftclick

####Include SwiftClick in your application
	<script type="application/javascript" src="path/to/swiftclick.min.js"></script>


####Setup SwiftClick

Setting up SwiftClick is a very easy process, requiring instances to be attached to a context element. Click events from all elements within the context element are automatically captured and converted to touch events when necessary.

Start by creating a reference to a new instance of SwiftClick using the 'attach' helper method and attach it to a context element. Attaching to document.body is easiest if you only need a single instance of SwiftClick:

	var swiftclick = SwiftClick.attach (document.body);

If necessary, multiple instances of SwiftClick can be created for specific context elements which, although not really necessary in most cases, can sometimes be useful for optimising applications with a large amount of HTML:

	var navigationSwiftClick = SwiftClick.attach (someNavElement);
	var uiSwiftClick = SwiftClick.attach (someOtherElement);

####Default Elements
Once attached, by default SwiftClick will track events originating from the following element types:

- `<a>`
- `<div>`
- `<span>`
- `<button>`


####Adding non-default element types
If necessary you can make SwiftClick track events originating from additional element types by adding an array of node names. This requires a reference to an instance of SwiftClick:

	var swiftclick = SwiftClick.attach (someElement);
	swiftclick.addNodeNamesToTrack (["p", "h1", "nav"]);

####Replacing all stored node names to track

	var swiftclick = SwiftClick.attach (someElement);
	swiftclick.replaceNodeNamesToTrack (["a", "div"]);

Doing this will remove all default node names, as well as any that have been added, and replace them with the node names within the array that is passed in, resulting in only the new node names being tracked.


####Automatically disabled when not needed
SwiftClick only intercepts events for touch devices that support orientation change, otherwise it just sits there looking pretty.


###Credits
SwiftClick was developed by [Ivan Hayes](https://github.com/munkychop) and is heavily based on [FastClick](https://github.com/ftlabs/fastclick) (developed by [FT Labs](https://github.com/ftlabs/fastclick)).