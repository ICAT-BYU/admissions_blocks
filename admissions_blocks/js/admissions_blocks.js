jQuery(document).ready(function($) {

    var $buttonTop = 0;
    var $buttonLeft = 0;
    var $buttonWidth = 0;
    var $buttonHeight = 0;

    $.fn.animateRotate = function(angle, duration, easing, complete) {
        return this.each(function() {
            var $elem = $(this);
            $({deg: 0}).animate({deg: angle}, {
                duration: duration,
                easing: easing,
                step: function(now) {
                    $elem.css('-webkit-transform','rotate('+now+'deg)'); 
                    $elem.css('-moz-transform','rotate('+now+'deg)');
                    $elem.css('transform','rotate('+now+'deg)');
                 },
                complete: complete || $.noop
            });
        });
    };

    String.prototype.capitalize = function(){
        return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
    };
    
    $audID = Drupal.settings['thisModule']['audID'];
    $audNM = Drupal.settings['thisModule']['audNM'];
    $mPath = Drupal.settings['thisModule']['modulePath'];
    $audHN = $audNM.replace("-"," ").capitalize();
    $audSELECTED = Drupal.settings['thisModule']['audSELECTED'];
    
    $imgNewb = "<img id='new-freshman'          class='audience-image many-students' src='/" +$mPath+ "/js/new-freshman.png'>";
    $imgTran = "<img id='transfer-student'      class='audience-image many-students' src='/" +$mPath+ "/js/transfer-student.png'>";
    $imgIntr = "<img id='international-student' class='audience-image many-students' src='/" +$mPath+ "/js/international-student.png'>";
    $imgConc = "<img id='concurrent-enrollment' class='audience-image not-many-students' src='/" +$mPath+ "/js/concurrent-enrollment.png'>";
    $imgVisi = "<img id='visiting-student'      class='audience-image not-many-students' src='/" +$mPath+ "/js/visiting-student.png'>";
    $imgForm = "<img id='former-student'        class='audience-image not-many-students' src='/" +$mPath+ "/js/former-student.png'>";
    $imgPost = "<img id='postbaccalaureate'     class='audience-image not-many-students' src='/" +$mPath+ "/js/postbaccalaureate.png'>";
    
    $LOADING = "<img id='loading' class='loading-gif' src='/" +$mPath+ "/js/loading.svg?ran=" +Math.random()+ "'>";
    
    $css = ""; 
    $css+= ".loading-gif {position:fixed; width:10%; left:45%; top:20%; z-index:595; }";
    $css+= ".many-students {position:absolute; padding:1%; margin:0; cursor: pointer; cursor: hand; }";
    $css+= ".not-many-students {position:absolute; padding:1%; margin:0; cursor: pointer; cursor: hand; }";
    $css+= "#overlay {display:none; position:fixed; border:0; background-color:#ffffff; z-index:600; }";
    $css+= "#fade {display:none; position: fixed; left:0%; top:0%; background-color:#00001a; -moz-opacity:0.7; opacity:0.70; filter:alpha(opacity=70); width:100%; height:100%; z-index:590; }";
    $("head").append("<style id='overlayCSS'></style>");
    $("#overlayCSS").text($css);
    
    $('a[title="change-audience"]').addClass('change-audience-button'); 
    $('.change-audience-button').attr('title',''); 
    $('.change-audience-button').html( "&#9762;" + $audHN );
    $('.change-audience-button').click(function(){ 
        $buttonTop = $(this).parent().offset().top;
        $buttonLeft = $(this).parent().offset().left;
        $buttonWidth = $(this).parent().width();
        $buttonHeight = $(this).parent().height();
        changeAudienceOverlay(); 
    }); 
    $('.change-audience-button').blur(function(){ 
        $buttonTop = $(this).parent().offset().top;
        $buttonLeft = $(this).parent().offset().left;
        $buttonWidth = $(this).parent().width();
        $buttonHeight = $(this).parent().height();
        if (($buttonTop+$buttonLeft+$buttonWidth+$buttonHeight) == 0) {
            $buttonTop = $('.menu-btn').offset().top;
            $buttonLeft = $('.menu-btn').offset().left;
            $buttonWidth = $('.menu-btn').width();
            $buttonHeight = $('.menu-btn').height();
        }
        console.log($buttonTop,$buttonLeft,$buttonWidth,$buttonHeight);
    }); 
    
    function changeAudienceOverlay() {
    
        $overlay ="<div id='overlay'>";
        $overlay+=$imgNewb;
        $overlay+=$imgTran;
        $overlay+=$imgIntr;
        $overlay+=$imgConc;
        $overlay+=$imgVisi;
        $overlay+=$imgForm;
        $overlay+=$imgPost;
        $overlay+="</div>";
        $overlay+="<div id='fade'></div>";
        
        // ADD AND DISPLAY OVERLAY
        $("body").append($overlay);
        $("body,html").css({"overflow":"hidden", "height":"100%"});
        
        $("#fade").css({opacity:'0.1', display:"block"});
        $("#fade").animate({opacity:'0.7'}, 500);
        
        $("#overlay").css({opacity:'0.1', top:$buttonTop+"px", left:$buttonLeft+"px", width:$buttonWidth+"px", height:$buttonHeight+"px", display:"block"});
        $curH = $(window).height();
        $curW = $(window).width();
        if ($curH < $curW) {
            // landscape
            $ratio = 7/12;
            $(".many-students").css(        {width: "31.33%",   height: "55.14%"});
            $(".not-many-students").css(    {width: "23%",      height: "40.86%"});
            $("#new-freshman").css(         {top: "0%", left: "0%"});
            $("#transfer-student").css(     {top: "0%", left: "33.33%"});
            $("#international-student").css({top: "0%", left: "66.66%"});
            $("#concurrent-enrollment").css({top: "56.14%", left: "0%"});
            $("#visiting-student").css(     {top: "56.14%", left: "25%"});
            $("#former-student").css(       {top: "56.14%", left: "50%"});
            $("#postbaccalaureate").css(    {top: "56.14%", left: "75%"});
        } else {
            // portrait
            $ratio = 12/7;
            $(".many-students").css(        {width: "55.14%",   height: "31.33%"});
            $(".not-many-students").css(    {width: "40.86%",   height: "23%"});
            $("#new-freshman").css(         {top: "0%",     left: "0%"});
            $("#transfer-student").css(     {top: "33.33%", left: "0%"});
            $("#international-student").css({top: "66.66%", left: "0%"});
            $("#concurrent-enrollment").css({top: "0%",     left: "57.14%"});
            $("#visiting-student").css(     {top: "25%",    left: "57.14%"});
            $("#former-student").css(       {top: "50%",    left: "57.14%"});
            $("#postbaccalaureate").css(    {top: "75%",    left: "57.14%"});
        }
        $ow = $curW * 0.7;
        $oh = $ow * $ratio;
        $ol = $curW * 0.15
        $ot = $curH * 0.08
 
        $("#overlay").animate({opacity:'1', left:$ol+"px", top:$ot+"px", width:$ow+"px", height:$oh+"px"}, 500, function() {
            // ADD LOADING GIF
            $("body").append($LOADING);
        });
        
        $(window).resize(function() { resizeOverlay(); });
        
        $('.audience-image').click(function() { 
            $aud = $(this).attr('id');
            $("a").blur();

            // ROTATE LOADING GIF
            $('#loading').animateRotate(1400,10000,'linear');

            // KILL OFF OVERLAY
            $("#overlay").animate({opacity:'0.5', top:$buttonTop+"px", left:$buttonLeft+"px", width:$buttonWidth+"px", height:$buttonHeight+"px"}, 500, function() {
                $(".audience-image").remove();
                // CHANGE AUDIENCE
                window.location = '/menu/ChangeAudience?audience=' + $aud;
                $("#overlay").animate({opacity:'0.0'}, 200, function() {
                    $("#overlay").remove(); 
                });
                //$("body,html").css({"overflow":"", "height":""});
            });
            
        });

    }

   
    
    function resizeOverlay() {
        $curH = $(window).height();
        $curW = $(window).width();
        if ($curH < $curW) {
            // landscape
            $ratio = 7/12;
            $(".many-students").css(        {width: "31.33%",   height: "55.14%"});
            $(".not-many-students").css(    {width: "23%",      height: "40.86%"});
            $("#new-freshman").css(         {top: "0%", left: "0%"});
            $("#transfer-student").css(     {top: "0%", left: "33.33%"});
            $("#international-student").css({top: "0%", left: "66.66%"});
            $("#concurrent-enrollment").css({top: "56.14%", left: "0%"});
            $("#visiting-student").css(     {top: "56.14%", left: "25%"});
            $("#former-student").css(       {top: "56.14%", left: "50%"});
            $("#postbaccalaureate").css(    {top: "56.14%", left: "75%"});
        } else {
            // portrait
            $ratio = 12/7;
            $(".many-students").css(        {width: "55.14%",   height: "31.33%"});
            $(".not-many-students").css(    {width: "40.86%",   height: "23%"});
            $("#new-freshman").css(         {top: "0%",     left: "0%"});
            $("#transfer-student").css(     {top: "33.33%", left: "0%"});
            $("#international-student").css({top: "66.66%", left: "0%"});
            $("#concurrent-enrollment").css({top: "0%",     left: "57.14%"});
            $("#visiting-student").css(     {top: "25%",    left: "57.14%"});
            $("#former-student").css(       {top: "50%",    left: "57.14%"});
            $("#postbaccalaureate").css(    {top: "75%",    left: "57.14%"});
        }
        $ow = $curW * 0.7;
        $oh = $ow * $ratio;
        $ol = $curW * 0.15
        $ot = $curH * 0.08
        $("#overlay").css({left:$ol+"px", top:$ot+"px", width:$ow+"px", height:$oh+"px"});
    }
  
    $(window).load(function() {
        $("a").blur();
        if ($audSELECTED == 0) {
            changeAudienceOverlay();
        }
    });


});  

