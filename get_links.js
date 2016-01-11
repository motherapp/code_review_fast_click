var aLink =[];
var tempDOM = [].slice.apply(document.getElementsByTagName('tr'));
for (var i=0; i<tempDOM.length; i++) {
  if (tempDOM[i].style.color === '') {
    var aDOM = tempDOM[i].getElementsByTagName('a');
    for (var j=0; j<aDOM.length; j++) {
      var url = aDOM[j].href;
      if (url !== 'null' && url !== null && url !== undefined) {
        var isChangeset = url.indexOf('changeset') > 0;
        if (isChangeset) {
          aLink.push(url);
        }
      }
    }
  }
}
chrome.extension.sendRequest(aLink);