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
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/admin',true)

        var data = {
            user: document.getElementById('form-name').value,
            pass: document.getElementById('form-pass').value
        };
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function(){
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
                location.href = '/admin.html';
            }else if(xhr.readyState === XMLHttpRequest.DONE){
                var text = "Данные не правильные";
                xhr.abort(createPopUpWindow(text));
            };
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
                loginForm();
                //createPopUpWindow(error.text);
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9iYXNlLmpzIiwiX2NvbW1vbi5qcyIsIl9tZW51LmpzIiwiX3NpZGViYXIuanMiLCJfZm9ybS5qcyIsIl9zbGlkZXIuanMiLCJfc2tpbGxzLmpzIiwiX21hcC5qcyIsIl9wcmVsb2FkZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPT09PT09PT09PT0gQmFzZSBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcbnZhciBCYXNlTW9kdWxlID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMubG9nID0gZnVuY3Rpb24oZWxlbSl7XHJcbiAgICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKGVsZW0pXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbihlbGVtLHBvc2l0aW9uKXtcclxuICAgICAgICBpZihwb3NpdGlvbiA9PSBcImxlZnRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiAkKGVsZW0pLm9mZnNldCgpLmxlZnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocG9zaXRpb24gPT0gXCJ0b3BcIil7XHJcbiAgICAgICAgICAgIHJldHVybiAkKGVsZW0pLm9mZnNldCgpLnRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNjcm9sbFRvID0gZnVuY3Rpb24oZWxlbSwgc3BlZWQpe1xyXG4gICAgICAgIHJldHVybiAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHRoaXMuZ2V0UG9zaXRpb24oZWxlbSxcInRvcFwiKX0sIHNwZWVkKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jbG9uZUluc2VydCA9IGZ1bmN0aW9uKHBhcmVudCxlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5jbG9uZSh0cnVlKS5wcmVwZW5kVG8ocGFyZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRVcmwgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5ocmVmO1xyXG4gICAgfTtcclxuICAgIHRoaXMuZ2V0UGFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUgPT0gXCIvXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUubWF0Y2goLyhbYS16QS1aXSspLylbMF07XHJcbiAgICB9O1xyXG4gICAgdGhpcy5zY3JvbGxQb3MgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5kZWJhZ1dpbmRvdyA9IGZ1bmN0aW9uKHRleHQsYmdDb2xvcix0ZXh0Q29sb3Ipe1xyXG4gICAgICBpZighYmdDb2xvcil7XHJcbiAgICAgICAgYmdDb2xvciA9IFwicmdiYSgyNTUsMTgwLDI1NSwuOClcIlxyXG4gICAgICB9XHJcbiAgICAgIGlmKCF0ZXh0Q29sb3Ipe1xyXG4gICAgICAgIHRleHRDb2xvciA9IFwiIzMzM1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKCQoXCJkaXZcIikuaXMoJChcIi5kZWJhZ19fd2luZG93XCIpKSl7XHJcbiAgICAgICAgJCgnLmRlYmFnX193aW5kb3cnKS5odG1sKHRleHQpO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAkKFwiPGRpdiBjbGFzcz0nZGViYWdfX3dpbmRvdyc+PGRpdj5cIikucHJlcGVuZFRvKFwiYm9keVwiKS5jc3Moe1xyXG4gICAgICAgICAgXCJ3aWR0aFwiIDogXCI0MHZ3XCIsXHJcbiAgICAgICAgICBcIm1heC1oZWlnaHRcIiA6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kXCIgOiBiZ0NvbG9yLFxyXG4gICAgICAgICAgXCJjb2xvclwiIDogdGV4dENvbG9yLFxyXG4gICAgICAgICAgXCJmb250LXNpemVcIiA6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgXCJwYWRkaW5nXCIgOiBcIjEwdmggMFwiLFxyXG4gICAgICAgICAgXCJwb3NpdGlvblwiIDogXCJmaXhlZFwiLFxyXG4gICAgICAgICAgXCJ6LWluZGV4XCIgOiBcIjk5OTk5OTk5XCIsXHJcbiAgICAgICAgICBcInRleHQtYWxpZ25cIiA6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICBcInRvcFwiIDogXCI1MCVcIixcclxuICAgICAgICAgIFwibGVmdFwiIDogXCI1MCVcIixcclxuICAgICAgICAgIFwidHJhbnNmb3JtXCIgOiBcInRyYW5zbGF0ZSgtNTAlLC01MCUpXCIsXHJcbiAgICAgICAgICBcIm1hcmdpblwiIDogXCJhdXRvXCJcclxuICAgICAgICB9KS5odG1sKHRleHQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgIHRoaXMuZ2V0UG9zaXRpb25Ub3RhbCA9IGZ1bmN0aW9uKGVsZW0pe1xyXG5cclxuICAgICAgICB2YXIgJHRoaXMgPSAkKGVsZW0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJHRoaXMub2Zmc2V0KCkpO1xyXG4gICAgICAgIC8qcmV0dXJuIHRydWU7Ki9cclxuXHJcbiAgICAgICAgc3dpdGNoKGVsZW0pe1xyXG4gICAgICAgICAgIGNhc2UgXCJ3aW5kb3dcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtXCIgOiBcIndpbmRvd1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVpZ2h0XCIgOiAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiIDogJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJib3R0b21cIiA6ICQod2luZG93KS5oZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBcInRvcFwiIDogMCxcclxuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJCh3aW5kb3cpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJUb3BcIiA6ICQod2luZG93KS5oZWlnaHQoKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJsZWZ0XCIgOiAkKHdpbmRvdykud2lkdGgoKSAvIDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJkb2N1bWVudFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBcImVsZW1cIiA6IFwiZG9jdW1lbnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiIDogJChkb2N1bWVudCkuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiIDogJChkb2N1bWVudCkud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiIDogJChkb2N1bWVudCkuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmlnaHRcIiA6ICQoZG9jdW1lbnQpLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJUb3BcIiA6ICQoZG9jdW1lbnQpLmhlaWdodCgpIC8gMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgXCJzY3JvbGxcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJlbGVtXCIgOiBcInNjcm9sbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9wXCIgOiAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiIDogJChkb2N1bWVudCkuc2Nyb2xsVG9wKCkgKyAkKHdpbmRvdykuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIgOiAkKGRvY3VtZW50KS5zY3JvbGxMZWZ0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyaWdodFwiIDogJChkb2N1bWVudCkuc2Nyb2xsTGVmdCgpICsgJChkb2N1bWVudCkud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgICAgICBcImNlbnRlclRvcFwiIDogKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJMZWZ0XCIgOiAoJChkb2N1bWVudCkuc2Nyb2xsTGVmdCgpICsgJCh3aW5kb3cpLndpZHRoKCkpIC8gMixcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJC5lYWNoKCR0aGlzLGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9IGVsZW0uZXEoaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnB1c2goIFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbGVtXCIgOiAkdGhpcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aWR0aFwiIDogJHRoaXMub3V0ZXJXaWR0aCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlaWdodFwiIDogJHRoaXMub3V0ZXJIZWlnaHQoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIiA6ICR0aGlzLm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJsZWZ0XCIgOiAkdGhpcy5vZmZzZXQoKS5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJpZ2h0XCIgOiAkdGhpcy5vdXRlcldpZHRoKCkgKyAkdGhpcy5vZmZzZXQoKS5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvdHRvbVwiIDogJHRoaXMub3V0ZXJIZWlnaHQoKSArICR0aGlzLm9mZnNldCgpLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjZW50ZXJUb3BcIiA6ICgkdGhpcy5vdXRlckhlaWdodCgpICsgJHRoaXMub2Zmc2V0KCkudG9wKSAvIDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2VudGVyTGVmdFwiIDogKCR0aGlzLm91dGVyV2lkdGgoKSArICR0aGlzLm9mZnNldCgpLmxlZnQpIC8gMixcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqOyAgICBcclxuICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB0aGlzLmluV2luZG93ID0gZnVuY3Rpb24oZWxlbSx0b3BFbGVtLHBvc2l0aW9uKXtcclxuICAgICAgICBpZighdG9wRWxlbSl7XHJcbiAgICAgICAgICAgIHRvcEVsZW0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcblxyXG4gICAgICAgIHZhciBjdXJyZW50RWxzID0gZWxlbTtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgY3VycmVudEVscy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBlbCA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBlbC5vZmZzZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgc3dpdGNoKHBvc2l0aW9uKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3BcIjpcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXRUb3AgPSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXRUb3AgKyAkKHRoaXMpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2VudGVyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldFRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wO1xyXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG9mZnNldFRvcCArICgkKHRoaXMpLmhlaWdodCgpIC8gMik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJCh0aGlzKS5vZmZzZXQoKS50b3A7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coc2Nyb2xsVG9wKTtcclxuICAgICAgICAgICAgaWYoc2Nyb2xsVG9wID49IG9mZnNldC50b3AgJiYgc2Nyb2xsVG9wIDw9IG9mZnNldC50b3AgKyh0b3BFbGVtKSArIGVsLmhlaWdodCgpKVxyXG4gICAgICAgICAgICAgICAgLy9zY3JvbGxUb3AgPj0gb2Zmc2V0ICYmIHNjcm9sbFRvcCA8PSBvZmZzZXQgKyAkKHRoaXMpLmhlaWdodCgpXHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgcmV0dXJuICQocmVzdWx0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRJbWdQYXRoID0gZnVuY3Rpb24oKXtcclxuICAgIFx0cmV0dXJuIFwiLi9hc3NldHMvaW1nL1wiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nZXRUcmFuc2l0aW9uID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCc7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbiIsIi8vID09PT09PT09PT09IENvbW1vbiBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcbnZhciBjb21tb25Nb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZSgpO1xyXG5cclxuICAgIHZhciAkZG93bkNsaWNrID0gJChcIi5kb3duLWNsaWNrX19pY29cIik7XHJcbiAgICB2YXIgJHVwQ2xpY2sgPSAkKFwiLnVwLWNsaWNrX19pY29cIik7XHJcbiAgICB2YXIgJGNvbnRlbnQgPSAkKFwiLnBhZ2UtY29udGVudFwiKTtcclxuICAgIHZhciBzY3JvbGxTcGVlZCA9IDcwMDtcclxuICAgIHZhciAkZW50ZXJ5ID0gJChcIi5lbnRyeVwiKTtcclxuXHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBcclxuXHJcblxyXG5cclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdG5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkZG93bkNsaWNrLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe2Jhc2Uuc2Nyb2xsVG8oJGNvbnRlbnQsc2Nyb2xsU3BlZWQpfSk7XHJcbiAgICAgICAgJHVwQ2xpY2sub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7YmFzZS5zY3JvbGxUbygkKFwiYm9keVwiKSxzY3JvbGxTcGVlZCl9KTtcclxuXHJcbiAgICAgICAgJGVudGVyeS5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImhpZGVcIik7XHJcbiAgICAgICAgICAgICQoXCIuaG9tZS1wYWdlIC5jb3ZlclwiKS5hZGRDbGFzcyhcImZsaXBcIik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcIi5jb3Zlcl9fYmFjayBhXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkZW50ZXJ5LnJlbW92ZUNsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgJChcIi5ob21lLXBhZ2UgLmNvdmVyXCIpLnJlbW92ZUNsYXNzKFwiZmxpcFwiKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX3NldFVwTGlzdG5lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIvLyA9PT09PT09PT09PSBNZW51IG1vZHVsZSA9PT09PT09PT09PVxyXG5cclxudmFyIG1lbnVNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZSgpO1xyXG4gICAgdmFyICRtZW51ID0gJChcIi5uYXZcIik7XHJcbiAgICB2YXIgJHNhbmR3aWNoID0gJChcIi5zYW5kd2ljaFwiKTtcclxuXHJcblxyXG4gICAgdmFyIF9hZGRQb3BVcE1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhc2UuY2xvbmVJbnNlcnQoJChcImJvZHlcIiksICRtZW51KS53cmFwQWxsKCc8ZGl2IGNsYXNzPVwicG9wVXBNZW51XCI+PC9kaXY+JykuYWRkQ2xhc3MoXCJwb3BVcE1lbnVfX2lubmVyXCIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgX3NldFVwTGlzdG5lciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkc2FuZHdpY2gub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoXCJzYW5kd2ljaF9vblwiKTtcclxuICAgICAgICAgICAgJChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJuby1zY3JvbGxcIik7XHJcbiAgICAgICAgICAgICQoXCIucG9wVXBNZW51XCIpLnRvZ2dsZUNsYXNzKFwicG9wVXBNZW51X3Nob3dcIik7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgX2FkZFBvcFVwTWVudSgpO1xyXG4gICAgICAgICAgICBfc2V0VXBMaXN0bmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIi8vID09PT09PT09PT09IFNpZGViYXIgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgc2lkZWJhck1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcbiAgICB2YXIgJHNpZGViYXIgPSAkKFwiLnNpZGViYXJcIik7XHJcbiAgICB2YXIgJHNpZGViYXJMaXN0ID0gJHNpZGViYXIuZmluZChcIi5zaWRlYmFyX19saXN0XCIpO1xyXG4gICAgdmFyICRzaWRlYmFySXRlbSA9ICRzaWRlYmFyTGlzdC5maW5kKFwiLnNpZGViYXJfX2l0ZW1cIik7XHJcbiAgICB2YXIgJHNpZGViYXJCdXR0b24gPSAkKFwiLnNpZGViYXJfX2J1dHRvblwiKTtcclxuICAgIHZhciAkYXJ0aWNsZSA9ICQoXCJhcnRpY2xlXCIpO1xyXG4gICAgdmFyICRhcnRpY2xlVGl0bGUgPSAkYXJ0aWNsZS5maW5kKFwiLmFydGljbGVfX3RpdGxlXCIpO1xyXG4gICAgdmFyICRibG9nID0gJChcIi5ibG9nLXBhZ2VcIik7XHJcbiAgICB2YXIgJGh0bWwgPSAkKFwiaHRtbFwiKTtcclxuICAgIHZhciAkc2FuZHdpY2ggPSAkKFwiLnNhbmR3aWNoXCIpO1xyXG4gICAgdmFyIHN0YXJ0QWN0aXZlID0gMzUwO1xyXG4gICAgdmFyIHNjcm9sbFNwZWVkID0gNzAwO1xyXG4gICAgaWYoYmFzZS5nZXRQYWdlKCkgPT0gXCJibG9nXCIpe1xyXG4gICAgICB2YXIgJHNpZGViYXJQb3MgPSBiYXNlLmdldFBvc2l0aW9uVG90YWwoJHNpZGViYXIpWzBdLnRvcDtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vY29uc29sZS5sb2coJHNpZGViYXIub2Zmc2V0KCkudG9wKTtcclxuICAgIFxyXG5cclxuXHJcbiAgICB2YXIgb3BlbiA9IFwic2lkZWJhci0tb3BlblwiO1xyXG4gICAgdmFyIGZpeGVkID0gXCJzaWRlYmFyLS1maXhlZFwiO1xyXG4gICAgdmFyIGNvbnRlbnRQdXNoID0gJ2NvbnRlbnQtcHVzaCc7XHJcbiAgICB2YXIgbm9TY3JvbGwgPSAnbm8tc2Nyb2xsJztcclxuICAgIHZhciBoaWRlID0gXCJoaWRlXCI7XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcblxyXG5cclxuXHJcbiAgICB2YXIgc2lkZWJhckFkZENsYXNzID0gZnVuY3Rpb24oY2xhc3NOYW1lKXtcclxuICAgICAgJHNpZGViYXIuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHNpZGViYXJSZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzTmFtZSl7XHJcbiAgICBcdCRzaWRlYmFyLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBjcmVhdGVJdGVtcyA9IGZ1bmN0aW9uKCl7XHJcblx0ICAgZm9yKHZhciBpID0gMDsgaSA8ICRhcnRpY2xlLmxlbmd0aDtpKyspe1xyXG5cdCAgIFx0XHQkKFwiPGRpdiBjbGFzcz0nc2lkZWJhcl9faXRlbSc+PGEgaHJlZj0nIycgZGF0YS1pZD0nXCIrIChpICsgMSkgK1wiJyBjbGFzcz0nc2lkZWJhcl9fbGluayc+XCIrICRhcnRpY2xlVGl0bGUuZXEoaSkudGV4dCgpICtcIjwvYT48L2Rpdj5cIilcclxuXHQgICBcdFx0LmFwcGVuZFRvKCRzaWRlYmFyTGlzdCk7XHJcblx0ICAgXHRcdCRhcnRpY2xlLmVxKGkpLmF0dHIoXCJkYXRhLWlkXCIsKGkgKyAxKSk7XHJcblx0ICAgIH1cclxuICBcdH07XHJcblxyXG4gICAgdmFyIGNsZWFyQ2xhc2VzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICRzaWRlYmFyLnJlbW92ZUNsYXNzKG9wZW4pO1xyXG4gICAgICAkYmxvZy5yZW1vdmVDbGFzcyhjb250ZW50UHVzaCk7XHJcbiAgICAgICRodG1sLnJlbW92ZUNsYXNzKG5vU2Nyb2xsKTtcclxuICAgICAgJHNhbmR3aWNoLnJlbW92ZUNsYXNzKGhpZGUpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgXHR2YXIgc2liZWJhclNjcm9sbFRvID0gZnVuY3Rpb24oZ3V0dGVyLHNwZWVkKXtcclxuICBcdFx0JChcIi5zaWRlYmFyX19saW5rXCIpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbiAgXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICBpZigkdGhpcy5jbG9zZXN0KCRzaWRlYmFyKS5oYXNDbGFzcyhvcGVuKSl7XHJcbiAgICAgICAgICBjbGVhckNsYXNlc3MoKTtcclxuICAgICAgICB9XHJcbiAgXHRcdFx0dmFyIGF0dHIgPSAkdGhpcy5kYXRhKFwiaWRcIik7XHJcbiAgXHRcdFx0JHRoaXNBcnRpY2xlID0gJChcImFydGljbGVbZGF0YS1pZD1cIisgJCh0aGlzKS5kYXRhKFwiaWRcIikgK1wiXVwiKTtcclxuICBcdFx0XHQkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6ICR0aGlzQXJ0aWNsZS5vZmZzZXQoKS50b3AgLSBndXR0ZXJ9LCBzcGVlZCk7XHJcbiAgXHRcdFx0aWYoJHNpZGViYXIuaGFzQ2xhc3MoZml4ZWQpKXtcclxuICBcdFx0XHRcdCQoXCIud3JhcHBlclwiKS5yZW1vdmVDbGFzcyhvcGVuKTtcclxuICBcdFx0XHR9XHJcbiAgXHRcdH0pXHJcbiAgXHR9O1xyXG5cclxuICBcclxuXHJcbiAgXHR2YXIgdmlld0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtLGd1dHRlcil7XHJcbiAgICAgIHZhciBzY3JvbGwgPSBiYXNlLmdldFBvc2l0aW9uVG90YWwoXCJzY3JvbGxcIik7XHJcbiAgICAgICQuZWFjaChlbGVtLGZ1bmN0aW9uKGkpe1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgJHRoaXNQb3NpdGlvbiA9IGJhc2UuZ2V0UG9zaXRpb25Ub3RhbChlbGVtKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbGFzdCA9IGVsZW0ubGVuZ3RoIC0gMTtcclxuICAgICAgICB2YXIgbWFyZ2luID0gJHRoaXNQb3NpdGlvblsxXS50b3AgLSAkdGhpc1Bvc2l0aW9uWzBdLmJvdHRvbTtcclxuICAgICAgICBcclxuICAgICAgICBpZihzY3JvbGwudG9wIDwgJHRoaXNQb3NpdGlvblswXS50b3Ape1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAkKFwiLnNpZGViYXJfX2l0ZW1cIikuZXEoMCkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtX2FjdGl2ZVwiKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc2Nyb2xsLnRvcCArIGd1dHRlciA+ICR0aGlzUG9zaXRpb25bbGFzdF0udG9wKXtcclxuICAgICAgICAgICQoXCIuc2lkZWJhcl9faXRlbVwiKS5lcShsYXN0KS5hZGRDbGFzcyhcInNpZGViYXJfX2l0ZW1fYWN0aXZlXCIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIGlmKChzY3JvbGwudG9wICsgZ3V0dGVyID49ICR0aGlzUG9zaXRpb25baV0udG9wKSAmJiAoJHRoaXNQb3NpdGlvbltpXS5ib3R0b20gKyBtYXJnaW4+PSBzY3JvbGwudG9wICsgZ3V0dGVyKSl7XHJcblxyXG4gICAgICAgICAgICAkKFwiLnNpZGViYXJfX2l0ZW1cIikuZXEoaSkuYWRkQ2xhc3MoXCJzaWRlYmFyX19pdGVtX2FjdGl2ZVwiKVxyXG4gICAgICAgICAgICAkKFwiLnNpZGViYXJfX2l0ZW1cIikuZXEoaSkuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcInNpZGViYXJfX2l0ZW1fYWN0aXZlXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIFx0IH07XHJcblxyXG4gICAgdmFyIF9yZW1vdmVDbGFzc2VzT25SZXNpemUgPSBmdW5jdGlvbigpe1xyXG4gICAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIixmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCRzaWRlYmFyLmhhc0NsYXNzKG9wZW4pKXtcclxuICAgICAgICAgIGNsZWFyQ2xhc2VzcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZhciBfYWRkU2lkZWJhcj0gZnVuY3Rpb24oKXtcclxuICAgIFx0Y3JlYXRlSXRlbXMoKTtcclxuICAgIFx0c2liZWJhclNjcm9sbFRvKDIwLHNjcm9sbFNwZWVkKTtcclxuXHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB2YXIgX29wZW5TaWRlYmFyID0gZnVuY3Rpb24oKXtcclxuICAgIFx0JHNpZGViYXJCdXR0b24ub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRibG9nLnRvZ2dsZUNsYXNzKGNvbnRlbnRQdXNoKTtcclxuICAgICAgICAgICAgJHNpZGViYXIudG9nZ2xlQ2xhc3Mob3Blbik7XHJcbiAgICAgICAgICAgICRzYW5kd2ljaC50b2dnbGVDbGFzcyhoaWRlKTtcclxuICAgICAgICAgICAgJGh0bWwudG9nZ2xlQ2xhc3Mobm9TY3JvbGwpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHN0aWNrU2lkZWJhciA9IGZ1bmN0aW9uKGVsZW0pe1xyXG4gIFx0XHRcdGlmKCQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpID49ICRzaWRlYmFyUG9zKXtcclxuICAgIFx0XHRcdCRzaWRlYmFyLmFkZENsYXNzKGZpeGVkKTtcclxuXHJcbiAgICBcdFx0fWVsc2V7XHJcbiAgICAgICAgICAkc2lkZWJhci5yZW1vdmVDbGFzcyhmaXhlZCk7XHJcbiAgICBcdFx0fVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdmFyIF9vdXRDbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoZG9jdW1lbnQpLm1vdXNldXAoZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9ICRzaWRlYmFyO1xyXG4gICAgICAgIGlmIChjb250YWluZXIuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApe1xyXG4gICAgICAgICAgIGNsZWFyQ2xhc2VzcygpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0bmVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgXHRcdF9hZGRTaWRlYmFyKCk7XHJcbiAgICBcdFx0X29wZW5TaWRlYmFyKCk7XHJcbiAgICAgICAgX3JlbW92ZUNsYXNzZXNPblJlc2l6ZSgpO1xyXG4gICAgICAgIF9vdXRDbGljaygpO1xyXG4gICAgICAgIFx0XHJcbiAgICBcdFxyXG4gICAgICAkKHdpbmRvdykub24oXCJzY3JvbGwgbG9hZFwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmlld0VsZW1lbnQoJChcIi5hcnRpY2xlX19pdGVtXCIpLHN0YXJ0QWN0aXZlKTtcclxuICAgICAgICBzdGlja1NpZGViYXIoJHNpZGViYXIpO1xyXG4gICAgICB9KVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9zZXRVcExpc3RuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbn0pKCk7XHJcbiIsIi8vID09PT09PT09PT09IEZvcm0gbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgZm9ybU1vZHVsZSA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG5cclxuICAgIHZhciBjcmVhdGVQb3BVcFdpbmRvdyA9IGZ1bmN0aW9uKHRleHQpe1xyXG4gICAgICAgICQoXCI8ZGl2IGNsYXNzPSdwb3BVcFdpbmRvdyc+PGRpdiBjbGFzcz0ncG9wVXBXaW5kb3dfX2NvbnRhaW5lcic+PHNwYW4gY2xhc3M9J3BvcFVwV2luZG93X19jbG9zZSc+PC9zcGFuPjxwIGNsYXNzPSdwb3BVcFdpbmRvd19fdGV4dCc+XCIrIHRleHQgK1wiPC9wPjwvZGl2PjwvZGl2PlwiXHJcbiAgICAgICAgICAgICkucHJlcGVuZFRvKCQoXCJib2R5XCIpKTtcclxuXHJcbiAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgICAkKFwiLnBvcFVwV2luZG93X19jbG9zZVwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICRwb3BVcFdpbmRvdyA9ICQoXCIucG9wVXBXaW5kb3dcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgkcG9wVXBXaW5kb3cpLmFkZENsYXNzKFwiaGlkZVwiKTtcclxuICAgICAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJuby1zY3JvbGxcIik7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICR0aGlzLmNsb3Nlc3QoJCgkcG9wVXBXaW5kb3cpKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSw0MDApO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9naW5Gb3JtID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgICAgIHhoci5vcGVuKCdQT1NUJywgJy9hZG1pbicpXHJcblxyXG4gICAgICAgIHZhciBkYXRhID0ge1xyXG4gICAgICAgICAgICB1c2VyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1uYW1lJykudmFsdWUsXHJcbiAgICAgICAgICAgIHBhc3M6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLXBhc3MnKS52YWx1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZm9ybVZhbGlkYXRpb24gPSBmdW5jdGlvbih0aGlzRWxlbSl7XHJcbiAgICAgICAgdmFyIHBhdHRlcm4gPSAvXihbMC05YS16QS1aXy1dK1xcLikqWzAtOWEtekEtWl8tXStAWzAtOWEtekEtWl8tXSsoXFwuWzAtOWEtekEtWl8tXSspKlxcLlthLXpdezIsNn0kLztcclxuICAgICAgICB2YXIgZm9ybSA9IHRoaXNFbGVtLmNsb3Nlc3QoXCJmb3JtXCIpO1xyXG4gICAgICAgIHZhciBpdGVtcyA9IGZvcm0uZmluZChcIi5mb3JtX19pdGVtXCIpO1xyXG4gICAgICAgIHZhciBpbnB1dCA9IGl0ZW1zLmZpbmQoXCIuZm9ybV9faW5wdXRcIik7XHJcbiAgICAgICAgdmFyIGVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgbnVtYmVyIDogMCxcclxuICAgICAgICAgICAgICAgIHRleHQgOiBcItCj0YHQv9C10YjQvdC+XCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBlbXB0eUlucHV0ID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGl0ZW1zLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCQodGhpcykuY2hpbGRyZW4oaW5wdXQpLnZhbCgpID09PSBcIlwiKXtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvci5udW1iZXIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yLnRleHQgPSBcItCX0LDQv9C+0LvQvdC10L3RiyDQvdC1INCy0YHQtSDQv9C+0LvRj1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgICAgICAgICAgfSAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KSgpXHJcblxyXG4gICAgICAgIGlmKGZvcm0uZmluZChcIltuYW1lID0gZW1haWxdXCIpLmxlbmd0aCAmJiAhZXJyb3IubnVtYmVyKXtcclxuICAgICAgICAgICAgdmFyIGVtYWlsID0gaXRlbXMuZmluZChcIltuYW1lID0gZW1haWxdXCIpO1xyXG4gICAgICAgICAgICBpZighcGF0dGVybi50ZXN0KGVtYWlsLnZhbCgpKSl7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5udW1iZXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IudGV4dCA9IFwiRW1haWwg0L3QtSDQv9GA0LDQstC40LvRjNC90YvQuVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZvcm0uZmluZChcIltuYW1lID0gY2hlY2tib3hdXCIpLmxlbmd0aCAmJiAhZXJyb3IubnVtYmVyKXtcclxuXHJcbiAgICAgICAgICAgIHZhciBjaGVja2JveCA9IGZvcm0uZmluZChcIltuYW1lID0gY2hlY2tib3hdOmNoZWNrZWRcIikubGVuZ3RoXHJcbiAgICAgICAgICAgIGlmKCFjaGVja2JveCl7XHJcbiAgICAgICAgICAgICAgICBlcnJvci5udW1iZXIgPSAzO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IudGV4dCA9IFwi0JLRiyDRh9C10LvQvtCy0LXQuj9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmb3JtLmZpbmQoXCJbbmFtZSA9IHJhZGlvXVwiKS5sZW5ndGggJiYgIWVycm9yLm51bWJlcil7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmFkaW8gPSBmb3JtLmZpbmQoXCIjZm9ybS1yYWRpby15ZXM6Y2hlY2tlZFwiKS5sZW5ndGhcclxuICAgICAgICAgICAgaWYoIXJhZGlvKXtcclxuICAgICAgICAgICAgICAgIGVycm9yLm51bWJlciA9IDQ7XHJcbiAgICAgICAgICAgICAgICBlcnJvci50ZXh0ID0gXCLQoNC+0LHQvtGC0LDQvCDQt9C00LXRgdGMINC90LUg0LzQtdGB0YLQviFcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmb3JtLmZpbmQoXCJbbmFtZSA9IHBhc3N3b3JkXVwiKS5sZW5ndGggJiYgIWVycm9yLm51bWJlcil7XHJcbiAgICAgICAgICAgIHZhciBteVBhc3MgPSBcIjEyM1wiO1xyXG4gICAgICAgICAgICB2YXIgcGFzcyA9IGl0ZW1zLmZpbmQoXCJbbmFtZSA9IHBhc3N3b3JkXVwiKTtcclxuICAgICAgICAgICAgaWYocGFzcy52YWwoKSAhPT0gbXlQYXNzKXtcclxuICAgICAgICAgICAgICAgIGVycm9yLm51bWJlciA9IDU7XHJcbiAgICAgICAgICAgICAgICBlcnJvci50ZXh0ID0gXCLQn9Cw0YDQvtC70Ywg0L3QtSDQstC10YDQvdGL0LlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHN3aXRjaCAoZXJyb3IubnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVBvcFVwV2luZG93KGVycm9yLnRleHQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUG9wVXBXaW5kb3coZXJyb3IudGV4dCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQb3BVcFdpbmRvdyhlcnJvci50ZXh0KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVBvcFVwV2luZG93KGVycm9yLnRleHQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlUG9wVXBXaW5kb3coZXJyb3IudGV4dCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBsb2dpbkZvcm0oKTtcclxuICAgICAgICAgICAgICAgIC8vY3JlYXRlUG9wVXBXaW5kb3coZXJyb3IudGV4dCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAvL2FsZXJ0KCAn0K8g0YLQsNC60LjRhSDQt9C90LDRh9C10L3QuNC5INC90LUg0LfQvdCw0Y4nICk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9hZGRQb3BVcFdpbmRvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyICRidXR0b24gPSAkKFwiW3R5cGU9c3VibWl0XVwiKTtcclxuICAgICAgICAkYnV0dG9uLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBmb3JtVmFsaWRhdGlvbigkKHRoaXMpKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBfc2V0VXBMaXN0bmVyID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9zZXRVcExpc3RuZXIoKTtcclxuICAgICAgICAgICAgX2FkZFBvcFVwV2luZG93KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSkoKTsiLCIvLyA9PT09PT09PT09PSBTbGlkZXIgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgc2xpZGVyTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBzbGlkZXIoZWxlbSl7XHJcbiAgICAgICAgLy8gU2xpZGVyXHJcblxyXG4gICAgICAgIHZhciAkc2xpZGVyID0gZWxlbTtcclxuICAgICAgICB2YXIgJHNsaWRlckNvbnRlbnQgPSAkc2xpZGVyLmZpbmQoXCIuc2xpZGVyX19jb250ZW50XCIpO1xyXG4gICAgICAgIHZhciAkc2xpZGVyRGVzayA9ICRzbGlkZXIuZmluZChcIi5zbGlkZXJfX2Rlc2tcIik7XHJcbiAgICAgICAgdmFyICRkZXNrQ29udGVudCA9ICRzbGlkZXJEZXNrLmZpbmQoXCIuZGVza19fY29udGVudFwiKTtcclxuXHJcblxyXG5cclxuICAgICAgICB2YXIgJHNsaWRlckNvbnRyb2xzID0gJHNsaWRlckNvbnRlbnQuZmluZChcIi5zbGlkZXJfX2NvbnRyb2xsXCIpO1xyXG4gICAgICAgIHZhciAkc2xpZGVyQnV0dG9ucyA9ICRzbGlkZXIuZmluZChcIi5zbGlkZXJfX2J1dHRvblwiKTtcclxuICAgICAgICB2YXIgJHNsaWRlclZpZXcgPSAkc2xpZGVyQ29udGVudC5maW5kKFwiLnNsaWRlcl9fdmlld1wiKTtcclxuICAgICAgICB2YXIgJHNsaWRlckl0ZW1zID0gJHNsaWRlclZpZXcuZmluZChcIi5zbGlkZXJfX2l0ZW1cIik7XHJcbiAgICAgICAgdmFyICRzbGlkZXJMaXN0ID0gJHNsaWRlclZpZXcuZmluZChcIi5zbGlkZXJfX2xpc3RcIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHRyYW5zaXRpb25FbmQgPSAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kJztcclxuICAgICAgICB2YXIgZmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIEJ1dHRvbnNcclxuXHJcbiAgICAgICAgdmFyICRidXR0b25VcCA9ICRzbGlkZXJCdXR0b25zLmZpbmQoXCIuc2xpZGVyX191cFwiKS5zaWJsaW5ncyhcIi5zbGlkZXJfX2ljb1wiKTtcclxuICAgICAgICB2YXIgJGJ1dHRvbkRvd24gPSAkc2xpZGVyQnV0dG9ucy5maW5kKFwiLnNsaWRlcl9fZG93blwiKS5zaWJsaW5ncyhcIi5zbGlkZXJfX2ljb1wiKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvLyBDbGFzc2VzXHJcbiAgICAgICAgdmFyIGFjdGl2ZSA9IFwic2xpZGVyX19hY3RpdmVcIjtcclxuICAgICAgICB2YXIgZG93biA9IFwic2xpZGUtLWRvd25cIjtcclxuICAgICAgICB2YXIgdXAgPSBcInNsaWRlLS11cFwiO1xyXG4gICAgICAgIHZhciBzbGlkZVNob3cgPSBcInNsaWRlLS1zaG93XCI7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB2YXIgY2xvbmVTbGlkZXMgPSBmdW5jdGlvbihjb250YWluZXIsYWN0aXZlSW5kZXgpe1xyXG4gICAgICAgICAgICAkY29udGFpbmVyID0gY29udGFpbmVyLnNpYmxpbmdzKFwiLnNsaWRlcl9fbGlzdC1jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkc2xpZGVyTGlzdC5jbG9uZSgpLmFwcGVuZFRvKCRjb250YWluZXIpO1xyXG4gICAgICAgICAgICB2YXIgY3VyZW50SXRlbXMgPSAkY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpO1xyXG4gICAgICAgICAgICBjdXJlbnRJdGVtcy5yZW1vdmVDbGFzcyhhY3RpdmUpO1xyXG4gICAgICAgICAgICBjdXJlbnRJdGVtcy5lcShhY3RpdmVJbmRleCkuYWRkQ2xhc3MoYWN0aXZlKTtcclxuICAgICAgICAgICAgY3VyZW50SXRlbXMuZXEoYWN0aXZlSW5kZXgpLnByZXYoKS5hZGRDbGFzcyh1cCk7XHJcbiAgICAgICAgICAgIGN1cmVudEl0ZW1zLmVxKGFjdGl2ZUluZGV4KS5uZXh0KCkuYWRkQ2xhc3MoZG93bik7XHJcbiAgICAgICAgICAgIGlmKCFjdXJlbnRJdGVtcy5lcShhY3RpdmVJbmRleCkubmV4dCgpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjdXJlbnRJdGVtcy5maXJzdCgpLmFkZENsYXNzKGRvd24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9uZVNsaWRlcygkYnV0dG9uVXAsLTEpO1xyXG4gICAgICAgIGNsb25lU2xpZGVzKCRidXR0b25Eb3duLDEpO1xyXG5cclxuXHJcbiAgICAgICAgdmFyIGFkZENsYXNzID0gZnVuY3Rpb24oc2xpZGUsY2xhc3NOYW1lKXtcclxuICAgICAgICAgICAgc2xpZGUuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhZGRDbGFzc1ByZXYgPSBmdW5jdGlvbihzbGlkZSxjbGFzc05hbWUpe1xyXG4gICAgICAgICAgICBzbGlkZS5hZGRDbGFzcyhjbGFzc05hbWUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYoIXNsaWRlLm5leHQoKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfSAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGFkZENsYXNzU2libGluZyA9IGZ1bmN0aW9uKHNsaWRlLGNsYXNzTmFtZSxkaXJlY3Rpb24pe1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVGaXJzdCA9IHNsaWRlLnBhcmVudCgpLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLmZpcnN0KCkuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgdmFyIHNsaWRlTGFzdCA9IHNsaWRlLnBhcmVudCgpLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLmxhc3QoKS5hZGRDbGFzcyhjbGFzc05hbWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PSBcIm5leHRcIil7XHJcbiAgICAgICAgICAgICAgICBzbGlkZS5uZXh0KCkuYWRkQ2xhc3MoY2xhc3NOYW1lKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZighc2xpZGUubmV4dCgpLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGUucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUZpcnN0LmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHNsaWRlLnByZXYoKS5hZGRDbGFzcyhjbGFzc05hbWUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKCFzbGlkZS5wcmV2KCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZUxhc3QuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBhZGRDb250ZW50ID0gZnVuY3Rpb24oc2xpZGUpe1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzbGlkZS5pbmRleCgpO1xyXG4gICAgICAgICAgICB2YXIgY2xhc3NOYW1lID0gXCJhY3RpdmVfX2Rlc2tfX2NvbnRlbnRcIjtcclxuICAgICAgICAgICAgJGRlc2tDb250ZW50LmVxKGluZGV4KS5hZGRDbGFzcyhjbGFzc05hbWUpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgdmFyIGFjdGl2ZVNsaWRlSW5pdCA9IGZ1bmN0aW9uKGVsZW0scmV2ZXJzZSl7XHJcblxyXG4gICAgICAgICAgICB2YXIgJGN1cmVudEVsZW1lbnQgPSBlbGVtO1xyXG4gICAgICAgICAgICB2YXIgJGN1cmVudExpc3QgPSAkY3VyZW50RWxlbWVudC5maW5kKFwiLnNsaWRlcl9fbGlzdFwiKTtcclxuICAgICAgICAgICAgdmFyICRjdXJlbnRJdGVtcyA9ICRjdXJlbnRMaXN0LmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpO1xyXG4gICAgICAgICAgICB2YXIgJGN1cmVudEFjdGl2ZUl0ZW0gPSAkY3VyZW50SXRlbXMuZmlsdGVyKFwiLnNsaWRlcl9fYWN0aXZlXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciAkbmV4dFNsaWRlID0gJGN1cmVudEFjdGl2ZUl0ZW0ubmV4dCgpO1xyXG4gICAgICAgICAgICB2YXIgJHByZXZTbGlkZSA9ICRjdXJlbnRBY3RpdmVJdGVtLnByZXYoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciAkZmlyc3RTbGlkZSA9ICRjdXJlbnRJdGVtcy5maXJzdCgpO1xyXG4gICAgICAgICAgICB2YXIgJGxhc3RTbGlkZSA9ICRjdXJlbnRJdGVtcy5sYXN0KCk7XHJcblxyXG5cclxuICAgICAgICBpZighJGN1cmVudEVsZW1lbnQucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoXCJzbGlkZXJfX2NvbnRyb2xsXCIpKXtcclxuICAgICAgICAgICAgaWYoIXJldmVyc2UpeyAgICAgXHJcbiAgICAgICAgICAgICAgICBpZigkbmV4dFNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJG5leHRTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJGZpcnN0U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBpZigkcHJldlNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJHByZXZTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJGxhc3RTbGlkZSxhY3RpdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkbmV3QWN0aXZlID0gJGN1cmVudEl0ZW1zLmZpbHRlcihcIi5zbGlkZXJfX2FjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgICAgIGFkZENvbnRlbnQoJG5ld0FjdGl2ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKCRjdXJlbnRFbGVtZW50LnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKFwic2xpZGVyX19jb250cm9sbFwiKSl7XHJcbiAgICAgICAgICAgIGlmKCFyZXZlcnNlKXsgICAgXHJcbiAgICAgICAgICAgICAgICBpZigkbmV4dFNsaWRlLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkQ2xhc3MoJG5leHRTbGlkZSxhY3RpdmUpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRmaXJzdFNsaWRlLGFjdGl2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYoJHByZXZTbGlkZS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRwcmV2U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZENsYXNzKCRsYXN0U2xpZGUsYWN0aXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJG5ld0FjdGl2ZSA9ICRjdXJlbnRJdGVtcy5maWx0ZXIoXCIuc2xpZGVyX19hY3RpdmVcIik7XHJcbiAgICAgICAgICAgIGFkZENsYXNzU2libGluZygkbmV3QWN0aXZlLGRvd24sXCJuZXh0XCIpO1xyXG4gICAgICAgICAgICBhZGRDbGFzc1NpYmxpbmcoJG5ld0FjdGl2ZSx1cCxcImxhc3RcIik7ICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgIFxyXG5cclxuICAgICAgICAkYnV0dG9uVXAub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcykuc2libGluZ3MoXCIuc2xpZGVyX19saXN0LWNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgaWYoZmxhZyl7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHNsaWRlclZpZXcsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHRoaXMsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJGJ1dHRvbkRvd24uc2libGluZ3MoXCIuc2xpZGVyX19saXN0LWNvbnRhaW5lclwiKSx0cnVlKTtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHRoaXMuZmluZChcIi5zbGlkZXJfX2l0ZW1cIikub24odHJhbnNpdGlvbkVuZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICAkYnV0dG9uRG93bi5vbihcImNsaWNrXCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKS5zaWJsaW5ncyhcIi5zbGlkZXJfX2xpc3QtY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICBpZihmbGFnKXtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlSW5pdCgkc2xpZGVyVmlldyk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZUluaXQoJHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVJbml0KCRidXR0b25VcC5zaWJsaW5ncyhcIi5zbGlkZXJfX2xpc3QtY29udGFpbmVyXCIpKTtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR0aGlzLmZpbmQoXCIuc2xpZGVyX19pdGVtXCIpLm9uKHRyYW5zaXRpb25FbmQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2xpZGVySW5pdCgpe1xyXG4gICAgICAgIGlmKGJhc2UuZ2V0UGFnZSgpID09IFwid29ya3NcIil7XHJcbiAgICAgICAgICAgIHNsaWRlcigkKFwiI3NsaWRlclwiKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2xpZGVySW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoKTsiLCIvLyA9PT09PT09PT09PSBTa2lsbHMgbW9kdWxlID09PT09PT09PT09XHJcblxyXG52YXIgc2tpbGxzTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciBiYXNlID0gbmV3IEJhc2VNb2R1bGUoKTtcclxuICAgIHZhciAkc2tpbGwgPSAkKFwiLnNraWxsXCIpO1xyXG4gICAgdmFyICRjb250ZW50ID0gJChcIi5wYWdlLWNvbnRlbnRcIik7XHJcblxyXG4gICAgdmFyIHNraWxsUGVyY2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHNraWxsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHBlcmNlbnQgPSAkdGhpcy5kYXRhKFwicGVyY2VudFwiKTtcclxuICAgICAgICAgICAgdmFyIGNpcmNsZSA9ICR0aGlzLmZpbmQoXCIuc2tpbGxfX2NpcmNsZVwiKTtcclxuICAgICAgICAgICAgY2lyY2xlLmNzcyh7XCJzdHJva2UtZGFzaGFycmF5XCI6IHBlcmNlbnQgKyBcIiAxMDBcIn0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNraWxsc0luaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKGJhc2UuZ2V0UG9zaXRpb25Ub3RhbChcInNjcm9sbFwiKS50b3AgPj0gJGNvbnRlbnQub2Zmc2V0KCkudG9wIC0gMTAwKXtcclxuICAgICAgICAgICAgc2tpbGxQZXJjZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNraWxsc0luaXQoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KSgpOyIsIi8vID09PT09PT09PT09IE1hcCBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcblxyXG52YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlKCk7XHJcblxyXG5pZihiYXNlLmdldFBhZ2UoKSA9PSBcImFib3V0XCIpe1xyXG5mdW5jdGlvbiBpbml0TWFwKCkge1xyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHtsYXQ6IDYwLjAwODYzMDIzLCBsbmc6IDMwLjI0ODQyNDQxfTtcclxuICAgICAgICB2YXIgbWFya2VyUG9zaXRpb24gPSAge2xhdDogNjAuMDE3MzkxLCBsbmc6IDMwLjI3MzYxOH07XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCB7XHJcbiAgICAgICAgY2VudGVyOiBwb3NpdGlvbixcclxuICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgem9vbTogMTQsXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBpbWFnZSA9IHtcclxuICAgICAgICAgICAgICB1cmw6IGJhc2UuZ2V0SW1nUGF0aCgpICsgXCJtYXAtbWFya2VyLnBuZ1wiLFxyXG4gICAgICAgICAgICAgIHNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDcxLCA3MSksXHJcbiAgICAgICAgICAgICAgYW5jaG9yOiBuZXcgZ29vZ2xlLm1hcHMuUG9pbnQoMTcsIDQwKSxcclxuICAgICAgICAgICAgICBzY2FsZWRTaXplOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSg0MCwgNTYpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogbWFya2VyUG9zaXRpb24sXHJcbiAgICAgICAgICAgIG1hcDogbWFwLFxyXG4gICAgICAgICAgICB0aXRsZTogJ0hlbGxvIFdvcmxkIScsXHJcbiAgICAgICAgICAgIGljb246IGltYWdlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB2YXIgc3R5bGVzID0gW1xyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2ZmZmZmZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5XCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiZ2VvbWV0cnlcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2Q2ZDZkNlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImdlb21ldHJ5LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVsc1wiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9uXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXkuY29udHJvbGxlZF9hY2Nlc3NcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzg2YTc3YVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl1cclxubWFwLnNldE9wdGlvbnMoe3N0eWxlczogc3R5bGVzfSk7XHJcbn1cclxufSIsIi8vID09PT09PT09PT09IFByZWxvYWRlciBtb2R1bGUgPT09PT09PT09PT1cclxuXHJcbnZhciBwcmVsb2FkZXJNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGJhc2UgPSBuZXcgQmFzZU1vZHVsZSgpO1xyXG5cclxudmFyIF9hZGRMb2FkZXIgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGltZ3MgPSBbXTtcclxuXHJcbiAgICAkLmVhY2goJCgnKicpLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyXHJcbiAgICAgICAgICAgICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxyXG4gICAgICAgICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyk7XHJcblxyXG4gICAgICAgIGlmIChiYWNrZ3JvdW5kICE9ICdub25lJykge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgICAgICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGltZykge1xyXG4gICAgICAgICAgICB2YXIgcGF0aCA9ICR0aGlzLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgICAgIGltZ3MucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB2YXIgcGVyY2VudHNUb3RhbCA9IDE7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGltYWdlID0gJCgnPGltZz4nLCB7XHJcbiAgICAgICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgICAgICAgIHNyYzogaW1nc1tpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGltYWdlLm9uKHtcclxuICAgICAgICAgICAgbG9hZCA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNldFBlcmNlbnRzKGltZ3MubGVuZ3RoLCBwZXJjZW50c1RvdGFsKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRzVG90YWwrKztcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGVycm9yIDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgICAgICB2YXIgcGVyY2VudCA9IE1hdGguY2VpbChjdXJyZW50IC8gdG90YWwgKiAxMDApO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwibm8tc2Nyb2xsXCIpO1xyXG4gICAgICAgIGlmIChwZXJjZW50ID49IDEwMCkge1xyXG4gICAgICAgICAgICAkKCcucHJlbG9hZGVyJykuYWRkQ2xhc3MoXCJzaG93T3V0XCIpO1xyXG4gICAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcIm5vLXNjcm9sbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJy5wcmVsb2FkZXJfX251bWJlcicpLnRleHQocGVyY2VudCArICclJyk7XHJcbiAgICB9XHJcbn07XHJcbiAgICBcclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF9hZGRMb2FkZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnXHJcbnZhciBzdGFydE1vZHVsZSA9IChmdW5jdGlvbigpe1xyXG4gICAgLy8g0J/QtdGA0LXQvNC10L3QvdGL0LVcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufSkoKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgYmFzZSA9IG5ldyBCYXNlTW9kdWxlO1xyXG5cclxuXHJcbiAgICBjb21tb25Nb2R1bGUuaW5pdCgpO1xyXG4gICAgbWVudU1vZHVsZS5pbml0KCk7XHJcbiAgICBcclxuICAgIGZvcm1Nb2R1bGUuaW5pdCgpO1xyXG4gICAgc2xpZGVyTW9kdWxlLmluaXQoKTtcclxuICAgIHByZWxvYWRlck1vZHVsZS5pbml0KCk7XHJcbiAgICBza2lsbHNNb2R1bGUuaW5pdCgpO1xyXG4gICAgaWYoYmFzZS5nZXRQYWdlKCkgPT0gXCJibG9nXCIpe1xyXG4gICAgICAgIHNpZGViYXJNb2R1bGUuaW5pdCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0pXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpIHtcclxuXHJcbi8qaWYoYmFzZS5nZXRQYWdlKCkgPT0gXCJpbmRleFwiIHx8ICFiYXNlLmdldFBhZ2UoKSl7XHJcbiAgICAkKFwiLmhvbWUtcGFnZVwiKS5jc3Moe1xyXG4gICAgICAgIFwibWluLWhlaWdodFwiIDogJCh3aW5kb3cpLmhlaWdodCgpXHJcbiAgICB9KVxyXG5cclxufSovXHJcblxyXG5cclxuXHJcbn0pXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
