function init () {
  const swiftclick = SwiftClick.attach(document.body);
  swiftclick.useCssParser(true);

  // add regular click listeners to all elements with a class of 'test-element'.
  const testElements = Array.prototype.slice.call(document.querySelectorAll('.test-element'))
  testElements.forEach(element => element.addEventListener('click', elementClicked, false));

  // click handler which simply toggles a CSS class on a clicked element.
  function elementClicked (event) {
    event.preventDefault();

    console.log('App:: [elementClicked]');

    const clickedElement = event.target;

    clickedElement.classList.toggle('bg-colour-change');
  }
}

document.addEventListener('DOMContentLoaded', init);
