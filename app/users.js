/**
 * Allows an user to connect using his own credentials.
 */
function login() {
  $(".alert").empty();

  $.ajax({
    type: "POST",
    url: "api.php",
    crossDomain: true,
    data: 'authentication=&username=' + $("#username").val() + '&password=' + $("#password").val(),
    success: function(data) {
      if (data.auth == true) {
        jQuery('#box').load('login.php', function() {
          document.location.reload(true);
        });
      } else {
        $(".alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Mot de passe ou utilisateur incorrect !<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
      }
    },
    error: function(err) {
      $(".alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Une erreur est survenue... <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
    }
  });
};



/**
 * Register a new user. Username have to be unique and passwords must match.
 */
function register() {
  $(".alert").empty();
  if ($("#password").val() == $("#password_confirmation").val()) {

    $.ajax({
      type: "POST",
      url: "api.php",
      crossDomain: true,
      data: 'register=&username=' + $("#username").val() + '&password=' + $("#password").val(),
      success: function(data) {
        if (data.registered) {
          $(".alert").append('<div class="alert alert-success alert-dismissible fade show" role="alert">Vous êtes paré, connectez-vous pour décoller !<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
        } else {
          $(".alert").append('<div class="alert alert-warning alert-dismissible fade show" role="alert">Oh oh, un utilisateur utilise déjà ce pseudo...<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')

        }
      },
      error: function(err) {
        $(".alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Une erreur est survenue... <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
      }
    });
  } else {
    $(".alert").append('<div class="alert alert-danger alert-dismissible fade show" role="alert">Les mots de passe ne correspondent pas… <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>')
  }
};


/**
 * Create a PDF from planet's informations
 */
function createPDF(){
    var lMargin=15; //left margin in mm
      var rMargin=15; //right margin in mm
      var pdfInMM=210;  // width of A4 in mm
  var title = $(" #informations .card-title")[0].innerText;
  var text = $(" #informations .card-text")[0].innerText;
  var doc = new jsPDF("p","mm","a4");
  doc.text(title, 10, 10)
  doc.setFontSize(10);
  //doc.text(text, 10, 20)
  var lines =doc.splitTextToSize(text, (pdfInMM-lMargin-rMargin));
  doc.text(lMargin,20,lines);
  doc.save(title+'.pdf')
}
