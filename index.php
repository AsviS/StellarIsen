<?php
if (!isset($_SESSION))
  {
    session_start();
  }
  ?>
<html>

<head>

  <link rel="stylesheet" href="assets/vendor/bootflat/css/bootstrap.min.css">
  <script src="assets/vendor/Tween.min.js"></script>
  <link rel="stylesheet" href="assets/vendor/bootflat/css/bootflat.css">
  <link rel="stylesheet" href="assets/css/template.css">
  <link rel="stylesheet" href="assets/vendor/fontawesome.css">
  <link rel="icon" href="assets/images/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  <meta charset="utf-8" />
</head>

<body>

 <div id="logo">
   <img src="assets/images/logo.png"/>
 </div>


<div id="btn_searchbar" class="bg-secondary text-white"><i onclick="displaySearch()" class="fas fa-caret-down"></i></div>
<div id="box"></div>
<div id="wrapper"></div>
<div id="UIButtons">

 <?php
 if(isset($_POST['username']) && isset($_POST['password'])){
   $_SESSION['connected'] = true;
 }

 if(isset($_SESSION['connected']) && $_SESSION['connected'] == true)
 {
   ?>
   <div class="row hide_mobile">
     <div class="col-4 offset-md-8"><i onclick="displayConstellations()" class="text-primary fa-3x fas fa-project-diagram"></i></div>
   </div>
   <div class="row mt-3 hide_mobile">

     <div class="col-4"><i  onclick="displayBookmarks()" class="text-success fas fa-3x fa-random"></i></div>
     <div class="col-4"><a href="#" onclick="displayBookmarks()"> <i class="fas text-danger fa-3x fa-bookmark"></i></a></div>
     <div class="col-4"><i class="fas text-warning fa-3x fa-user-astronaut"></i></div>
   </div>


   <div class="row show_mobile" style="display:none;">
     <div class="col-3"><i onclick="displayConstellations()" class="text-primary fa-3x fas fa-project-diagram"></i></div>
     <div class="col-3"><i  onclick="displayBookmarks()" class="text-success fas fa-3x fa-random"></i></div>
     <div class="col-3"><a href="#" onclick="displayBookmarks()"> <i class="fas text-danger fa-3x fa-bookmark"></i></a></div>
     <div class="col-3"><i class="fas text-warning fa-3x fa-user-astronaut"></i></div>
   </div>
   <?php
 }
 else{
   ?>
   <div class="row">
     <div class="col-4"><a href="#" onclick="displayLogin()"><i class="text-primary fa-3x fas fa-power-off"></i></a></div>
   </div>

   <?php


 }
 ?>
   </div>

   <script type="text/javascript">
   var logged="<?php echo $_SESSION['connected']; ?>";
   </script>



  <!-- Bootstrap -->
  <script src="assets/vendor/jquery-1.11.0.min.js"></script>
  <script src="assets/vendor/bootstrap.min.js"></script>

  <!-- Bootflat's JS files.-->
  <script src="assets/vendor/bootflat/js/icheck.min.js"></script>
  <script src="assets/vendor/bootflat/js/jquery.fs.selecter.min.js"></script>
  <script src="assets/vendor/bootflat/js/jquery.fs.stepper.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js" integrity="sha384-THVO/sM0mFD9h7dfSndI6TS0PgAGavwKvB5hAxRRvc0o9cPLohB0wb/PTA7LdUHs" crossorigin="anonymous"></script>

  <script src="assets/js/three.js"></script>
  <script src="app/celestial.js"></script>
  <script src="app/display.js"></script>
  <script src="app/bookmarks.js"></script>
  <script src="assets/js/controls/OrbitControls.js"></script>
  <script src="assets/js/THREEx.FullScreen.js"></script>
  <script src="app/stars.js"></script>
  <script src="app/main.js"></script>
  <script src="app/users.js"></script>



</body>

</html>
