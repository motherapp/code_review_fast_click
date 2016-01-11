var aLinks = [];

function openLinks() {
  for (var i=0; i<aLinks.length; i++) {
    var newURL = aLinks[i];
    chrome.tabs.create({url: newURL});
  }
}

function hiddenOpenButton(hidden) {
  var display = 'block';
  if (hidden) {
    display = 'none';
  }
  document.getElementById('openLinks').style.display = display;
}

chrome.extension.onRequest.addListener(function(links) {
  aLinks = links;
  document.getElementById('content').innerHTML = '<span class="code_content">There are <span class="code_no">' + aLinks.length + '</span> unreviewed code</span>';
  hiddenOpenButton(aLinks.length === 0);
});

window.onload = function() {
  document.getElementById('openLinks').onclick = openLinks;
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query({active: true, windowId: currentWindow.id},
                      function(activeTabs) {
      chrome.tabs.executeScript(
        activeTabs[0].id, {file: 'get_links.js', allFrames: true});
    });
  });
};
