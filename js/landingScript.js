$(document).ready(function() {
    $('.venobox').venobox(); 
    $('#fullpage').fullpage({
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopHorizontal: false,
        slideSelector: '.page-slide',
        verticalCentered: true,
        afterRender: function(){
            setTimeout($.fn.fullpage.reBuild, 500);  
        }
        });
    
    $('#loginBtn').click(goLogin);
    $('#signupBtn').click(goSignUp);
    $('.back-btn.login').click(function() {back('.login-form')});
    $('.back-btn.sign').click(function() {back('.sign-form')});
    $('.enter-button').click(function() {enterPixapops()});

});

function goLogin() { 
    $('.signup-button').animateCssHide('bounceOutUp');
    $('.who').animateCssHide('bounceOutUp');
    $('.video-button').animateCssHide('bounceOutUp');
    $('.fp-controlArrow').animateCssHide('bounceOutUp');
    setTimeout(function(){
        $('.login-form').animateCssShow('bounceInUp');
        }, 1000);
}

function goSignUp() { 
    $('.signup-button').animateCssHide('bounceOutUp');
    $('.who').animateCssHide('bounceOutUp');
    $('.video-button').animateCssHide('bounceOutUp');
    $('.fp-controlArrow').animateCssHide('bounceOutUp');
    setTimeout(function(){
        $('.sign-form').animateCssShow('bounceInUp');
        }, 1000);
}

function back(activeDiv) { 
    $(activeDiv).animateCssHide('bounceOutDown');
    setTimeout(function(){
    $('.signup-button').animateCssShow('bounceInDown');
    $('.who').animateCssShow('bounceInDown');
    $('.video-button').animateCssShow('bounceInDown');
    $('.fp-controlArrow').animateCssShow('bounceInDown');
        }, 1000);
}

function enterPixapops() { 
    $('#boat').animateCssHide('bounceOutLeft');
    
    setTimeout(function(){
        $('.login-form').animateCssHide('fadeOut');
        $('.sign-form').animateCssHide('fadeOut');
        $('.section').animateCssHide('fadeOut');
        }, 3000);
    
    setTimeout(function(){
        window.location.replace("choose-island.html");
        }, 4000);
}


$.fn.extend({
    animateCssHide: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            $(this).css('visibility', 'hidden');
        });
    }
});

$.fn.extend({
    animateCssShow: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).css('visibility', 'visible');
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});