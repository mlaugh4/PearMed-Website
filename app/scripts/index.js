$(window).on('load', function(){

    BoscSettings.ensureAuthId();

    var accountId = Utils.getUrlVars()['accountId'];
    if (!accountId) {
			window.location.href = 'login.html';
		}

		$(".accountButton").click(function () {
			window.location.href = 'account.html?accountId=' + accountId;
		})

    var modelView = new ModelView (  );

    var modelsContainer = new ModelsContainer( '.files-list', modelView );

    // When metadata is updated, update the files list
    modelView.onCreateModel = modelView.onUpdateModel = function( model ) {
        modelsContainer.update()
    }

    modelsContainer.update();

});

