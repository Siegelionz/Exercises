$(function($){
	//调用fullpage插件
	$("#fullpage").fullpage({
		//设置每个页面的背景颜色
		sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#fed", "#d04759", "#84d9ed", "#8ac060"],
		//设置显示导航按钮
		navigation:true,
        scrollingSpeed:1500,
        //当我们滚动滑轮时让页面实现一系列效果
        //当进入某个屏时
        afterLoad:function(){
            //当进入每个屏时，给目前的加一个class
            $(this).addClass('class');
            $('.down').fadeIn();
            $('.class ..screen05 .hand').on('animationend',function(){
            	$('.screen05 .mouse .mouse02').show();
            	$('.screen05 .card .sofa').addClass('animation');
            })
                $('div.class div.screen02 div.search').on('transitionend',function(){
                        $('div.screen02 div.search img.key').fadeIn(400,function(){
                            $('div.class div.screen02 div.search').addClass('animation')
                            
                                    $('div.class div.screen02 div.goods').addClass('animation')  
                            
                        });

                })
        },
        //当从一个屏到另一个屏之间
        onLeave:function(index,nextindex,direction){
        	$('.down').fadeOut();
                if(index == 2 && nextindex == 3){
                    $('div.screen02 div.sofa').addClass('animation')
                    $('div.screen02 div.sofa.animation').on('animationend',function(){
                        $('div.screen03 div.val img:last-child').show();
                        $('div.screen03 div.btn img:last-child').show();
                    });
                }else if(index == 3 && nextindex == 4){
                    $('#fullpage div.screen04 div.cloud').addClass('animation');
                    $('#fullpage div.screen03 div.sofa').addClass('animation')
                    .on('animationend',function(){
                        $('#fullpage div.screen04 div.shoppcar img.sofa').show(20,function(){
                            $('#fullpage div.screen04 div.text img:last-child').fadeIn(function(){
                                $('#fullpage div.screen04 div.card').fadeIn(function(){
                                    $('#fullpage div.screen04 div.card img.news').fadeIn();
                                });
                            });
                        });
                    });
                }else if(index == 5 && nextindex ==6){
                    $('#fullpage div.srceen06 img.cloud1').addClass('animation');
                    $('#fullpage div.srceen06 img.cloud2').addClass('animation');
                    $('#fullpage div.srceen06 div.sofa').addClass('animation')
                    $('#fullpage div.srceen06 div.box').addClass('animation')
                    .on('animationend',function(){
                        $('#fullpage div.srceen06 div.box.animation').addClass('down')
                        .on('animationend',function(){
                            $('#fullpage div.srceen06 div.car img.address').fadeIn();
                            $('#fullpage div.srceen06').addClass('animation')
                            .on('animationend',function(){
                                $('#fullpage div.srceen06 div.car img.worker').addClass('animation')
                                .on('animationend',function(){
                                    $('#fullpage div.srceen06 div.car img.say').fadeIn();
                                    $('#fullpage div.srceen06 div.car img.door').fadeIn(function(){
                                        $('#fullpage div.srceen06 div.car img.person').addClass('animation')
                                    });
                                })
                            });
                        })
                    })
                }
        }
	})
})
