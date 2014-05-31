//内容区展示插件，其功能为内容区的展示
var displayContent = {                                             //内容区的展示
    wrapper :        $('div.wrapper'),                                         
    wWidth :         $(window).width(),
    wHeight :        $(window).height(),
    show : {                                                       //显示动画
        ts : function(content){
            content.stop().animate({width:(displayContent.wWidth-80)+"px"},1000).show();
        },
        ss : function(content){
            content.stop().animate({minHeight:(displayContent.wHeight-60)+"px",Height:(displayContent.wHeight-60)+"px"},1000).show();
        },
        cs : function(content){
            content.show();
        }
    },
    hide : {                                                       //隐藏动画
        th : function(content){
            content.stop().animate({width:"0px"},1000,function(){
                displayContent.wrapper.css({"display":"none"});
            });
        },
        sh : function(content){
            content.stop().animate({height:"0px",minHeight:"0PX"},1000,function(){
                content.css({"display":"none"});
            });
        },
        ch : function(content){
            content.hide();
        }
    }
};