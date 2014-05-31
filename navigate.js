//分类导航管理插件，当元素被点击时，用于记录被点击状态；控制状态切换；控制内容区的显示隐藏；内容区列表生成
;(function($){
	$.routeNavigate = function(options){                                    //其中参数ed为被点击元素

		var defaults = {                                                    //默认属性                
            container :      $('ul.container'),
            containerLi :    $('.container > li')
        };

        var options = $.extend(defaults,options);                           //属性扩展，默认为defaults

		$.navigate = {                                                      //分类导航区    
                                                                                         
            controlInter : function(ed){      //交互控制器方法

                if(ed.attr("class") == "clicked"){  
                    if(ed.parents("div").siblings().children(".item").has(".clicked").text()){
                        $.contentShow.containerShow(options.containerLi);
                        $.contentShow.containerShow(options.container);
                    }
                    else{
                        $.contentShow.containerHide(options.containerLi);
                        $.contentShow.containerHide(options.container);
                    }
                }
                else{     
                    var $showli = $(".container > li:visible");
                    var index = $showli.index();
                    var fullConLi = options.containerLi.eq(ed.index());
                    var disConLi = options.containerLi.eq(ed.index()).siblings();
                    if(ed.parents("div").siblings().children(".item").has(".clicked").text()){  
                        if(ed.parents("ul").has(".clicked").text()){     
                            $.contentLiHeight.containerLiFullShow();
                            $.contentShow.containerShow(fullConLi);
                            $.contentShow.containerHide(disConLi);
                            fullConLi.css({"height":"auto","border-top":0 + "px"});
                        }
                        else{
                            $.contentLiHeight.containerLiFullShow();   
                            $.contentShow.containerShow(fullConLi);
                            $.contentShow.containerHide(disConLi);
                            fullConLi.css({"height":"auto","border-top":0 + "px"});
                        }
                    }
                    else{     
                        $.contentShow.containerShow(options.containerLi);
                        $.contentShow.containerShow(options.container);
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
                ed.siblings().removeClass("clicked");
            },
            unTrigger : function(ed){    //取消触发功能方法
                ed.removeClass("clicked");
            }
        };
	};

})(jQuery);
