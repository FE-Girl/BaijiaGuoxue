;(function($){
    $.indexApp = function(options){ 

        var defaults = {                                                    //默认属性
           body :           $('body'),
           wWidth :         $(window).width(),                 
           wHeight :        $(window).height(),
           newContent :     $('<div></div>'),
           angles :         $('div.angle'),
           searchText :     $('#search-text'),
           wrapper :        $('div.wrapper'),                                                            
           search :         $('div.search'),
           information :    $('div.information'),
           times :          $('div.times'),
           categories :     $('div.categories'),
           container :      $('ul.container'),
           timesUl :        $('.times > ul'),
           categoriesUl :   $('.categories > ul'),
           itemLi :         $('.item > li'),
           containerLi :    $('.container > li'),
           timesLi :        $('.times > ul > li'),
           categoriesLi :   $('.categories > ul > li'),
           timesA :         $('.times > ul > li > a'),
           categoriesA :    $('.categories > ul > li > a'),
           containerA :     $('.container > li > a'),
        };

        var options = $.extend(defaults,options);                           //属性扩展，默认为defaults

        $.clickEvent = {                                                    //点击事件类
           clickNavigation : function(){                                    //分类导航点击事件
               options.itemLi.click(function(){    
                 options.newContent.hide();        
                 var a = $(this);
                 $.navigate.controlInter(a);
                 $.navigate.clickState(a);
               });
           },

           clickContent : function(){                                       //内容区点击事件 
               options.containerLi.click(function(){
                  options.wrapper.css({
                    "height":"auto",
                    "min-height":(options.wHeight-60) + "px",
                    "padding-bottom":30 + "px"
                  });
                  options.body.css({
                    "margin-bottom":30+"px"
                  });
                  $(this).css({
                    "height":"auto",  
                    "border-top":0 + "px"
                  });
                  $(this).siblings().hide();
               });
           },

           clickQuadrangle : function(){                                    //四角区点击事件    
               options.angles.click(function(){ 
                  options.wrapper.append(options.newContent);
                  options.newContent.css({
                      "height":(options.wHeight-60) + "px",
                      "width":(options.wWidth-80) + "px",
                      "position":"absolute",
                      "top":0+"px",
                      "left":0+"px",
                      "background-color":"#faff72"
                  }).show();
                  $.navigate.unTrigger(options.itemLi);
                  $.displayContent.containerHide(options.containerLi); 
               });            
           }
           
        };

        $.focusEvent = {                                                          //聚焦事件类
           searchfocusEvent : function(){                                         //搜索聚焦事件  
               options.searchText.focus(function(){  
                  options.searchText.attr("value"," ");
               }).blur(function(){
                  options.searchText.attr("value","在此搜索...");
               }).css({
                  "width":(options.wWidth-122) + "px",
                  "color":"#fff"
               });
           }

        };

        $.navigate = {                                                             //分类导航区    
           leftNum : function(){                             //分类导航的显示
                return options.timesUl.children().length;
           },
           rightNum : function(){
                return options.categoriesUl.children().length;
           },
           leftPerheight : function(){
                return Math.floor((options.wHeight-60)/this.leftNum());
           },
           rightPerheight : function(){
                return Math.floor((options.wHeight-60)/this.rightNum());
           },
           leftSpace : function(){
                return (options.wHeight-60-this.leftPerheight()*this.leftNum())/2;
           },
           rightSpace : function(){
                return (options.wHeight-60-this.rightPerheight()*this.rightNum())/2;
           },
           navigationHeight : function(){                               
                options.times.css({
                    "padding-top":this.leftSpace() +"px",
                    "height":(options.wHeight-60) +"px"
                });
                options.categories.css({
                    "padding-top":this.rightSpace() +"px",
                    "height":(options.wHeight-60) +"px"
                });
                options.timesLi.css({
                    "height":this.leftPerheight() + "px"
                });
                options.timesA.css({
                    "line-height":this.leftPerheight() + "px"
                });
                options.categoriesLi.css({
                    "height":this.rightPerheight() + "px"
                });
                options.categoriesA.css({
                    "line-height":this.rightPerheight() + "px"
                }); 
           },                                                                                                      
           controlInter : function(a){      //交互控制器方法
                if(a.attr("class") == "clicked"){  
                   if(a.parents("div").siblings().children(".item").has(".clicked").text()){
                       $.displayContent.containerShow(a,options.containerLi);
                       $.displayContent.containerShow(a,options.container);
                   }
                   else{
                       $.displayContent.containerHide(a,options.containerLi);
                       $.displayContent.containerHide(a,options.container);
                   }
                }
                else{     
                   var $showli = $(".container > li:visible");
                   var index = $showli.index();
                   if(a.parents("div").siblings().children(".item").has(".clicked").text()){  
                      if(a.parents("ul").has(".clicked").text()){  
                         $.displayContent.containerLiShow(a,options.containerLi);
                      }
                      else{    
                         $.displayContent.containerLiShow(a,options.containerLi);
                      }
                   }
                   else{     
                      $.displayContent.containerShow(a,options.containerLi);
                      $.displayContent.containerShow(a,options.container);
                   }
                }
           },
           clickState : function(a){   //控制器方法
                if(a.attr("class") == "clicked"){
                   this.unTrigger(a);
                }
                else{
                   this.trigger(a);
                }
           },
           trigger : function(a){    //触发功能方法
                a.addClass("clicked");
                a.siblings().removeClass("clicked");
           },
           unTrigger : function(a){    //取消触发功能方法
                a.removeClass("clicked");
           }
        };

        $.displayContent = {                                                      //内容区
                                                  
           liHeight : function(a){      //内容区列表高、宽计算方法
                if(a.parents('.times').length > 0){
                   this.timesContainerLi();
                }
                else if(a.parents('.categories').length > 0){
                   this.categoriesContainerLi();
                }
           },
           timesContainerLi:function(){    //时间分类列表高、宽计算方法
                options.wrapper.css({
                  "height":(options.wHeight-60) + "px",
                  "padding-top":$.navigate.rightSpace() + "px",
                  "background-color":"rgba(0, 0, 0, 0.5)"
                });
                options.containerLi.css({
                  "height":$.navigate.rightPerheight() + "px",
                  "box-sizing":"border-box",
                  "border-top":"1px solid #666"
                });
                options.container.children().first().css({
                  "border-top": 0 +"px"
                });
                options.container.css({
                  "width":(options.wWidth-80) + "px"
                });
           },
           categoriesContainerLi:function(){    //国学分类列表高、宽计算方法
                options.wrapper.css({
                  "height":(options.wHeight-60) + "px",
                  "padding-top":$.navigate.leftSpace() + "px",
                  "background-color":"rgba(0, 0, 0, 0.5)"
                });
                options.containerLi.css({
                  "height":$.navigate.leftPerheight() + "px",
                  "box-sizing":"border-box",
                  "border-top":"1px solid #666"
                });
                options.container.children().first().css({
                  "border-top": 0 +"px"
                });
                options.container.css({
                  "width":(options.wWidth-80) + "px"
                });
           },
           containerShow : function(a,c){   //内容区显示方法
                c.show();
                this.liHeight(a);
           },
           containerHide : function(a,c){    //内容区隐藏方法
                c.hide();
           },
           containerLiShow : function(a,c){  //内容区列表显示方法
                options.body.css({
                  "margin-bottom":30+"px"
                });
                options.wrapper.css({ 
                  "height":"auto",
                  "min-height":(options.wHeight-60) + "px",
                  "padding-bottom":30 + "px"
                });   
                c.eq(a.index()).css({
                  "height":"auto",  
                  "border-top":0 + "px"
                }).show();
                c.eq(a.index()).siblings().hide();
           }
        };

        $.search = {
           displaySearch : function(){   //搜索的显示                     
              options.search.css({
                  "width":(options.wWidth-80) + "px"
              });             
           }                                               
        };

        $.information = {       
           displayInfo : function(){       //信息的显示
              options.information.css({
                  "width":(options.wWidth-80) + "px"
              });
           }
        };
        // init();
          
    };
    // $.fn.indexApp = function(options) {
    //     return this.each(function() {
    //         new $.indexApp(this, options);
    //     });
    // }; 
// $.indexApp();
})(jQuery);
