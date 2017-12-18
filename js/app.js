//Debounce Lodash

debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

$('[data-group]').each(function(){
  var $allTab = $(this).find('[data-tab]'),
      $allClick = $(this).find('[data-click]'),
      active = 'active';
  
  $($allTab).first().addClass(active);
  $($allClick).first().addClass(active);

  $($allClick).click(function(e){
    e.preventDefault();
    var id = $(this).data('click'),
        $tab = $('[data-tab="'+ id +'"]');
    
    $($allClick).removeClass(active);
    $($allTab).removeClass(active);
    
    $($tab).addClass(active);
    $(this).addClass(active);

  });
});

$('.menu-nav a').click(function(e){
  e.preventDefault();
  var id = $(this).attr('href'),
      menuHeight = $('.menu').innerHeight();
      tabOffset = $(id).offset().top;
  
  $('html, body').animate({
    scrollTop: tabOffset - menuHeight
  },500);
});

$('.logo').click(function(){
  $('html, body').animate({
    scrollTop: 0
  },500);
});

$('section').each(function(){
  var height = $(this).height(),
      offsetTop = $(this).offset().top,
      menuHeight = $('.menu').innerHeight(),
      id = $(this).attr('id'),
      $itemMenu = $('a[href="#' +id+ '"]');
  
  $(window).scroll(debounce(function(){
    var scrollTop = $(this).scrollTop();
    if (offsetTop - menuHeight < scrollTop && offsetTop + height - menuHeight > scrollTop) {
      $($itemMenu).addClass('active');
    } else {
      $($itemMenu).removeClass('active');
    }
    
  }, 100));
});

$('.mobile-btn').click(function(){
  $(this).toggleClass('active');
  $('.menu-nav.mobile-nav').toggleClass('active');
});

(function(){
  function slider (sliderName, velocidade) {
    var sliderClass = '.' + sliderName,
        activeClass = 'active',
        rotate = setInterval(rotateSlide, velocidade);

    $(sliderClass + ' > :first').addClass(activeClass);

    $(sliderClass).hover(function(){
      clearInterval(rotate);
    }, function(){
      rotate = setInterval(rotateSlide, velocidade);
    });

    function rotateSlide() {
      var activeSlide = $(sliderClass + ' > .' + activeClass),
          nextSlide = activeSlide.next();

      if (nextSlide.length == 0) {
        nextSlide = $(sliderClass + ' > :first');
      }

      activeSlide.removeClass(activeClass);
      nextSlide.addClass(activeClass);

    }
  }
  slider('introducao', 3000);
})();

//Animação ao scroll


(function(){
  var $target = $('[data-anime="scroll"]'),
      animationClass = 'animate',
      offset = $(window).height() * 3/4;

  function animeScroll(){
    var documentTop = $(window).scrollTop();
    console.log('scroll');
    $target.each(function(){
      var itemTop = $(this).offset().top;
      if (documentTop > itemTop - offset) {
        $(this).addClass(animationClass);
      } else {
        $(this).removeClass(animationClass);
      }
    });
  }

  animeScroll();

  $(document).scroll(debounce(function(){
    animeScroll();
  }, 100));
})();
    






