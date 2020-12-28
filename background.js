chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#FFFF00'}, function() {
    console.log("The color is yellow.");
  });
});


console.log("The color is sssss.");


var targetPage = "https://bughunt1307.herokuapp.com/";


function setHeaderResponse(e) {
  var setHeaderResponse = {
    name: "Please",
    value: "xxss"
  };

  console.log("The color isXSSS.");
  e.responseHeaders.push(setHeaderResponse);
  return {responseHeaders: e.responseHeaders};
}

console.log("The color is dddddd.");
chrome.webRequest.onBeforeRequest.addListener(
  setHeaderResponse,
  {urls: [targetPage]},
  ["extraHeaders"]
)

 

