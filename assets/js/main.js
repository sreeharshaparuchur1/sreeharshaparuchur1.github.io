/**
* Template Name: BizPage - v4.0.0
* Template URL: https://bootstrapmade.com/bizpage-bootstrap-business-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 17;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
    (index === 0) ?
    introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>"):
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");
  });

  introCarousel.on('slid.bs.carousel', function(e) {
    $(this).find('.profile-picture, h2').addClass('animate__animated animate__fadeInDown');
    $(this).find('.subtitle, .tagline, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });

  // Skills section
  $('#skills').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function() {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({
      filter: $(this).data('filter')
    });
    aos_init();
  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 4
      },
      900: {
        items: 6
      }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

    // Experience highlights rotation
  function initExperienceHighlights() {
    const highlights = $('.rotating-highlight');
    let currentIndex = 0;
    let rotationInterval;
    
    if (highlights.length > 1) {
      // Ensure first highlight is visible and others are hidden
      highlights.each(function(index) {
        if (index === 0) {
          $(this).addClass('active').css('opacity', '1');
        } else {
          $(this).removeClass('active').css('opacity', '0');
        }
      });
      
      // Start rotation
      rotationInterval = setInterval(function() {
        if (highlights.length > 0) {
          // Fade out current
          highlights.eq(currentIndex).removeClass('active').css('opacity', '0');
          // Move to next
          currentIndex = (currentIndex + 1) % highlights.length;
          // Fade in new
          highlights.eq(currentIndex).addClass('active').css('opacity', '1');
        }
      }, 3000); // 3 seconds

      // Clean up interval when page is unloaded or hidden
      $(window).on('beforeunload unload pagehide', function() {
        if (rotationInterval) {
          clearInterval(rotationInterval);
        }
      });
      
      // Pause rotation when page is not visible
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          if (rotationInterval) {
            clearInterval(rotationInterval);
          }
                 } else {
           rotationInterval = setInterval(function() {
             if (highlights.length > 0) {
               // Fade out current
               highlights.eq(currentIndex).removeClass('active').css('opacity', '0');
               // Move to next
               currentIndex = (currentIndex + 1) % highlights.length;
               // Fade in new
               highlights.eq(currentIndex).addClass('active').css('opacity', '1');
             }
           }, 3000);
        }
      });
    }
  }
  
  // Initialize experience highlights when page loads
  $(document).ready(function() {
    initExperienceHighlights();
  });

})(jQuery);

// Cards Toggle Functionality (Global scope for onclick) - Works for experience, education, projects, and publications
function toggleCard(link) {
  const card = link.closest('.experience-card, .education-card, .project-card, .publication-card');
  const content = card.querySelector('.card-content');
  const linkText = link.querySelector('.link-text');
  const icon = link.querySelector('i');
  
  if (content.classList.contains('expanded')) {
    // Collapse the card
    content.classList.remove('expanded');
    link.classList.remove('expanded');
    linkText.textContent = 'More details';
  } else {
    // Expand the card
    content.classList.add('expanded');
    link.classList.add('expanded');
    linkText.textContent = 'Less details';
  }
}



// Close other expanded cards when opening a new one (optional UX enhancement)
function toggleCardExclusive(link) {
  const currentCard = link.closest('.experience-card, .education-card, .project-card, .publication-card');
  const allCards = document.querySelectorAll('.experience-card, .education-card, .project-card, .publication-card');
  
  // Close all other cards
  allCards.forEach(card => {
    if (card !== currentCard) {
      const content = card.querySelector('.card-content');
      const cardLink = card.querySelector('.read-more-link');
      const linkText = cardLink.querySelector('.link-text');
      
      if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        cardLink.classList.remove('expanded');
        linkText.textContent = 'More details';
      }
    }
  });
  
  // Toggle current card
  toggleCard(link);
}

// Publication Figure Carousels - Auto-rotating every 3 seconds
class PublicationCarousel {
  constructor(carouselId) {
    this.carousel = document.getElementById(carouselId);
    this.slides = this.carousel ? this.carousel.getElementsByClassName('figure-slide') : [];
    this.currentIndex = 0;
    this.init();
  }

  init() {
    if (this.slides.length > 0) {
      this.showSlide(0);
      this.startAutoRotation();
    }
  }

  showSlide(index) {
    // Hide all slides
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove('active');
    }
    
    // Show current slide
    if (this.slides[index]) {
      this.slides[index].classList.add('active');
      this.currentIndex = index;
    }
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  startAutoRotation() {
    if (this.slides.length > 1) {
      setInterval(() => {
        this.nextSlide();
      }, 3000); // 3 seconds
    }
  }
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize each publication carousel
  new PublicationCarousel('carousel-pub1');
  new PublicationCarousel('carousel-pub2');
});

// Education section now uses same toggle functionality as experience cards