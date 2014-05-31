//上层控制器，负责载入各个插件，完成相应的功能；负责页面部分区域的初始化显示；负责用户触发动作，调用相应插件的对应函数
$(function(){
  	var searchRegion = {                                 //搜索区展示
  		wWidth :         $(window).width(),
  	    search :         $('div.search'),
  	    displaySearch : function(){                       
  	        this.search.css({
  	            "width":(this.wWidth-80) + "px"
  	        });             
  	    }                                               
  	};

  	var infoRegion = {                                  //信息区展示
  	    wWidth :         $(window).width(), 
  	    information :    $('div.information'), 
  	    displayInfo : function(){      
  	        this.information.css({
  	            "width":(this.wWidth-80) + "px"
  	        });
  	    }
  	};

    var contentBg = {                                  //背景图的显示
        wWidth :         $(window).width(),
        wHeight :        $(window).height(),
        centerbg :       $('div.center-bg-top'),
        contentbg :      $('div.content-bg'),
        displayBg : function(){
            this.centerbg.css({
                "height":(this.wHeight-30)*100/this.wHeight + "%"
            });
            this.contentbg.css({
                "width":(this.wWidth-80)+"px",
                "height":(this.wHeight-60)+"px",
                "background-size": (this.wWidth-80)+"px"+" "+(this.wHeight-60)+"px"
            });
        }
    };

  	var displayNavigate = {                               //分类导航的显示
		wHeight :        $(window).height(),
		times :          $('div.times'),
        categories :     $('div.categories'),
        timesUl :        $('.times > ul'),
        categoriesUl :   $('.categories > ul'),
        itemLi :         $('.item > li'),
        containerLi :    $('.container > li'),
        timesLi :        $('.times > ul > li'),
        categoriesLi :   $('.categories > ul > li'),
        timesA :         $('.times > ul > li > a'),
        categoriesA :    $('.categories > ul > li > a'),
        timesNum : function(){                           
            return this.timesUl.children().length;
        },
        categoriesNum : function(){
            return this.categoriesUl.children().length;
        },
        timesPerheight : function(){
            return Math.floor((this.wHeight-60)/this.timesNum());
        },
        categoriesPerheight : function(){
            return Math.floor((this.wHeight-60)/this.categoriesNum());
        },
        timesSpace : function(){
            return (this.wHeight-60-this.timesPerheight()*this.timesNum())/2;
        },
        categoriesSpace : function(){
            return (this.wHeight-60-this.categoriesPerheight()*this.categoriesNum())/2;
        },
        navigationHeight : function(){               //导航区高度计算                             
            this.times.css({
                "height":(this.wHeight-60) +"px"
            });
            this.categories.css({
                "height":(this.wHeight-60) +"px"
            });
            this.times.children().first().css({
                "padding-top":this.timesSpace() +"px"
            });
            this.categories.children().first().css({
                "padding-top":this.categoriesSpace() +"px"
            });
            this.timesLi.css({
                "height":this.timesPerheight() + "px"
            });
            this.timesA.css({
                "line-height":this.timesPerheight() + "px"
            });
            this.categoriesLi.css({
                "height":this.categoriesPerheight() + "px"
            });
            this.categoriesA.css({
                "line-height":this.categoriesPerheight() + "px"
            }); 
        }               
  	};

    var contentLiHeight = {                                          //内容区列表高、宽计算
        body :           $('body'),                                           
        wWidth :         $(window).width(),
        wHeight :        $(window).height(),
        wrapper :        $('div.wrapper'),
        container :      $('ul.container'),
        containerLi :    $('.container > li'),
        liHeight : function(ed){         //通过判断被点击元素的父元素，来设置列表的高
            if(ed.parents('.times').length > 0){
                this.timesContainerLi();
            }
            else if(ed.parents('.categories').length > 0){
                this.categoriesContainerLi();
            }
        },
        timesContainerLi : function(){      //时间分类列表高、宽计算方法
            this.wrapper.css({
                "height":(this.wHeight-60) + "px",
                "padding-top":displayNavigate.categoriesSpace() + "px",
                "background-color":"rgba(0, 0, 0, 0.8)",
                "border-bottom":"1px solid #4c4c4c",
                "border-top":"1px solid #4c4c4c"
            });
            this.containerLi.css({
                "height":displayNavigate.categoriesPerheight() + "px",
                "min-height":displayNavigate.categoriesPerheight() + "px",
                "line-height":displayNavigate.categoriesPerheight() + "px",
                "box-sizing":"border-box",
                "border-bottom":"1px solid #202020"
            });
            this.container.children().last().css({
                "border-bottom": 0 + "px"
            });
        },
        categoriesContainerLi : function(){    //国学分类列表高、宽计算方法
            this.wrapper.css({
                "height":(this.wHeight-60) + "px",
                "padding-top":displayNavigate.timesSpace() + "px",
                "background-color":"rgba(0, 0, 0, 0.8)",
                "border-bottom":"1px solid #4c4c4c",
                "border-top":"1px solid #4c4c4c"
            });
            this.containerLi.css({
                "height":displayNavigate.timesPerheight() + "px",
                "min-height":displayNavigate.categoriesPerheight() + "px",
                "line-height":displayNavigate.timesPerheight() + "px",
                "box-sizing":"border-box",
                "border-bottom":"1px solid #202020"
            });
            this.container.children().last().css({
                "border-bottom": 0 + "px"
            });
        }
    };

  	var clickEvent = {                              //点击事件类
  		body :             $('body'),
        wWidth :           $(window).width(),                
        wHeight :          $(window).height(),   
        wrapper :          $('div.wrapper'),
        itemLi :           $('.item > li'),
        containerLi :      $('.container > li'),
  		newContent :       $('<div></div>'),
  		angles :           $('div.angle'),
        information :      $('div.information'),  
        clickNavigation : function(){               //分类导航点击事件
            var me = this;                                    
            me.itemLi.click(function(){    
                me.newContent.hide();        
                var ed = $(this);
                contentLiHeight.liHeight(ed);
                routeNavigate.controlInter(ed);
                routeNavigate.clickControl(ed);
            });
        },

        clickContent : function(){                  //内容区点击事件 
            var me = this;
            me.containerLi.click(function(){
                routeNavigate.containerLiFullShow();
                displayContent.show["ss"]($(this));
                displayContent.hide["sh"]($(this).siblings());
            });
        },

        clickQuadrangle : function(){                //四角区点击事件  
            var me = this;  
            me.angles.click(function(){    
                me.wrapper.append(me.newContent);
                me.newContent.css({
                    "height":(me.wHeight-60) + "px",
                    "width":(me.wWidth-80) + "px",
                    "position":"absolute",
                    "top":30+"px",
                    "left":40+"px",
                    "background-color":"#faff72"
                }).show();
                routeNavigate.unTrigger(me.itemLi);
                displayContent.hide["ch"](me.containerLi); 
            });            
        }
             
    };

    var focusEvent = {                                 //聚焦事件类
      	wWidth :          $(window).width(), 
        searchText :      $('#search-text'),
        searchfocusEvent : function(){           //搜索区的聚焦事件
            var me = this;                                         
            me.searchText.focus(function(){  
                me.searchText.attr("value"," ");
            }).blur(function(){
                me.searchText.attr("value","点击此处搜索...");
            }).css({
                "width":(me.wWidth-115) + "px"
            });
        }
    };

    searchRegion.displaySearch();               //搜索区显示
    infoRegion.displayInfo();                   //信息区显示
    displayNavigate.navigationHeight();         //导航区显示
    contentBg.displayBg();                      //内容区背景显示
    clickEvent.clickQuadrangle();               //四角区点击事件
    clickEvent.clickNavigation();               //导航区点击事件
    clickEvent.clickContent();                  //内容区点击事件
    focusEvent.searchfocusEvent();              //搜索区聚焦事件
})