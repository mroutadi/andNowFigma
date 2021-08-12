//English corrector
corrector = (text) => {
  var english = /^[A-Za-z0-9۰۱۲۳۴۵۶۷۸۹]*$/; //Regexp
  var words = text.split(" ");
  var reversed = [];
  words.forEach((word) => {
    if (english.test(word)) {
      reversed.push(word.split("").reverse().join(""));
    } else reversed.push(word);
  });
  return reversed.join(" ");
};
//Reverser
reverser = (text) => {
  return corrector(text.split("").reverse().join(""));
};
forceReverser = (text) => {
  return text.split("").reverse().join("");
};

//Copy to clipboard
async function copyToClipboard(txt) {
  return navigator.clipboard.writeText(txt);
}

//Init extension
function init() {
  // Getting Content row that contain every thing we need for text
  var contentRow = Array.from(
    document.querySelectorAll('*[class^="raw_components--panel--"]')
  ).filter((el) =>
    el.querySelector('*[class^="inspect_panels--contentProperty--"]')
  )[0];

  //Initial copy reverse button
  if (contentRow) {
    //Get text
    var contentText = contentRow.querySelector(
      '*[class^="inspect_panels--contentProperty--"]'
    );

    //This is original text in Figma
    const originalText = contentText.innerText;

    //This is reversed
    const reversedText = reverser(contentText.innerText);

    //This copy panel that make copy button visible when hover on it
    var copyPanel = contentRow.querySelector(
      '*[class^="inspect_panels--panelCopyActionControls--"]'
    );

    //Remove previous copy button
    var previousCopyButton = Array.from(
      copyPanel.querySelectorAll('*[class^="inspect_panels--copyButton--"]')
    ).filter((el) => el.innerText === "CopyReverse");
    if (previousCopyButton) {
      for (let index = 0; index < previousCopyButton.length; index++) {
        const element = previousCopyButton[index];
        element.remove();
      }
    }

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

    //Init Bell container
    // cause we have no bell container, we should make a fake copy and then work with bell
    navigator.clipboard.readText().then((clipText) => {
      var initBellText = clipText;
      copyButton.click();
      navigator.clipboard.writeText(initBellText).then(
        () => {
          var bellMessage = document.querySelector(
            'div[class^="visual_bell--messageContainer--"]'
          );
          if (bellMessage) {
            bellMessage.style.display = "none";
            window.setTimeout(() => (bellMessage.style.display = "flex"), 3000);
          }
        },
        () => {}
      );
    });

    //copy reverse event listener
    copyButton.addEventListener("click", () => {
      var bellMessage = document.querySelector(
        'span[class^="visual_bell--message--"]'
      );
      if (bellMessage) {
        bellMessage.innerHTML = "Copied to clipboard";
      }
    });
    copyReverseElement.addEventListener("click", () => {
      //This Bell after copy
      var bellMessage = document.querySelector(
        'span[class^="visual_bell--message--"]'
      );

      copyButton.click();
      copyToClipboard(reversedText).then(
        () => {
          bellMessage.innerHTML = "reverse Copied to clipboard";
        },
        () => {
          bellMessage.innerHTML = "problem in Copy";
        }
      );
    });

    //copy reverse hover event listener
    copyReverseElement.addEventListener("mouseover", () => {
      contentText.innerText = reversedText;
    });

    copyReverseElement.addEventListener("mouseout", () => {
      contentText.innerText = originalText;
    });

    //appending element to list
    copyPanel.insertBefore(copyReverseElement, copyPanel.firstChild);
  }
}

//Eventlistener to call our methode on click
var initCheckerInterval = setInterval(() => {
  if (document.getElementsByTagName("canvas")[0]) {
    document.getElementsByTagName("canvas")[0].addEventListener("click", () =>
      setTimeout(() => {
        init();
      }, 10)
    );
    removerInterval();
  } else {
    return;
  }
}, 500);

//remove initial interval
var removerInterval = () => {
  window.clearInterval(initCheckerInterval);
};
