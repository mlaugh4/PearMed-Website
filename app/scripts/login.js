$(window).on('load', function() {
	$(".loading").hide();
	$(".accountsContainer").hide();
});

function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	
	getAccounts(id_token);
}

function getAccounts(id_token) {
	// If we successfully recieved accounts render them, or, if there was only one account, render its models
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

	// React to any errors
	var errorCallback = function(response, ajaxOptions, thrownError) {
		// If the user is not authorized it's because this is their first time using Bosc.
		// Create them a new account
		if (response.status == 401){
			createNewAccount(id_token);
		}
		else {
			BoscSettings.setAuthId(null);
			$(".accountsContainer").empty();
			$(".accountsContainer").append("<div class='accountError'>Error retrieving accounts. Please contact team@pearmedical.com</div>");
		}
	}

	var completeCallback = function() {
		$(".loading").hide();
		$(".boscLogo").hide();
		$(".signInButton").hide();
		$(".accountsContainer").show();
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

		$(".accountsContainer").empty();
		$(".accountsContainer").append("<div class='accountError'>Unable to log you in. Please contact team@pearmedical.com.</div>");
	}

	var completeCallback = function() {
		$(".loading").hide();
		$(".boscLogo").hide();
		$(".accountsContainer").show();
	}

	$(".loading").show();

	var boscApis = new BoscApis(id_token);
	boscApis.createUser(successCallback, errorCallback, completeCallback);
}