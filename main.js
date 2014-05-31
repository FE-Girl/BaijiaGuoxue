 $(function(){
        
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        var leftNum = $('.times > ul').children().length;
        var rightNum = $('.categories > ul').children().length;
        var leftPerheight = Math.floor((wHeight-60)/leftNum);
        var rightPerheight = Math.floor((wHeight-60)/rightNum);
        var leftSpace = wHeight-60-leftPerheight*leftNum;
        var rightSpace = wHeight-60-rightPerheight*rightNum;
         
        $('#wrapper').css({
            "padding-top":leftSpace/2 +"px"
         });
        $('.times').css({
          "padding-top":leftSpace/2 +"px",
            "height":(wHeight-60) +"px"
        });
        $('.categories').css({
          "padding-top":rightSpace/2 +"px",
            "height":(wHeight-60) +"px"
        });
        $('.times > ul > li').css({
          "height":leftPerheight + "px"
        });
         $('.times > ul > li > a').css({
            "line-height":leftPerheight + "px"
         });
        $('.categories > ul > li').css({
          "height":rightPerheight + "px"
        });
        $('.categories > ul > li > a').css({
            "line-height":rightPerheight + "px"
        });//end of 分类导航高度
            
        $('.search').css({
            "width":(wWidth-80) + "px"
        });
         $('.information').css({
            "width":(wWidth-80) + "px"
         });

         //一、二级，点击事件

         var $container = $(".container");
         var $containerLi = $(".container > li");
         
         function containershow(){
            $containerLi.show();
            $container.show();
         }
         function containerhide(){
            $containerLi.hide();
            $container.hide();
         }
         
         $(".item > li").click(function(){ 
          
          $content.hide();
            //中间li内容的高度设置
            if($(this).parents('.times').length > 0){
               $('#wrapper').css({
                  "height":(wHeight-60) + "px",
                  "padding-top":rightSpace/2 + "px"
               });
               $('.container > li').css({
                  "height":rightPerheight + "px",
                  "box-sizing":"border-box",
                  "border-top":"1px solid #666"
               });
               $('.container').children().first().css({
                  "border-top": 0 +"px"
               });
               $('.container').css({
                  "width":(wWidth-80) + "px"
               });
            }
            else if($(this).parents('.categories').length > 0){
               $('#wrapper').css({
                  "height":(wHeight-60) + "px",
                  "padding-top":leftSpace/2 + "px"
               });
               $('.container > li').css({
                  "height":leftPerheight + "px",
                  "box-sizing":"border-box",
                  "border-top":"1px solid #666"
               });
               $('.container').children().first().css({
                  "border-top": 0 +"px"
               });
               $('.container').css({
                  "width":(wWidth-80) + "px"
               });
            }

            //----------------------------------------------点击事件的各种判断


            
            var $towards = $(this).parents("div").siblings().children(".item").children("li");
            var $showli = $(".container > li:visible");
            var index = $showli.index();
            
            if($(this).attr("class") == "clicked"){  //判断this之前有没有别点击过

              if($towards.parents("ul").has(".clicked").text()){  //判断this对面有没有别点击过的元素

                $(this).removeClass("clicked");
                containershow();
              }
              else{
                $(this).removeClass("clicked");
                containerhide();
              }  
            }
            else{
              if($towards.parents("ul").has(".clicked").text()){  //判断this对面有没有被点击元素

                if($(this).parents("ul").has(".clicked").text()){  //判断this的同胞有没有被点击元素

                  if($(this).siblings(".clicked").index() == index){   //判断this的被点击的同胞元素的索引是否与中间显示的单列表的索引相同
                    
                    $(this).addClass("clicked");
                    $(this).siblings().removeClass("clicked");
                    $containerLi.eq($(this).index()).css({
                      "height":(wHeight-60) + "px",
                      "border-top":0 + "px"
                    }).show();
                    $containerLi.eq($(this).index()).siblings().hide();
                  }
                  else{
                    $(this).addClass("clicked");
                    $(this).siblings().removeClass("clicked");
                    $towards.removeClass("clicked");
                    containershow();
                  }
                }
                else{ 
                  $(this).addClass("clicked");
                  $(this).siblings().removeClass("clicked");
                  $containerLi.eq($(this).index()).css({
                    "height":(wHeight-60) + "px",
                    "border-top":0 + "px"
                  }).show();
                  $containerLi.eq($(this).index()).siblings().hide();
                }
              }
              else{
                $(this).addClass("clicked");
                $(this).siblings().removeClass("clicked");
                containershow();
              }

            }

        });
  
          //中间点击展开
          $('.container > li').click(function(){
             $('.container > li').css({
               "height":(wHeight-60) + "px",
               "border-top":0 + "px"
             });
             $(this).siblings().hide();
           });

         //搜索框
         var $search = $('#search-text');

         $search.focus(function(){
            $search.attr("value"," ");
         });
         $search.blur(function(){
            $search.attr("value"," 在此搜索...");
         });
         $search.css({
            "width":(wWidth-122) + "px",
            "color":"#fff"
         });

         //四个角的点击事件

         var $wrapper = $("#wrapper");
         var $content = $("<div></div>");
         $wrapper.append($content);

         $(".logo").click(function(){
           $content.css({
            "height": (wHeight-60) + "px",
            "width":(wWidth-80) + "px",
            "position":"absolute",
            "top":0+"px",
            "left":0+"px",
            "background-color":"#faff72"
           }).show();
           $(".item > li").removeClass("clicked");
         });
         $(".user").click(function(){
           $content.css({
            "height": (wHeight-60) + "px",
            "width":(wWidth-80) + "px",
            "position":"absolute",
            "top":0+"px",
            "left":0+"px",
            "background-color":"#00e500"
           }).show();
           $(".item > li").removeClass("clicked");
         });
         $(".about").click(function(){
           $content.css({
            "height": (wHeight-60) + "px",
            "width":(wWidth-80) + "px",
            "position":"absolute",
            "top":0+"px",
            "left":0+"px",
            "background-color":"#f00056"
           }).show();
           $(".item > li").removeClass("clicked");
         });
         $(".lunar-times").click(function(){
           $content.css({
            "height": (wHeight-60) + "px",
            "width":(wWidth-80) + "px",
            "position":"absolute",
            "top":0+"px",
            "left":0+"px",
            "background-color":"#3eede7"
           }).show();
           $(".item > li").removeClass("clicked");
         });

});
