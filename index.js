$(function(){
                                               
       $.indexApp();                                

       function init(){
           $.clickEvent.clickNavigation();
           $.clickEvent.clickContent();
           $.clickEvent.clickQuadrangle();
           $.focusEvent.searchfocusEvent();
           $.search.displaySearch();
           $.information.displayInfo();
           $.navigate.navigationHeight();
       }
       init();

})