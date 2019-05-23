require("./lib/social");
require("./lib/ads");
//require("./bc-preroll");

//require("./lib/comments");
//var paywall = require("./lib/paywall");
//setTimeout(() => paywall(11006469), 3000);
//var track = require("./lib/tracking");
//require("waypoints/lib/noframework.waypoints");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var Camera = require("savage-camera");
var savage = require("savage-query");
var keyStage = document.querySelector(".scroll-content");
var map = document.querySelector(".backdrop svg");
var camera = new Camera(map);
var stages = $(".layer").reverse();
var current = null;
var existing = document.querySelector("#Existing");


var onScroll = function() {
  var scrollBounds = keyStage.getBoundingClientRect();
  for (var i = 0; i < stages.length; i++) {
    var stage = stages[i];
    var bounds = stage.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      var layerID = stage.getAttribute("data-layer");
      if (layerID == current) return;
      var layer = document.querySelector("#" + layerID);
      if (!layer) return;      
      if (layerID != 'Existing') {
        savage(map).addClass("zoomed");
      } else {
        savage(map).removeClass("zoomed");
      }
      var active = document.querySelector(".activated");
      if (active) savage(active).removeClass("activated");
      savage(layer).addClass("activated");      
      current = layerID;
      camera.zoomTo(layer, window.innerWidth > 1000 ? 200 : 50, 500);
      return;
      
    }
  }
}

/*
var waypoint = new Waypoint({
  element: document.getElementById('wp-dive0'),
  handler: function(down) {
    var audio = document.getElementById('aud0')
    audio.play()
  },
  offset: '40%'
})

var button0 = document.querySelector("#btn0");
    button0.addEventListener("click", player0);
    function player0() {
        var audio0 = document.querySelector("#aud0");
        audio0.play();
    };
*/

window.addEventListener("scroll", debounce(onScroll, 500));
onScroll();





