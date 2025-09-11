// Portfolio Interactive Functionality

/**
 * Toggle display of course lists in education section
 */
function toggleCourses(school) {
  const shortSpan = document.getElementById(school + '-courses-short');
  const fullSpan = document.getElementById(school + '-courses-full');
  const toggleLink = document.getElementById(school + '-toggle');
  
  if (fullSpan.style.display === 'none') {
    shortSpan.style.display = 'none';
    fullSpan.style.display = 'inline';
    toggleLink.textContent = 'Show less';
  } else {
    shortSpan.style.display = 'inline';
    fullSpan.style.display = 'none';
    toggleLink.textContent = 'Show more';
  }
}

/**
 * Toggle display of experience details
 */
function toggleExperience(company) {
  const detailsDiv = document.getElementById(company + '-details');
  const toggleLink = document.getElementById(company + '-toggle');
  
  if (detailsDiv.style.display === 'none') {
    detailsDiv.style.display = 'block';
    toggleLink.textContent = 'Hide Details';
  } else {
    detailsDiv.style.display = 'none';
    toggleLink.textContent = 'View Details';
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
    section.style.display = 'none';
  });
  
  const fullCourseLists = document.querySelectorAll('[id$="-courses-full"]');
  fullCourseLists.forEach(list => {
    list.style.display = 'none';
  });
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

// Export functions for global access (if needed)
window.toggleCourses = toggleCourses;
window.toggleExperience = toggleExperience;
window.toggleTheme = toggleTheme; 