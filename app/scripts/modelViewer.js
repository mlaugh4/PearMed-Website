$(window).on("load", function () {
	BoscSettings.ensureAuthId();

	var accountId = Utils.getUrlVars()["accountId"];
	if(!accountId)
		window.location.href = 'index.html';

	var modelId = Utils.getUrlVars()["modelId"];
	if(!modelId)
		window.location.href = 'login.html';

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
	boscApis.getSingleModel(accountId, modelId, success, error, complete);

	hookUpEvents();
});

var hookUpEvents = function () {
	// Emit a double click from the cursor
	//
	// NOTE:
	//		If we emit a "dblclick" event, the scene element gets a hold of it first
	$("a-scene").get(0).sceneEl.addEventListener("loaded", function(){
		// Events here
	});

	$("a-scene").get(0).sceneEl.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false );
}

// Scroll to zoom
function onDocumentMouseWheel( event ) {
    fov -= event.wheelDeltaY * 0.05;
    camera.projectionMatrix = THREE.Matrix4.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 );

    var scrollValue = event.wheelDeltaY;
    console.log("scrollValue")
}

var modelParts = [];
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
		modelParts.push(part);

		// Create a unique DOM id
		part.DOMId = "model-" + part._id;

		// Build urls for the obj and mtl files
		var objUrl = BoscSettings.apiRoot  + "organModels/" + model._id + "/parts/" + part._id + "/obj?accountId=" + model.account + "&id_token=" + BoscSettings.authId;
		var mtlUrl = BoscSettings.apiRoot  + "organModels/" + model._id + "/parts/" + part._id + "/mtl?accountId=" + model.account + "&id_token=" + BoscSettings.authId;

		console.log("OBj url:")
		console.log(objUrl)

		console.log("MTL url:")
		console.log(mtlUrl)

		// Add an html element for the part
		$("#modelContainer").append(

			"<a-entity cursor-listener id='" + part.DOMId + "' obj-model='obj: url(" + objUrl + "); mtl: url(" + mtlUrl + ")' position='0 0 0' rotation='0 45 0' scale='1 1 1'  color='#4CC3D9' roughness='0'>" +
			"</a-entity>"
		);

		// Save the metadata on the UI element
		$( "#" + part.DOMId ).data("metadata", part);

		// When all parts have loaded, update the models size
		// to make sure it's in view
		$( "#" + part.DOMId ).on("model-loaded", function ( e ) {
			loadedCount++;
			if(loadedCount >= model.parts.length)
				adjustModelSize()
		});

		// Update overall progress
		$( "#" + part.DOMId ).on("model-progress", function ( e ) {
			progressMap[ $(this).data("metadata")._id ] = e.detail;
			updateProgress();
		});

		// Handle errors...eventually
		$( "#" + part.DOMId ).on("model-error", function ( e ) {
			// Error code
		});

		$( "#" + part.DOMId ).on("click", function ( e ) {
			focusOnModelPart( $(this).data("metadata") );
		});
	}
}

var focusOnModelPart = function ( part ) {
	// Calculate the meshe's center, and move the orbit pivot point to it
	var mesh = $("#" + part.DOMId).get(0).object3D.getObjectByProperty("type", "Mesh");
	mesh.geometry.computeBoundingBox();
	var center = mesh.geometry.boundingBox.center();
	var modelScale = $("#modelContainer").get(0).getAttribute("scale").x;
	var adjustedCenter = [center.x, center.y, center.z].map(function (point) { return point * modelScale; });
	$("#orbitPivot").get(0).setAttribute("position", adjustedCenter.join(" "));

	// Get this part's longest side
	var box = new THREE.Box3().setFromObject( $( "#" + part.DOMId ).get(0).object3D );
	var size = box.size();
	var maxDimension = Math.max( Math.max(size.x, size.y), size.z );

	// Update the distance we're pivoting at since each part is a different size
	$("a-entity[camera]").attr("distance", maxDimension * 2);
	var orbitControls = $("a-entity[camera]").get(0).components["orbit-controls"];
	orbitControls.init();

	// Fade out all other parts
	modelParts.forEach( function (p)  {
		opacity = ( p == part ) ? 1 : 0.3;
		var obj3D = $( "#" + p.DOMId ).get(0).object3D;
		obj3D.traverse( function (child) {
			if(child.material) {
				child.material.opacity = opacity;
				child.material.transparent = true;
			}
		})
	});
}