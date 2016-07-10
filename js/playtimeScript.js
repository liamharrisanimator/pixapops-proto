$(window).load(function(){
var mouseX = 0, mouseY = 0;
$(document).mousemove(function(e){
   mouseX = e.pageX;
   mouseY = e.pageY; 
});

var follower = $("#follower");
var xp = 0, yp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX - xp) / 12;
    yp += (mouseY - yp) / 12;
    follower.css({left:xp, top:yp});
    
}, 30);

});


$(window).load(function(){
var mouseX = 0;
$(document).mousemove(function(a){
   mouseX = a.pageX;

});

// cache the selector
var playerFollower = $("#playerFollower");
var xp = 0, yp = 0;
var loop = setInterval(function(){
    // change 12 to alter damping higher is slower
    xp += (mouseX - xp) / 70;
  
    playerFollower.css({left:xp});
    
}, 10);

});


