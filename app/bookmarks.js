var user_bookmarks = new Bookmarks();

function Bookmarks(){
  this.bookmarks = [];
}

Bookmarks.prototype.init = function(){
  this.bookmarks = Bookmarks.prototype.list.call();
}

Bookmarks.prototype.add = function(type,id){
  $.ajax({
    type: "POST",
    url: "api.php",
    crossDomain: true,
    data: 'bookmarks=&action=add&type='+type+'&id='+id,
    success: function(data){
      if(data.success){
        $(".alert").append('<div class="alert alert-success alert-dismissible fade show" role="alert">Et hop ! C’est ajouté dans vos favoris !<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
      }
      else {
        $(".alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Une erreur est survenue... <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
      }
    },
    error: function(err) {
      console.log("Erreur communication avec l’API")
    }
  });
  this.bookmarks = Bookmarks.prototype.list.call(this);
};

Bookmarks.prototype.delete = function(id){
  $.ajax({
    type: "POST",
    url: "api.php",
    crossDomain: true,
    data: 'bookmarks=&action=delete&id='+id,
    success: function(data){
      if(data.success){
        $(".alert").append('<div class="alert alert-success alert-dismissible fade show" role="alert">Le favori a bien été supprimé !<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
      }
      else {
        $(".alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Une erreur est survenue... <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
      }
    },
    error: function(err) {
      console.log("Erreur communication avec l’API")
    }
  });
  this.bookmarks = Bookmarks.prototype.list.call(this);
};

Bookmarks.prototype.list = function(){
  var data = [];

  $.ajax({
    type: "POST",
    url: "api.php",
    crossDomain: true,
    data: 'bookmarks=&action=see',
    success: function(data) {
    },
    error: function(err) {
      console.log("Erreur communication avec l’API")
    }
  });
  return data;
};

Bookmarks.prototype.createStructure = function(){
  //this.bookmarks.length()/3;
  $("#bg_bookmarks").append('<div class="row">');
  // //this.bookmarks[0].name;
  $("#bg_bookmarks").append('<div class="col-sm-4"><div class="card"><div class="card-body">'+
  '<h5 class="card-title">Special title treatment</h5><p class="card-text">'+
  'With supporting text below as a natural lead-in to additional content.</p></div></div></div>');
  $("#bg_bookmarks").append('<div class="col-sm-4"><div class="card"><div class="card-body">'+
  '<h5 class="card-title">Special title treatment</h5><p class="card-text">'+
  'With supporting text below as a natural lead-in to additional content.</p></div></div></div>');
  $("#bg_bookmarks").append('<div class="col-sm-4 mt-5"><i class="fas fa-7x text-warning fa-plus-circle"></i></div>');
  $("#bg_bookmarks").append('</div>');

};
