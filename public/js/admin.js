'use strict'
var adminModule = (function(){

    var _tabsInit = function(){
        
        var $tabs = $('.tabs__list');
        var $tabsItem = $tabs.find('.tabs__item');
        var $tabsActive = $tabsItem.filter('.active');
        var $contentItem = $('.content__item');


        $tabsItem.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            var dataAttr = $this.find(".tabs__link").data('section');

            $this.addClass('active').siblings().removeClass('active')
            $contentItem.filter('.blog');
            $contentItem.filter('.' + dataAttr).addClass('active-section').siblings().removeClass('active-section');
        })
        
    }

    var _skillAjax = function(){
        var $skill = $('.skill');
        var $skillGroup = $skill.find('.skill__group');
        var $skillItem = $skill.find('.skill__part');
        var allInputs = $skillItem.find('.skill__input');
        var $button = $skill.find('.button__item');


        



        $button.on('click',function(e){
            e.preventDefault();
            var skillObj = {};

            var test = {};

            var target = true;

           $skillGroup.each(function(i){
                var $this = $(this);
                var $skillSection = $this.find('.title--small');
                var $skillItem = $this.find('.skill__part');

                var title = $skillSection.text();
                
                var itemObj = {};

                

                $skillItem.each(function(){
                    
                    var item = $(this);
                    var $skillInput = item.find('.skill__input');
                    var $skillLabel = item.find('.skill__label');
                    var skill = $skillLabel.text();
                    var vall = $skillInput.val();
                    var parse = /^[0-9]*$/;
                    


                    if(vall.length > 3){
                        target = false;
                    }

                    if(!parse.test(vall)){
                        target = false;
                    }
                    

                    if(!vall){
                        vall = $skillInput.attr('placeholder');
                    }else if(target && parse.test(vall)){
                        $skillInput.attr('placeholder',vall)
                    }

                    itemObj[skill] = vall;
                })

                if(target){
                    skillObj[title.toLowerCase()] = itemObj;
                }else{
                    skillObj = {};
                }
                

            })
           
            var xhr = new XMLHttpRequest;
            xhr.open('POST', '/admin/about',true);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.send(JSON.stringify(skillObj));
            allInputs.val('');
            xhr.onreadystatechange = function() {
              if (xhr.readyState != 4) return;

              if (xhr.status == 200) {
                popup(JSON.parse(xhr.responseText).message);
              }

            }
        })     
    }


    var setSkills = function(json){
        var obj = JSON.parse(json.responseText);
        var $skill = $('.skill');
        var $skillItem = $skill.find('.skill__part');
    }


    var _setPost = function(){
        var $blogform = $('.blog__form');
        var $button = $blogform.find('.button__item');

        $button.on('click',function(e){
            e.preventDefault();
            var $this = $(this);
            var $parentForm = $(this).closest(".blog__form");
            var $tileInput = $parentForm.find('input').first();
            var $dateInput = $parentForm.find('input').last();
            var $textarea = $parentForm.find('textarea');

            var xhrObj = {
                itemName: $tileInput.val(),
                itemDate: $dateInput.val(),
                itemBody: $textarea.val()

            }
            var xhr = new XMLHttpRequest;
            xhr.open('POST', '/admin/blog',true);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.send(JSON.stringify(xhrObj));
            $('.blog__input').val('');
            xhr.onreadystatechange = function() {
              if (xhr.readyState != 4) return;

              if (xhr.status == 200) {
                popup(JSON.parse(xhr.responseText).message)
              }

            }
        })             
    }

    var __addWorks = function(){
        var $form = $('.works__form');
        var $button = $form.find('.button__item');

        $button.on('click',function(e){
            e.preventDefault();

            var $this = $(this);
            var $thisForm = $this.closest($form);
            var $file = $thisForm.find('.works__file');

            var data = new FormData();
            data.append('test', '12')

            jQuery.ajax({
                url: '/admin/works',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function(data){
                    alert(data);
                }
            });

            
        })
    }

    var popup = function(text){
        $('<div class="popup">\
            <div class="popup__window">\
                <div class="popup__text">'+ text +'</div>\
                <button type="button" class="popup__button">Закрыть</button>\
            <div>\
        <div>').appendTo($('body'));

        $(".popup__button").on('click',function(){
            $(".popup").remove();
        })

    }


    return {
        init: function(){
            _tabsInit();
            _skillAjax();
            _setPost();
            __addWorks()
            
        }
    };

})();






$( document ).ready(function() {

    adminModule.init();
    
})
