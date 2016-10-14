function View() {
	this.updateRecentModels = function (models) {
		$('.files-list').empty()
		$('.files-list').data('allModelData', models)
		models.forEach(function (model) {
			$(".files-list").append(
				"<div id="+model._id +" class='file'>" +
					"<div class='name'>" +
						model.name +
					"</div>" +
					"<div class='issue-title'>" +
						model.shortDesc +
					"</div>" +
					"<div class='secondary'>" +
						getLastModifiedDisplayValue(model) +
					"</div>" +
					// "<img src='chevron.svg' class='arrow'></img>" +
				"</div>"
			);
			var modelElement = $('#'+ model._id)
			modelElement.data('modelData',model)
		});

	};
}


$(window).on("load", function() {
	var view = new View();
	var boscApis = new BoscApis(BoscApis.testAuthId);
	// boscApis.mock();
	boscApis.getModels(function (models) {
		view.updateRecentModels(models);
	},
	function (response, ajaxOptions, thrownError) {
		console.log(response.status);
		if(response.status == 500) {
			showResponseError(response, "Oops. You are not authorized.");
		}
	});
});

// Show an error message along with the request id that we can use to debug the issue
function showResponseError(response, msg) {
	alert (msg + "\nPlease contact team@pearmedical.com if this issue 	persists.\nRequestId: " + request.getResponseHeader('X-Request-Id'));
}

// Get a display string for the last modified date
function getLastModifiedDisplayValue (model) {
	var lastAccessed = new Date(model.lastAccessed);
	var rightNow = new Date();

	var delta = Math.abs(lastAccessed.getTime() - rightNow.getTime()) / 1000;

	// calculate (and subtract) whole days
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;

	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;

	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;

	// what's left is seconds
	var seconds = delta % 60;  // in theory the modulus is not required

	var timeSince = "";
	if(days > 0)
		timeSince = days + "d";
	else if (hours > 0)
		timeSince = hours + "h";
	else if (minutes > 0)
		timeSince = minutes + "m";
	else
		timeSince = seconds + "s";

	return timeSince + " ago";
}
