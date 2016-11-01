$(window).on("load", function () {
	BoscSettings.ensureAuthId();

	var modelId = getUrlParameter("modelId");
	if(!modelId)
		window.location.href = 'index.html';

	var success = function ( model ) {
		loadModel( model );
	}

	var error = function (response, ajaxOptions, thrownError) {
		alert("error");
		console.log("status: " + response.status);
	}

	var complete = function () {
		
	}

	var boscApis = new BoscApis();
	boscApis.getSingleModel(modelId, success, error, complete);
});

var loadModel = function ( model ) {
	// Holds on to progress for each part that's loading
	var progressMap = {};

	// Calculates and updates progress UI
	var updateProgress = function () {
		var overallLoaded = 0;
		var overallTotal = 0;

		// Loop over the status of each part and add it's progress to the total
		for( var partId in progressMap ) {
			var loadedInfo = progressMap[ partId ];
			if(loadedInfo) {
				overallLoaded += loadedInfo.loaded;
				overallTotal += loadedInfo.total;
			}
		}

		var prog = (overallLoaded / overallTotal);
		prog = (prog * 100).toFixed(0)

		// Update the UI
		if ( prog == "100" ) {
			// Hide the loading UI
			$('.loading').hide()

			// Show the scene
			$('a-scene').show()
		} else {
			$('#percent').html(prog + "%")
		}
	}

	// Adjust the model' size to make sure it's visible
	var adjustModelSize = function () {
		// Get the bounds of the model
		var objModel = $("#modelContainer").get(0).object3D;
		var box = new THREE.Box3().setFromObject( objModel );
		var size = box.size();
		var maxDimension = Math.max( Math.max(size.x, size.y), size.z );
		console.log("Max dimension: " + maxDimension);

		// Resize the model so its max dimension is 1 meter
		var targetSize = 1; // We want to resize this object to 1 meter
		var scaleFactor = targetSize / maxDimension; // Scale it by this much to reach the target size
		$( "#modelContainer" ).attr("scale", [scaleFactor, scaleFactor, scaleFactor].join(" "));
	}

	// Loop over each part and load it
	var loadedCount = 0;
	for( var partIndex = 0; partIndex < model.parts.length; partIndex++) {
		var part = model.parts[ partIndex ];

		// Create a unique DOM id
		var partDOMId = "model-" + part._id;

		// Build urls for the obj and mtl files
		var objUrl = BoscSettings.apiRoot  + "organModels/" + model._id + "/parts/" + part._id + "/obj?authId=" + BoscSettings.authId;
		var mtlUrl = BoscSettings.apiRoot  + "organModels/" + model._id + "/parts/" + part._id + "/mtl?authId=" + BoscSettings.authId;

		// Add an html element for the part
		$("#modelContainer").append(

			"<a-entity cursor-listener id='" + partDOMId + "' obj-model='obj: url(" + objUrl + "); mtl: url(" + mtlUrl + ")' position='0 0 0' rotation='0 45 0' scale='1 1 1'  color='#4CC3D9' roughness='0'>" +
			"</a-entity>"
		);

		// Save the metadata on the UI element
		$( "#" + partDOMId ).data("metadata", part);

		// When all parts have loaded, update the models size
		// to make sure it's in view
		$( "#" + partDOMId ).on("model-loaded", function ( e ) {
			loadedCount++;
			if(loadedCount >= model.parts.length)
				adjustModelSize()
		});

		// Update overall progress
		$( "#" + partDOMId ).on("model-progress", function ( e ) {
			progressMap[ $(this).data("metadata")._id ] = e.detail;
			updateProgress();
		});

		// Handle errors...eventually
		$( "#" + partDOMId ).on("model-error", function ( e ) {
			// Error code
		});
	}	

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
}

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
