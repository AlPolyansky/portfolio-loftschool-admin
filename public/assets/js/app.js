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
        if(form.find("[name = password]").length && !error.number){
            var myPass = "123";
            var pass = items.find("[name = password]");
            if(pass.val() !== myPass){
                error.number = 5;
                error.text = "Пароль не верный";
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
            case 5:
                createPopUpWindow(error.text);
            break;
            case 0:
                createPopUpWindow(error.text);
            break;
            default:
            //alert( 'Я таких значений не знаю' );
        }


    }

    var _addPopUpWindow = function(){
        var $button = $("[type=submit]");
        $button.on("click",function(e){
            e.preventDefault();
            formValidation($(this));
        })
    }

    var _setUpListner = function () {


    };
    return {
        init: function () {
            _setUpListner();
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
              url: "./assets/img/map-marker.png",
              size: new google.maps.Size(71, 71),
              //origin: new google.maps.Point(0, 0),
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9iYXNlLmpzIiwiX2NvbW1vbi5qcyIsIl9tZW51LmpzIiwiX3NpZGViYXIuanMiLCJfZm9ybS5qcyIsIl9zbGlkZXIuanMiLCJfc2tpbGxzLmpzIiwiX21hcC5qcyIsIl9wcmVsb2FkZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PSBCYXNlIG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIEJhc2VNb2R1bGUgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5sb2cgPSBmdW5jdGlvbihlbGVtKXtcclxuICAgICAgICByZXR1cm4gY29uc29sZS5sb2coZWxlbSlcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKGVsZW0scG9zaXRpb24pe1xyXG4gICAgICAgIGlmKHBvc2l0aW9uID09IFwibGVmdFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkub2Zmc2V0KCkubGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwb3NpdGlvbiA9PSBcInRvcFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbihlbGVtLCBzcGVlZCl7XHJcbiAgICAgICAgcmV0dXJuICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogdGhpcy5nZXRQb3NpdGlvbihlbGVtLFwidG9wXCIpfSwgc3BlZWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmNsb25lSW5zZXJ0ID0gZnVuY3Rpb24ocGFyZW50LGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmNsb25lKHRydWUpLnByZXBlbmRUbyhwYXJlbnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFVybCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZXRQYWdlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZSA9PSBcIi9cIil7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaCgvKFthLXpBLVpdKykvKVswXTtcclxuICAgIH07XHJcbiAgICB0aGlzLnNjcm9sbFBvcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgIH07XHJcbiAgICB0aGlzLmRlYmFnV2luZG93ID0gZnVuY3Rpb24odGV4dCxiZ0NvbG9yLHRleHRDb2xvcil7XHJcbiAgICAgIGlmKCFiZ0NvbG9yKXtcclxuICAgICAgICBiZ0NvbG9yID0gXCJyZ2JhKDI1NSwxODAsMjU1LC44KVwiXHJcbiAgICAgIH1cclxuICAgICAgaWYoIXRleHRDb2xvcil7XHJcbiAgICAgICAgdGV4dENvbG9yID0gXCIjMzMzXCI7XHJcbiAgICAgIH1cclxuICAgICAgaWYoJChcImRpdlwiKS5pcygkKFwiLmRlYmFnX193aW5kb3dcIikpKXtcclxuICAgICAgICAkKCcuZGViYWdfX3dpbmRvdycpLmh0bWwodGV4dCk7XHJcbiAgICAgIH1lbHNle1xyXG4gICAgICAgICQoXCI8ZGl2IGNsYXNzPSdkZWJhZ19fd2luZG93Jz48ZGl2PlwiKS5wcmVwZW5kVG8oXCJib2R5XCIpLmNzcyh7XHJcbiAgICAgICAgICBcIndpZHRoXCIgOiBcIjQwdndcIixcclxuICAgICAgICAgIFwibWF4LWhlaWdodFwiIDogXCJhdXRvXCIsXHJcbiAgICAgICAgICBcImJhY2tncm91bmRcIiA6IGJnQ29sb3IsXHJcbiAgICAgICAgICBcImNvbG9yXCIgOiB0ZXh0Q29sb3IsXHJcbiAgICAgICAgICBcImZvbnQtc2l6ZVwiIDogXCIxMDAlXCIsXHJcbiAgICAgICAgICBcInBhZGRpbmdcIiA6IFwiMTB2aCAwXCIsXHJcbiAgICAgICAgICBcInBvc2l0aW9uXCIgOiBcImZpeGVkXCIsXHJcbiAgICAgICAgICBcInotaW5kZXhcIiA6IFwiOTk5OTk5OTlcIixcclxuICAgICAgICAgIFwidGV4dC1hbGlnblwiIDogXCJjZW50ZXJcIixcclxuICAgICAgICAgIFwidG9wXCIgOiBcIjUwJVwiLFxyXG4gICAgICAgICAgXCJsZWZ0XCIgOiBcIjUwJVwiLFxyXG4gICAgICAgICAgXCJ0cmFuc2Zvcm1cIiA6IFwidHJhbnNsYXRlKC01MCUsLTUwJSlcIixcclxuICAgICAgICAgIFwibWFyZ2luXCIgOiBcImF1dG9cIlxyXG4gICAgICAgIH0pLmh0bWwodGV4dCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgdGhpcy5nZXRQb3NpdGlvblRvdGFsID0gZnVuY3Rpb24oZWxlbSl7XHJcblxyXG4gICAgICAgIHZhciAkdGhpcyA9ICQoZWxlbSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygkdGhpcy5vZmZzZXQoKSk7XHJcbiAgICAgICAgLypyZXR1cm4gdHJ1ZTsqL1xyXG5cclxuICAgICAgICBzd2l0Y2goZWxlbSl7XHJcbiAgICAgICAgICAgY2FzZSBcIndpbmRvd1wiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwid2luZG93XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWlnaHRcIiA6ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiIDogJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKHdpbmRvdykud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogJCh3aW5kb3cpLmhlaWdodCgpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlcmxlZnRcIiA6ICQod2luZG93KS53aWR0aCgpIC8gMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcImRvY3VtZW50XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiZWxlbVwiIDogXCJkb2N1bWVudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKGRvY3VtZW50KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJChkb2N1bWVudCkud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogJChkb2N1bWVudCkuaGVpZ2h0KCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSBcInNjcm9sbFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwic2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICQoZG9jdW1lbnQpLnNjcm9sbExlZnQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyAkKGRvY3VtZW50KS53aWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY2VudGVyVG9wXCIgOiAoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCkpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlckxlZnRcIiA6ICgkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCkgKyAkKHdpbmRvdykud2lkdGgoKSkgLyAyLFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gW107XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goJHRoaXMsZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyICR0aGlzID0gZWxlbS5lcShpKTtcclxuICAgICAgICAgICAgICAgICAgICBvYmoucHVzaCggXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6ICR0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpZHRoXCIgOiAkdGhpcy5vdXRlcldpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkdGhpcy5vdXRlckhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogJHRoaXMub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6ICR0aGlzLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICR0aGlzLm91dGVyV2lkdGgoKSArICR0aGlzLm9mZnNldCgpLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm90dG9tXCIgOiAkdGhpcy5vdXRlckhlaWdodCgpICsgJHRoaXMub2Zmc2V0KCkudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogKCR0aGlzLm91dGVySGVpZ2h0KCkgKyAkdGhpcy5vZmZzZXQoKS50b3ApIC8gMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJMZWZ0XCIgOiAoJHRoaXMub3V0ZXJXaWR0aCgpICsgJHRoaXMub2Zmc2V0KCkubGVmdCkgLyAyLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7ICAgIFxyXG4gICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgIHRoaXMuaW5XaW5kb3cgPSBmdW5jdGlvbihlbGVtLHRvcEVsZW0scG9zaXRpb24pe1xyXG4gICAgICAgIGlmKCF0b3BFbGVtKXtcclxuICAgICAgICAgICAgdG9wRWxlbSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuXHJcbiAgICAgICAgdmFyIGN1cnJlbnRFbHMgPSBlbGVtO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBjdXJyZW50RWxzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGVsLm9mZnNldCgpO1xyXG5cclxuICAgICAgICAgICAgICBzd2l0Y2gocG9zaXRpb24pe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInRvcFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiYm90dG9tXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldFRvcCArICQodGhpcykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0VG9wID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gb2Zmc2V0VG9wICsgKCQodGhpcykuaGVpZ2h0KCkgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzY3JvbGxUb3ApO1xyXG4gICAgICAgICAgICBpZihzY3JvbGxUb3AgPj0gb2Zmc2V0LnRvcCAmJiBzY3JvbGxUb3AgPD0gb2Zmc2V0LnRvcCArKHRvcEVsZW0pICsgZWwuaGVpZ2h0KCkpXHJcbiAgICAgICAgICAgICAgICAvL3Njcm9sbFRvcCA+PSBvZmZzZXQgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldCArICQodGhpcykuaGVpZ2h0KClcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICByZXR1cm4gJChyZXN1bHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmdldFRyYW5zaXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cclxuIiwiLy8gPT09PT09PT09PT0gQ29tbW9uIG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIGNvbW1vbk1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG4gICAgdmFyICRkb3duQ2xpY2sgPSAkKFwiLmRvd24tY2xpY2tfX2ljb1wiKTtcclxuICAgIHZhciAkdXBDbGljayA9ICQoXCIudXAtY2xpY2tfX2ljb1wiKTtcclxuICAgIHZhciAkY29udGVudCA9ICQoXCIucGFnZS1jb250ZW50XCIpO1xyXG4gICAgdmFyIHNjcm9sbFNwZWVkID0gNzAwO1xyXG4gICAgdmFyICRlbnRlcnkgPSAkKFwiLmVudHJ5XCIpO1xyXG5cclxuXHJcblxyXG5cclxuICAgIFxyXG5cclxuICAgIFxyXG5cclxuXHJcblxyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0bmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRkb3duQ2xpY2sub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7YmFzZS5zY3JvbGxUbygkY29udGVudCxzY3JvbGxTcGVlZCl9KTtcclxuICAgICAgICAkdXBDbGljay5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtiYXNlLnNjcm9sbFRvKCQoXCJib2R5XCIpLHNjcm9sbFNwZWVkKX0pO1xyXG5cclxuICAgICAgICAkZW50ZXJ5Lm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgJChcIi5ob21lLXBhZ2UgLmNvdmVyXCIpLmFkZENsYXNzKFwiZmxpcFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAkKFwiLmNvdmVyX19iYWNrIGFcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRlbnRlcnkucmVtb3ZlQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAkKFwiLmhvbWUtcGFnZSAuY292ZXJcIikucmVtb3ZlQ2xhc3MoXCJmbGlwXCIpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfc2V0VXBMaXN0bmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIi8vID09PT09PT09PT09IE1lbnUgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgbWVudU1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcbiAgICB2YXIgJG1lbnUgPSAkKFwiLm5hdlwiKTtcclxuICAgIHZhciAkc2FuZHdpY2ggPSAkKFwiLnNhbmR3aWNoXCIpO1xyXG5cclxuXHJcbiAgICB2YXIgX2FkZFBvcFVwTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gYmFzZS5jbG9uZUluc2VydCgkKFwiYm9keVwiKSwgJG1lbnUpLndyYXBBbGwoJzxkaXYgY2xhc3M9XCJwb3BVcE1lbnVcIj48L2Rpdj4nKS5hZGRDbGFzcyhcInBvcFVwTWVudV9faW5uZXJcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0bmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRzYW5kd2ljaC5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcyhcInNhbmR3aWNoX29uXCIpO1xyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgICAgICAgJChcIi5wb3BVcE1lbnVcIikudG9nZ2xlQ2xhc3MoXCJwb3BVcE1lbnVfc2hvd1wiKTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfYWRkUG9wVXBNZW51KCk7XHJcbiAgICAgICAgICAgIF9zZXRVcExpc3RuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiLy8gPT09PT09PT09PT0gU2lkZWJhciBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcbnZhciBzaWRlYmFyTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuICAgIHZhciAkc2lkZWJhciA9ICQoXCIuc2lkZWJhclwiKTtcclxuICAgIHZhciAkc2lkZWJhckxpc3QgPSAkc2lkZWJhci5maW5kKFwiLnNpZGViYXJfX2xpc3RcIik7XHJcbiAgICB2YXIgJHNpZGViYXJJdGVtID0gJHNpZGViYXJMaXN0LmZpbmQoXCIuc2lkZWJhcl9faXRlbVwiKTtcclxuICAgIHZhciAkc2lkZWJhckJ1dHRvbiA9ICQoXCIuc2lkZWJhcl9fYnV0dG9uXCIpO1xyXG4gICAgdmFyICRhcnRpY2xlID0gJChcImFydGljbGVcIik7XHJcbiAgICB2YXIgJGFydGljbGVUaXRsZSA9ICRhcnRpY2xlLmZpbmQoXCIuYXJ0aWNsZV9fdGl0bGVcIik7XHJcbiAgICB2YXIgJGJsb2cgPSAkKFwiLmJsb2ctcGFnZVwiKTtcclxuICAgIHZhciAkaHRtbCA9ICQoXCJodG1sXCIpO1xyXG4gICAgdmFyICRzYW5kd2ljaCA9ICQoXCIuc2FuZHdpY2hcIik7XHJcbiAgICB2YXIgc3RhcnRBY3RpdmUgPSAzNTA7XHJcbiAgICB2YXIgc2Nyb2xsU3BlZWQgPSA3MDA7XHJcbiAgICBpZihiYXNlLmdldFBhZ2UoKSA9PSBcImJsb2dcIil7XHJcbiAgICAgIHZhciAkc2lkZWJhclBvcyA9IGJhc2UuZ2V0UG9zaXRpb25Ub3RhbCgkc2lkZWJhcilbMF0udG9wO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgLy9jb25zb2xlLmxvZygkc2lkZWJhci5vZmZzZXQoKS50b3ApO1xyXG4gICAgXHJcblxyXG5cclxuICAgIHZhciBvcGVuID0gXCJzaWRlYmFyLS1vcGVuXCI7XHJcbiAgICB2YXIgZml4ZWQgPSBcInNpZGViYXItLWZpeGVkXCI7XHJcbiAgICB2YXIgY29udGVudFB1c2ggPSAnY29udGVudC1wdXNoJztcclxuICAgIHZhciBub1Njcm9sbCA9ICduby1zY3JvbGwnO1xyXG4gICAgdmFyIGhpZGUgPSBcImhpZGVcIjtcclxuICAgIFxyXG4gICAgXHJcbiAgICBcclxuXHJcblxyXG5cclxuICAgIHZhciBzaWRlYmFyQWRkQ2xhc3MgPSBmdW5jdGlvbihjbGFzc05hbWUpe1xyXG4gICAgICAkc2lkZWJhci5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc2lkZWJhclJlbW92ZUNsYXNzID0gZnVuY3Rpb24oY2xhc3NOYW1lKXtcclxuICAgIFx0JHNpZGViYXIucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNyZWF0ZUl0ZW1zID0gZnVuY3Rpb24oKXtcclxuXHQgICBmb3IodmFyIGkgPSAwOyBpIDwgJGFydGljbGUubGVuZ3RoO2krKyl7XHJcblx0ICAgXHRcdCQoXCI8ZGl2IGNsYXNzPSdzaWRlYmFyX19pdGVtJz48YSBocmVmPScjJyBkYXRhLWlkPSdcIisgKGkgKyAxKSArXCInIGNsYXNzPSdzaWRlYmFyX19saW5rJz5cIisgJGFydGljbGVUaXRsZS5lcShpKS50ZXh0KCkgK1wiPC9hPjwvZGl2PlwiKVxyXG5cdCAgIFx0XHQuYXBwZW5kVG8oJHNpZGViYXJMaXN0KTtcclxuXHQgICBcdFx0JGFydGljbGUuZXEoaSkuYXR0cihcImRhdGEtaWRcIiwoaSArIDEpKTtcclxuXHQgICAgfVxyXG4gIFx0fTtcclxuXHJcbiAgICB2YXIgY2xlYXJDbGFzZXNzID0gZnVuY3Rpb24oKXtcclxuICAgICAgJHNpZGViYXIucmVtb3ZlQ2xhc3Mob3Blbik7XHJcbiAgICAgICRibG9nLnJlbW92ZUNsYXNzKGNvbnRlbnRQdXNoKTtcclxuICAgICAgJGh0bWwucmVtb3ZlQ2xhc3Mobm9TY3JvbGwpO1xyXG4gICAgICAkc2FuZHdpY2gucmVtb3ZlQ2xhc3MoaGlkZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICBcdHZhciBzaWJlYmFyU2Nyb2xsVG8gPSBmdW5jdGlvbihndXR0ZXIsc3BlZWQpe1xyXG4gIFx0XHQkKFwiLnNpZGViYXJfX2xpbmtcIikub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuICBcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJHRoaXMgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmKCR0aGlzLmNsb3Nlc3QoJHNpZGViYXIpLmhhc0NsYXNzKG9wZW4pKXtcclxuICAgICAgICAgIGNsZWFyQ2xhc2VzcygpO1xyXG4gICAgICAgIH1cclxuICBcdFx0XHR2YXIgYXR0ciA9ICR0aGlzLmRhdGEoXCJpZFwiKTtcclxuICBcdFx0XHQkdGhpc0FydGljbGUgPSAkKFwiYXJ0aWNsZVtkYXRhLWlkPVwiKyAkKHRoaXMpLmRhdGEoXCJpZFwiKSArXCJdXCIpO1xyXG4gIFx0XHRcdCQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogJHRoaXNBcnRpY2xlLm9mZnNldCgpLnRvcCAtIGd1dHRlcn0sIHNwZWVkKTtcclxuICBcdFx0XHRpZigkc2lkZWJhci5oYXNDbGFzcyhmaXhlZCkpe1xyXG4gIFx0XHRcdFx0JChcIi53cmFwcGVyXCIpLnJlbW92ZUNsYXNzKG9wZW4pO1xyXG4gIFx0XHRcdH1cclxuICBcdFx0fSlcclxuICBcdH07XHJcblxyXG4gIFxyXG5cclxuICBcdHZhciB2aWV3RWxlbWVudCA9IGZ1bmN0aW9uKGVsZW0sZ3V0dGVyKXtcclxuICAgICAgdmFyIHNjcm9sbCA9IGJhc2UuZ2V0UG9zaXRpb25Ub3RhbChcInNjcm9sbFwiKTtcclxuICAgICAgJC5lYWNoKGVsZW0sZnVuY3Rpb24oaSl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAkdGhpc1Bvc2l0aW9uID0gYmFzZS5nZXRQb3NpdGlvblRvdGFsKGVsZW0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBsYXN0ID0gZWxlbS5sZW5ndGggLSAxO1xyXG4gICAgICAgIHZhciBtYXJnaW4gPSAkdGhpc1Bvc2l0aW9uWzFdLnRvcCAtICR0aGlzUG9zaXRpb25bMF0uYm90dG9tO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHNjcm9sbC50b3AgPCAkdGhpc1Bvc2l0aW9uWzBdLnRvcCl7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICQoXCIuc2lkZWJhcl9faXRlbVwiKS5lcSgwKS5hZGRDbGFzcyhcInNpZGViYXJfX2l0ZW1fYWN0aXZlXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzY3JvbGwudG9wICsgZ3V0dGVyID4gJHRoaXNQb3NpdGlvbltsYXN0XS50b3Ape1xyXG4gICAgICAgICAgJChcIi5zaWRlYmFyX19pdGVtXCIpLmVxKGxhc3QpLmFkZENsYXNzKFwic2lkZWJhcl9faXRlbV9hY3RpdmVcIilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgaWYoKHNjcm9sbC50b3AgKyBndXR0ZXIgPj0gJHRoaXNQb3NpdGlvbltpXS50b3ApICYmICgkdGhpc1Bvc2l0aW9uW2ldLmJvdHRvbSArIG1hcmdpbj49IHNjcm9sbC50b3AgKyBndXR0ZXIpKXtcclxuXHJcbiAgICAgICAgICAgICQoXCIuc2lkZWJhcl9faXRlbVwiKS5lcShpKS5hZGRDbGFzcyhcInNpZGViYXJfX2l0ZW1fYWN0aXZlXCIpXHJcbiAgICAgICAgICAgICQoXCIuc2lkZWJhcl9faXRlbVwiKS5lcShpKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwic2lkZWJhcl9faXRlbV9hY3RpdmVcIilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgXHQgfTtcclxuXHJcbiAgICB2YXIgX3JlbW92ZUNsYXNzZXNPblJlc2l6ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJHNpZGViYXIuaGFzQ2xhc3Mob3Blbikpe1xyXG4gICAgICAgICAgY2xlYXJDbGFzZXNzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdmFyIF9hZGRTaWRlYmFyPSBmdW5jdGlvbigpe1xyXG4gICAgXHRjcmVhdGVJdGVtcygpO1xyXG4gICAgXHRzaWJlYmFyU2Nyb2xsVG8oMjAsc2Nyb2xsU3BlZWQpO1xyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciBfb3BlblNpZGViYXIgPSBmdW5jdGlvbigpe1xyXG4gICAgXHQkc2lkZWJhckJ1dHRvbi5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGJsb2cudG9nZ2xlQ2xhc3MoY29udGVudFB1c2gpO1xyXG4gICAgICAgICAgICAkc2lkZWJhci50b2dnbGVDbGFzcyhvcGVuKTtcclxuICAgICAgICAgICAgJHNhbmR3aWNoLnRvZ2dsZUNsYXNzKGhpZGUpO1xyXG4gICAgICAgICAgICAkaHRtbC50b2dnbGVDbGFzcyhub1Njcm9sbCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgc3RpY2tTaWRlYmFyID0gZnVuY3Rpb24oZWxlbSl7XHJcbiAgXHRcdFx0aWYoJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgPj0gJHNpZGViYXJQb3Mpe1xyXG4gICAgXHRcdFx0JHNpZGViYXIuYWRkQ2xhc3MoZml4ZWQpO1xyXG5cclxuICAgIFx0XHR9ZWxzZXtcclxuICAgICAgICAgICRzaWRlYmFyLnJlbW92ZUNsYXNzKGZpeGVkKTtcclxuICAgIFx0XHR9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX291dENsaWNrID0gZnVuY3Rpb24oKXtcclxuICAgICAgJChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICB2YXIgY29udGFpbmVyID0gJHNpZGViYXI7XHJcbiAgICAgICAgaWYgKGNvbnRhaW5lci5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCl7XHJcbiAgICAgICAgICAgY2xlYXJDbGFzZXNzKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9zZXRVcExpc3RuZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBcdFx0X2FkZFNpZGViYXIoKTtcclxuICAgIFx0XHRfb3BlblNpZGViYXIoKTtcclxuICAgICAgICBfcmVtb3ZlQ2xhc3Nlc09uUmVzaXplKCk7XHJcbiAgICAgICAgX291dENsaWNrKCk7XHJcbiAgICAgICAgXHRcclxuICAgIFx0XHJcbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbCBsb2FkXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICB2aWV3RWxlbWVudCgkKFwiLmFydGljbGVfX2l0ZW1cIiksc3RhcnRBY3RpdmUpO1xyXG4gICAgICAgIHN0aWNrU2lkZWJhcigkc2lkZWJhcik7XHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3NldFVwTGlzdG5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxufSkoKTtcclxuIiwiLy8gPT09PT09PT09PT0gRm9ybSBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcbnZhciBmb3JtTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuXHJcblxyXG4gICAgdmFyIGNyZWF0ZVBvcFVwV2luZG93ID0gZnVuY3Rpb24odGV4dCl7XHJcbiAgICAgICAgJChcIjxkaXYgY2xhc3M9J3BvcFVwV2luZG93Jz48ZGl2IGNsYXNzPSdwb3BVcFdpbmRvd19fY29udGFpbmVyJz48c3BhbiBjbGFzcz0ncG9wVXBXaW5kb3dfX2Nsb3NlJz48L3NwYW4+PHAgY2xhc3M9J3BvcFVwV2luZG93X190ZXh0Jz5cIisgdGV4dCArXCI8L3A+PC9kaXY+PC9kaXY+XCJcclxuICAgICAgICAgICAgKS5wcmVwZW5kVG8oJChcImJvZHlcIikpO1xyXG5cclxuICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICAgICQoXCIucG9wVXBXaW5kb3dfX2Nsb3NlXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgJHBvcFVwV2luZG93ID0gJChcIi5wb3BVcFdpbmRvd1wiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCRwb3BVcFdpbmRvdykuYWRkQ2xhc3MoXCJoaWRlXCIpO1xyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJHRoaXMuY2xvc2VzdCgkKCRwb3BVcFdpbmRvdykpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9LDQwMCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmb3JtVmFsaWRhdGlvbiA9IGZ1bmN0aW9uKHRoaXNFbGVtKXtcclxuICAgICAgICB2YXIgcGF0dGVybiA9IC9eKFswLTlhLXpBLVpfLV0rXFwuKSpbMC05YS16QS1aXy1dK0BbMC05YS16QS1aXy1dKyhcXC5bMC05YS16QS1aXy1dKykqXFwuW2Etel17Miw2fSQvO1xyXG4gICAgICAgIHZhciBmb3JtID0gdGhpc0VsZW0uY2xvc2VzdChcImZvcm1cIik7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gZm9ybS5maW5kKFwiLmZvcm1fX2l0ZW1cIik7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gaXRlbXMuZmluZChcIi5mb3JtX19pbnB1dFwiKTtcclxuICAgICAgICB2YXIgZXJyb3IgPSB7XHJcbiAgICAgICAgICAgICAgICBudW1iZXIgOiAwLFxyXG4gICAgICAgICAgICAgICAgdGV4dCA6IFwi0KPRgdC/0LXRiNC90L5cIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIGVtcHR5SW5wdXQgPSAoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaXRlbXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoJCh0aGlzKS5jaGlsZHJlbihpbnB1dCkudmFsKCkgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLm51bWJlciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IudGV4dCA9IFwi0JfQsNC/0L7Qu9C90LXQvdGLINC90LUg0LLRgdC1INC/0L7Qu9GPXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xyXG4gICAgICAgICAgICB9ICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pKClcclxuICAgICAgICBpZihmb3JtLmZpbmQoXCJbbmFtZSA9IGVtYWlsXVwiKS5sZW5ndGggJiYgIWVycm9yLm51bWJlcil7XHJcbiAgICAgICAgICAgIHZhciBlbWFpbCA9IGl0ZW1zLmZpbmQoXCJbbmFtZSA9IGVtYWlsXVwiKTtcclxuICAgICAgICAgICAgaWYoIXBhdHRlcm4udGVzdChlbWFpbC52YWwoKSkpe1xyXG4gICAgICAgICAgICAgICAgZXJyb3IubnVtYmVyID0gMjtcclxuICAgICAgICAgICAgICAgIGVycm9yLnRleHQgPSBcIkVtYWlsINC90LUg0L/RgNCw0LLQuNC70YzQvdGL0LlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmb3JtLmZpbmQoXCJbbmFtZSA9IGNoZWNrYm94XVwiKS5sZW5ndGggJiYgIWVycm9yLm51bWJlcil7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2hlY2tib3ggPSBmb3JtLmZpbmQoXCJbbmFtZSA9IGNoZWNrYm94XTpjaGVja2VkXCIpLmxlbmd0aFxyXG4gICAgICAgICAgICBpZighY2hlY2tib3gpe1xyXG4gICAgICAgICAgICAgICAgZXJyb3IubnVtYmVyID0gMztcclxuICAgICAgICAgICAgICAgIGVycm9yLnRleHQgPSBcItCS0Ysg0YfQtdC70L7QstC10Lo/XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm9ybS5maW5kKFwiW25hbWUgPSByYWRpb11cIikubGVuZ3RoICYmICFlcnJvci5udW1iZXIpe1xyXG5cclxuICAgICAgICAgICAgdmFyIHJhZGlvID0gZm9ybS5maW5kKFwiI2Zvcm0tcmFkaW8teWVzOmNoZWNrZWRcIikubGVuZ3RoXHJcbiAgICAgICAgICAgIGlmKCFyYWRpbyl7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5udW1iZXIgPSA0O1xyXG4gICAgICAgICAgICAgICAgZXJyb3IudGV4dCA9IFwi0KDQvtCx0L7RgtCw0Lwg0LfQtNC10YHRjCDQvdC1INC80LXRgdGC0L4hXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm9ybS5maW5kKFwiW25hbWUgPSBwYXNzd29yZF1cIikubGVuZ3RoICYmICFlcnJvci5udW1iZXIpe1xyXG4gICAgICAgICAgICB2YXIgbXlQYXNzID0gXCIxMjNcIjtcclxuICAgICAgICAgICAgdmFyIHBhc3MgPSBpdGVtcy5maW5kKFwiW25hbWUgPSBwYXNzd29yZF1cIik7XHJcbiAgICAgICAgICAgIGlmKHBhc3MudmFsKCkgIT09IG15UGFzcyl7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5udW1iZXIgPSA1O1xyXG4gICAgICAgICAgICAgICAgZXJyb3IudGV4dCA9IFwi0J/QsNGA0L7Qu9GMINC90LUg0LLQtdGA0L3Ri9C5XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICBzd2l0Y2ggKGVycm9yLm51bWJlcikge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQb3BVcFdpbmRvdyhlcnJvci50ZXh0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVBvcFVwV2luZG93KGVycm9yLnRleHQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUG9wVXBXaW5kb3coZXJyb3IudGV4dCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQb3BVcFdpbmRvdyhlcnJvci50ZXh0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVBvcFVwV2luZG93KGVycm9yLnRleHQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUG9wVXBXaW5kb3coZXJyb3IudGV4dCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvL2FsZXJ0KCAn0K8g0YLQsNC60LjRhSDQt9C90LDRh9C10L3QuNC5INC90LUg0LfQvdCw0Y4nICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9hZGRQb3BVcFdpbmRvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyICRidXR0b24gPSAkKFwiW3R5cGU9c3VibWl0XVwiKTtcclxuICAgICAgICAkYnV0dG9uLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JtVmFsaWRhdGlvbigkKHRoaXMpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0bmVyID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9zZXRVcExpc3RuZXIoKTtcclxuICAgICAgICAgICAgX2FkZFBvcFVwV2luZG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSkoKTsiLCIvLyA9PT09PT09PT09PSBTbGlkZXIgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgc2xpZGVyTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzbGlkZXIoZWxlbSl7XHJcbiAgICAgICAgLy8gU2xpZGVyXHJcblxyXG4gICAgICAgIHZhciAkc2xpZGVyID0gZWxlbTtcclxuICAgICAgICB2YXIgJHNsaWRlckNvbnRlbnQgPSAkc2xpZGVyLmZpbmQoXCIuc2xpZGVyX19jb250ZW50XCIpO1xyXG4gICAgICAgIHZhciAkc2xpZGVyRGVzayA9ICRzbGlkZXIuZmluZChcIi5zbGlkZXJfX2Rlc2tcIik7XHJcbiAgICAgICAgdmFyICRkZXNrQ29udGVudCA9ICRzbGlkZXJEZXNrLmZpbmQoXCIuZGVza19fY29udGVudFwiKTtcclxuXHJcblxyXG5cclxuICAgICAgICB2YXIgJHNsaWRlckNvbnRyb2xzID0gJHNsaWRlckNvbnRlbnQuZmluZChcIi5zbGlkZXJfX2NvbnRyb2xsXCIpO1xyXG4gICAgICAgIHZhciAkc2xpZGVyQnV0dG9ucyA9ICRzbGlkZXIuZmluZChcIi5zbGlkZXJfX2J1dHRvblwiKTtcclxuICAgICAgICB2YXIgJHNsaWRlclZpZXcgPSAkc2xpZGVyQ29udGVudC5maW5kKFwiLnNsaWRlcl9fdmlld1wiKTtcclxuICAgICAgICB2YXIgJHNsaWRlckl0ZW1zID0gJHNsaWRlclZpZXcuZmluZChcIi5zbGlkZXJfX2l0ZW1cIik7XHJcbiAgICAgICAgdmFyICRzbGlkZXJMaXN0ID0gJHNsaWRlclZpZXcuZmluZChcIi5zbGlkZXJfX2xpc3RcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHRyYW5zaXRpb25FbmQgPSAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJztcclxuICAgICAgICB2YXIgZmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIEJ1dHRvbnNcclxuXHJcbiAgICAgICAgdmFyICRidXR0b25VcCA9ICRzbGlkZXJCdXR0b25zLmZpbmQoXCIuc2xpZGVyX191cFwiKS5zaWJsaW5ncyhcIi5zbGlkZXJfX2ljb1wiKTtcclxuICAgICAgICB2YXIgJGJ1dHRvbkRvd24gPSAkc2xpZGVyQnV0dG9ucy5maW5kKFwiLnNsaWRlcl9fZG93blwiKS5zaWJsaW5ncyhcIi5zbGlkZXJfX2ljb1wiKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyBDbGFzc2VzXHJcbiAgICAgICAgdmFyIGFjdGl2ZSA9IFwic2xpZGVyX19hY3RpdmVcIjtcclxuICAgICAgICB2YXIgZG93biA9IFwic2xpZGUtLWRvd25cIjtcclxuICAgICAgICB2YXIgdXAgPSBcInNsaWRlLS11cFwiO1xyXG4gICAgICAgIHZhciBzbGlkZVNob3cgPSBcInNsaWRlLS1zaG93XCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB2YXIgY2xvbmVTbGlkZXMgPSBmdW5jdGlvbihjb250YWluZXIsYWN0aXZlSW5kZXgpe1xyXG4gICAgICAgICAgICAkY29udGFpbmVyID0gY29udGFpbmVyLnNpYmxpbmdzKFwiLnNsaWRlcl9fbGlzdC1jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2xpZGVyTGlzdC5jbG9uZSgpLmFwcGVuZFRvKCRjb250YWluZXIpO1xyXG4gICAgICAgICAgICB2YXIgY3VyZW50SXRlbXMgPSAkY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpO1xyXG4gICAgICAgICAgICBjdXJlbnRJdGVtcy5yZW1vdmVDbGFzcyhhY3RpdmUpO1xyXG4gICAgICAgICAgICBjdXJlbnRJdGVtcy5lcShhY3RpdmVJbmRleCkuYWRkQ2xhc3MoYWN0aXZlKTtcclxuICAgICAgICAgICAgY3VyZW50SXRlbXMuZXEoYWN0aXZlSW5kZXgpLnByZXYoKS5hZGRDbGFzcyh1cCk7XHJcbiAgICAgICAgICAgIGN1cmVudEl0ZW1zLmVxKGFjdGl2ZUluZGV4KS5uZXh0KCkuYWRkQ2xhc3MoZG93bik7XHJcbiAgICAgICAgICAgIGlmKCFjdXJlbnRJdGVtcy5lcShhY3RpdmVJbmRleCkubmV4dCgpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjdXJlbnRJdGVtcy5maXJzdCgpLmFkZENsYXNzKGRvd24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9uZVNsaWRlcygkYnV0dG9uVXAsLTEpO1xyXG4gICAgICAgIGNsb25lU2xpZGVzKCRidXR0b25Eb3duLDEpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGFkZENsYXNzID0gZnVuY3Rpb24oc2xpZGUsY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgc2xpZGUuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhZGRDbGFzc1ByZXYgPSBmdW5jdGlvbihzbGlkZSxjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICBzbGlkZS5hZGRDbGFzcyhjbGFzc05hbWUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYoIXNsaWRlLm5leHQoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGFkZENsYXNzU2libGluZyA9IGZ1bmN0aW9uKHNsaWRlLGNsYXNzTmFtZSxkaXJlY3Rpb24pe1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVGaXJzdCA9IHNsaWRlLnBhcmVudCgpLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLmZpcnN0KCkuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgdmFyIHNsaWRlTGFzdCA9IHNsaWRlLnBhcmVudCgpLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLmxhc3QoKS5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PSBcIm5leHRcIil7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5uZXh0KCkuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZighc2xpZGUubmV4dCgpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUZpcnN0LmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnByZXYoKS5hZGRDbGFzcyhjbGFzc05hbWUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKCFzbGlkZS5wcmV2KCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUxhc3QuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhZGRDb250ZW50ID0gZnVuY3Rpb24oc2xpZGUpe1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzbGlkZS5pbmRleCgpO1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCJhY3RpdmVfX2Rlc2tfX2NvbnRlbnRcIjtcclxuICAgICAgICAgICAgJGRlc2tDb250ZW50LmVxKGluZGV4KS5hZGRDbGFzcyhjbGFzc05hbWUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGFjdGl2ZVNsaWRlSW5pdCA9IGZ1bmN0aW9uKGVsZW0scmV2ZXJzZSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGN1cmVudEVsZW1lbnQgPSBlbGVtO1xyXG4gICAgICAgICAgICB2YXIgJGN1cmVudExpc3QgPSAkY3VyZW50RWxlbWVudC5maW5kKFwiLnNsaWRlcl9fbGlzdFwiKTtcclxuICAgICAgICAgICAgdmFyICRjdXJlbnRJdGVtcyA9ICRjdXJlbnRMaXN0LmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpO1xyXG4gICAgICAgICAgICB2YXIgJGN1cmVudEFjdGl2ZUl0ZW0gPSAkY3VyZW50SXRlbXMuZmlsdGVyKFwiLnNsaWRlcl9fYWN0aXZlXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAkbmV4dFNsaWRlID0gJGN1cmVudEFjdGl2ZUl0ZW0ubmV4dCgpO1xyXG4gICAgICAgICAgICB2YXIgJHByZXZTbGlkZSA9ICRjdXJlbnRBY3RpdmVJdGVtLnByZXYoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZmlyc3RTbGlkZSA9ICRjdXJlbnRJdGVtcy5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgJGxhc3RTbGlkZSA9ICRjdXJlbnRJdGVtcy5sYXN0KCk7XHJcblxyXG5cclxuICAgICAgICBpZighJGN1cmVudEVsZW1lbnQucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoXCJzbGlkZXJfX2NvbnRyb2xsXCIpKXtcclxuICAgICAgICAgICAgaWYoIXJldmVyc2UpeyAgICAgXHJcbiAgICAgICAgICAgICAgICBpZigkbmV4dFNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJG5leHRTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJGZpcnN0U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZigkcHJldlNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJHByZXZTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJGxhc3RTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkbmV3QWN0aXZlID0gJGN1cmVudEl0ZW1zLmZpbHRlcihcIi5zbGlkZXJfX2FjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGFkZENvbnRlbnQoJG5ld0FjdGl2ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCRjdXJlbnRFbGVtZW50LnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKFwic2xpZGVyX19jb250cm9sbFwiKSl7XHJcbiAgICAgICAgICAgIGlmKCFyZXZlcnNlKXsgICAgXHJcbiAgICAgICAgICAgICAgICBpZigkbmV4dFNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJG5leHRTbGlkZSxhY3RpdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRmaXJzdFNsaWRlLGFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoJHByZXZTbGlkZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRwcmV2U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRsYXN0U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJG5ld0FjdGl2ZSA9ICRjdXJlbnRJdGVtcy5maWx0ZXIoXCIuc2xpZGVyX19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGFkZENsYXNzU2libGluZygkbmV3QWN0aXZlLGRvd24sXCJuZXh0XCIpO1xyXG4gICAgICAgICAgICBhZGRDbGFzc1NpYmxpbmcoJG5ld0FjdGl2ZSx1cCxcImxhc3RcIik7ICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgIFxyXG5cclxuICAgICAgICAkYnV0dG9uVXAub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcykuc2libGluZ3MoXCIuc2xpZGVyX19saXN0LWNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgaWYoZmxhZyl7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHNsaWRlclZpZXcsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHRoaXMsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJGJ1dHRvbkRvd24uc2libGluZ3MoXCIuc2xpZGVyX19saXN0LWNvbnRhaW5lclwiKSx0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHRoaXMuZmluZChcIi5zbGlkZXJfX2l0ZW1cIikub24odHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAkYnV0dG9uRG93bi5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKS5zaWJsaW5ncyhcIi5zbGlkZXJfX2xpc3QtY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICBpZihmbGFnKXtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlSW5pdCgkc2xpZGVyVmlldyk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVJbml0KCRidXR0b25VcC5zaWJsaW5ncyhcIi5zbGlkZXJfX2xpc3QtY29udGFpbmVyXCIpKTtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR0aGlzLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLm9uKHRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2xpZGVySW5pdCgpe1xyXG4gICAgICAgIGlmKGJhc2UuZ2V0UGFnZSgpID09IFwid29ya3NcIil7XHJcbiAgICAgICAgICAgIHNsaWRlcigkKFwiI3NsaWRlclwiKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2xpZGVySW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIvLyA9PT09PT09PT09PSBTa2lsbHMgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgc2tpbGxzTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuICAgIHZhciAkc2tpbGwgPSAkKFwiLnNraWxsXCIpO1xyXG4gICAgdmFyICRjb250ZW50ID0gJChcIi5wYWdlLWNvbnRlbnRcIik7XHJcblxyXG4gICAgdmFyIHNraWxsUGVyY2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNraWxsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAkdGhpcy5kYXRhKFwicGVyY2VudFwiKTtcclxuICAgICAgICAgICAgdmFyIGNpcmNsZSA9ICR0aGlzLmZpbmQoXCIuc2tpbGxfX2NpcmNsZVwiKTtcclxuICAgICAgICAgICAgY2lyY2xlLmNzcyh7XCJzdHJva2UtZGFzaGFycmF5XCI6IHBlcmNlbnQgKyBcIiAxMDBcIn0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNraWxsc0luaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGJhc2UuZ2V0UG9zaXRpb25Ub3RhbChcInNjcm9sbFwiKS50b3AgPj0gJGNvbnRlbnQub2Zmc2V0KCkudG9wIC0gMTAwKXtcclxuICAgICAgICAgICAgc2tpbGxQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNraWxsc0luaXQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIi8vID09PT09PT09PT09IE1hcCBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcblxyXG52YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG5pZihiYXNlLmdldFBhZ2UoKSA9PSBcImFib3V0XCIpe1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHtsYXQ6IDYwLjAwODYzMDIzLCBsbmc6IDMwLjI0ODQyNDQxfTtcclxuICAgICAgICB2YXIgbWFya2VyUG9zaXRpb24gPSAge2xhdDogNjAuMDE3MzkxLCBsbmc6IDMwLjI3MzYxOH07XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgY2VudGVyOiBwb3NpdGlvbixcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgem9vbTogMTQsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBpbWFnZSA9IHtcclxuICAgICAgICAgICAgICB1cmw6IFwiLi9hc3NldHMvaW1nL21hcC1tYXJrZXIucG5nXCIsXHJcbiAgICAgICAgICAgICAgc2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNzEsIDcxKSxcclxuICAgICAgICAgICAgICAvL29yaWdpbjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDAsIDApLFxyXG4gICAgICAgICAgICAgIGFuY2hvcjogbmV3IGdvb2dsZS5tYXBzLlBvaW50KDE3LCA0MCksXHJcbiAgICAgICAgICAgICAgc2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoNDAsIDU2KVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IG1hcmtlclBvc2l0aW9uLFxyXG4gICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgdGl0bGU6ICdIZWxsbyBXb3JsZCEnLFxyXG4gICAgICAgICAgICBpY29uOiBpbWFnZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgdmFyIHN0eWxlcyA9IFtcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwibGFuZHNjYXBlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmZmZmZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInBvaVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeVwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNkNmQ2ZDZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJnZW9tZXRyeS5maWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJsYWJlbHNcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicm9hZC5oaWdod2F5LmNvbnRyb2xsZWRfYWNjZXNzXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM4NmE3N2FcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dXHJcbm1hcC5zZXRPcHRpb25zKHtzdHlsZXM6IHN0eWxlc30pO1xyXG59XHJcbn0iLCIvLyA9PT09PT09PT09PSBQcmVsb2FkZXIgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgcHJlbG9hZGVyTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuXHJcbnZhciBfYWRkTG9hZGVyID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBpbWdzID0gW107XHJcblxyXG4gICAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgICAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQgPSAkdGhpcy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcclxuICAgICAgICAgICAgaW1nID0gJHRoaXMuaXMoJ2ltZycpO1xyXG5cclxuICAgICAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbWcpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAxO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICAgICAgICBzcmM6IGltZ3NbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbWFnZS5vbih7XHJcbiAgICAgICAgICAgIGxvYWQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBlcnJvciA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBlcmNlbnRzKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICAgICAgdmFyIHBlcmNlbnQgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICAgICAgJCgnLnByZWxvYWRlcicpLmFkZENsYXNzKFwic2hvd091dFwiKTtcclxuICAgICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJuby1zY3JvbGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcucHJlbG9hZGVyX19udW1iZXInKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gICAgfVxyXG59O1xyXG4gICAgXHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBfYWRkTG9hZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIid1c2Ugc3RyaWN0J1xyXG52YXIgc3RhcnRNb2R1bGUgPSAoZnVuY3Rpb24oKXtcclxuICAgIC8vINCf0LXRgNC10LzQtdC90L3Ri9C1XHJcblxyXG4gICAgdmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn0pKCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiQoIGRvY3VtZW50ICkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZTtcclxuXHJcblxyXG4gICAgY29tbW9uTW9kdWxlLmluaXQoKTtcclxuICAgIG1lbnVNb2R1bGUuaW5pdCgpO1xyXG4gICAgXHJcbiAgICBmb3JtTW9kdWxlLmluaXQoKTtcclxuICAgIHNsaWRlck1vZHVsZS5pbml0KCk7XHJcbiAgICBwcmVsb2FkZXJNb2R1bGUuaW5pdCgpO1xyXG4gICAgc2tpbGxzTW9kdWxlLmluaXQoKTtcclxuICAgIGlmKGJhc2UuZ2V0UGFnZSgpID09IFwiYmxvZ1wiKXtcclxuICAgICAgICBzaWRlYmFyTW9kdWxlLmluaXQoKTtcclxuICAgIH1cclxuICAgIFxyXG59KVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiQoIGRvY3VtZW50ICkucmVhZHkoZnVuY3Rpb24oKSB7XHJcblxyXG4vKmlmKGJhc2UuZ2V0UGFnZSgpID09IFwiaW5kZXhcIiB8fCAhYmFzZS5nZXRQYWdlKCkpe1xyXG4gICAgJChcIi5ob21lLXBhZ2VcIikuY3NzKHtcclxuICAgICAgICBcIm1pbi1oZWlnaHRcIiA6ICQod2luZG93KS5oZWlnaHQoKVxyXG4gICAgfSlcclxuXHJcbn0qL1xyXG5cclxuXHJcblxyXG59KVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
