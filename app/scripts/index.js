$(window).on('load', function(){

	BoscSettings.ensureAuthId();

	var accountId = Utils.getUrlVars()['accountId'];
	if (!accountId)
		window.location.href = 'login.html';

	UpdateAccountName(accountId)

	$(".accountButton").click(function () {
		window.location.href = 'account.html?accountId=' + accountId;
	})

	var modelView = new ModelView ( accountId );

	var modelsContainer = new ModelsContainer( accountId, '.files-list', modelView );

	// When metadata is updated, update the files list
	modelView.onCreateModel = modelView.onUpdateModel = function( model ) {
		modelsContainer.update()
	}

	modelsContainer.update();

});

function UpdateAccountName(accountId) {
	var successCallback = function(account) {
		$(".accountName").text(account.name);
	}

	// If there was an error clear the id_token and attempt to log the user in
	var errorCallback = function(response, ajaxOptions, thrownError) {
		window.location.href = 'login.html';
	}

	var completeCallback = function() {
		$(".loading").hide();
	}

	$(".loading").show();

	var boscApis = new BoscApis();
	boscApis.getAccountInfo(accountId, successCallback, errorCallback, completeCallback);
}
