var postsData = [] ;
function printData(feeds_url ){ 
	var api ; 
	if(feeds_url == ''){
		//main feeds 
		//api = "http://localhost/mgovnew/feeds";
		api = "http://mebusiness.ae/feeds";
	}
	else{
		//api = "http://localhost/mgovnew/feeds?cat="+feeds_url ;
		api = "http://mebusiness.ae/feeds/cat/"+feeds_url ;
	}
 
	$('#My_data').html('<img src="icon.png" class="waiting-logo imageSpin" />');
	$.ajax({
	    type: "GET",
	    url: api,
	    success: function (data) {
	        $('#My_data').html(''); 
		    var $xml = data; 
		    obj = JSON && JSON.parse($xml) || $.parseJSON($xml);
			console.log(obj);


			obj.forEach(function(item){  
				title = item.title;
				titlefree =  title.replace(/'/g, ""); 
				titlefree =  title.replace(/"/g, "");
				myContent = item.content;

				if (typeof myContent !== 'undefined') {
					myContent = myContent.replace("." , ". <br>");
				}
				postsData.push({
			        title: item.title,
			        link: item.link,
			        content: myContent,
			        image: item.image
			    });

                $('#My_data').append('<div class="content_item">\
					<div class="img">\
						<a  onclick="openNews(\''+item.id+'\',\''+titlefree+'\' )" data-role="button" data-rel="dialog" data-transition="pop">\
							<img src="http://mebusiness.ae/uploads/thumbs/image-'+item.id+'-500.jpg" />\
					</a>\
					</div>\
					<a onclick="openNews(\''+item.id+'\' ,\''+titlefree+'\' )" data-role="button" data-rel="dialog" data-transition="pop">\
							<h3 class="title">'+titlefree+'</h3>\
					</a>\
					<!--h4 class="description">'+titlefree+'</h4-->\
					<h6 class="time">'+item.pubDate+'</h6>\
				</div> ');
			});  
	    },
	    error: function(res) {
	       // $('#My_data').html("<pre style='direction:ltr'>There was an error: <br/>" + JSON.stringify(res)) +"</pre>"; 
	    
	        $('#My_data').html('<div style="text-align:center"><br/>\
	        	تأكد من الاتصال بالشبكة ثم اضغط <br/> <a onclick="printData(\'\')" >أعد التحميل</a></div>')
	    }
	});   
}
 
function openNews(id , title){
	link = 'http://mebusiness.ae/feeds/post/'+id ;
	$.get(link,function(result){
        var data = JSON.parse(result);

        sharing.link = "http://mebusiness.ae/ar/news/show/"+id;
        sharing.title = data.title;
        data.content = data.content.replace(/<\/?[^>]+(>|$)/g, "");
        allContent = data.content.replace('\n','<br/><br/>');
        window.allContent = allContent;
        sharing.desc = allContent.substr(0, 80);;
        setShare();
        // console.log(result);
        $('#slide_button').trigger('click');
        $('#two>.content>.title').html(data.title);
        $('#two>.content>.text').html(allContent);
        $('#two>.content>.image').html(' <img src="http://mebusiness.ae/uploads/thumbs/image-'+id+'-500.jpg" />');

    })


} 

function printIssues(){ 
	var api ;  
	api ="http://mgovmagazine.com/xml.php";  
	//api ="http://localhost/mgovnew/xml.php";  

	$('#My_data').html('<img src="icon.png" class="waiting-logo imageSpin" />');
	
	$.ajax({
	    type: "GET",
	    url: api,
	    success: function (data) {
	    	$('#My_data').html('');  
			parser = new DOMParser(); 
			xmlDoc = $.parseXML( data ) 
			$xml = $( xmlDoc ),
			issues = $xml.find( "issue" ); 
			//console.log(issues);
			issues.each(function(){ 
			    var id = $(this).find('id').text(),
			        title = $(this).find('title').text(),
			        thumb = $(this).find('thumb').text(),
			        downloadLink = $(this).find('downloadLink').text(),
			        itemlink = $(this).find('itemlink').text();
			    $('#My_data').prepend('\
			    	<div class="issue">\
			    		<div class="title">\
			    			<a onclick="openIssue(\''+itemlink+'\',\''+title+'\')"> '+title+' </a>\
			    		</div>\
			    		<div class="thumb"><a onclick="openIssue(\''+itemlink+'\',\''+title+'\')"><img src="'+thumb+'" /></a></div>\
			    	</div>');
				//console.log(title);
			})
	    },
	    error: function(res) {
	        $('#My_data').html("<pre style='direction:ltr'>There was an error: <br/>" + JSON.stringify(res)) +"</pre>"; 
	    }
	})
 
}
 
function openIssue(link , title){
	 $('#popup_button').trigger('click');
	 title = title ;
	 $('#issueTitle').html(title);
	 $('#issueFrame').html('<iframe id="currentIssue" src="'+link+'" ></iframe>');
	 showHeaderForAWhile();
} 

function getFeeds(feeds_url_id  ){   
	$('.goback').trigger('click');
	$('#megamenu>.header').css('background','#eee url("images/'+feeds_url_id+'.jpg") 0px no-repeat');  
	$('#one>.ui-header').css('background','#fff url("images/'+feeds_url_id+'.jpg") 0px no-repeat'); 
	$('#one>.ui-header').css('background-size','100%'); 
	$('#one>.ui-content').css('padding-top','88px');
	if(feeds_url_id == "") $('#one>.ui-header').css('background','#fff url("images/image.jpg") 0px no-repeat'); 
	if(feeds_url_id == "") $('#megamenu>.header').css('background','#eee url("images/image.jpg") 0px no-repeat');; 
	printData(feeds_url_id);  
	megaMenuAction()
}

function getIssues(){
	$('.goback').trigger('click');
	$('#megamenu>.header').css('background','#eee url("images/pdf.jpg") 0px no-repeat');  
	$('#one>.ui-header').css('background','#fff url("images/pdf.jpg") 0px no-repeat'); 
	$('#one>.ui-header').css('background-size','100%'); 
	$('#one>.ui-content').css('padding-top','88px');
	printIssues();  
	megaMenuAction() 
}
 
$('.showHome').click(function(e){   
	megaMenuAction();
})
$('.sideMenu>li').click(function(){ 
	catname = $(this).children('a').html();
	$('.info').html('<hr/>'+catname);
	$('.sideMenu>li').removeClass('active');
	$(this).addClass('active');
})
$('.return_home').click(function(){
	megaMenuAction();
})
$('.overlay').click(function(){
	megaMenuAction();
})

function megaMenuAction(){
	$("#megamenu").animate({width:'toggle'},350);
	$(".ui-content").toggleClass('disable-scrolling'); 
}

// trying download --not work
function downloadFile(downloadLink){
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(downloadLink);

	fileTransfer.download(
	    uri,
	    filePath,
	    function(entry) {
	        console.log("download complete: " + entry.fullPath);
	    },
	    function(error) {
	        console.log("download error source " + error.source);
	        console.log("download error target " + error.target);
	        console.log("upload error code" + error.code);
	    },
	    false,
	    {
	        headers: {
	            "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
	        }
	    }
	);
} 
// for move up the header but stopped
function showHeaderForAWhile(){
	$('#frameHeaderInner').slideDown();
	/*
	$('.openClose').slideUp();
	setTimeout(function(){
		$('#frameHeaderInner').slideUp('slow');
		$('.openClose').slideDown('slow');
	} , 2000);*/
} 
function backIssues(){  
	getIssues();  
	$("#megamenu").hide();
	$(".ui-content").removeClass('disable-scrolling'); 
}
// go home not used
function goHome(feeds_url_id){ 
	$('.goback').trigger('click');
	$('#one>.ui-header .info').html('');
	$('#megamenu>.header').css('background','#fff url("images/'+feeds_url_id+'.jpg") 0px no-repeat');  
	$('#one>.ui-header').css('background','#fff url("images/'+feeds_url_id+'.jpg") 0px no-repeat'); 
	$('#one>.ui-header').css('background-size','100%'); 
	if(feeds_url_id == "") $('#one>.ui-header').css('background','#fff url("images/image.jpg") 0px no-repeat'); 
}

function share(site){
	shareFrame = $('#shareFrame');
	if(site == 'facebook'){
		shareFrame.show();
		shareFrame.attr('src','http://facebook.com/sharer.php?u=http://mebusiness.ae/ar/news/show/'+site)
	}
}

$('#frameHeader').click(function(){
	showHeaderForAWhile();
});

$('.openClose').click(function(){ 
	showHeaderForAWhile();
});

$(function(){
	$('#megamenu>.header').css('background','#eee url("images/image.jpg") 0px no-repeat');  
	$('#one>.ui-header').css('background','#fff url("images/image.jpg") 0px no-repeat'); 
	
 	printData(''); 
})
