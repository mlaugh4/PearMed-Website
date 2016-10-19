function ModelView( ) {

  this.update = function( model ) {
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

}
