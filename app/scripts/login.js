$(window).on('load', function() {
	$(".loading").hide();
	$(".signInButton").hide();
	$(".accountsContainer").hide();

	// If an access token is present in the header use it
	var id_token = BoscSettings.authId || Utils.getUrlVars()['id_token'];

	// If the access_token is not valid login
	if (id_token)
		ValidateAccessToken(id_token);
	else
		$(".signInButton").show();
});

function ValidateAccessToken(id_token) {
	// If we successfully received the user's access token we're good to go
	// Save the access token and continue
	var successCallback = function(accounts) {
		BoscSettings.setAuthId(id_token);

		var viewModelsUnderAccount = function(account) { window.location.href = 'index.html?accountId=' + account._id; }

		if (!accounts.length) {
			$(".accountsContainer").append("<div class='noAccounts'>You are not a member of any accounts. Please request access from an account member.</div>");
		}
		else if(accounts.length == 1) {
			viewModelsUnderAccount(accounts[0]);
		}
		else {
			accounts.forEach(function(account) {
				var accountEl = $("<div class='account primary-btn'>" + account.name + "</div>");
				$(".accountsContainer").append(accountEl);
				accountEl.click(function() { viewModelsUnderAccount(account); })
			});
		}
	}

	// If there was an error clear the id_token and attempt to log the user in
	var errorCallback = function(response, ajaxOptions, thrownError) {
		BoscSettings.setAuthId(null);

		if (response.status == 401){
			window.location.href = BoscSettings.authLoginUrl;
		}
		else {
			$(".accountsContainer").empty();
			$(".accountsContainer").append("<div class='accountError'>Error retrieving accounts. Please contact team@pearmedical.com</div>");
		}
	}

	var completeCallback = function() {
		$(".loading").hide();
		$(".boscLogo").hide();
		$(".accountsContainer").show();
	}

	$(".loading").show();

	var boscApis = new BoscApis(id_token);
	boscApis.getAccounts(successCallback, errorCallback, completeCallback);
}

function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("Id token: " + id_token)
}