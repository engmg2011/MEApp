zoomFactor = 1;

// zooming font
$('.zoomin').click(function(){
	$('h3.title').css('font-size','+=2px'); 
	$('div.text').css('font-size','+=2px');  
})
$('.zoomout').click(function(){
	$('h3.title').css('font-size','-=2px'); 
	$('div.text').css('font-size','-=2px'); 
})
 

	/*---------- Zooming the page2 -----------*/
// Bind the swipeHandler callback function to the swipe event on div.box
$( "#two .image" ).on( "swiperight", zoomIn );

// Callback function references the event target and adds the 'swipe' class to it
function zoomIn( event ){
  $( event.target ).css('width','+=80%');
  $( event.target ).css('margin-left','-=40%');
  $( event.target ).css('margin-right','-=40%');
}

// resetZoom function 
function resetZoom( event ){
  $( event.target ).css('width','100%');
  $( event.target ).css('margin-left','0');
  $( event.target ).css('margin-right','0');
}

// Bind the swipeHandler callback function to the swipe event on div.box
$( "#two .image" ).on( "swipeleft", zoomOut );

// Callback function references the event target and adds the 'swipe' class to it
function zoomOut( event ){ 
	$( event.target ).css('width','-=50%'); 
	$( event.target ).css('margin-left','0');
	$( event.target ).css('margin-right','0');
}

var tapped=false
$("#two .image").on("touchstart",function(e){
    if(!tapped){ //if tap is not set, set up single tap
      tapped=setTimeout(function(){
          tapped=null
          //insert things you want to do when single tapped
      },300);   //wait 300ms then run single click code
    } else {    //tapped within 300ms of last tap. double tap
      clearTimeout(tapped); //stop single tap callback
      tapped=null;
      switch(zoomFactor){
        case 1 :
          zoomIn(e);
          zoomIn(e);
          zoomFactor = 2
          break;
        case 2 :
          zoomIn(e); 
          zoomFactor = 3
          break;
        case 3 :
          resetZoom(e); 
          zoomFactor = 1
          break; 
      }
      //insert things you want to do when double tapped
    }
    e.preventDefault()
});
