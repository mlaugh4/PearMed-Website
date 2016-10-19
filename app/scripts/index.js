$(window).on('load', function(){

    BoscSettings.ensureAuthId();

    var modelView = new ModelView (  );

    var modelsContainer = new ModelsContainer( '.files-list', modelView );

    // When metadata is updated, update the files list
    modelView.onCreateModel = modelView.onUpdateModel = function( model ) {
        modelsContainer.update()
    }

    modelsContainer.update();

});

