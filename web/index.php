<?php if (isset($_GET['condition'])) {
	$condition = $_GET['condition'];
	if ($condition != 1 && $condition != 2 && $condition != 3 && $condition != 4 && $condition != 5 && $condition != 6 && $condition != 'Nov. 18th') {
		$condition = rand(1, 6);
	}
	switch ($condition) {
		case 1:
			// $design_file = "design";
			$design_file = "PhonVideoPilotA";
			break;
		case 2:
			// $design_file = "designPhon";
			$design_file = "PhonVideoPilotB";
			break;
		case 3:
			$design_file = "designSem";
			break;
		case 4:
			$design_file = "designSem2";
			break;
		case 5:
			$design_file = "designPhon2";
			break;
		case 6:
			$design_file = "designPhonSem2";
			break;
		case 'Nov. 18th':
			$design_file = '11_18_Design';
			break;
	}
	?>
<!DOCTYPE html PUBLIC "-//W3C//DTD html 4.0 Transitional//EN">
<html>
<head>
	<title></title>
	<meta HTTP-EQUIV="Content-Type" content="text/html; charset=utf-8">
	<meta HTTP-EQUIV="Pragma" CONTENT="no-cache">
	<meta HTTP-EQUIV="Expires" CONTENT="-1">

	<link rel='stylesheet' href='setup/styles.css' type='text/css'>
	<script type="text/javascript" src="_lib/experigen1-2013-3-27.js"></script>
	<script type="text/javascript" src="setup/settings.js"></script>
	<script type="text/javascript" src="setup/<?= $design_file ?>.js"></script>
	<script type="text/javascript" src="_lib/experigen2-2013-3-27.js"></script>

</head>
<body></body>
</html>
<?php } else {?>
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
		<input type="button" value="1">
		<input type="button" value="2">
		<input type="button" value="3">
		<input type="button" value="4">
		<input type="button" value="5">
		<input type="button" value="6">
		<input type="button" value="Nov. 18th">
		<br><br>
		<input type="button" value="random">
	</div>
<script>
	$('input').on('click', function() {
		if (this.value == 'Nov. 18th') {
			var condition = this.value;
		} else if (this.value != "random") {
			var condition = parseInt(this.value);
		} else {
			var condition = Math.ceil(Math.random() * 6);
		}
		window.location = "?" + "condition=" + condition;
	});
</script>
</body>
</html>
<?php } ?>
