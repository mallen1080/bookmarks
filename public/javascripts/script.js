function bindEvents () {
  var addBm = document.getElementById('add-bm');
  addBm.addEventListener('click', handleAddBookmark);

  var bmList = document.getElementById('bookmark-list');
    bmList.addEventListener('click', handleDelBookmark);
}

function getBookmarks () {
    ajax("GET", "api/bookmarks", setBookmarks, updateFlash.bind(this, "", "transparent"));
}

function setBookmarks (bookmarks) {
  var list = document.getElementById('bookmark-list');
  list.innerHTML = "";
  bookmarks.forEach(function (bm) {
    var bmListItem = document.createElement('li');
    var bmAnchor = document.createElement('a');
    bmAnchor.setAttribute('href', bm.url);
    bmAnchor.setAttribute('target', '_blank');
    bmAnchor.innerHTML = bm.name;
    bmListItem.appendChild(bmAnchor);
    var bmDel = document.createElement('button');
    bmDel.innerHTML = "Delete";
    bmDel.setAttribute('data-name', bm.name);
    bmDel.setAttribute('data-url', bm.url);
    bmListItem.appendChild(bmDel);
    list.appendChild(bmListItem);
  });
  clearInputs();
}

function clearInputs () {
  document.getElementById('name').value = "";
  document.getElementById('url').value = "";
}

function handleAddBookmark (e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var url = document.getElementById('url').value;
  if (name && url && valid(url)) {
    addBookmark(name, url);
  } else {
    updateFlash('please enter name and valid url', "red");
  }
}

function valid (url) {
  return url.slice(0,4) === "www.";
}

function addBookmark (name, url) {
  var validUrl = "http://" + url;
  var path = "api/bookmarks?name=" + name + "&url=" + validUrl;
  var message = "Bookmark successfully added";
  ajax("POST", path, setBookmarks, updateFlash.bind(this, message, "green"));
}

function handleDelBookmark (e) {
  if (e.target.tagName !== "BUTTON") { return; }
  var name = e.target.dataset.name;
  var url = e.target.dataset.url;
  var path = "api/bookmarks?name=" + name + "&url=" + url;
  var message = "Bookmark successfully deleted";
  ajax("DELETE", path, setBookmarks, updateFlash.bind(this, message, "green"));
}

function updateFlash (message, color) {
  var flash = document.getElementById('flash-message');
  flash.innerHTML = message;
  flash.style.backgroundColor = color;
}

function ajax (method, path, successCallback, completeCallback) {
  var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        if(xmlhttp.status == 200){
            successCallback(JSON.parse(xmlhttp.responseText));
        }
        completeCallback();
      }
    };

    xmlhttp.open(method, path, true);
    xmlhttp.send();
}

getBookmarks();
bindEvents();
