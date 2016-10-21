function ModelsContainer( selector , modelView ) {

  var el = $( selector )

  var successCallback = function (models) {
    updateUi( models );
  }

  var errorCallback = function (response, ajaxOptions, thrownError) {
    console.log(response.status);
    if(response.status == 500) {
      alert("Oops. You are not authorized.");
    }
  }

  var completeCallback = function () {
    $('.loader').hide();
    if ( el.children().length > 6 )
        $('#searchBox').show();
    else
        $('#searchBox').hide();

    if( el.children().length == 0 )
      $('.empty-files-list').fadeIn()
  }

  var callGetModelsApi = function() {

    var boscApis = new BoscApis();

    $('.loader').show()
    boscApis.getModels( successCallback , errorCallback, completeCallback )

  }

  var updateUi = function( models ) {
    el.empty()
    el.data('allModelData', models)
    models.forEach(function (model) {
      el.append(
        "<div id="+model._id +" class='file'>" +
          "<div class='name'>" +
            model.name +
          "</div>" +
          "<div class='issue-title'>" +
            model.shortDesc +
          "</div>" +
          "<div class='secondary'>" +
            getLastModifiedDisplayValue(model) +
          "</div>" +
          // "<img src='chevron.svg' class='arrow'></img>" +
        "</div>"
      );
      var modelElement = $('#'+ model._id)
      modelElement.data('modelData',model)
    });
  }

  this.update = function() {
    callGetModelsApi();
  }

  el.on('click','.file', function(){
    $(selector + ' > *').css('background-color','white')
    $(this).css('background-color','rgb(241,241,241)')
    thisModel = $(this).data('modelData')
    modelView.load( thisModel )
  });

};
// End of modelsContainer

// Get a display string for the last modified date
function getLastModifiedDisplayValue (model) {
  var lastAccessed = new Date(model.lastAccessed);
  var rightNow = new Date();

  var delta = Math.abs(lastAccessed.getTime() - rightNow.getTime()) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60;  // in theory the modulus is not required

  var timeSince = "";
  if(days > 0)
    timeSince = days + "d";
  else if (hours > 0)
    timeSince = hours + "h";
  else if (minutes > 0)
    timeSince = minutes + "m";
  else
    timeSince = seconds + "s";

  return timeSince + " ago";
}
