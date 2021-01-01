// rendering 
var d1o3 = document.createElement('div')
d1o3.id = 'DefinitioRender'
d1o3.style.display = 'none'
document.body.appendChild(d1o3)

//Keeping this here for future use, in case we decide to expand the others dictionaries 
//and cross origin requests are blocked
/* 
var RemoveCSPAndAddOrigin = function(details) {
    for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
            details.responseHeaders[i].value = ''
        }
    }	
    details.responseHeaders.push({name:'Access-Control-Allow-Origin', value:'*'})
    return {
        responseHeaders: details.responseHeaders
    }
}
var networkFilters = {
  urls: ["<all_urls>"]
}
var extraInfo = ['blocking', 'responseHeaders']

chrome.webRequest.onHeadersReceived.addListener(RemoveCSPAndAddOrigin, networkFilters, extraInfo)
*/

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => { 
	// Get the word definition and pronunciation from oxfordlearnersdictionaries.com
	// and translation from reverso.net

  	(async function fetchDefinition() {
  		var res = await fetch('https://www.oxfordlearnersdictionaries.com/search/english/?q=' + request.message)
  		document.getElementById("DefinitioRender").innerHTML = await res.text()

  		if(document.getElementsByClassName('def').length > 0) {

  			var DefinitionString = document.getElementsByClassName('def')[0].innerText
  			var pronunciationLink = document.body.getElementsByClassName('sound')[1].dataset.srcMp3

  			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: [DefinitionString, pronunciationLink] }, function(response) {
    		 //console.log(response.message)
  			})
			})  			
  		} else { 
  			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {message: '' }, function(response) {
    		// console.log(response.message)
  				})
			})
  		}

	})()



	

})

// fix the 's ending words ex:  browser's wont return no result