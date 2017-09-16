/* links for sharing */
var sharing = {link:'http://mgovmagazine.com',title:'مجلة الحكومة الذكية',desc:'تابع أحدث أخبار مجلة الحكومة الذكية'} ;
//console.log(sharing.link);
function setShare(){ 
    $('#buttons-expanded').html('<div class="inner" style="display: none;"></div>\
        <ul class="shareIcons">\
            <li><a href="http://www.facebook.com/share.php?u='+window.sharing.link+'" title="Share with Facebook" target="_blank" class="ui-link"><img src="images/facebook.png" alt="" style="width: 32px; height: 32px; margin-top: 8px;"></a></li>\
            <li><a href="http://twitter.com/home?status='+window.sharing.title+''+window.sharing.link+'" title="Share with Twitter" target="_blank" class="ui-link"><img src="images/twitter.png" alt="" style="width: 32px; height: 32px; margin-top: 8px;"></a></li>\
            <li><a href="http://www.addthis.com/bookmark.php?v=300&winname=addthis&pub=ra-576e6c930a82265e&source=msd-1.0&lng=ar-aa&s=whatsapp&url='+encodeURIComponent(window.sharing.link)+'&ate=AT-ra-576e6c930a82265e/-/-/57dea87bc13dddd0/4&frommenu=1&uud=1&ct=1&tt=0&captcha_provider=recaptcha2&pro=0"  class="ui-link"><img src="images/whatsapp.png" alt="" style="width: 32px; height: 32px; margin-top: 8px;"></a></li>\
            <li><a href="https://plus.google.com/share?url='+encodeURIComponent(window.sharing.link)+'"  class="ui-link"><img src="images/googleplus.png" alt="" style="width: 32px; height: 32px; margin-top: 8px;"></a></li>\
            <li><a href="http://www.linkedin.com/shareArticle?mini=true&amp;url='+window.sharing.link+'&amp;title='+window.sharing.title+'&amp;summary=%D8%AA%D8%A7%D8%A8%D8%B9%20%D8%A3%D8%AD%D8%AF%D8%AB%20%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1%20'+window.sharing.title+'&amp;source='+window.sharing.title+'" title="Share with LinkedIn" target="_blank" class="ui-link"><img src="images/linkedin.png" alt="" style="width: 32px; height: 32px; margin-top: 8px;"></a></li>\
        </ul>');

}
setShare();