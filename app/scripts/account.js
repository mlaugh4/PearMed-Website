// Get the account from the query string
$(window).on('load', function() {
	var accountId = Utils.getUrlVars()['accountId'];

	// If the account id does not exist return to the login page
	if (!accountId) {
		window.location.href = 'login.html';
	}
	else {
		var successCallback = function(account) {
			$(".accountName").text(account.name);

			account.users.forEach(function(user) {
				$(".membersContainer").append("<li>" + user.google.name + " [" + user.google.email + "]</li>")
			})

			account.invitations.forEach(function(email) {
				$(".invitationsContainer").append("<li>" + email + "</li>")
			})
		}

		// If there was an error clear the id_token and attempt to log the user in
		var errorCallback = function(response, ajaxOptions, thrownError) {
			window.location.href = 'login.html';
		}

		// var completeCallback = function() {
		// 	$(".loading").hide();
		// }

		var boscApis = new BoscApis();
		boscApis.mock();
		boscApis.getAccountInfo(accountId, successCallback, errorCallback, completeCallback);
	}

	$(".sendInvitation").click(function () {
		var email = $(".invitationText").val();
		if(validateEmail(email)) {
			$(".errorMessage").hide();

			var successCallback = function(account) {
				window.location.reload()
			}

			// If there was an error clear the id_token and attempt to log the user in
			var errorCallback = function(response, ajaxOptions, thrownError) {
				$(".errorMessage").text(response.responseJSON.error)
				$(".errorMessage").show();
			}

			// var completeCallback = function() {
			// 	$(".loading").hide();
			// }

			$(".loading").show();
			var boscApis = new BoscApis();
			boscApis.sendInvitation(accountId, { email: email }, successCallback, errorCallback, completeCallback);
		}
		else {
			$(".errorMessage").text("Please use a valid email address")
			$(".errorMessage").show();
		}
	})
});

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
