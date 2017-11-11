/*歌曲分类Tab JS*/
$(function(){
	//歌曲分类切换
	$('.title-list li').mouseover(function(){
		var liindex = $('.title-list li').index(this);
		$(this).addClass('on').siblings().removeClass('on');
		$('.product-wrap div.product').eq(liindex).fadeIn(150).siblings('div.product').hide();
		var liWidth = $('.title-list li').width();
		$('.song-classification .title-list p').stop(false,true).animate({'left' : liindex * liWidth + 'px'},300);
	});
	
	//歌曲分类hover效果
	$('.product-wrap .product li').hover(function(){
		$(this).css("box-shadow","0 0 30px #01e5ff");
		$(this).find('p > a').css('color','#009be8');
	},function(){
		$(this).css("box-shadow","0 0 30px white");
		$(this).find('p > a').css('color','#a896ff');
	});
	});


$(document).ready(function() /*控制切换不同的页面*/
{
    $.featureList
    (
        $("#tabs li a"),
        $("#output li"),
        {
            start_item:0
        }
    );
});

