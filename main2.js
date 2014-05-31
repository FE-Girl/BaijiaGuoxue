(function(){
      
      var $wrapper = $(".wrapper");
      var $container = $(".container");
      var $containerLi = $(".container > li");
      var $search = $('.search');
      var $searchText = $('#search-text');
      var $itemLi = $('.item > li');
      var $times = $('.times');
      var $categories = $('.categories');
      var $timesUl = $('.times > ul');
      var $categoriesUl = $('.categories > ul');
      var $timesLi = $('.times > ul > li');
      var $categoriesLi = $('.categories > ul > li');
      var $timesA = $('.times > ul > li > a');
      var $categoriesA = $('.categories > ul > li > a');
      var $angle = $(".angle");
      var $information = $('.information'); 

      var wHeight = $(window).height();
      var wWidth = $(window).width();
      var leftNum = $timesUl.children().length;
      var rightNum = $categoriesUl.children().length;
      var leftPerheight = Math.floor((wHeight-60)/leftNum);
      var rightPerheight = Math.floor((wHeight-60)/rightNum);
      var leftSpace = (wHeight-60-leftPerheight*leftNum)/2;
      var rightSpace = (wHeight-60-rightPerheight*rightNum)/2;

      var mainAction = {

         init:function(){   //初始化
            this.navigationHeight();
            this.bindEvent();
         },
         navigationHeight:function(){   //分类导航高度
            $wrapper.css({
                "padding-top":leftSpace +"px"
            });
            $times.css({
                "padding-top":leftSpace +"px",
                "height":(wHeight-60) +"px"
            });
            $categories.css({
                "padding-top":rightSpace +"px",
                "height":(wHeight-60) +"px"
            });
            $timesLi.css({
                "height":leftPerheight + "px"
            });
            $timesA.css({
                "line-height":leftPerheight + "px"
            });
            $categoriesLi.css({
                "height":rightPerheight + "px"
            });
            $categoriesA.css({
                "line-height":rightPerheight + "px"
            });//end of 分类导航高度
                
            $search.css({
                "width":(wWidth-80) + "px"
            });
            $information.css({
                "width":(wWidth-80) + "px"
            });
         },
         bindEvent:function(){   //事件绑定方法
            this.clickNavigation();
            this.clickContent();
            this.clickFocus();
            this.clickQuadrangle();
         },
         clickNavigation:function(){   //分类导航点击方法
            var me = this;
            $itemLi.click(function(){             
              var a = $(this);
              me.controlInter(a);
              me.controlTrigger(a);
              me.liHeight(a);
            });
         },
         controlInter:function(a){   //交互控制器方法
            if(a.attr("class") == "clicked"){  
               if(a.parents("div").siblings().children(".item").has(".clicked").text()){
                   this.containerShow($containerLi);
                   this.containerShow($container);
               }
               else{
                   this.containerHide($containerLi);
                   this.containerHide($container);
               }
            }
            else{     
               var $showli = $(".container > li:visible");
               var index = $showli.index();
               if(a.parents("div").siblings().children(".item").has(".clicked").text()){  
                  if(a.parents("ul").has(".clicked").text()){  
                     this.containerLi(a,$containerLi);
                  }
                  else{    
                     this.containerLi(a,$containerLi);
                  }
               }
               else{     
                  this.containerShow($containerLi);
                  this.containerShow($container);
               }
            }
         },
         controlTrigger:function(a){   //控制器方法
            if(a.attr("class") == "clicked"){
               this.unTrigger(a);
            }
            else{
              this.trigger(a);
            }
         },
         trigger:function(a){    //触发功能方法
            a.addClass("clicked");
            a.siblings().removeClass("clicked");
         },
         unTrigger:function(a){    //取消触发功能方法
            a.removeClass("clicked");
         },
         containerShow:function(content){   //内容区显示方法
            content.show();
         },
         containerHide:function(content){    //内容区隐藏方法
            content.hide();
         },
         containerLi:function(a,content){    //内容区列表显示方法
            content.eq(a.index()).css({
              // "height":(wHeight-60) + "px",    高度自适应
              "border-top":0 + "px"
            }).show();
            content.eq(a.index()).siblings().hide();
         },
         liHeight:function(a){      //内容区列表高、宽计算方法
            if(a.parents('.times').length > 0){
               $wrapper.css({
                  "height":(wHeight-60) + "px",
                  "padding-top":rightSpace + "px",
                  "background-color":"rgba(0, 0, 0, 0.5)"
               });
               $containerLi.css({
                  "height":rightPerheight + "px",
                  "box-sizing":"border-box",
                  "border-top":"1px solid #666"
               });
               $container.children().first().css({
                  "border-top": 0 +"px"
               });
               $container.css({
                  "width":(wWidth-80) + "px"
               });
            }
            else if(a.parents('.categories').length > 0){
               $wrapper.css({
                  "height":(wHeight-60) + "px",
                  "padding-top":leftSpace + "px",
                  "background-color":"rgba(0, 0, 0, 0.5)"
               });
               $containerLi.css({
                  "height":leftPerheight + "px",
                  "box-sizing":"border-box",
                  "border-top":"1px solid #666"
               });
               $container.children().first().css({
                  "border-top": 0 +"px"
               });
               $container.css({
                  "width":(wWidth-80) + "px"
               });
            }
         },
         clickContent:function(){     //内容区点击展开方法
            $containerLi.click(function(){
                $wrapper.css({
                  "height":"auto"
                });
                $containerLi.css({
                  "height":"auto",   
                  "border-top":0 + "px",
                  "margin-bottom":30+"px"
                });
                $(this).siblings().hide();
            });
         },
         clickFocus:function(){    //搜索框聚焦、失焦方法
            $searchText.focus(function(){
               $searchText.attr("value"," ");
            }).blur(function(){
               $searchText.attr("value","在此搜索...");
            }).css({
               "width":(wWidth-122) + "px",
               "color":"#fff"
            });
         },
         clickQuadrangle:function(){    //四角区点击事件方法
            var me = this;
            $angle.click(function(){ 
                $itemLi.removeClass("clicked");
                me.containerHide($containerLi);
                me.containerShow($container);
            });            
         }
      };
      mainAction.init();
})()