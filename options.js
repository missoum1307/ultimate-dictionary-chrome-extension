
function save_options() {
  var language = document.getElementById('language').value;

  chrome.storage.sync.set({
    language: language,
  }, function() {

    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
  console.log('saved')
}


function restore_options() {
  chrome.storage.sync.get([
    'language'
    ], function(items) {
    document.getElementById('language').value = items.language;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);