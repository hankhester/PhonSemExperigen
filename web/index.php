<?php if (!isset($_GET['designFile'])) {
    $conditions = [
      "Semantics - blocked" => "semantics_blocked_design.js",
      "Semantics - unblocked" => "semantics_unblocked_design.js",
      "Phonology - blocked" => "phonology_blocked_design.js",
      "Phonology - unblocked" => "phonology_unblocked_design.js",
    ]; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD html 4.0 Transitional//EN">
<html>
<head>
	<meta charset="utf-8">
	<link rel='stylesheet' href='setup/styles.css' type='text/css'>
	<script type="text/javascript" src="_lib/experigen1-2013-3-27.js"></script>
</head>
<body>
	<div id="mainwrapper">
		<p>
		  Wait for the researcher to advance past this screen.
		<p>
		<?php
    foreach ($conditions as $name => $design_file) { ?>
    	<button name=<?= $design_file ?>><?= $name ?></button>
	<?php } ?>
	</div>
<script>
	$('button').on('click', function() {
		window.location = "?" + "designFile=" + this.name;
	});
</script>
</body>
</html>
<?php } else {?>
<!doctype html>
<html>
<head>
	<title></title>
	<meta HTTP-EQUIV="Content-Type" content="text/html; charset=utf-8">
	<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<meta HTTP-EQUIV="Expires" CONTENT="-1">

	<link rel='stylesheet' href='setup/styles.css' type='text/css'>
	<script type="text/javascript" src="_lib/experigen1-2013-3-27.js"></script>
	<script type="text/javascript" src="setup/settings.js"></script>
	<script type="text/javascript" src="setup/<?= $_GET['designFile'] ?>"></script>
	<script type="text/javascript" src="_lib/experigen2-2013-3-27.js"></script>
</head>
<body></body>
</html>
<?php } ?>
