// =========== Base module ===========

var BaseModule = function(){
    this.log = function(elem){
        return console.log(elem)
    };

    this.getPosition = function(elem,position){
        if(position == "left"){
            return $(elem).offset().left;
        }
        else if(position == "top"){
            return $(elem).offset().top;
        }

    };

    this.scrollTo = function(elem, speed){
        return $('body,html').animate({scrollTop: this.getPosition(elem,"top")}, speed);
    };

    this.cloneInsert = function(parent,element){
        return element.clone(true).prependTo(parent);
    };

    this.getUrl = function(){
        return document.location.href;
    };
    this.getPage = function(){
        if(document.location.pathname == "/"){
            return false;
        };
        return document.location.pathname.match(/([a-zA-Z]+)/)[0];
    };
    this.scrollPos = function(){
        return window.pageYOffset;
    };
    this.debagWindow = function(text,bgColor,textColor){
      if(!bgColor){
        bgColor = "rgba(255,180,255,.8)"
      }
      if(!textColor){
        textColor = "#333";
      }
      if($("div").is($(".debag__window"))){
        $('.debag__window').html(text);
      }else{
        $("<div class='debag__window'><div>").prependTo("body").css({
          "width" : "40vw",
          "max-height" : "auto",
          "background" : bgColor,
          "color" : textColor,
          "font-size" : "100%",
          "padding" : "10vh 0",
          "position" : "fixed",
          "z-index" : "99999999",
          "text-align" : "center",
          "top" : "50%",
          "left" : "50%",
          "transform" : "translate(-50%,-50%)",
          "margin" : "auto"
        }).html(text);
      }
    };



     this.getPositionTotal = function(elem){

        var $this = $(elem);
        //console.log($this.offset());
        /*return true;*/

        switch(elem){
           case "window":
                return {
                    "elem" : "window",
                    "height" : $(window).height(),
                    "width" : $(window).width(),
                    "bottom" : $(window).height(),
                    "top" : 0,
                    "left" : 0,
                    "right" : $(window).width(),
                    "centerTop" : $(window).height() / 2,
                    "centerleft" : $(window).width() / 2
                }
                break
            case "document":
                return {
                    "elem" : "document",
                    "height" : $(document).height(),
                    "width" : $(document).width(),
                    "bottom" : $(document).height(),
                    "top" : 0,
                    "left" : 0,
                    "right" : $(document).width(),
                    "centerTop" : $(document).height() / 2,
                }
                break
            case "scroll":
                return {
                    "elem" : "scroll",
                    "top" : $(document).scrollTop(),
                    "bottom" : $(document).scrollTop() + $(window).height(),
                    "left" : $(document).scrollLeft(),
                    "right" : $(document).scrollLeft() + $(document).width(),
                    "centerTop" : ($(document).scrollTop() + $(window).height()) / 2,
                    "centerLeft" : ($(document).scrollLeft() + $(window).width()) / 2,

                }
                break
            default:
                var obj = [];
                $.each($this,function(i){
                    var $this = elem.eq(i);
                    obj.push( 
                    {
                        "elem" : $this,
                        "width" : $this.outerWidth(),
                        "height" : $this.outerHeight(),
                        "top" : $this.offset().top,
                        "left" : $this.offset().left,
                        "right" : $this.outerWidth() + $this.offset().left,
                        "bottom" : $this.outerHeight() + $this.offset().top,
                        "centerTop" : ($this.outerHeight() + $this.offset().top) / 2,
                        "centerLeft" : ($this.outerWidth() + $this.offset().left) / 2,
                    })

                })
                return obj;    
            break
        };
    };







    this.inWindow = function(elem,topElem,position){
        if(!topElem){
            topElem = 0;
        }
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();

        var currentEls = elem;
        var result = [];
        currentEls.each(function(){
            var el = $(this);
            var offset = el.offset();

              switch(position){
                case "top":
                    offset = $(this).offset().top;
                    break
                case "bottom":
                    var offsetTop = $(this).offset().top;
                    offset = offsetTop + $(this).height();
                    break
                case "center":
                    var offsetTop = $(this).offset().top;
                    offset = offsetTop + ($(this).height() / 2);
                    break
                default:
                    offset = $(this).offset().top;
                    break
            }


            //console.log(scrollTop);
            if(scrollTop >= offset.top && scrollTop <= offset.top +(topElem) + el.height())
                //scrollTop >= offset && scrollTop <= offset + $(this).height()
            result.push(this);
        });
    return $(result);
    };

    this.getImgPath = function(){
    	return "./assets/img/";
    }
    this.getTransition = function(){
        return 'transitionend webkitTransitionEnd oTransitionEnd';
    }

};



// =========== Common module ===========

var commonModule = (function() {

    var base = new BaseModule();

    var $downClick = $(".down-click__ico");
    var $upClick = $(".up-click__ico");
    var $content = $(".page-content");
    var scrollSpeed = 700;
    var $entery = $(".entry");




    

    




    var _setUpListner = function () {
        $downClick.on("click",function(){base.scrollTo($content,scrollSpeed)});
        $upClick.on("click",function(){base.scrollTo($("body"),scrollSpeed)});

        $entery.on("click",function(e){
            e.preventDefault();
            $(this).addClass("hide");
            $(".home-page .cover").addClass("flip");
        })

        $(".cover__back a").on("click",function(e){
            e.preventDefault();
            $entery.removeClass("hide");
            $(".home-page .cover").removeClass("flip");
        })

    };
    return {
        init: function () {
            _setUpListner();
        }
    }
})();
// =========== Menu module ===========

var menuModule = (function() {

    var base = new BaseModule();
    var $menu = $(".nav");
    var $sandwich = $(".sandwich");


    var _addPopUpMenu = function () {
        return base.cloneInsert($("body"), $menu).wrapAll('<div class="popUpMenu"></div>').addClass("popUpMenu__inner");
    };

    var _setUpListner = function () {
        $sandwich.on("click",function(){
            $(this).toggleClass("sandwich_on");
            $("body").toggleClass("no-scroll");
            $(".popUpMenu").toggleClass("popUpMenu_show");
        })
    };
    return {
        init: function () {
            _addPopUpMenu();
            _setUpListner();
        }
    }
})();
// =========== Sidebar module ===========

var sidebarModule = (function() {

    var base = new BaseModule();
    var $sidebar = $(".sidebar");
    var $sidebarList = $sidebar.find(".sidebar__list");
    var $sidebarItem = $sidebarList.find(".sidebar__item");
    var $sidebarButton = $(".sidebar__button");
    var $article = $("article");
    var $articleTitle = $article.find(".article__title");
    var $blog = $(".blog-page");
    var $html = $("html");
    var $sandwich = $(".sandwich");
    var startActive = 350;
    var scrollSpeed = 700;
    if(base.getPage() == "blog"){
      var $sidebarPos = base.getPositionTotal($sidebar)[0].top;
    }
    

    //console.log($sidebar.offset().top);
    


    var open = "sidebar--open";
    var fixed = "sidebar--fixed";
    var contentPush = 'content-push';
    var noScroll = 'no-scroll';
    var hide = "hide";
    
    
    



    var sidebarAddClass = function(className){
      $sidebar.addClass(className);
    };

    var sidebarRemoveClass = function(className){
    	$sidebar.removeClass(className);
    };

    var createItems = function(){
	   for(var i = 0; i < $article.length;i++){
	   		$("<div class='sidebar__item'><a href='#' data-id='"+ (i + 1) +"' class='sidebar__link'>"+ $articleTitle.eq(i).text() +"</a></div>")
	   		.appendTo($sidebarList);
	   		$article.eq(i).attr("data-id",(i + 1));
	    }
  	};

    var clearClasess = function(){
      $sidebar.removeClass(open);
      $blog.removeClass(contentPush);
      $html.removeClass(noScroll);
      $sandwich.removeClass(hide);
    }


  	var sibebarScrollTo = function(gutter,speed){
  		$(".sidebar__link").on('click',function(e){
  			e.preventDefault();
        $this = $(this);
        if($this.closest($sidebar).hasClass(open)){
          clearClasess();
        }
  			var attr = $this.data("id");
  			$thisArticle = $("article[data-id="+ $(this).data("id") +"]");
  			$('body,html').animate({scrollTop: $thisArticle.offset().top - gutter}, speed);
  			if($sidebar.hasClass(fixed)){
  				$(".wrapper").removeClass(open);
  			}
  		})
  	};

  

  	var viewElement = function(elem,gutter){
      var scroll = base.getPositionTotal("scroll");
      $.each(elem,function(i){
          
        $thisPosition = base.getPositionTotal(elem);
        
        var last = elem.length - 1;
        var margin = $thisPosition[1].top - $thisPosition[0].bottom;
        
        if(scroll.top < $thisPosition[0].top){
          
          $(".sidebar__item").eq(0).addClass("sidebar__item_active")
        }

        if(scroll.top + gutter > $thisPosition[last].top){
          $(".sidebar__item").eq(last).addClass("sidebar__item_active")
        }

       if((scroll.top + gutter >= $thisPosition[i].top) && ($thisPosition[i].bottom + margin>= scroll.top + gutter)){

            $(".sidebar__item").eq(i).addClass("sidebar__item_active")
            $(".sidebar__item").eq(i).siblings().removeClass("sidebar__item_active")
        }
      })
  	 };

    var _removeClassesOnResize = function(){
      $(window).on("resize",function(){
        if($sidebar.hasClass(open)){
          clearClasess();
        }
      })
    }



    var _addSidebar= function(){
    	createItems();
    	sibebarScrollTo(20,scrollSpeed);

    };


    var _openSidebar = function(){
    	$sidebarButton.on("click",function(e){
            e.preventDefault();
            $blog.toggleClass(contentPush);
            $sidebar.toggleClass(open);
            $sandwich.toggleClass(hide);
            $html.toggleClass(noScroll);
            
        });
    };

    var stickSidebar = function(elem){
  			if($(document).scrollTop() >= $sidebarPos){
    			$sidebar.addClass(fixed);

    		}else{
          $sidebar.removeClass(fixed);
    		}

    };

    var _outClick = function(){
      $(document).mouseup(function (e) {

        var container = $sidebar;
        if (container.has(e.target).length === 0){
           clearClasess();

        }
      });
    }

    var _setUpListner = function () {
    		_addSidebar();
    		_openSidebar();
        _removeClassesOnResize();
        _outClick();
        	
    	
      $(window).on("scroll load",function(){
        viewElement($(".article__item"),startActive);
        stickSidebar($sidebar);
      })
    };


    return {
        init: function () {
            _setUpListner();
        }
    };


})();

// =========== Form module ===========

var formModule = (function() {

    var base = new BaseModule();


    var createPopUpWindow = function(text){
        $("<div class='popUpWindow'><div class='popUpWindow__container'><span class='popUpWindow__close'></span><p class='popUpWindow__text'>"+ text +"</p></div></div>"
            ).prependTo($("body"));

       $("body").addClass("no-scroll");
        $(".popUpWindow__close").on("click",function(){
            var $popUpWindow = $(".popUpWindow");
            $(this).closest($popUpWindow).addClass("hide");
            $("body").removeClass("no-scroll");
            var $this = $(this);
            setTimeout(function(){
                $this.closest($($popUpWindow)).remove();
            },400);

        });
    }

    var loginForm = function(){
        var $form = $('form');
        if($form.hasClass('form-home')){
            var xhr = new XMLHttpRequest();
                 xhr.open('POST', '/auth/',true)

                var data = {
                    login: document.getElementById('form-name').value,
                    password: document.getElementById('form-pass').value
                };
                xhr.setRequestHeader('Content-type','application/json');
                xhr.send(JSON.stringify(data));
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                        location.href = '/admin';

                    }else if(xhr.readyState === XMLHttpRequest.DONE){
                        var text = "Логин и/или пароль введены неверно!";
                        xhr.abort(createPopUpWindow(text));
                    };
                }
        }
    }

    var formValidation = function(thisElem){
        var pattern = /^([0-9a-zA-Z_-]+\.)*[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+(\.[0-9a-zA-Z_-]+)*\.[a-z]{2,6}$/;
        var form = thisElem.closest("form");
        var items = form.find(".form__item");
        var input = items.find(".form__input");
        var error = {
                number : 0,
                text : "Успешно"
        };
        var emptyInput = (function(){
            items.each(function(){
                if($(this).children(input).val() === ""){
                    error.number = 1;
                    error.text = "Заполнены не все поля";
                    return error;
            }          
            })
        })()

        if(form.find("[name = email]").length && !error.number){
            var email = items.find("[name = email]");
            if(!pattern.test(email.val())){
                error.number = 2;
                error.text = "Email не правильный";
            }
        }
        if(form.find("[name = checkbox]").length && !error.number){

            var checkbox = form.find("[name = checkbox]:checked").length
            if(!checkbox){
                error.number = 3;
                error.text = "Вы человек?";
            }
        }
        if(form.find("[name = radio]").length && !error.number){

            var radio = form.find("#form-radio-yes:checked").length
            if(!radio){
                error.number = 4;
                error.text = "Роботам здесь не место!";
            }
        }
       
        switch (error.number) {
            case 1:
                createPopUpWindow(error.text);
            break;
            case 2:
                createPopUpWindow(error.text);
            break;
            case 3:
                createPopUpWindow(error.text);
            break;
            case 4:
                createPopUpWindow(error.text);
            break;
            case 0:
                loginForm();
                sendMail();
            break;
            default:
        }


    }

    var _addPopUpWindow = function(){
        var $button = $("[type=submit]");
        $button.on("click",function(e){
            e.preventDefault();
            formValidation($(this));
        })
    }

    var sendMail = function(){
        var $form = $('form');
        if($form.hasClass('form_about-say')){
            $thisForm = $('.form_about-say');
            $name = $thisForm.find('[name=name]');
            $email = $thisForm.find('[name=email]');
            $textArea = $thisForm.find('[name=text]');

            var xhrObj = {
                name : $name.val(),
                email : $email.val(),
                text : $textArea.val()
            }

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/mail/',true)
            xhr.setRequestHeader('Content-type','application/json');
            xhr.send(JSON.stringify(xhrObj));
                xhr.onreadystatechange = function(){
                    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                         createPopUpWindow("Отправлено");

                    }else if(xhr.readyState === XMLHttpRequest.DONE){
                        xhr.abort();
                    };
            }

                
        }
    }


    return {
        init: function () {
            _addPopUpWindow();
        }

    }
})();
// =========== Slider module ===========

var sliderModule = (function() {

    var base = new BaseModule();

    function slider(elem){
        // Slider

        var $slider = elem;
        var $sliderContent = $slider.find(".slider__content");
        var $sliderDesk = $slider.find(".slider__desk");
        var $deskContent = $sliderDesk.find(".desk__content");



        var $sliderControls = $sliderContent.find(".slider__controll");
        var $sliderButtons = $slider.find(".slider__button");
        var $sliderView = $sliderContent.find(".slider__view");
        var $sliderItems = $sliderView.find(".slider__item");
        var $sliderList = $sliderView.find(".slider__list");
        
        var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd';
        var flag = true;

        // Buttons

        var $buttonUp = $sliderButtons.find(".slider__up").siblings(".slider__ico");
        var $buttonDown = $sliderButtons.find(".slider__down").siblings(".slider__ico");



        // Classes
        var active = "slider__active";
        var down = "slide--down";
        var up = "slide--up";
        var slideShow = "slide--show";

        var sliderActiveElementsInit = (function (){
            $sliderItems.first().addClass(active);
            $deskContent.first().addClass("active__desk__content");
        })();





        var cloneSlides = function(container,activeIndex){
            $container = container.siblings(".slider__list-container");
            
            $sliderList.clone().appendTo($container);
            var curentItems = $container.find(".slider__item");
            curentItems.removeClass(active);
            curentItems.eq(activeIndex).addClass(active);
            curentItems.eq(activeIndex).prev().addClass(up);
            curentItems.eq(activeIndex).next().addClass(down);
            if(!curentItems.eq(activeIndex).next().length){
                curentItems.first().addClass(down);
            }
        }

        cloneSlides($buttonUp,-1);
        cloneSlides($buttonDown,1);


        var addClass = function(slide,className){
            slide.addClass(className).siblings().removeClass(className);
        }
        var addClassPrev = function(slide,className){
            slide.addClass(className).siblings().removeClass(className);
            if(!slide.next().length){
                slide.removeClass(className);
            }      
        }

        var addClassSibling = function(slide,className,direction){
            var slideFirst = slide.parent().find(".slider__item").first().addClass(className);
            var slideLast = slide.parent().find(".slider__item").last().addClass(className);


            if(direction == "next"){
                slide.next().addClass(className).siblings().removeClass(className);
                if(!slide.next().length){
                    slide.removeClass(className);
                    slideFirst.addClass(className);
                }
            }
            else{
                slide.prev().addClass(className).siblings().removeClass(className);
                if(!slide.prev().length){
                    slide.removeClass(className);
                    slide.siblings().removeClass(className);
                    slideLast.addClass(className);
                }
            }
            
        }

        var addContent = function(slide){
            var index = slide.index();
            var className = "active__desk__content";
            $deskContent.eq(index).addClass(className).siblings().removeClass(className);
                
            
        }



        var activeSlideInit = function(elem,reverse){

            var $curentElement = elem;
            var $curentList = $curentElement.find(".slider__list");
            var $curentItems = $curentList.find(".slider__item");
            var $curentActiveItem = $curentItems.filter(".slider__active");


            var $nextSlide = $curentActiveItem.next();
            var $prevSlide = $curentActiveItem.prev();

            var $firstSlide = $curentItems.first();
            var $lastSlide = $curentItems.last();


        if(!$curentElement.parent().parent().hasClass("slider__controll")){
            if(!reverse){     
                if($nextSlide.length){
                    addClass($nextSlide,active);
                }else{
                    addClass($firstSlide,active);
                }
            }else{
                if($prevSlide.length){
                    addClass($prevSlide,active);
                }else{
                    addClass($lastSlide,active);
                }
            }
            var $newActive = $curentItems.filter(".slider__active");

            addContent($newActive);
            
            
                
            
        }

        if($curentElement.parent().parent().hasClass("slider__controll")){
            if(!reverse){    
                if($nextSlide.length){
                    addClass($nextSlide,active);

                }else{
                    addClass($firstSlide,active);
                }
            }else{
                if($prevSlide.length){
                    addClass($prevSlide,active);
                }else{
                    addClass($lastSlide,active);
                }
            }
            var $newActive = $curentItems.filter(".slider__active");
            addClassSibling($newActive,down,"next");
            addClassSibling($newActive,up,"last");      
        }



       
    }

           

       

        $buttonUp.on("click",function(e){
            e.preventDefault();
            var $this = $(this).siblings(".slider__list-container");
            if(flag){
                activeSlideInit($sliderView,true);
                activeSlideInit($this,true);
                activeSlideInit($buttonDown.siblings(".slider__list-container"),true);
                flag = false;

            }
            $this.find(".slider__item").on(transitionEnd, function () {
                flag = true;
            })

        })


        $buttonDown.on("click",function(e){
            e.preventDefault();
            var $this = $(this).siblings(".slider__list-container");
            if(flag){
                activeSlideInit($sliderView);
                activeSlideInit($this);
                activeSlideInit($buttonUp.siblings(".slider__list-container"));
                flag = false;

            }
            
            $this.find(".slider__item").on(transitionEnd, function () {
                flag = true;
                
            })
        })




        
        




    }






    function sliderInit(){
        if(base.getPage() == "works"){
            slider($("#slider"));
            
        }
    }

    return {
        init: function () {
            sliderInit();
        }
    }
})();
// =========== Skills module ===========

var skillsModule = (function() {

    var base = new BaseModule();
    var $skill = $(".skill");
    var $content = $(".page-content");

    var skillPercent = function(){
        
        $skill.each(function(){
            var $this = $(this);
            var percent = $this.data("percent");
            var circle = $this.find(".skill__circle");
            if(percent == 100){
                percent = 101
            }
            circle.css({"stroke-dasharray": percent + " 100"});
        })
    }

    var skillsInit = function(){
        if(base.getPositionTotal("scroll").top >= $content.offset().top - 100){
            skillPercent();
        }
    }


    return {
        init: function () {
            $(window).on("scroll",function(){
                skillsInit();
            })
            
        }
    }
})();
// =========== Map module ===========


var base = new BaseModule();

if(base.getPage() == "about"){
function initMap() {
        var position = {lat: 60.00863023, lng: 30.24842441};
        var markerPosition =  {lat: 60.017391, lng: 30.273618};
        var map = new google.maps.Map(document.getElementById('map'), {
        center: position,
        scrollwheel: false,
        zoom: 14,
        disableDefaultUI: true
        });
        var image = {
              url: base.getImgPath() + "map-marker.png",
              size: new google.maps.Size(71, 71),
              anchor: new google.maps.Point(17, 40),
              scaledSize: new google.maps.Size(40, 56)
            };
        var marker = new google.maps.Marker({
            position: markerPosition,
            map: map,
            title: 'Hello World!',
            icon: image,
            });
        var styles = [
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#86a77a"
            }
        ]
    }
]
map.setOptions({styles: styles});
}
}
// =========== Preloader module ===========

var preloaderModule = (function() {

    var base = new BaseModule();

var _addLoader = function () {

    var imgs = [];

    $.each($('*'), function () {
        var
            $this = $(this),
            background = $this.css('background-image'),
            img = $this.is('img');

        if (background != 'none') {
            var path = background.replace('url("', '').replace('")', '');
            imgs.push(path);
        }

        if (img) {
            var path = $this.attr('src');

            if (path) {
                imgs.push(path);
            }
        }
    });
    
    var percentsTotal = 1;

    for (var i = 0; i < imgs.length; i++) {
        var image = $('<img>', {
            attr: {
                src: imgs[i]
            }
        });

        image.on({
            load : function () {
                setPercents(imgs.length, percentsTotal);
                percentsTotal++;
            },

            error : function () {
                percentsTotal++;
            }
        });
    }

    function setPercents(total, current) {
        var percent = Math.ceil(current / total * 100);
        $("body").addClass("no-scroll");
        if (percent >= 100) {
            $('.preloader').addClass("showOut");
            $("body").removeClass("no-scroll");
        }

        $('.preloader__number').text(percent + '%');
    }
};
    


    return {
        init: function () {
            _addLoader();
        }
    }
})();
'use strict'
var startModule = (function(){
    // Переменные

    var base = new BaseModule;

    return {
        init: function(){

            
            
        }
    };

})();






$( document ).ready(function() {

    var base = new BaseModule;


    commonModule.init();
    menuModule.init();
    
    formModule.init();
    sliderModule.init();
    preloaderModule.init();
    skillsModule.init();
    if(base.getPage() == "blog"){
        sidebarModule.init();
    }
    
})








$( document ).ready(function() {

/*if(base.getPage() == "index" || !base.getPage()){
    $(".home-page").css({
        "min-height" : $(window).height()
    })

}*/



})



