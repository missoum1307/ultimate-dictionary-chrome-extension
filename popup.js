let changeColor = document.getElementById('changeColor');
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      function: setTheColor
    });
  });
};

function setTheColor() {
  document.body.style.backgroundColor = "' + color + '";
}