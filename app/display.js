function displayLogin(visible = true) {
  boxes.login = true;
  boxes.searchbar = true;
  if (logged == "") {
    alterListeners();
    if (visible) {
      for (var key in planets) {
        CelestatialObject.prototype.toggleVisibily.call(planets[key], toggle = false, visible = false);
        planets[key].planet.visible = false;
      }
      $('#box').load('app/view/login.html', function() {
        controls.enabled = false;
      }).hide().fadeIn("slow");
    } else {

      $("#box").fadeOut();
      for (var key in planets) {
        CelestatialObject.prototype.toggleVisibily.call(planets[key], toggle = true, visible = true);
        planets[key].planet.visible = true;
      }
      controls.enabled = true;
    }
  }

}

function displayConstellations() {
  for (var elt in myriades) {
    myriades[elt].lines.forEach(function(obj) { // loop through array of objects
      if (obj.visible) obj.visible = false;
      else obj.visible = true;
    });

  };
}


function hideBox() {
  alterListeners(revoke = true);
  $("#box").fadeOut()
  $("#btn_searchbar").fadeIn(function() {});
  if (boxes.login || boxes.register) {
    for (var key in planets) {
      CelestatialObject.prototype.toggleVisibily.call(planets[key], toggle = true, visible = true);
      planets[key].planet.visible = true;
    }

  }
  controls.enabled = true;
  for (var key in boxes) {
    boxes[key] = false;
  }


}

function displayRegister() {
  for (var key in planets) {
    CelestatialObject.prototype.toggleVisibily.call(planets[key], toggle = false, visible = false);
    planets[key].planet.visible = false;
  }
  $('#box').load('app/view/register.html', function() {
    controls.enabled = false;
    document.removeEventListener('mousedown', onDocumentMouseDown, true);
  }).hide().fadeIn("slow");
}

function displayBookmarks() {
  alterListeners();
  $('#box').load('app/view/bookmarks.html', function() {
    controls.enabled = false;
    user_bookmarks.createStructure();
    document.removeEventListener('mousedown', onDocumentMouseDown, true);
  }).hide().fadeIn("slow");
}

function displaySearch() {
      boxes.searchbar = true;
  alterListeners();
  $("#btn_searchbar").fadeOut()
  $('#box').load('app/view/searchbar.html', function() {
    controls.enabled = false;
    document.removeEventListener('mousedown', onDocumentMouseDown, true);
  }).hide().fadeIn("slow");
}

function displayAddTags() {
  $('#add_tags').load('app/view/tags.html', function() {}).hide().fadeIn("slow");
}



function displayHome(){
  for (var key in planets) {
    CelestatialObject.prototype.toggleVisibily.call(planets[key], toggle = false, visible = false);
    planets[key].planet.visible = false;
  }
  displayConstellations();
  displaySearch();
}
