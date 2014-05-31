var mainAction =  (function(){

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
      var $newContent = $("<div></div>"); 
       

      var wHeight = window.innerHeight;
      var wWidth = window.innerWidth;
      var leftNum = $timesUl.children().length;
      var rightNum = $categoriesUl.children().length;
      var leftPerheight = Math.floor((wHeight-60)/leftNum);
      var rightPerheight = Math.floor((wHeight-60)/rightNum);
      var leftSpace = (wHeight-60-leftPerheight*leftNum)/2;
      var rightSpace = (wHeight-60-rightPerheight*rightNum)/2;
  
      function init(){  //初始化函数
          navigationHeight();
          bindEvent();
      }

      function navigationHeight(){  //分类导航高度的设置
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
      }
       
      function bindEvent(){  //事件绑定函数
          clickNavigation();
          clickContent();
          clickFocus();
          clickQuadrangle();
      }

      function clickNavigation(){  //分类导航点击函数
          $itemLi.click(function(){
              $newContent.hide();          
              var a = $(this);
              controlInter(a);
              controlTrigger(a);
              liHeight(a);
          });
      }

      function controlInter(a){     //交互控制器   
          if(a.attr("class") == "clicked"){  
            if(a.parents("div").siblings().children(".item").has(".clicked").text()){
              containerShow($containerLi);
              containerShow($container);
            }
            else{
              containerHide($containerLi);
              containerHide($container);
            }
          }
          else{     
            var $showli = $(".container > li:visible");
            var index = $showli.index();
            if(a.parents("div").siblings().children(".item").has(".clicked").text()){  
              if(a.parents("ul").has(".clicked").text()){  
                  containerLi(a,$containerLi);
              }
              else{    
                  containerLi(a,$containerLi);
              }
            }
            else{     
              containerShow($containerLi);
              containerShow($container);
            }
          }
      }

      function controlTrigger(a){    //控制函数     
          if(a.attr("class") == "clicked"){
              unTrigger(a);
          }
          else{
              trigger(a);
          }
      }

      function trigger(a){  //触发功能函数函数
          a.addClass("clicked");
          a.siblings().removeClass("clicked");
      }

      function unTrigger(a){  //取消触发功能函数
          a.removeClass("clicked");
      }

      function containerShow(content){ //内容区显示函数
          content.show();
      }

      function containerHide(content){  //内容区隐藏函数
          content.hide();
      }

      function containerLi(a,content){   //内容区列表显示函数
          content.eq(a.index()).css({
              // "height":(wHeight-60) + "px",    高度自适应     
              "border-top":0 + "px"
          }).show();
          content.eq(a.index()).siblings().hide();
      }

      function liHeight(a){        //内容区列表高、宽计算函数
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
      }

      function clickContent(){  //内容区点击展开函数
          $containerLi.click(function(){
             $wrapper.css({
               "height":"auto"
             });
             $containerLi.css({
               "height":"auto",    //高度自适应
               "border-top":0 + "px",
               "margin-bottom":30+"px"                          
             });
             $(this).siblings().hide();
          });
      }

      function clickFocus(){   //搜索框聚焦、失焦函数
          $searchText.focus(function(){
             $searchText.attr("value"," ");
          }).blur(function(){
             $searchText.attr("value","在此搜索...");
          }).css({
             "width":(wWidth-122) + "px",
             "color":"#fff"
          });
      }

      function clickQuadrangle(){                //四角区点击事件函数
          
          $wrapper.append($newContent);  
          $angle.click(function(){
            $newContent.css({
                "height": (wHeight-60) + "px",
                "width":(wWidth-80) + "px",
                "position":"absolute",
                "top":0+"px",
                "left":0+"px",
                "background-color":"#faff72"
           }).show();
            $itemLi.removeClass("clicked");
            // containerHide($containerLi);
          });
      }

      return{
          run:init
      }

})();

mainAction.run();