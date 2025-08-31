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



  // Initiate venobox (lightbox feature used in publications)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
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

// Cards Toggle Functionality - Works for experience, education, projects, and publications
function toggleCard(link, event) {
  // Prevent event bubbling if event is passed
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const card = link.closest('.experience-card, .education-card, .project-card, .publication-card');
  const content = card?.querySelector('.card-content');
  const linkText = link.querySelector('.link-text');
  const icon = link.querySelector('i');
  
  // Ensure we're only affecting this specific card
  if (!card || !content) {
    console.error('Card or content not found for:', link);
    return;
  }
  
  // Special handling for project cards to prevent multiple expansions
  const isProjectCard = card.classList.contains('project-card');
  if (isProjectCard) {
    // First, collapse all other project cards
    const allProjectCards = document.querySelectorAll('.project-card');
    allProjectCards.forEach(otherCard => {
      if (otherCard !== card) {
        const otherContent = otherCard.querySelector('.card-content');
        const otherLink = otherCard.querySelector('.read-more-link');
        const otherLinkText = otherLink?.querySelector('.link-text');
        const otherIcon = otherLink?.querySelector('i');
        
        if (otherContent?.classList.contains('expanded')) {
          otherContent.classList.remove('expanded');
          otherLink?.classList.remove('expanded');
          otherCard.classList.remove('expanded');
          if (otherLinkText) otherLinkText.textContent = 'More details';
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      }
    });
  }
  
  const isExpanded = content.classList.contains('expanded');
  
  if (isExpanded) {
    // Collapse the card
    content.classList.remove('expanded');
    link.classList.remove('expanded');
    card.classList.remove('expanded');
    if (linkText) linkText.textContent = 'More details';
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    // Expand the card
    content.classList.add('expanded');
    link.classList.add('expanded');
    card.classList.add('expanded');
    if (linkText) linkText.textContent = 'Less details';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// Event delegation for card toggle functionality
$(document).ready(function() {
  $(document).on('click', '.read-more-link', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleCard(this, e);
  });
});





// All card sections (experience, education, projects, publications) use the same toggle functionality