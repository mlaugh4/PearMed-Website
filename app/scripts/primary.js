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


$('.file').click( function(){
	console.log("hello")

	$('.resources').fadeOut(1000)
	$('.title-text grn').addClass('.editable')

});

$('#updateModelForm > div:nth-child(n+2)').
