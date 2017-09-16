var postsData = [] ;
function printData(feeds_url ){ 
	var api ; 
	if(feeds_url == ''){
		api ="http://mgovmagazine.com/export2.php"; 
		//api ="http://localhost/mgov/export2.php"; 
	}
	else{
		//api = "http://localhost/mgov/export2.php?rss_mod_id="+feeds_url ;
		api = "http://mgovmagazine.com/export2.php?rss_mod_id="+feeds_url ;
	}
 
	$('#My_data').html('<img src="icon.png" class="waiting-logo imageSpin" />');
	
	$.get(api, function(data) {
		$('#My_data').html('');
	    var $xml = data; 
		obj = JSON && JSON.parse($xml) || $.parseJSON($xml);  
	    
		obj.forEach(function(item){  
			title = item.title[0];
			titlefree =  title.replace(/'/g, ""); 
			titlefree =  title.replace(/"/g, "");
			myContent = item.content[0];
			console.log(myContent);
			if (typeof myContent !== 'undefined') {
				myContent = myContent.replace("." , ". <br>");
			}
			postsData.push({
		        title: item.title[0],
		        link: item.link[0],
		        content: myContent,
		        image: item.image[0]
		    }); 
			$('#My_data').append('<div class="content_item">\
				<div class="img">\
					<a  onclick="openNews(\''+item.link[0]+'\' ,\''+titlefree+'\' )" data-role="button" data-rel="dialog" data-transition="pop">\
						<img src="'+item.image[0]+'" />\
					</a>\
				</div>\
				<a onclick="openNews(\''+item.link[0]+'\' ,\''+titlefree+'\' )" data-role="button" data-rel="dialog" data-transition="pop">\
						<h3 class="title">'+titlefree+'</h3>\
				</a>\
				<!--h4 class="description">'+titlefree+'</h4-->\
				<h6 class="time">'+item.pubDate+'</h6>\
			</div> ');
		}); 
	});  
}

function printPDFData(){ 

	$('#My_data').html('<img src="icon.png" class="waiting-logo imageSpin" />');
	api ="http://mgovmagazine.com/pdf/index.php"; 
	//api ="http://localhost/test/filenames/index.php"; 
	
	$.get(api, function(data) {
		$('#My_data').html('');
	    var $xml = data; 
		obj = JSON && JSON.parse($xml) || $.parseJSON($xml);  
	    
		obj.forEach(function(item){  
			//console.log(item); 
			itemname = item.replace(".pdf", "");
			//$('#My_data').append(item);
			$('#My_data').append('<div class="content_item">\
					<h3 class="title pdf-title"><i class="fa fa-file-pdf-o"></i>\
						<a href="http://mgovmagazine.com/pdf/files/'+item+'">\
							تصفح عدد '+itemname+' \
						</a>\
					</h3>\
			</div> '); 
		}); 
	});  
}
 
function openNews(link , title){
	// console.log(link);
	console.log(title); 
	var result = $.grep(postsData, function(e){ return e.link == link; });
	// console.log(result); 
	$('#slide_button').trigger('click');  
	$('#two>.content>.title').html(result[0].title);
	$('#two>.content>.text').html(result[0].content);
	$('#two>.content>.image').html(' <img src="'+result[0].image+'" />'); 
} 

function getFeeds(feeds_url_id  ){  
	$('.goback').trigger('click');
	$('#megamenu>.header').css('background','#eee url("images/'+feeds_url_id+'.jpg") 0px no-repeat');  
	$('#one>.ui-header').css('background','#eee url("images/'+feeds_url_id+'.jpg") 0px no-repeat'); 
	$('#one>.ui-header').css('background-size','100%'); 
	if(feeds_url_id == "") $('#one>.ui-header').css('background','#eee url("images/image.jpg") 0px no-repeat'); 
	printData(feeds_url_id);  
	$("#megamenu").animate({width:'toggle'},350); 
}
 
$('.showHome').click(function(e){   
	$("#megamenu").animate({width:'toggle'},350);
})
$('.sideMenu>li').click(function(){ 
	catname = $(this).children('a').html();
	$('.info').html(catname);
	$('.sideMenu>li').removeClass('active');
	$(this).addClass('active');
})
$('.return_home').click(function(){
	$("#megamenu").animate({width:'toggle'},350);
})
$('.overlay').click(function(){
	$("#megamenu").animate({width:'toggle'},350);
})

$(function(){
 	printData('');
})