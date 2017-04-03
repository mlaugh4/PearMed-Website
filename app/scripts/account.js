// Get the account from the query string
$(window).on('load', function() {
	var accountId = Utils.getUrlVars()['accountId'];

	// If the account id does not exist return to the login page
	if (!accountId) {
		window.location.href = 'login.html';
	}
	else {
		var boscApis = new BoscApis();
		boscApis.mock();

		var successCallback = function(account) {
			$(".accountName").text(account.name);

			account.members.forEach(function(member) {
				$(".membersContainer").append("<li>" + member.google.name + " [" + member.google.email + "]</li>")
			})

			account.invitations.forEach(function(email) {
				$(".invitationsContainer").append("<li>" + email + "</li>")
			})
		}

		// If there was an error clear the id_token and attempt to log the user in
		var errorCallback = function(response, ajaxOptions, thrownError) {
			window.location.href = 'login.html';
		}

		var completeCallback = function() {
			$(".loading").hide();
		}

		boscApis.getAccountInfo(accountId, successCallback, errorCallback, completeCallback);
	}
});