function bindEvents () {
  var addBm = document.getElementById('add-bm');
  addBm.addEventListener('click', handleAddBookmark);

  var delBm = document.getElementsByClassName('delete-bm');
  for (var i = 0; i < delBm.length; i++) {
    delBm[i].addEventListener('click', handleDelBookmark);
  }
}

function getBookmarks () {
    ajax("GET", "api/bookmarks", setBookmarks);
}

function setBookmarks (bookmarks) {
  var list = document.getElementById('bookmark-list');
  list.innerHTML = "";
  bookmarks.forEach(function (bm) {
    var bmListItem = document.createElement('li');
    var text = document.createTextNode(bm.name);
    bmListItem.appendChild(text);
    list.appendChild(bmListItem);
  });
}

function handleAddBookmark (e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var url = document.getElementById('url').value;
  if (name && url && valid(url)) {
    addBookmark(name, url);
  } else {
    alert('please enter valid name and url');
  }
}

function valid (url) {
  return url.slice(0,11) === "http://www.";
}

function handleDelBookmark (e) {

}

function addBookmark (name, url) {
  var path = "api/bookmarks?name=" + name + "&url=" + url;
  ajax("POST", path, setBookmarks);
}

function ajax (method, path, callback) {
  var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        if(xmlhttp.status == 200){
            callback(JSON.parse(xmlhttp.responseText));
        }
      }
    };

    xmlhttp.open(method, path, true);
    xmlhttp.send();
}

getBookmarks();
bindEvents();
