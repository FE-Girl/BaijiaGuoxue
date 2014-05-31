(function(){

    var init = {
       wrapper : $(".wrapper"),
       times : $('.times'),
       categories : $('.categories'),
       timesLi : $('.times > ul > li'),
       categoriesLi : $('.categories > ul > li'),
       timesA : $('.times > ul > li > a'),
       categoriesA : $('.categories > ul > li > a'),
       information : $('.information'),
       search : $('.search'),
       timesUl : $('.times > ul'),
       categoriesUl : $('.categories > ul'),
       wHeight : $(window).height(),
       wWidth : $(window).width(),
       leftNum : function(){
           return this.timesUl.children().length;
       },
       rightNum : function(){
           return this.categoriesUl.children().length;
       },
       leftPerheight : function(){
           return Math.floor((this.wHeight-60)/this.leftNum());
       },
       rightPerheight : function(){
           return Math.floor((this.wHeight-60)/this.rightNum());
       },
       leftSpace : function(){
           return (this.wHeight-60-this.leftPerheight()*this.leftNum())/2;
       },
       rightSpace : function(){
           return (this.wHeight-60-this.rightPerheight()*this.rightNum())/2;
       },
       navigationHeight : function(){
              this.wrapper.css({
                  "padding-top":this.leftSpace() +"px"
              });
              this.times.css({
                  "padding-top":this.leftSpace() +"px",
                  "height":(this.wHeight-60) +"px"
              });
              this.categories.css({
                  "padding-top":this.rightSpace() +"px",
                  "height":(this.wHeight-60) +"px"
              });
              this.timesLi.css({
                  "height":this.leftPerheight() + "px"
              });
              this.timesA.css({
                  "line-height":this.leftPerheight() + "px"
              });
              this.categoriesLi.css({
                  "height":this.rightPerheight() + "px"
              });
              this.categoriesA.css({
                  "line-height":this.rightPerheight() + "px"
              });//end of 分类导航高度
                  
              this.search.css({
                  "width":(this.wWidth-80) + "px"
              });
              this.information.css({
                  "width":(this.wWidth-80) + "px"
              });
          }
      };
      
      var navigation = { 
         itemLi : $('.item > li'),                                        //分类导航区
         clickNavigation : function(){   //分类导航点击方法
              var me = this;
              this.itemLi.click(function(){        
                var a = $(this);
                me.controlInter(a);
                me.controlTrigger(a);
                content.liHeight(a);
              });
         },
         controlInter : function(a){    //交互控制器方法
              if(a.attr("class") == "clicked"){  
                 if(a.parents("div").siblings().children(".item").has(".clicked").text()){
                     content.containerShow(content.containerLi);
                     content.containerShow(content.container);
                 }
                 else{
                     content.containerHide(content.containerLi);
                     content.containerHide(content.container);
                 }
              }
              else{     
                 var $showli = $(".container > li:visible");
                 var index = $showli.index();
                 if(a.parents("div").siblings().children(".item").has(".clicked").text()){  
                    if(a.parents("ul").has(".clicked").text()){  
                       content.containerLiShow(a,content.containerLi);
                    }
                    else{    
                       content.containerLiShow(a,content.containerLi);
                    }
                 }
                 else{     
                    content.containerShow(content.containerLi);
                    content.containerShow(content.container);
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
         }
    };

    var content = {
         container : $(".container"),
         containerLi : $(".container > li"),                                               //内容区
         containerShow : function(c){   //内容区显示方法
              c.show();
         },
         containerHide : function(c){    //内容区隐藏方法
              c.hide();
         },
         containerLiShow : function(a,c){    //内容区列表显示方法
              c.eq(a.index()).css({
                // "height":(wHeight-60) + "px",    高度自适应
                "border-top":0 + "px"
              }).show();
              c.eq(a.index()).siblings().hide();
         },
         liHeight : function(a){      //内容区列表高、宽计算方法
              if(a.parents('.times').length > 0){
                 init.wrapper.css({
                    "height":(init.wHeight-60) + "px",
                    "padding-top":init.rightSpace() + "px",
                    "background-color":"rgba(0, 0, 0, 0.5)"
                 });
                 this.containerLi.css({
                    "height":init.rightPerheight() + "px",
                    "box-sizing":"border-box",
                    "border-top":"1px solid #666"
                 });
                 this.container.children().first().css({
                    "border-top": 0 +"px"
                 });
                 this.container.css({
                    "width":(init.wWidth-80) + "px"
                 });
              }
              else if(a.parents('.categories').length > 0){
                 init.wrapper.css({
                    "height":(init.wHeight-60) + "px",
                    "padding-top":init.leftSpace() + "px",
                    "background-color":"rgba(0, 0, 0, 0.5)"
                 });
                 this.containerLi.css({
                    "height":init.leftPerheight() + "px",
                    "box-sizing":"border-box",
                    "border-top":"1px solid #666"
                 });
                 this.container.children().first().css({
                    "border-top": 0 +"px"
                 });
                 this.container.css({
                    "width":(init.wWidth-80) + "px"
                 });
              }
         },
         clickContent : function(){                     //内容区点击展开方法
              var me = this;   
              this.containerLi.click(function(){
                  init.wrapper.css({
                    "height":"auto"
                  })
                  me.containerLi.css({
                    "height":"auto",   
                    "border-top":0 + "px",
                    "margin-bottom":30+"px"
                  });
                  $(this).siblings().hide();
              });
         }
    };

    var searchFocus = { 
        searchText : $('#search-text'),                                             //搜索框  
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
        angle : $(".angle"),                                            //四角区
        clickQuadrangle : function(){     //四角区点击事件方法
          this.angle.click(function(){ 
              navigation.unTrigger(navigation.itemLi);
              content.containerHide(content.containerLi);
              content.containerShow(content.container);
          });            
       }
    };
    
    init.navigationHeight();
    navigation.clickNavigation();
    content.clickContent();
    searchFocus.clickFocus();
    quadrangle.clickQuadrangle();

})()
