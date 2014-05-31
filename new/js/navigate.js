//分类导航管理插件，当元素被点击时，用于记录被点击状态；控制状态切换；控制内容区的显示隐藏
var routeNavigate = {                                                                     //分类导航区 
    body :           $('body'),                                                      
    wrapper :        $('div.wrapper'),                                                     //默认属性                
    container :      $('ul.container'),
    containerLi :    $('.container > li'),
    timesUl :        $('.times > ul'),
    categoriesUl :   $('.categories > ul'),
    information :    $('div.information'),
    contentbg :      $('div.content-bg'),
    wHeight :        $(window).height(),
    ctCoord : { 
        timesLi :        $('.times > ul > li'),
        categoriesLi :   $('.categories > ul > li'), 
        t : function(){
            var tcld = this.timesLi.filter(".clicked");
            var tarr = Array.prototype.slice.call(this.timesLi);
            return jQuery.inArray(tcld[0],tarr);
        },
        c : function(){
            var ccld = this.categoriesLi.filter(".clicked");
            var carr = Array.prototype.slice.call(this.categoriesLi);
            return jQuery.inArray(ccld[0],carr);
        }
    },                                                                            
    controlInter : function(ed){      //交互控制器方法
        var me = this;
        var tn = me.ctCoord["t"]();
        var cn = me.ctCoord["c"]();
        if(ed.attr("class") == "clicked"){
            if(ed.parents('.times').length > 0){
                if(cn > -1){
                    displayContent.show["cs"](this.containerLi);
                    displayContent.show["cs"](this.container); 
                    me.information.css({"background-color":"transparent"});
                } 
                else{
                    displayContent.hide["th"](this.containerLi);
                    displayContent.hide["th"](this.container);
                    this.wrapper.css({"float":"left"});
                    this.contentbg.css({"float":"left"});
                    this.contentbg.removeClass("content-bg-r");
                    this.contentbg.addClass("content-bg");
                    displayContent.hide["th"](this.wrapper);
                    displayContent.hide["th"](this.contentbg);
                }
            }
            else if(ed.parents('.categories').length > 0){
                if(tn > -1){
                    displayContent.show["cs"](this.containerLi);
                    displayContent.show["cs"](this.container);
                    me.information.css({"background-color":"transparent"});
                }
                else{
                    displayContent.hide["th"](this.containerLi);
                    displayContent.hide["th"](this.container);
                    this.wrapper.css({"float":"right"});
                    this.contentbg.removeClass("content-bg");
                    this.contentbg.addClass("content-bg-r");
                    displayContent.hide["th"](this.wrapper);
                    displayContent.hide["th"](this.contentbg);
                }
            }
        }
        else{
            var $showli = $(".container > li:visible");
            var index = $showli.index();
            var fullConLi = this.containerLi.eq(ed.index());
            var disConLi = this.containerLi.eq(ed.index()).siblings();
            if(ed.parents('.times').length > 0){
                if(cn > -1){
                    if(tn > -1){
                        this.containerLiFullShow();
                        displayContent.show["cs"](fullConLi);
                        displayContent.hide["ch"](disConLi);
                    }
                    else{
                        this.containerLiFullShow();   
                        displayContent.show["ss"](fullConLi);
                        displayContent.hide["sh"](disConLi);
                    }
                }
                else{
                    displayContent.show["ts"](this.containerLi);
                    displayContent.show["ts"](this.container);
                    this.wrapper.css({"float":"left"});
                    this.contentbg.css({"float":"left"});
                    this.contentbg.removeClass("content-bg-r");
                    this.contentbg.addClass("content-bg");
                    displayContent.show["ts"](this.wrapper);
                    displayContent.show["ts"](this.contentbg);
                }
            }
            else if(ed.parents('.categories').length > 0){
                if(tn > -1){
                    if(cn > -1){
                        this.containerLiFullShow();
                        displayContent.show["cs"](fullConLi);
                        displayContent.hide["ch"](disConLi);
                    }
                    else{
                        this.containerLiFullShow();   
                        displayContent.show["ss"](fullConLi);
                        displayContent.hide["sh"](disConLi);
                    }
                }
                else{
                    displayContent.show["ts"](this.containerLi);
                    displayContent.show["ts"](this.container);
                    this.wrapper.css({"float":"right"});
                    this.contentbg.removeClass("content-bg");
                    this.contentbg.addClass("content-bg-r");
                    displayContent.show["ts"](this.wrapper);
                    displayContent.show["ts"](this.contentbg);
                }
            }
        }
    },
    clickControl : function(ed){   //控制器方法
        if(ed.attr("class") == "clicked"){
            this.unTrigger(ed);
        }
        else{
            this.trigger(ed);
        }
    },
    trigger : function(ed){      //触发功能方法
        ed.addClass("clicked");
        ed.children().css({"color":"rgba(255, 255, 255, 1)"});
        ed.removeClass("itemli");
        ed.siblings().removeClass("clicked");
        ed.siblings().addClass("itemli");
        ed.siblings().children().css({"color":"rgba(255, 255, 255, 0.7)"});
    },
    unTrigger : function(ed){    //取消触发功能方法
        ed.removeClass("clicked");
        ed.addClass("itemli");
        ed.children().css({"color":"rgba(255, 255, 255, 0.7)"});
    },
    containerLiFullShow : function(){  //内容区列表全屏计算方法
        this.wrapper.css({ 
            "min-height":(this.wHeight-60) + "px",
            "height":"auto",
            "padding-bottom": 20 + "px"
        });
        this.containerLi.css({
            "height":"auto",
            "width": 100 + "%",
            "border-bottom": 0 + "px"
        });
        this.information.css({
            "background-color":"#eeeeee"
        });
    }
};
