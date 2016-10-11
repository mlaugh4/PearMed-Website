////////// LOGIN PAGE

// Fading in login button
$('#loginForm').keyup(function () {
	if ( $('#loginForm').val().length > 0 )
		$('#nextarrow').fadeIn(500);
	else
		$('#nextarrow').fadeOut(200);
});

////////// INDEX PAGE

// Show more button if there are more than 5ish options
// $.when( loadList() ).then(function() {
// 	if ( $('.files-list').children().length > 6 )
// 		$('.showMore').show()
// 	else
// 		$('.showMore').hide()
// });

// Hide search icon on focus
$('input[type=search]').focus( function() {
	$(this).siblings().hide()
	$(this).focusout(function(){
		$(this).siblings().show()
	})
});


////////// UPLOAD PROCESS

// Attach events to DOM elements when the page loads
$(window).on("load", function () {

    // We need to use an <input> box to show the file chooser, but <input> boxes are ugly, especially in IE
    // Instead of showing in <input> box, lets show a button. When the button is clicked simulate a
    // click on the <input> box so the user can choose model files.
    $("#selectModelsToLoad").click(function () {
        // Simulate a click on the hidden <input> box so the file chooser opens
        $("#modelChooser").click();
      });

    // When the user selects models display them and show the open in VR button
    $("#modelChooser").change(function () {
        // Clear the list of files that were previously shown
        $(".chosenFiles").empty();
        $(".welcome").fadeOut(500);
        $("#updateModelForm").delay(500).fadeIn(500)

        // Show the files that were chosen
        var models = "";
        var files = $("#modelChooser")[0].files;
        for(var fileIndex = 0; fileIndex < files.length; fileIndex++) {
        	$(".chosenFiles").append("<small>" + files[fileIndex].name + ", " + "</small>");
        }

        // Show the upload models button
        // $("#uploadModels").show();
      });

    // Upload the models to the bosc APIs
    $("#updateModelForm").submit(function (event) {
        //disable the default form submission
        event.preventDefault();

        $("#updateModelForm").fadeOut(500);

        // Because we are using divs to collect
        // info, we need to addign the values to
        // the textareas so theyre pulling into formdata
        var name = $('.divForm[name=name]').html()
        $('#hiddenName').val(name);
        var shortDesc = $('.divForm[name=shortDesc]').html()
        $('#hiddenSDec').val(shortDesc);
        var longDesc = $('.divForm[name=longDesc]').html()
        $('#hiddenLDesc').val(longDesc);
        //grab all form data
        var formData = new FormData($(this)[0,1,2]);

        var success = function (model) {
        	console.log("success")
            // The server returns the metadata about this model that
            // was saved in the database. Save it on the update form
            // so we can use it later
            $(".modelInfo").data("model", model);
            $(".modelInfo").fadeIn(500);
            $('.modelInfo > .name').html(name)
            $('.modelInfo > .issue-title').html(shortDesc)
            $('.modelInfo > .description').html(longDesc)
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

          return false;
        });
});
