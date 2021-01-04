// rendering 
var d1o3 = document.createElement('div')
d1o3.id = 'DefinitioRender'
d1o3.style.display = 'none'
document.body.appendChild(d1o3)

//Keeping this here for future use, in case we decide to expand the others dictionaries 
//and cross origin requests are blocked
/* 
var RemoveCSPAndAddOrigin = function(details) {
    for (var i = 0;
     i < details.responseHeaders.length; i++) {
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
let lanTra = []

function translationLang() {
  chrome.storage.sync.get([
    'language'
    ], function(items) {
    lanTra.push(items.language)
  })
}

translationLang()


let ArrayOfTranslations = []

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => { 
  
  if (request.message.endsWith('\'s') || request.message.endsWith('’s'))  {
        request.message = request.message.slice(0, -2)
      }

	// Get the word definition and pronunciation from oxfordlearnersdictionaries.com
	// and translation from reverso.net
  	(async function fetchDefinition() {
      async function show(){
        let data = JSON.parse(oReq.response)
        console.log(data)
        if (data.contextResults.results.length == 0 || data.contextResults.results[0].translation == '') {
          ArrayOfTranslations.push(data.translation)
        } else {
          for (var i = 0; i < data.contextResults.results.length; i++) {
            ArrayOfTranslations.push(data.contextResults.results[i].translation)
          }
        }
 
        var res = await fetch('https://www.oxfordlearnersdictionaries.com/search/english/?q=' + request.message)
        document.getElementById("DefinitioRender").innerHTML = await res.text()
        if(document.getElementsByClassName('def').length > 0) {
          var DefinitionString = document.getElementsByClassName('def')[0].innerText
          var pronunciationLink = document.getElementsByClassName('sound')[1].dataset.srcMp3
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              console.log()
            chrome.tabs.sendMessage(tabs[0].id, {message: [DefinitionString, pronunciationLink, ArrayOfTranslations, request.message] }, function(response) {

            })
          })
        } else if (document.getElementsByClassName('xrefs').length > 0) {

          var DefinitionString = document.getElementsByClassName('xrefs')[0].innerText
          var pronunciationLink = document.getElementsByClassName('sound')[0].dataset.srcMp3
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

            chrome.tabs.sendMessage(tabs[0].id, {message: [DefinitionString, pronunciationLink, ArrayOfTranslations, request.message] }, function(response) {

            })
          })

        } else {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: ''})
          })
        }
      } 

      ArrayOfTranslations = []
  
    

      var oReq = new XMLHttpRequest()
      oReq.addEventListener("load", () => {
        show()
      })
      oReq.open("POST", "https://api.reverso.net/translate/v1/translation")
      oReq.setRequestHeader('Content-Type', 'application/json')

      oReq.send(JSON.stringify({
        "input":request.message,
        "from":"eng",
        "to":lanTra[0],
        "format":"text",
        "options":{
        "origin":"reversodesktop",    
        "sentenceSplitter":false,
        "contextResults":true, 
        "languageDetection":false
        }}))

    })()

})



// fixing the the following words def: works, you