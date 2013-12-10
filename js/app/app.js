(function ()
{
	SwiftClick.attach (document.body);

	// add regular click listeners to all elements with a class of 'test-element'.
	var testElements = document.getElementsByClassName("test-element"),
		i = 0,
		length = testElements.length;
	
	for (i; i < length; i++)
	{
		testElements[i].addEventListener ("click", elementClicked, false);
	}


	// regular click handler which simply toggles a CSS class on clicked elements.
	function elementClicked (event)
	{
		var currentElement = event.target,
			className = currentElement.className;

		if (className.indexOf ("bg-colour-change") !== -1)
		{
			className = className.replace ("bg-colour-change", "");
		}
		else
		{
			className = className + " bg-colour-change";
		}

		currentElement.className = className;
	}

})();