chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#FFFF00'}, function() {
    console.log("The color is yellow.");
  });
});

const networkFilters = {
  urls: [
      "*://bughunt1307.herokuapp.com/*"
  ]
};


chrome.webRequest.onHeadersReceived.addListener((details) => {
  details.responseHeaders.push({name:'xx', value:'xx'})
  console.log('xxxs',details);
}, networkFilters, ['blocking','responseHeaders']) ;

