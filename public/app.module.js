angular.module('fullstack', ['ui.router', "ngAnimate","ngMaterial"]);
// angular.module('fullstack', ['ui.router','ngMaterial','ngMessages']);
$(document).ready(function () {
    
            // Change Highlight On Nav menu, based on what was clicked
            $(".nav a").on("click", function(){
                $(".nav").find(".active").removeClass("active");
                $(this).parent().addClass("active");
            });
    
    
            // Collapse mobile menu after selection
            $(".nav-item-colapse").click(function(event) {
                $(".navbar-collapse").collapse('hide');
              });
    
              
         
           
          
    });
