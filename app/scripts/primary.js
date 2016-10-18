//https://github.com/js-cookie/js-cookie


////////// LOGIN PAGE


$('#nextarrow').click(function(event) {
    Login();
});

$('#loginForm').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    Login();
    return false;
  }
});

function Login() {
    Cookies.set('authId',$('.loginForm').val());
    window.location.href = 'index.html';
}

// Fading in login button
$('#loginForm').keyup(function () {
	if ( $(this).val().length > 0 )
		$('#nextarrow').fadeIn(500);
	else
		$('#nextarrow').fadeOut(200);
});

////////// INDEX PAGE

//Download button
$(window).on('load', function(){
    $('.download').attr('href', BoscSettings.apiRoot + "download/")
});

// Logout button
$('.logout').click( function(){
    Cookies.remove('authId')
    window.location.href = 'login.html';
});

// Triggered when the files list loads
$( '.loader' ).on('loadedList', function() {
	if ( $('.files-list').children().length > 6) {
        $('#searchBox').show();
    } else
        $('#searchBox').hide();
});

$('.files-list').on('click','.file', function(){
	$('.files-list > *').css('background-color','white')
	$(this).css('background-color','rgb(241,241,241)')
	thisModel = $(this).data('modelData')
	if (thisModel) {
		$('.right').fadeOut(500, function() {
			$('.welcome').hide();
			$('.modelInfo').css('display','flex')
		$('.modelInfo > .title-text').html(thisModel.name)
		$('.modelInfo > .issue-title').html(thisModel.shortDesc)
		$('.modelInfo > .description').html(thisModel.longDesc)
		$('.right').fadeIn(500, function(){
            $(this).trigger('justFaded')
        })
		})

	}
});

// Show the save button when someone edits metadata in the file detail
$('.right').on('justFaded', function(){
    $(this).bind("DOMSubtreeModified", function(){
        $('.saveButton').fadeIn(500)
    })
})
//When user clicks save
$(".modelInfo").submit(function (event) {
    vent.preventDefault();

    var name = $('.name').html()
    $('.name').next('.hiddenName').val(name);
    var shortDesc = $('.issue-title').html()
    $('issue-title').next('.hiddenSDec').val(shortDesc);
    var longDesc = $('.description').html()
    $('.description').next('.hiddenLDesc').val(longDesc);

    var formData = new FormData($(this)[0]);
});


// Hide search icon on focus
$('input[type=search]').focus( function() {
	$(this).siblings().hide()
	$(this).focusout(function(){
		$(this).siblings().show()
	});
});


// Tooltip code
var a= '<a href="">How to: Generate 3d model from CT/MR Images </a><br>' +
           '<a href="">Contact our product team </a><br>' +
           '<a href="http://www.pearmedical.com">PearMedical.com </a>';
$('.tipso').tipso();
jQuery('.hover-tipso-tooltip').tipso({
    tooltipHover: true,
    background: 'rgba(33,33,33,.05)',
    position: 'bottom',
    width: '300',
    size: 'small',
    content: function(){
    					return a;
    				}
});

// Search stuff
$('#fileSearch').keyup( function(){
	console.log("Search function")
	var models = $('.files-list').data('allModelData')
	if ( models ) {
		var searchText = $(this).val().toLowerCase()
		models.forEach(function(model){
			if ( searchText == "" || model.name.toLowerCase().startsWith(searchText ) ) {
				$('#'+model._id).show()
			}
			else {
				$('#'+model._id).hide()
			}
		});
	}
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
        $(".right > *").fadeOut(500);
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
        $('.divForm[name=name]').next('.hiddenName').val(name);
        var shortDesc = $('.divForm[name=shortDesc]').html()
        $('divForm[name=shortDesc]').next('.hiddenSDec').val(shortDesc);
        var longDesc = $('.divForm[name=longDesc]').html()
        $('.divForm[name=longDesc]').next('.hiddenLDesc').val(longDesc);
        //grab all form data
        var formData = new FormData($(this)[0]);

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

            var view = new View();
            var boscApis = new BoscApis();
            boscApis.mock();
            boscApis.getModels(function (models) {
            	view.updateRecentModels(models);
            },
            function (response, ajaxOptions, thrownError) {
            	console.log(response.status);
            	if(response.status == 500) {
            		showResponseError(response, "Oops. You are not authorized.");
            	}
            });

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
