(function(){

      var init = {
         wWidth :         $(window).width(),                                                       //初始化
         wHeight :        $(window).height(),
         search :         $('.search'),
         information :    $('.information'),
         wrapInfoSearch : function(){
             this.search.css({
                  "width":(this.wWidth-80) + "px"
             });
             this.information.css({
                  "width":(this.wWidth-80) + "px"
             });
         }
      };
      
      var navigation = {                                                //分类导航区
         times :          $('.times'),
         categories :     $('.categories'),
         timesUl :        $('.times > ul'),
         categoriesUl :   $('.categories > ul'),
         itemLi :         $('.item > li'),
         timesLi :        $('.times > ul > li'),
         categoriesLi :   $('.categories > ul > li'),
         timesA :         $('.times > ul > li > a'),
         categoriesA :    $('.categories > ul > li > a'),
         
         init : {                                                       //分类导航区的初始化
             leftNum : function(){
                  return navigation.timesUl.children().length;
             },
             rightNum : function(){
                  return navigation.categoriesUl.children().length;
             },
             leftPerheight : function(){
                  return Math.floor((init.wHeight-60)/this.leftNum());
             },
             rightPerheight : function(){
                  return Math.floor((init.wHeight-60)/this.rightNum());
             },
             leftSpace : function(){
                  return (init.wHeight-60-this.leftPerheight()*this.leftNum())/2;
             },
             rightSpace : function(){
                  return (init.wHeight-60-this.rightPerheight()*this.rightNum())/2;
             },
             navigationHeight : function(){
                  navigation.times.css({
                      "padding-top":this.leftSpace() +"px",
                      "height":(init.wHeight-60) +"px"
                  });
                  navigation.categories.css({
                      "padding-top":this.rightSpace() +"px",
                      "height":(init.wHeight-60) +"px"
                  });
                  navigation.timesLi.css({
                      "height":this.leftPerheight() + "px"
                  });
                  navigation.timesA.css({
                      "line-height":this.leftPerheight() + "px"
                  });
                  navigation.categoriesLi.css({
                      "height":this.rightPerheight() + "px"
                  });
                  navigation.categoriesA.css({
                      "line-height":this.rightPerheight() + "px"
                  }); 
             }
         },                                     
         clickNavigation : function(){   //分类导航点击方法
              var me = this;
              this.itemLi.click(function(){
                quadrangle.newContent.hide();        
                var a = $(this);
                me.controlInter(a);
                me.controlTrigger(a);
              });
         },
         controlInter : function(a){    //交互控制器方法
              if(a.attr("class") == "clicked"){  
                 if(a.parents("div").siblings().children(".item").has(".clicked").text()){
                     this.containerShow(a,content.containerLi);
                     this.containerShow(a,content.container);
                 }
                 else{
                     this.containerHide(a,content.containerLi);
                     this.containerHide(a,content.container);
                 }
              }
              else{     
                 var $showli = $(".container > li:visible");
                 var index = $showli.index();
                 if(a.parents("div").siblings().children(".item").has(".clicked").text()){  
                    if(a.parents("ul").has(".clicked").text()){  
                       this.containerLiShow(a,content.containerLi);
                    }
                    else{    
                       this.containerLiShow(a,content.containerLi);
                    }
                 }
                 else{     
                    this.containerShow(a,content.containerLi);
                    this.containerShow(a,content.container);
                 }
              }
         },
         controlTrigger : function(a){   //控制器方法
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
         },
         containerShow : function(a,c){   //内容区显示方法
              c.show();
              content.liHeight(a);
         },
         containerHide : function(a,c){    //内容区隐藏方法
              c.hide();
         },
         containerLiShow : function(a,c){
              content.body.css({
                "margin-bottom":30+"px"
              });
              content.wrapper.css({ 
                "height":"auto",
                "min-height":(init.wHeight-60) + "px",
                "padding-bottom":30 + "px"
              });   
              c.eq(a.index()).css({
                "height":"auto",  
                "border-top":0 + "px"
              }).show();
              c.eq(a.index()).siblings().hide();
         },
    };

    var content = {
         body :          $("body"),
         wrapper :       $(".wrapper"),                                                             //内容区
         container :     $(".container"),
         containerLi :   $(".container > li"),                                         
         liHeight : function(a){      //内容区列表高、宽计算方法
              if(a.parents('.times').length > 0){
                 this.timesContainerLi();
              }
              else if(a.parents('.categories').length > 0){
                 this.categoriesContainerLi();
              }
         },
         timesContainerLi:function(){    //时间分类列表高、宽计算方法
              this.wrapper.css({
                "height":(init.wHeight-60) + "px",
                "padding-top":navigation.init.rightSpace() + "px",
                "background-color":"rgba(0, 0, 0, 0.5)"
              });
              this.containerLi.css({
                "height":navigation.init.rightPerheight() + "px",
                "box-sizing":"border-box",
                "border-top":"1px solid #666"
              });
              this.container.children().first().css({
                "border-top": 0 +"px"
              });
              this.container.css({
                "width":(init.wWidth-80) + "px"
              });
         },
         categoriesContainerLi:function(){    //国学分类列表高、宽计算方法
              this.wrapper.css({
                "height":(init.wHeight-60) + "px",
                "padding-top":navigation.init.leftSpace() + "px",
                "background-color":"rgba(0, 0, 0, 0.5)"
              });
              this.containerLi.css({
                "height":navigation.init.leftPerheight() + "px",
                "box-sizing":"border-box",
                "border-top":"1px solid #666"
              });
              this.container.children().first().css({
                "border-top": 0 +"px"
              });
              this.container.css({
                "width":(init.wWidth-80) + "px"
              });
         },
         clickContent : function(){                     //内容区点击展开方法
              var me = this; 
              this.containerLi.click(function(){
                  me.wrapper.css({
                    "height":"auto",
                    "min-height":(init.wHeight-60) + "px",
                    "padding-bottom":30 + "px"
                  });
                  $(this).css({
                    "height":"auto",  
                    "border-top":0 + "px"
                  });
                  me.body.css({
                    "margin-bottom":30+"px"
                  });
                  $(this).siblings().hide();
              });
         }
    };

    var searchFocus = {                                                  //搜索框  
        searchText : $('#search-text'),                                             
        clickFocus : function(){       //搜索框聚焦、失焦方法
          var me = this;   
          this.searchText.focus(function(){
             me.searchText.attr("value"," ");
          }).blur(function(){
             me.searchText.attr("value","在此搜索...");
          }).css({
             "width":(init.wWidth-122) + "px",
             "color":"#fff"
          });
       }
    };

    var quadrangle = { 
        angles :       $(".angle"),
        newContent :   $("<div></div>"),                                           //四角区
        clickQuadrangle : function(){
          var me = this;     //四角区点击事件方法
          me.angles.click(function(){ 
              content.wrapper.append(me.newContent);
              me.newContent.css({
                  "height": (init.wHeight-60) + "px",
                  "width":(init.wWidth-80) + "px",
                  "position":"absolute",
                  "top":0+"px",
                  "left":0+"px",
                  "background-color":"#faff72"
              }).show();
              navigation.unTrigger(navigation.itemLi);
              navigation.containerHide(content.containerLi); 
          });            
       }
    };
    
    init.wrapInfoSearch();
    navigation.init.navigationHeight();
    navigation.clickNavigation();
    content.clickContent();
    searchFocus.clickFocus();
    quadrangle.clickQuadrangle();

})()
