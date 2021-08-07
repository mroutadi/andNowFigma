$(function () {
  // Getting Content row that contain every thing we need for text
  var contentRow = Array.from(
    document.querySelectorAll('*[class^="raw_components--panel--"]')
  ).filter((el) =>
    el.querySelector('*[class^="inspect_panels--contentProperty--"]')
  )[0];
  //This copy panel that make copy button visible when hover on it
  var copyPanel = contentRow.querySelector(
    '*[class^="inspect_panels--panelCopyActionControls--"]'
  );
  //This is existing copy button
  var copyButton = copyPanel.querySelector(
    '*[class^="inspect_panels--copyButton--"]'
  );
  //Creating new copy element
  var copyReverseElement = document.createElement("div");
  //innerHtml
  copyReverseElement.innerHTML = "CopyReverse";
  //classes (like existing copy button)
  copyReverseElement.classList.add(copyButton.classList[0]);
  copyReverseElement.classList.add(copyButton.classList[1]);
  //copy reverse event listener
  copyReverseElement.addEventListener("click", (e) => {
    console.log("=========>   ", e.target);
  });
  //appending eleemnt to list
  copyPanel.insertBefore(copyReverseElement, copyPanel.firstChild);
});
