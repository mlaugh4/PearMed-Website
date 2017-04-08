$('body').on("primaryJsLoaded", function () {
	$(".boscLogo").fadeIn();

	if(!BoscSettings.authId)
		$(".signInButton").fadeIn();
});

function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	getAccounts(id_token);
}

function getAccounts(id_token) {
	// If we successfully recieved accounts render them, or, if there was only one account, render its models
	var successCallback = function(accounts) {
		$(".boscLogo").hide();

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

		$(".accountsContainer").show();
	}

	// React to any errors
	var errorCallback = function(response, ajaxOptions, thrownError) {
		// If the user is not authorized it's because this is their first time using Bosc.
		// Create them a new account
		if (response.status == 401){
			$(".createAccountButton").click(function () {
				createNewAccount(id_token);
			})

			$(".termsOfServiceContainer").show()
		}
		else {
			BoscSettings.setAuthId(null);
			$(".errorMessage").empty();
			$(".errorMessage").append("Error retrieving accounts. Please contact team@pearmedical.com");
		}
	}

	var completeCallback = function() {
		$(".loading").hide();
		$(".signInButton").hide();
	}

	$(".loading").show();

	var boscApis = new BoscApis(id_token);
	boscApis.getAccounts(successCallback, errorCallback, completeCallback);
}

// NOTE: Eventually this should consent the user
function createNewAccount(id_token) {
	// New user registered successfully
	// Now we should be able to get the accounts
	var successCallback = function(user) {
		BoscSettings.setAuthId(id_token);
		getAccounts(id_token)
	}

	// Error creating account
	var errorCallback = function(response, ajaxOptions, thrownError) {
		BoscSettings.setAuthId(null);

		$(".errorMessage").empty();
		$(".errorMessage").append("<div class='accountError'>Unable to log you in. Please contact team@pearmedical.com.</div>");
	}

	var completeCallback = function() {
		$(".loading").hide();
		$(".boscLogo").hide();
	}

	$(".termsOfServiceContainer").hide()
	$(".loading").show();

	var boscApis = new BoscApis(id_token);
	boscApis.createUser(successCallback, errorCallback, completeCallback);
}
