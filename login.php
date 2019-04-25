<?php
if (!isset($_SESSION))
  {
    session_start();
  }
  ?>
<?php
   $_SESSION['connected'] = true;
?>
