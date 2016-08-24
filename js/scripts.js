var Webflow = Webflow || [];  
Webflow.push(function (){
    
    var current = 0;
    var left_arrow = $(".left-arrow");
    var right_arrow = $(".right-arrow");
    var loaded = false;
    var start_viewport = null;
    var footer_offset = $(".footer").height();
    var idleTime = 0;
    var is_mobile = false;
    var is_zoom_active = false;
    var is_selecting_page = false;
 
    var isTouch = (Modernizr.touchevents || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0);
    
    $(window).on("touchstart", function(e) {
        if(!isTouch){ //fallback: detect touch after event touch is fired
            isTouch = true;
            init_touch_config();
        }
    });
        
    setInterval(function(){
        current = $('.w-slider-nav .w-active').index();
        var current_jump_val = $(".jump-page-control select:eq(0)").val();
        if(current_jump_val != current && !is_selecting_page){
            $(".jump-page-control select").each(function(){
                $(this).val(current); 
            });
        }
        handle_book();
        add_pages();
    }, 300);
    
    function add_pages(){
        var right = (current + 1) * 2;
        var left = right - 1;
        if(is_mobile){
            $(".page-number").text(current + 1);
        }else{
            $(".page-left").text(left);
            $(".page-right").text(right);
        }
    }
    
    function get_viewport(){
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        return {w: w, h: h};
    }
    
    function preload_close_images(){
        var preload_number = current - 2;
        for(var i = preload_number; i < current + 4; i++){
            if($(".book-container img:eq("+i+")").length > 0 && $(".book-container img:eq("+i+")").attr('src') != ''){
                var src = $(".book-container img:eq("+i+")").data('image-src');
                $(".book-container img:eq("+i+")").prop('src', src);
            }
        }
    }
    
    function handle_book(){
        footer_offset = $(".footer").height();

        var current_viewport = get_viewport();
        is_mobile = (current_viewport.w < 800) ? true : false;
        
        if(is_mobile && $(".book-version").data('book-version') != 'mobile'){
            window.location.href = '//' + window.location.hostname + '/?mobile=1';
        }else if(!is_mobile && $(".book-version").data('book-version') != 'desktop'){
            window.location.href = '//' + window.location.hostname + '/';
        }
         
        if(!loaded){ //cancel swipe from slideshow
            $('.w-slider').off('swipe');
        }
        
        preload_close_images();
        
        //preload first image
        var img = new Image();
        var current_img = $(".book-container img:eq("+current+")");
        img.onload = image_loaded; //run events after image is loaded
        img.src = current_img.attr('src');
    }
    
    var image_loaded = function(){
        start_viewport = get_viewport();
        start_viewport.h = start_viewport.h - footer_offset;
        
        /** CALCULATES RATIOS **/
        var current_img = $(".book-container img:eq("+current+")");
        current_img.removeClass('hidden');
        
        
        $(".book-container").css({
            width: '100%',
            height: start_viewport.h
        });
        
        var fit_height = start_viewport.h;
        var fit_width = (fit_height * current_img.width()) / current_img.height();
        
        current_img.css({
            width: '',
            height: ''
        });

        if(current_img.height() > fit_height){
            current_img.css({
                width: fit_width + 'px',
                height: fit_height + 'px'
            });
        }else{
            current_img.css({
                width: '100%',
                height: 'auto'
            });   
        }
        
        //calculate arrow positions
        $(".left-arrow, .right-arrow").css({
            height: current_img.height() + 'px'
        });
        $(".left-arrow").css({
            left: ($(".book-container .slider").width() - current_img.width() - 30)/2 + 'px'
        });
        $(".right-arrow").css({
            right: ($(".book-container .slider").width() - current_img.width() - 30)/2 + 'px'
        });
        
        loaded = true;
    };
    
    var resize_timeout = false;
    Webflow.resize.on(function(e){
        if(is_zoom_active && typeof $panzoom != "undefined"){
            $panzoom.panzoom("reset"); 
        }
    });
    
    var waitForFinalEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
              uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
              clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();
    
    $(window).resize(function () {
        waitForFinalEvent(function(){
            handle_book(); //handle book for events on resize
        }, 200, "some unique string");
    });
    handle_book();

    //arrows opacity
    $(".left-arrow, .right-arrow").mouseenter(function(){
        var opacity_value = (isTouch) ? .4 : 1;
        $(this).css({
            opacity: opacity_value
        });
    });
    $(".left-arrow, .right-arrow").mouseleave(function(){
        $(this).css({
            opacity: .4
        });
    });
    
	var arrow_opacity_calculator = function(){
		if(idleTime >= 4 && !is_mobile){
			$(".left-arrow").addClass('hidden');
			$(".right-arrow").addClass('hidden');
		}else{
			$(".left-arrow").removeClass('hidden');
			$(".right-arrow").removeClass('hidden');
		}
	};
	
	idleTime = 0;
	setInterval(function(){
		idleTime += 1;
		arrow_opacity_calculator();
	}, 500);
	
	$(document).on('mousemove keypress click', function (e) {
        idleTime = 0;
        arrow_opacity_calculator();
    });
    
    function set_panzoom_ratio(){
        $(".zoom-book .parent img").css({
            height: ($("body").height() - 80) + 'px',
            width: 'auto',
            display: 'inline-block'
        });
        
        var css_width = $(".zoom-book .parent img").css('width');
        
        if($(".zoom-book .parent img").width() == $(".zoom-wrap").width()){
            $(".zoom-book .parent img").css({
                width: $(".zoom-wrap").width() + 'px',
                height: 'auto',
                display: 'inline-block'
            });
        }
    }
    
    var zoom_started = false;
    $panzoom = null;
    if(!zoom_started){
        var $section = $('#focal');
        $panzoom = $section.find('.panzoom').panzoom({
            increment: 0.25,
            exponential: false,
            onReset: function(){
                set_panzoom_ratio();
            }
        });
        set_panzoom_ratio();

        $panzoom.on('mousewheel', function( e ) {
            e.preventDefault();
            var delta = e.delta || e.originalEvent.wheelDelta;
            var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
            $panzoom.panzoom('zoom', zoomOut, {
                increment: 0.04,
               // focal: e,
                exponential: false
            });
        });
        zoom_started = true;
        
        function set_zoom_page(page_index, change_event){
            $(".w-slider-nav").children().eq(page_index).trigger('tap'); 
            //$panzoom.panzoom("reset");
            if(is_zoom_active){
                var time = (typeof change_event == "undefined") ? 0 : 400;
                
                setTimeout(function(){
                    $(".slide-image:eq("+page_index+")").trigger('click');
                    //$panzoom.panzoom("reset"); 
                },time);
            }
        }
        
        $(".left-control").on('click', function(e){
            var new_index = $('.w-slider-nav .w-active').index() - 1;
            new_index = (new_index <= 0) ? 0 : new_index;
            set_zoom_page(new_index);
        });
        $(".right-control").on('click', function(e){
            var new_index = $('.w-slider-nav .w-active').index() + 1;
            new_index = (new_index > $(".w-slider-nav .w-slider-dot").length - 1) ? $(".w-slider-nav .w-slider-dot").length - 1 : new_index;
            set_zoom_page(new_index);
        });
        
        $(".zoom-in-control").on("click", function( e ) { 
            e.preventDefault(); 
            $panzoom.panzoom("zoom"); 
            set_panzoom_ratio();
        });
        
        $(".zoom-out-control").on("click", function( e ) { 
            e.preventDefault(); 
            $panzoom.panzoom("zoom", true); 
        });
        
        $(".zoom-reset-control").on("click", function( e ) { 
            e.preventDefault(); 
            $panzoom.panzoom("reset"); 
        });
        
        $(".jump-page-control select").on("change keyup", function( e ) { 
            e.preventDefault();
            var new_index = $(this).val();
            set_zoom_page(new_index, change_event = true);
        });
        $(".jump-page-control select").on("focus", function( e ) { 
            is_selecting_page = true;
        });
        $(".jump-page-control select").on("blur", function( e ) { 
            is_selecting_page = false;
        });
        
        $(".zoom-close").click(function(){
            is_zoom_active = false;
            $('.zoom-wrap').addClass('hidden'); 
            $panzoom.panzoom("reset"); 
            $(".zoom-book .parent img").css({ //reset image css
                height: 'auto',
                width: '100%',
                display: 'inline-block'
            });
        });
        //$(".w-slider").build();
    }
    
    $(".slide-image").click(function(){
        is_zoom_active = true;
        //disable zoom widget for iphone, android, etc
        if(isTouch){
            return false;
        }
        $(".zoom-wrap").removeClass('hidden'); 
        
        var img = new Image();
        img.onload = function(){
            $(".zoom-img").prop('src', $(this).prop('src'));
            set_panzoom_ratio();
        };
        img.src = $(this).prop('src');
    });
    
    $(".zoom-wrap").click(function(){
        $(this).addClass("hidden");
    }).children().click(function(e) {
        return false;
    }); 
    
    function init_touch_config(){
        if(!isTouch){
            var zoom_trigger = $(".zoom-in-trigger");
            zoom_trigger.removeClass('hidden');
            zoom_trigger.click(function(){
                current = $('.w-slider-nav .w-active').index();
                $(".slide-image:eq("+current+")").trigger('click');
            });
            var zoom_offset = zoom_trigger.offset();
            
            $(".zoom-disclaimer").css({
                top: (zoom_offset.top - 110) + 'px',
                left: (zoom_offset.left - ($(".zoom-disclaimer").width()/2) + -91) + 'px'
            });
            $(".zoom-disclaimer").removeClass('hidden');
            setTimeout(function(){
                $(".zoom-disclaimer").fadeOut();
            }, 7000);
            
            $(".zoom-disclaimer a").click(function(){
                $(this).parent().fadeOut(); 
            });
        }else{
            $(".zoom-in-trigger").addClass('hidden');
            $(".zoom-disclaimer").addClass('hidden');
            $('.zoom-wrap').addClass('hidden'); 
            if($panzoom != null){
                $panzoom.panzoom("reset"); 
            }
            $(".slide-image").addClass('hover');
        }
        if(is_mobile){
            var offset = $(".zoom-col");
            offset = offset.offset();
            $(".full-page-disclaimer").css({
                top: (offset.top - 160) + 'px',
                left: (offset.left - ($(".full-page-disclaimer").width()/2) + 12) + 'px'
            });
            $(".full-page-disclaimer").removeClass('hidden');
            setTimeout(function(){
                $(".full-page-disclaimer").fadeOut();
            }, 7000);
            $(".full-page-disclaimer a").click(function(){
                $(this).parent().fadeOut(); 
            });
        }
    }
    init_touch_config();
    
    $(".more-info").click(function(){
        $(".info-container").fadeIn();    
    });
    
    $(".info-container").click(function(e) {
        if(e.target.className == 'info-container'){
            $(".info-container").fadeOut();
        }
    });
    
    $(".close-info").click(function(){
        $(".info-container").fadeOut(); 
    });
    

    $(".details-trigger").click(function(){
        var current_position = $(this).data('current-position');
        var _this = $(this);
        if(current_position == 'down'){
            $(".arrow-up-block").fadeIn(function(){
                _this.find('img').prop('src', 'images/icon-darrow-down.png');
                _this.data('current-position', 'up');
            });  
        }else{
            $(".arrow-up-block").fadeOut(function(){
                _this.find('img').prop('src', 'images/icon-darrow-up.png');
                _this.data('current-position', 'down');
            });  
        }
    });
    
    if(is_mobile){
        $(".arrow-up-block").fadeOut();
    }else{
        $(".details-trigger").trigger('click');
    }

    if(Modernizr.fullscreen){
        $(".fullscreen-trigger").click(function(){
            if(!screenfull.isFullscreen){
                $(".fullscreen-trigger").css('background', '#5dff00');
            }else{
                $(".fullscreen-trigger").css('background', '#ff9500');
            }
            screenfull.toggle();
        });
    }
    
    
});