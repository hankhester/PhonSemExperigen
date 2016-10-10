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
              <img src="resources/smiley.jpg"/>
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
      include 'resources/pictures.php';
      date_default_timezone_set('America/New_York');
      $data = $_POST['data'];
      $data = explode('/data/', $data);
      $file = fopen("data/".date("m-d-Y_h.i.sa").".csv", "a+");
      $headers = ['userCode', 'userFileName', 'experimentName', 'sourceurl', 'response1', 'item', 'trialnumber', 'frame', 'view', 'syllNum', 'fricative', 'animate', 'long', 'deviceName', 'localTime', 'age', 'gender'];

      for ($i = 0; $i < count($headers); $i++) {
        fwrite($file, ",{$headers[$i]}");
      }
      fwrite($file, "\n");

      // for each row of data...
      for ($i = 0; $i < count($data); $i++) {
        // write the row number
        fwrite($file, "{$i}");
        // chop up the row into an array of "key=value" strings
        $row = explode('&', $data[$i]);
        $row_arr = [];
        // make a key => value array based on that
        for ($j = 0; $j < count($row); $j++) {
          $cell_arr = explode('=', $row[$j]);
          if (count($cell_arr) > 1) {
            $row_arr[$cell_arr[0]] = $cell_arr[1];
          }
        }

        // go through each header and if there's a matching key, write the value
        for ($j = 0; $j < count($headers); $j++) {
          fwrite($file, ",");
          foreach ($row_arr as $key => $val) {
            if ($key === $headers[$j]) {
              $val = processValue($val);
              if (in_array(11, $frames)) {
                print("yes");
              }
              if ($key === "frame" && array_key_exists(intval($val), $frames)) {
                $val = $frames[$val];
              }
              fwrite($file, $val);
            }
          }
        }
        fwrite($file, "\n");
      }
      fclose($file);

      function processValue($val) {
        switch ($val) {
          case "stimulusTest.ejs":
            return "ek";
            break;
          case "stimulusTest2.ejs":
            return "ro";
            break;
          default:
            return $val;
        }
      }

      function getMatchingValue($s) {
        $headers = ['userCode', 'userFileName', 'sourceurl', 'response1', 'item', 'trialnumber', 'frame', 'view', 'syllNum', 'fricative', 'animate', 'long', 'localTime'];
        $s_array = explode('=', $s);
        foreach ($headers as $h) {
          if ($s_array[0] == $h) {
            return $s_array[1];
          }
        }
      }
    ?>
  <script>

  </script>
  </body>
</html>
