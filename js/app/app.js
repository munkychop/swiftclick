(function () {
    'use strict';

    var swiftclick = window.SwiftClick.attach(document.body);
    swiftclick.useCssParser(true);

    // add regular click listeners to all elements with a class of 'test-element'.
    var testElements = document.getElementsByClassName('test-element'),
        i = 0,
        length = testElements.length;
    
    for (i; i < length; i++) {
        testElements[i].addEventListener ('click', elementClicked, false);
    }


    // regular click handler which simply toggles a CSS class on clicked elements.
    function elementClicked (event) {
        event.preventDefault();

        console.log('App:: [elementClicked]');

        var currentElement = event.target;

        currentElement.classList.toggle('bg-colour-change');
    }

})();