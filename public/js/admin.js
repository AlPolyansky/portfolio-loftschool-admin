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
            console.log();
            var skillObj = {

            };

            var Skill = function(id,val){
                this.name = id,
                this.percent = val
            }

           $skillItem.each(function(i){
                var $this = $(this);
                var $skillLabel = $this.find('.skill__label');
                var $skillInput = $this.find('.skill__input');

                var skill = $skillLabel.text();
                var vall = $skillInput.val();

                skillObj[i] = new Skill(skill,vall);

            })
            var xhr = new XMLHttpRequest;
            xhr.open('POST', '/skills',true);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.send(JSON.stringify(skillObj));
            allInputs.val('');
            //console.log(xhr.responseText);
            xhr.onreadystatechange = function() {
              if (xhr.readyState != 4) return;

              if (xhr.status == 200) {
                setSkills(xhr);
              }

            }
        })       
    }


    var setSkills = function(json){
        var obj = JSON.parse(json.responseText);
        var $skill = $('.skill');
        var $skillItem = $skill.find('.skill__part');
        

        $skillItem.each(function(i){
            var $this = $(this);
            var $skillLabel = $this.find('.skill__label');
            var $skillInput = $this.find('.skill__input');

            $skillInput.eq(i).val(obj[i].percent);


        })
    }


    return {
        init: function(){

            _tabsInit();
            _skillAjax();
            
        }
    };

})();






$( document ).ready(function() {

    adminModule.init();
    
})
