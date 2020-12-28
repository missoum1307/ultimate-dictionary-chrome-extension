let wordClicked = window.getSelection()

// insert the popup box of the definition  
var d1o1 = document.createElement('div')
var d1o2 = document.createElement('a')
d1o2.href = '#'
d1o2.id = 'closeDef'
d1o2.innerHTML = '&times;'
d1o1.textContent = 'bla blabla blabla blabla blabla blabla blabla blabla blabla bla'
d1o1.id = 'DefPopup'
d1o1.style.display = 'none'
document.body.appendChild(d1o1)
d1o1.insertAdjacentElement('afterbegin', d1o2)

// Get word definition and pronunciation from merriam-webster.com
// translation from translate.google.com
function getWordDef(word) {

}

// watching for the user doublelclicking on the word, shows the def in case there is one.  
window.addEventListener('dblclick', (e) => {

	var node = document.getElementById("DefPopup");
	var a = document.createAttribute("style");
	a.value = 'border-radius: 5px; background: #FFFF00; width: 15%; padding: 5px; position: absolute; top: ' + event.pageY + 'px; left: ' + event.pageX +'px;'
	node.setAttributeNode(a);
	d1o1.style.display = ''
	getWordDef(wordClicked.toString())
	
})

// hiding the popup box of the definition after reading it. 
window.addEventListener('click', (e) => {

	d = document.getElementById("DefPopup");
	d.style.display = 'none'
	
})

