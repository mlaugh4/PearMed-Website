$(window).on("load", function () {
	BoscSettings.ensureAuthId();

	var modelId = getUrlParameter("modelId");
	if(!modelId)
		window.location.href = 'index.html';

	// Add an html element for the model we are going to view
	$("a-scene").append(
		"<a-assets>" +
			"<a-asset-item id='modelObj' src='" + BoscSettings.apiRoot  + "organModels/" + modelId + "/obj?authId=" + BoscSettings.authId + "'></a-asset-item>" +
		"</a-assets>" +
		"<a-entity cursor-listener id='target' obj-model='obj: #modelObj;' position='0 0 0' rotation='0 45 0' scale='1 1 1'  color='#4CC3D9'>" +
			"<a-animation begin='click' easing='ease-in-out' attribute='scale' dur='500' to='2 2 2' direction='alternate'></a-animation>" +
		"</a-entity>"
	);

	// Add orbit controls to the camera
	// Needs to happen after the obj is added so the orbit controls know what to orbit around
	$("a-entity[camera]")
		.attr("target", "#target")
		.attr("distance", 1)
		.attr("orbit-controls", "");
});


// Expanding objects

// AFRAME.registerComponent('cursor-listener', {
//   init: function () {
//     this.el.addEventListener('click', function () {
//     	var sze = this.getAttribute('scale')
//     	console.log(sze)
//       if ( sze.x == 1 ) {
//       	console.log("go big")
//       	this.setAttribute('scale', '1.2 1.2 1.2');
//       } else {
//       	console.log('go small')
//       	this.setAttribute('scale', '1 1 1');
//       }
//     });
//   }
// });

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
