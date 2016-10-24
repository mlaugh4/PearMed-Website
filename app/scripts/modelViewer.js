$(window).on("load", function () {
	BoscSettings.ensureAuthId();

	var modelId = getUrlParameter("modelId");
	if(!modelId)
		window.location.href = 'index.html';

	// Add an html element for the model we are going to view
	// in addition to the camera with orbit controls
	//
	// Note:
	//		Camera needs to be added here dynamically so the orbit controls don't attempt
	//		to search for the target before it exists.
	$("a-scene").append(
		"<a-camera orbit-controls target='#target' distance='1' look-controls-enabled=false wasd-controls-enabled=false position='0 0 0' ></a-camera>" +
		"<a-assets>" +
			"<a-asset-item id='modelObj' src='" + BoscSettings.apiRoot  + "organModels/" + modelId + "/obj?authId=" + BoscSettings.authId + "'></a-asset-item>" +
		"</a-assets>" +
		"<a-entity cursor-listener id='target' obj-model='obj: #modelObj;' position='0 0 0' rotation='0 45 0' scale='1 1 1'  color='#4CC3D9'>" +
			"<a-animation begin='click' easing='ease-in-out' attribute='scale' dur='500' to='2 2 2' direction='alternate'></a-animation>" +
		"</a-entity>"
	);
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
