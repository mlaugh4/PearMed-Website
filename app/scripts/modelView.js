function ModelView( ) {

  this.onCreateModel = null;
  this.onUpdateModel = null;

  var thisModelView = this;

  this.load = function( model ) {
    if ( model ) {
      $('.right').fadeOut(500, function() {
        $('.welcome').hide();
        $('.modelInfo').css('display','flex')
        $('.modelInfo > .title-text').html(model.name)
        $('.modelInfo > .issue-title').html(model.shortDesc)
        $('.modelInfo > .description').html(model.longDesc)
        $('.right').fadeIn(500, function(){
          $(this).trigger('justFaded')
        })
      })
    }
  }

  this.updateModel = function( model ) {

    var success = function( model ) {
      if ( thisModelView.onUpdateModel != null )
          thisModelView.onUpdateModel( model );
    }

    var error = function (response, ajaxOptions, thrownError) {
      alert("error");
      console.log("status: " + response.status);
    }

    var complete = function () {
      // $(".loading").hide();
      console.log("complete")
    }

    var boscApis = new BoscApis(BoscApis.testAuthId);
    boscApis.mock();
    boscApis.putModel(model, success, error, complete);

  }

  this.createModel = function( formData ) {

    var success = function ( model ) {
      console.log("success")
        // The server returns the metadata about this model that
        // was saved in the database. Save it on the update form
        // so we can use it later
        $(".modelInfo").data("model", model);
        $(".modelInfo").fadeIn(500);
        $('.modelInfo > .name').html(model.name)
        $('.modelInfo > .issue-title').html(model.shortDesc)
        $('.modelInfo > .description').html(model.longDesc)

        if ( thisModelView.onCreateModel != null )
          thisModelView.onCreateModel( model );
      }

      var error = function (response, ajaxOptions, thrownError) {
        alert("error");
        console.log("status: " + response.status);
      }

      var complete = function () {
        // $(".loading").hide();
        console.log("complete")
      }

      var boscApis = new BoscApis(BoscApis.testAuthId);
      boscApis.mock();
      boscApis.postModel(formData, success, error, complete);

    }
  //End of createModel


    $("#selectModelsToLoad").click(function () {
      // Simulate a click on the hidden <input> box so the file chooser opens
      $("#modelChooser").click();
    });

  // When the user selects models display them and show the open in VR button
  $("#modelChooser").change(function () {
      // Clear the list of files that were previously shown
      $(".chosenFiles").empty();
      $(".right > *").fadeOut(500);
      $("#updateModelForm").delay(500).fadeIn(500)

      // Show the files that were chosen
      var models = "";
      var files = $("#modelChooser")[0].files;
      for(var fileIndex = 0; fileIndex < files.length; fileIndex++) {
        $(".chosenFiles").append("<small>" + files[fileIndex].name + ", " + "</small>");
      }
    });

  $("#updateModelForm").submit(function (event) {
      //disable the default form submission
      event.preventDefault();

      $("#updateModelForm").fadeOut(500);

      // Because we are using divs to collect
      // info, we need to addign the values to
      // the textareas so theyre pulling into formdata
      var name = $('.divForm[name=name]').html()
      $('.divForm[name=name]').next('.hiddenName').val(name);
      var shortDesc = $('.divForm[name=shortDesc]').html()
      $('divForm[name=shortDesc]').next('.hiddenSDec').val(shortDesc);
      var longDesc = $('.divForm[name=longDesc]').html()
      $('.divForm[name=longDesc]').next('.hiddenLDesc').val(longDesc);
      //grab all form data
      var formData = new FormData($(this)[0]);

      thisModelView.createModel( formData )

      return false;
    });

  // Show the save button when someone edits metadata in the file detail
  $('.right').on('justFaded', function(){
    $(this).bind("DOMSubtreeModified", function(){
      $('.saveButton').fadeIn(500)
    })
  })
  //When user clicks save
  $(".modelInfo").submit(function (event) {
    event.preventDefault();

    var updatedData = {
      name:       $('.name').html(),
      shortDesc:  $('.issue-title').html(),
      longDesc:   $('.description').html(),
    }

    thisModelView.updateModel( updatedData );

    return false;
  });

}

