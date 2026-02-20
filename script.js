// Portfolio Interactive Functionality

/**
 * Initialize all project images for consistent styling
 */
function initializeProjectImages() {
  const projectImages = document.querySelectorAll('.project-image');
  projectImages.forEach(img => {
    // Ensure all images use consistent object-fit properties
    // CSS handles the dimensions, we just need to ensure proper loading
    if (!img.complete && img.src) {
      img.onload = () => {
        // Image loaded, CSS will handle the rest
      };
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeProjectImages();
});


/**
 * Toggle display of experience details
 */
function toggleExperience(company) {
  const detailsDiv = document.getElementById(company + '-details');
  const toggleLink = document.getElementById(company + '-toggle');
  
  if (detailsDiv.classList.contains('show')) {
    detailsDiv.classList.remove('show');
    toggleLink.textContent = 'View Details';
  } else {
    detailsDiv.classList.add('show');
    toggleLink.textContent = 'Hide Details';
  }
}

/**
 * Toggle display of additional experience details
 */
function toggleAdditional(company) {
  const detailsDiv = document.getElementById(company + '-details');
  
  // Close any other open details first
  const allDetails = document.querySelectorAll('.additional-details');
  allDetails.forEach(detail => {
    if (detail !== detailsDiv) {
      detail.classList.remove('show');
    }
  });
  
  // Toggle the clicked one
  if (detailsDiv.classList.contains('show')) {
    detailsDiv.classList.remove('show');
  } else {
    detailsDiv.classList.add('show');
  }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (body.getAttribute('data-theme') === 'dark') {
    body.removeAttribute('data-theme');
    themeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
}

/**
 * Load saved theme preference and apply it
 */
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.querySelector('.theme-toggle');
  
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    if (themeToggle) {
      themeToggle.textContent = '☀️';
    }
  }
}

/**
 * Initialize functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Load theme preference
  loadTheme();
  
  // Initialize any collapsed sections
  const detailsSections = document.querySelectorAll('.experience-details');
  detailsSections.forEach(section => {
    section.classList.remove('show');
  });
  
  const additionalDetails = document.querySelectorAll('.additional-details');
  additionalDetails.forEach(section => {
    section.classList.remove('show');
  });
  
  
  // Initialize carousel if frames section exists
  if (document.querySelector('.frames-carousel')) {
    startCarouselAutoPlay();
  }
});

/**
 * Smooth scroll to navigation targets
 */
function smoothScrollToTarget(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavLink() {
  const sections = document.querySelectorAll('table[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentSection = section.id;
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

// Add scroll event listener for active nav link updates
window.addEventListener('scroll', updateActiveNavLink);

// Carousel functionality
let currentSlide = 0;
const totalSlides = 9; // Number of carousel images

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(slide) {
  currentSlide = slide;
  updateCarousel();
}

function updateCarousel() {
  const container = document.querySelector('.carousel-container');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (container) {
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Update active dot
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

// Auto-play carousel
function startCarouselAutoPlay() {
  setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

/**
 * Synchronise all project GIFs by restarting them simultaneously.
 * Interval ≈ 12 700 ms matches the publication GIF loop duration (~12 660 ms)
 * and is close to the brickdpo GIF (~12 320 ms), keeping them visually aligned.
 */
const GIF_SYNC_MS = 12700;

function syncAllGifs() {
  document.querySelectorAll('.project-image').forEach(img => {
    if (!img.src || !img.src.toLowerCase().includes('.gif')) return;
    const src = img.src;
    img.src = '';
    void img.offsetWidth; // force browser to process the blank src before restoring
    img.src = src;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Short delay lets all GIFs finish their initial decode before first sync
  setTimeout(() => {
    syncAllGifs();
    setInterval(syncAllGifs, GIF_SYNC_MS);
  }, 500);
});

// Export functions for global access (if needed)
window.toggleExperience = toggleExperience;
window.toggleAdditional = toggleAdditional;
window.toggleTheme = toggleTheme;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide; 