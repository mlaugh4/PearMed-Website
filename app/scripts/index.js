$(window).on('load', function(){

    // If user isnt authorized, bring them to login screen
    if( !Cookies.get('authId') ) {
        window.location.href = 'login.html';
    }

    var modelView = new ModelView (  );

    var modelsContainer = new ModelsContainer( '.files-list', modelView );

    // When metadata is updated, update the files list
    modelView.onCreateModel = modelView.onUpdateModel = function( model ) {
        modelsContainer.update()
    }

    modelsContainer.update();

});

