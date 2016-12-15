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

  //Masonry Stuff
  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  });

  $('.grid').delay(containerDelay).animate({
    opacity:1
  },transitionSpeed)

  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });

  $('.showResources').click(function(){
    $('.resources').toggle();
  });


});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-83297143-1', 'auto');
ga('send', 'pageview');
