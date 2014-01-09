#SwiftClick

SwiftClick is a library created to eliminate the 300ms click event delay on touch devices that support orientation change.

It was designed for basic element types that are typically used in modern interactive development and so obscure bugs found in older browsers for elements such as form, select, and textarea are not a big concern at this time, so workarounds for these should be implemented separately from SwiftClick, if necessary.

###Teeny-tiny
374 bytes minified & gzipped :-)

###Usage

####Include SwiftClick in your application
    <script type="application/javascript" src="path/to/swiftclick.min.js"></script>

Remember to add a shim for addEventListener if you want to support IE8 and below.

####Approach 1
Attach SwiftClick to any element you want to use as a context for tracking click events.
document.body is easiest if you only need a single instance of SwiftClick:

    SwiftClick.attach (document.body);
    
####Approach 2

Create a reference to a new instance of SwiftClick using the 'attach' helper method and attach it to a context element.
This approach allows you to create multiple instances of SwiftClick on, for example, specific container elements such as navigation, and also exposes the public API:

    var swiftclick = SwiftClick.attach (someElement);

####Approach 3

This approach is the same as approach 2, but just uses the 'new' keyword instead of SwiftClick's 'attach' method.

	var swiftclick = new SwiftClick (someElement);
		
####Default Elements
Once attached, by default SwiftClick will track events originating from the following element types:

- a
- div
- span
- button


####Adding non-default element types
If necessary you can make SwiftClick track events originating from additional element types by adding an array of node names. This requires a reference to an instance of SwiftClick:

    var swiftclick = new SwiftClick (someElement);
    
    swiftclick.addNodeNamesToTrack (["p", "h1", "nav"]);

####Replacing all stored element types

		var swiftclick = new SwiftClick (someElement);

		swiftclick.replaceNodeNamesToTrack (["a", "button"]);

Doing this will remove all default node names, as well as any that have been added, and replace them with the node names within the array that is passed in, resulting in only the new node names being tracked.

####Automatically disabled when not needed
SwiftClick only intercepts events for touch devices that support orientation change, otherwise it just sits there looking pretty.


###Credits
SwiftClick was developed by [Ivan Hayes](https://github.com/munkychop) and is heavily based on [FastClick](https://github.com/ftlabs/fastclick) (developed by [FT Labs](https://github.com/ftlabs/fastclick)).