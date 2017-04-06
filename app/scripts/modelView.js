function ModelView( accountId ) {

  this.onCreateModel = null;
  this.onUpdateModel = null;
  this.model = null;

  var thisModelView = this;

  this.load = function( model ) {
    if ( model ) {
      this.model = model;
      $('.right').fadeOut(500, function() {
        $('.welcome').hide();
        $('.modelInfo').css('display','flex')
        $('.modelInfo > .title-text').html(model.name)
        $('.modelInfo > .issue-title').html(model.shortDesc)
        $('.modelInfo > .description').html(model.longDesc)
        $('img.modelImg').attr('src', BoscSettings.apiRoot + 'organModels/' + model._id + '/png?accountId=' + accountId + '&id_token=' + BoscSettings.authId);
        $('.right').fadeIn(500, function(){
          $(this).trigger('justFaded')
        })
      })
    }
  }

  this.updateModel = function( model ) {

    var success = function( model ) {
      thisModelView.load(model);

      if ( thisModelView.onUpdateModel != null )
          thisModelView.onUpdateModel( model );
    }

    var error = function (response, ajaxOptions, thrownError) {
      alert("error");
      console.log("status: " + response.status);
    }

    var complete = function () {
      console.log("complete")
    }

    var boscApis = new BoscApis(BoscApis.testAuthId);
    boscApis.putModel(accountId, model, success, error, complete);

  }

  this.createModel = function( formData ) {

    var success = function ( model ) {
      console.log("success")
      thisModelView.load(model);
      $('.empty-files-list').fadeOut()

        if ( thisModelView.onCreateModel != null )
          thisModelView.onCreateModel( model );
      }

      var error = function (response, ajaxOptions, thrownError) {
        alert("error");
        console.log("status: " + response.status);
      }

      var complete = function () {
        console.log("complete")
      }

      var boscApis = new BoscApis(BoscApis.testAuthId);
      boscApis.postModel(accountId, formData, success, error, complete);

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
      var name = $('.divForm.name').text()
      $('input.hiddenName').val(name);

      var shortDesc = $('.divForm.shortDesc').text()
      $('input.hiddenSDesc').val(shortDesc);

      var longDesc = $('.divForm.longDesc').text()
      $('input.hiddenLDesc').val(longDesc);

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
      _id:        thisModelView.model._id,
      name:       $('.name.editable').text(),
      shortDesc:  $('.issue-title.editable').text(),
      longDesc:   $('.description.editable').text(),
    }

    thisModelView.updateModel( updatedData );

    return false;
  });

  // Temp
  // When the preview image is selected, launch the viewer in a new tab
  $(".modelInfo .modelPreview").click( function () {
    if(thisModelView.model)
      window.open(
          "modelViewer.html?accountId=" + accountId + "&modelId=" + thisModelView.model._id,
          '_blank' // <- This is what makes it open in a new tab.
      );
  })

}

//Check in 10-second intervals what the state of the upload is
// var key = setInterval(getCheckState( modelId ),10000)

// function getCheckState( modelId ) {
//   return function() {
//     checkState( modelId )
//   }
// }


// function checkState ( modelId ) {

//   var boscApis = new BoscApis();

//   var success = function() {
//     if ( modelId.state == "processing" ) {
//       $('file').append(
//           "<div class='loadingIcon'>Loading...</div>"
//         )
//       $('.loadingModel').show()
//     } else if ( modelId.state == "ready" ) {
//       closeInterval(key)
//       $('.loadingModel').hide()
//       // $('file').
//     }
//   }

//   var error = function()
//   var complete = function()

//   BoscApis.getSingleModel(modelId, success, error, complete)

// }
