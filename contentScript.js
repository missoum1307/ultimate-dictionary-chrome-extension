// removing whitespaces from the selected word
var removeWhiteSpaces = function(a) {
	return a.replace(/^\s+|\s+$|/g, "")
}

// variable holding the value of the clicked/selected word      
let wordClicked = window.getSelection()

// inserting the pop up box (container) of the definition for later use of showing
// the definition in it.
var BoxTextElement = '<div id="selectedWord" style="display: none"><strong id="selWorStro"></strong>\
<audio id="playPronc" src=""></audio>\
<button id="playProncButton" style="border: rgb(255, 255, 0); background: rgb(255, 255, 0)">&#x1F50A;</button>\
<button id="CloseButton" style="border: rgb(255, 255, 0); background: rgb(255, 255, 0); position: absolute; top:0; right:0;">&times;</button>\
</div><div id="englishDefinition"></div><div id="foreignTranslation"></div>'
var d1o1 = document.createElement('div')
d1o1.id = 'DefinitionPopup'
document.body.append(d1o1)
document.getElementById('DefinitionPopup').innerHTML = BoxTextElement


async function fetchTransition(url, PostDataObject) {
  		var response = await fetch(url, {
    		method: 'POST',
    		headers: {
      			'Content-Type': 'application/json'
    		},
    	    body: JSON.stringify(PostDataObject) 
  		})
	return response.json()
}

let ArrayOfTranslations = []
let ArrayOfWordPosition = []

window.addEventListener('dblclick', (e) => {

	//oRange = wordClicked.getRangeAt(0)
	//oRect = oRange.getBoundingClientRect()
	//console.log(oRange)
	//console.log(wordClicked)

	var PostDataObject = {
	"input":removeWhiteSpaces(wordClicked.toString().toLowerCase()),
	"from":"eng",
	"to":"ara",
	"format":"text",
	"options":{
		"origin":"reversodesktop",
		"sentenceSplitter":false,
		"contextResults":true,
		"languageDetection":false
	}}
		
	if (typeof wordClicked.toString().toLowerCase() === 'string' && removeWhiteSpaces(wordClicked.toString().toLowerCase()) !== '') {

			chrome.runtime.sendMessage({message: removeWhiteSpaces(wordClicked.toString().toLowerCase())}, (response) => {
			})

			ArrayOfWordPosition.push(event.pageY, event.pageX)

			fetchTransition('https://api.reverso.net/translate/v1/translation', PostDataObject)
  			.then((data) => {

  		    	for (var i = 0; i < data.contextResults.results.length; i++) {
  		    		
  		   	 		ArrayOfTranslations.push(data.contextResults.results[i].translation)
  		   		}
  		   	})
	} 
})

// awaiting for the definition translation and pronunciation to come from 
// background.js and then show them to the user. 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 

	if (request.message != '') {
			document.getElementById('DefinitionPopup').setAttribute('style', 'top: ' + ArrayOfWordPosition[0] + 'px; left: ' + ArrayOfWordPosition[1] + 'px; border-radius: 5px; background: rgb(255, 255, 0); width: 15%; padding: 5px; position: absolute; z-index: 2147483647; overflow-wrap: break-word;')
			document.getElementById('playPronc').src = request.message[1]
			document.getElementById('selectedWord').childNodes[0].textContent = wordClicked + ' '
			document.getElementById('englishDefinition').textContent = request.message[0]
			document.getElementById('foreignTranslation').textContent = ArrayOfTranslations
			document.getElementById('selectedWord').style.display = ''
			document.getElementById('DefinitionPopup').style.display = ''

	}
	ArrayOfTranslations = []
})

// hiding the pop up box (container) of the definition after reading it. 
window.addEventListener('click', (e) => {
	if (e.target.id == 'playProncButton') {
		document.getElementById('playPronc').play()
	} else if (e.target.parentElement.id !== 'DefinitionPopup' && e.target.id !== 'playProncButton') {
		document.getElementById('DefinitionPopup').style.display = 'none'
		ArrayOfWordPosition = []
		ArrayOfTranslations = []
	} 
})




// fix the page reload when closing the def box.
// not firing on iframes