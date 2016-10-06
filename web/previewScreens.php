<?php
if (isset($_POST['screens'])) {
  date_default_timezone_set('America/New_York');
  $file = fopen("screenPreviews/".date("m-d-Y_h.i.sa").".csv", "a+");

  $screens = explode('/scr/', $_POST['screens']);
  for ($i = 0; $i < count($screens); $i++) {
    $screen = explode(',', $screens[$i]);
    for ($j = 0; $j < count($screen); $j++) {
      fwrite($file, "{$screen[$j]},");
    }
    fwrite($file, "\n");
  }
  fclose($file);
} ?>
