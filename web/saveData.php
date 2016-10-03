<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Saving Data</title>
    <link rel="stylesheet" href="setup/styles.css" type="text/css">
  </head>
  <body>
    <div id="mainwrapper">
      <div id="main">
        <form id="currentform" onsubmit="return false;">
          <input type="hidden" name="userCode" value="BLZ30">
          <input type="hidden" name="userFileName" value="30">
          <input type="hidden" name="experimentName" value="Hank Development">
          <input type="hidden" name="sourceurl" value="http%3A%2F%2Flocalhost%3A8888%2FphonSemExperigen%2Fweb%2F">
          <div style="text-align: left;">
            <p style="text-align: center">
              Great Job!<br><br>
              <img src="http://images.clipartpanda.com/happy-face-clipart-excited-smiley-face-clip-art-i11.jpg"/>
            </p>
          </div>
        </form>
      </div>
    </div>
    <div id="footer">
      <div id="progressbar">
        <div id="progress_bar_empty" style="width: 0px;">
          <img scr="_lib/js/spacer.gif" width="1" height="1" alt="" border="0">
        </div>
        <div id="progress_bar_full" style="width: 6px;">
          <img scr="_lib/js/spacer.gif" width="1" height="1" alt="" border="0">
        </div>
        <div id="progress_text">1/1</div>
      </div>
        linguists at UNC-CH<br>
        Please send any questions to morph_experiment@unc.edu
      </div>
      <div id="localStorageAccess" style="position:absolute; bottom: 0px; left: 0px; cursor:pointer;" onclick="$('#localStorageInterface').toggle()">O</div>
      <div id="localStorageInterface" style="display:none; background: white; margin: 30px auto; padding: 30px; width: 500px; position:relative;">
        <input type="button" style="margin: 30px;" value="I am on a laptop, send the data on this computer to the server" onclick="Experigen.synchLocalData()"><br>
        <input type="button" style="margin: 30px;" value="I am on an iDevice, email me the data" onclick="Experigen.emailLocalData()" disabled="true"><br>
        <input type="button" style="margin: 30px;" value="erase the data on this computer" onclick="if(confirm('Are you sure? No undo!')) Experigen.eraseLocalData();">
        <div style="position:absolute; top:0px;right:2px;cursor:pointer;" onclick="$('#localStorageInterface').toggle()">X</div>
      </div>
      <div id="sm2-container" class="movieContainer sm2_debug" style="z-index: 10000; position: absolute; width: 6px; height: 6px; top: -9999px; left: -9999px;">
        <embed name="sm2movie" id="sm2movie" src="_lib/soundman/swf/soundmanager2_debug.swf" quality="high" allowscriptaccess="always" bgcolor="#ffffff" pluginspage="www.macromedia.com/go/getflashplayer" title="JS/Flash audio component (SoundManager 2)" type="application/x-shockwave-flash" haspriority="true">
      </div>
    <br><br>
    <?php
      date_default_timezone_set('America/New_York');
      $data = $_POST['data'];
      $data = explode(',', $data);

      $file = fopen("data/".date("m-d-Y_h.i.sa").".csv", "a+");
      $headers_data = explode('&', $data[0]);
      // print_r($headers_data);
      $headers = [];
      for ($i = 0; $i < count($headers_data); $i++) {
        $header = explode('=', $headers_data[$i]);
        $headers[] = $header[0];
      }

      for ($i = 0; $i < count($headers); $i++) {
        fwrite($file, ",{$headers[$i]}");
      }

      for ($i = 0; $i < count($data); $i++) {
        fwrite($file, "\n{$i}");
        $row = explode('&', $data[$i]);
        for ($j = 0; $j < count($row); $j++) {
          $cell = explode('=', $row[$j]);
          fwrite($file, ",{$cell[1]}");
        }
        // fwrite($file, $data[$i]);
        fwrite($file, "\n");
      }
      fclose($file);
    ?>
  <script>

  </script>
  </body>
</html>