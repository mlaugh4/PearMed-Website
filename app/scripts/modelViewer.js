$(window).on("load", function () {
	BoscSettings.ensureAuthId();

	var modelId = getUrlParameter("modelId");
	if(!modelId)
		window.location.href = 'index.html';

	// Add an html element for the model we are going to view
	objModelUrl = BoscSettings.apiRoot  + "organModels/" + modelId + "/obj?authId=" + BoscSettings.authId;
	mtlModelUrl = BoscSettings.apiRoot  + "organModels/" + modelId + "/mtl?authId=" + BoscSettings.authId;
	$("#modelContainer").append(

		"<a-entity cursor-listener id='model' obj-model='obj: url(" + objModelUrl + "); mtl: url(" + mtlModelUrl + ")' position='0 0 0' rotation='0 45 0' scale='1 1 1'  color='#4CC3D9' roughness='1'>" +
		"</a-entity>"
	);

	$("#model").on("model-loaded", function () {
		// Get the bounds of the model
		var objModel = $("#model").get(0).object3D;
		var box = new THREE.Box3().setFromObject( objModel );
		var size = box.size();
		var maxDimension = Math.max( Math.max(size.x, size.y), size.z );

		// Resize the model so its max dimension is 1 meter
		var targetSize = 1; // We want to resize this object to 1 meter
		var scaleFactor = targetSize / maxDimension; // Scale it by this much to reach the target size
		$(this).attr("scale", [scaleFactor, scaleFactor, scaleFactor].join(" "));
	});

	$("#model").on("model-progress", function ( e ) {
		var prog = (e.detail.loaded / e.detail.total);
		prog = (prog * 100).toFixed(0)

		if ( prog == "100" ) {
			$('.loading').hide()
			$('a-scene').show()
		} else {
			$('#percent').html(prog + "%")
		}

	});

	$("#model").on("model-error", function ( e ) {
		// Error code
	});

	// Emit a double click from the cursor
	//
	// NOTE:
	//		If we emit a "dblclick" event, the scene element gets a hold of it first
	$("a-scene").get(0).sceneEl.addEventListener("loaded", function(){

        this.addEventListener("dblclick", function( e ){
        	if( e.target.nodeName != "CANVAS" )
        		return;

        	var cursor = document.querySelector("a-entity[cursor]").components.cursor;

            // Double click is outside the player
            // (note that for some reason you cannot prevent a dblclick on player from bubbling up (??)

            if(cursor.intersectedEl) {
            	cursor.intersectedEl.emit("dblclick", e);
            	e.preventDefault();
            }
        });
    });
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
