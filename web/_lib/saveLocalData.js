Experigen.saveLocalData = function () {
	var data = $.totalStorage(Experigen.settings.experimentName);
	console.log(data);

	var hiddenForm = '<form id="hiddenForm" action="saveData.php" method="post" target="_blank" style="display:none">';
	hiddenForm += '<input id="hiddenFormInput" type="text" name="data">';
	hiddenForm += '</form>';
	$('#footer').append(hiddenForm);
	document.getElementById('hiddenFormInput').value = data;
	$('#hiddenForm').submit();
};
