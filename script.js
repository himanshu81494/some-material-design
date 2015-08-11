function slidecheck(){
    var mobile=$(window).width()<780?true:false,min=$('.slide img').height();
    $('.slide img').each(function(){
        if($(this).height<min){
            min=$(this).height();
        }
    });
    if(mobile)
    $('.slide').height(min);
}
$(document).ready(function(){
	var ink, d, x, y,c=0;
    slidecheck();
    var time=setInterval(function(){
        slidecheck();
        c++;
        if(c==10){
            clearInterval(time);
        }
    },2000);
    slidecheck();
    $(".ripple").click(function(e) {
        if ($(this).find(".ink").length === 0) {
            $(this).append("<span class='ink'></span>");
        }

        ink = $(this).find(".ink");
        ink.removeClass("animate");

        if (!ink.height() && !ink.width()) {
            d = Math.max($(this).width(), $(this).height());
            ink.css({
                "height": d,
                "width": d
            });
        }

        x = e.pageX - $(this).offset().left - ink.width() / 2;
        y = e.pageY - $(this).offset().top - ink.height() / 2;

        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");
    });
    $('.slide img').css({"left":"100%"});
    $('.slide img:nth-child(1)').css({"left":"0"}).addClass('curr');
    var i=1;
    $('.slide img').each(function(){
        $(this).attr('no',i);
        i++;
    });
    var year=new Date().getFullYear();
    $('.year').text(year);
    setInterval(function(){
        var curr=$('.curr').attr('no');
        var total=$('.slide img').length;
        var next=parseInt(curr)==total?1:parseInt(curr)+1;
        $('.curr').animate({"left":"-100%"},600).removeClass('curr');
        $('.slide img:nth-child('+next+')').animate({"left":"0px"},600).addClass('curr');
        setTimeout(function(){
            $('.slide img:nth-child('+curr+')').css({"left":"100%"});
        },700);
    },6000);
    $('.trig').click(function(){
        $('.nav').slideToggle(300);
    });
    $('.top').click(function(){
        $('html,body').animate({scrollTop:0});
    });
});
$(window).on("orientationchange",function(){
  slidecheck();
});
$(window).scroll(function(){
	var top=$(this).scrollTop();
	if(top>100){
		$('.header').css({"box-shadow":"0 0 8px #6d6d6d"});
	}
	else{
		$('.header').css({"box-shadow":"0 0 0px #6d6d6d"});
	}
});
