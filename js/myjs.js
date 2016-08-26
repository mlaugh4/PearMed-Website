$(function() {

  var referrer =  document.referrer;
  var loadIncrement = 100;
  var transitionSpeed = 500;
  var containerDelay = 500;

  var arr = ["http://localhost:10080/","http://localhost:10080/index.html","http://www.pearmedical.com",,"http://www.pearmedical.com/index.html","http://pearmedical.com/","http://pearmedical.com/index.html"]

  console.log(referrer)
  if (arr.indexOf(referrer) == -1) {
    $('.nav').css("height","100")
    .find('a,img,.logo').css("opacity","1")
  }

  else (

    $('.nav').animate({
      height: 100
    },transitionSpeed, "swing",function() {

      $(".main-links").children().each(function(){
        $(this).delay(loadIncrement).animate({
          opacity:1
        },transitionSpeed)
        loadIncrement += 100
      })

    })
    );

    $('.container').delay(containerDelay).animate({
      opacity:1
    },transitionSpeed)

  var contentwidth = $('body').width();
  if ((contentwidth) < '500'){
    $('.flow').attr('src','img/product_flow_diagram-vert-min.png');
  } else {
    $('.flow').attr('src','img/product_flow_diagram-min.png');
    }


});
