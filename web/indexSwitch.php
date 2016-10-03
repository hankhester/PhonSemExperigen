<?php if (isset($_GET['condition'])) { ?>
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
	<script type="text/javascript" src="setup/design.js"></script>
	<script type="text/javascript" src="_lib/hanksExperigen.js"></script>
</head>
<body>
</body>
</html>
<?php } else { ?>
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
		<br><br>
		<input type="button" value="random">
	</div>
<script>
	$('input').on('click', function() {
		if (this.value != "random") {
			var condition = parseInt(this.value);
		} else {
			var condition = Math.ceil(Math.random() * 6);
		}
		window.location = "index" + condition + ".html";
	});
</script>
</body>
</html>
<?php } ?>

<!-- <script>
	$('input').on('click', function() {
		var value =
		if (this.value != "random") {
			heads = parseInt(this.value) - 1;
		} else {
			heads = Math.floor(Math.random() * 4);
		}
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "setup/hanksDesign.js";
		var script2 = document.createElement("script");
		script2.type = "text/javascript";
		script2.src = "_lib/hanksExperigen.js";
		document.getElementsByTagName("body")[0].innerHTML = '';
		document.getElementsByTagName("head")[0].appendChild(script);
		setTimeout(function(){
			document.getElementsByTagName("head")[0].appendChild(script2);
		}, 100);
		setTimeout(function(){
			// Experigen.launch();
		}, 600);
	});
</script> -->
