
var navigate = {                                                       //分类导航区                                                      
     controlInter : function(a){      //交互控制器方法
          if(a.attr("class") == "clicked"){  
             if(a.parents("div").siblings().children(".item").has(".clicked").text()){
                 this.containerShow(a,displayContent.containerLi);
                 this.containerShow(a,displayContent.container);
             }
             else{
                 this.containerHide(a,displayContent.containerLi);
                 this.containerHide(a,displayContent.container);
             }
          }
          else{     
             var $showli = $(".container > li:visible");
             var index = $showli.index();
             if(a.parents("div").siblings().children(".item").has(".clicked").text()){  
                if(a.parents("ul").has(".clicked").text()){  
                   this.containerLiShow(a,displayContent.containerLi);
                }
                else{    
                   this.containerLiShow(a,displayContent.containerLi);
                }
             }
             else{     
                this.containerShow(a,displayContent.containerLi);
                this.containerShow(a,displayContent.container);
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
     },
     containerShow : function(a,c){   //内容区显示方法
          c.show();
          displayContent.liHeight(a);
     },
     containerHide : function(a,c){    //内容区隐藏方法
          c.hide();
     },
     containerLiShow : function(a,c){
          displayContent.body.css({
            "margin-bottom":30+"px"
          });
          displayContent.wrapper.css({ 
            "height":"auto",
            "min-height":(indexApp.displayPage.wHeight-60) + "px",
            "padding-bottom":30 + "px"
          });   
          c.eq(a.index()).css({
            "height":"auto",  
            "border-top":0 + "px"
          }).show();
          c.eq(a.index()).siblings().hide();
     }
};

var displayContent = {                                                            //内容区
     body :          $("body"),
     wrapper :       $("div.wrapper"),                                                            
     container :     $("ul.container"),
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
            "height":(indexApp.displayPage.wHeight-60) + "px",
            "padding-top":indexApp.displayPage.rightSpace() + "px",
            "background-color":"rgba(0, 0, 0, 0.5)"
          });
          this.containerLi.css({
            "height":indexApp.displayPage.rightPerheight() + "px",
            "box-sizing":"border-box",
            "border-top":"1px solid #666"
          });
          this.container.children().first().css({
            "border-top": 0 +"px"
          });
          this.container.css({
            "width":(indexApp.displayPage.wWidth-80) + "px"
          });
     },
     categoriesContainerLi:function(){    //国学分类列表高、宽计算方法
          this.wrapper.css({
            "height":(indexApp.displayPage.wHeight-60) + "px",
            "padding-top":indexApp.displayPage.leftSpace() + "px",
            "background-color":"rgba(0, 0, 0, 0.5)"
          });
          this.containerLi.css({
            "height":indexApp.displayPage.leftPerheight() + "px",
            "box-sizing":"border-box",
            "border-top":"1px solid #666"
          });
          this.container.children().first().css({
            "border-top": 0 +"px"
          });
          this.container.css({
            "width":(indexApp.displayPage.wWidth-80) + "px"
          });
     }
};