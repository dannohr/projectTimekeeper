angular
  .module("fullstack", [
    "angularMoment",
    "ui.router",
    "720kb.datepicker",
    "ngFlash",
    "angularModalService",
    "chart.js"
  ])
  // Optional configuration
  .config([
    "ChartJsProvider",
    function(ChartJsProvider) {
      // Configure all charts
      ChartJsProvider.setOptions({
        chartColors: ["#FF5252", "#FF8A80"],
        responsive: true
      });
      // Configure all line charts
      ChartJsProvider.setOptions("line", {
        showLines: true,
        fill: false,
        tooltipFillColor: "#EEE",
        tooltipFontColor: "#000",
        tooltipFontSize: 8,
        tooltipCornerRadius: 8,
        responsive: true
      });
    }
  ])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });

$(document).ready(function() {
  //This is used for the nav bar

  // Change Highlight On Nav menu, based on what was clicked
  $(".nav a").on("click", function() {
    $(".nav")
      .find(".active")
      .removeClass("active");
    $(this)
      .parent()
      .addClass("active");
  });

  // Collapse mobile menu after selection
  $(".nav-item-colapse").click(function(event) {
    $(".navbar-collapse").collapse("hide");
  });
});
