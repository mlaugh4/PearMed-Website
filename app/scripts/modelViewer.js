$(window).on("load", function () {
	if( !Cookies.get('authId') )
		window.location.href = 'login.html';

	var modelId = getUrlParameter("modelId");
	if(!modelId)
		window.location.href = 'index.html';

	// Add an html element for the model we are going to view
	$("a-scene").append(
		"<a-assets>" +
			"<a-asset-item id='modelObj' src='" + BoscSettings.apiRoot  + "organModels/" + modelId + "/obj?authId=" + BoscSettings.authId + "'></a-asset-item>" +
		"</a-assets>" +
		"<a-entity id='target' obj-model='obj: #modelObj;' position='-1 0 1' rotation='0 45 0' width='1' height='1' depth='1'  color='#4CC3D9'></a-entity>"
	);
});

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};
