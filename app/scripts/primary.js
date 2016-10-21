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



// Login logic with error messages
function Login() {
    var authId = $('#loginForm').val()
    BoscSettings.authId = authId


    var successCallback = function () {
		BoscSettings.setAuthId( authId );
        window.location.href = 'index.html';
    }

		var errorCallback = function (response, ajaxOptions, thrownError) {
			console.log(response.status);
            $('#loginForm').blur();

			if ( response.status == 401 ) {
				$('.errorText').text("Oops. You are not authorized. Please try again.").slideDown('400')
            }
			else {
                $('.errorText').html("Uh oh.. Something's not right here. <a href='mailto:team@pearmedical.com'>Contact us.</a>").slideDown('400')
            }
		}

		var completeCallback = function () {

		}

    var boscApis = new BoscApis();
    boscApis.getUserInfo(successCallback, errorCallback, completeCallback);
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
    BoscSettings.setAuthId( null );
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
