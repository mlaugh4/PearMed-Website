$(window).on('load', function() {
	BoscSettings.ensureAuthId();

	$(".adminControls").hide();
	$(".loading").hide();

	ensureMasterUser();
});

function ensureMasterUser() {
	// If we successfully received the user's access token we're good to go
	// Save the access token and continue
	var successCallback = function(user) {
		// Check to see if the user is an admin
		// NOTE: This should eventually be done server side
		if(user.google.email == "team@pearmedical.com") {
			$(".adminControls").show();
			hookUpAdminControls();
		}
		else {
			errorCallback();
		}
	}

	// If there was an error clear the id_token and attempt to log the user in
	var errorCallback = function(response, ajaxOptions, thrownError) {
		BoscSettings.setAuthId(null);
		window.location.href = 'login.html';
	}

	var completeCallback = function() {
		$(".loading").hide();
	}

	$(".loading").show();

	var boscApis = new BoscApis();
	boscApis.getUserInfo(successCallback, errorCallback, completeCallback);
}

function hookUpAdminControls() {
	$(".createAccountButton").click(function () {
		$(".errorMessage").empty();

		var name = $(".accountName").val();


		// If we successfully received the user's access token we're good to go
		// Save the access token and continue
		var successCallback = function(account) {
			window.location.href = 'account.html?accountId=' + account._id;
		}

		// If there was an error clear the id_token and attempt to log the user in
		var errorCallback = function(response, ajaxOptions, thrownError) {
			$(".errorMessage").text(response.responseJSON.error)
		}

		var completeCallback = function() {
			$(".loading").hide();
		}

		$(".loading").show();

		var boscApis = new BoscApis();
		boscApis.createAccount(name, successCallback, errorCallback, completeCallback);
	})
}