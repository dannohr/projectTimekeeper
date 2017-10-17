
angular
    .module('fullstack', ['angularMoment','ui.router', '720kb.datepicker', 'ngFlash'])

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

   
