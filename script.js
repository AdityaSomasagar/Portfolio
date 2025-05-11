// Function to toggle quote visibility
function revealQuote() {
    const quote = document.getElementById("quote");
    if (quote.classList.contains("hidden")) {
      quote.classList.remove("hidden");
    } else {
      quote.classList.add("hidden");
    }
  }
  
  // Intersection Observer for scroll animations
  document.addEventListener('DOMContentLoaded', function() {
    const sectionCards = document.querySelectorAll('.section-card');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once the animation is complete, unobserve the element
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null, // viewport
        threshold: 0.2, // 20% of the item visible
        rootMargin: '0px 0px -50px 0px' // trigger a bit earlier
      });
      
      // Observe each section card
      sectionCards.forEach(card => {
        observer.observe(card);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      sectionCards.forEach(card => {
        card.classList.add('visible');
      });
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetSection = document.querySelector(this.getAttribute('href'));
        if (targetSection) {
          // For better user experience with fixed header
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Initialize first section as visible immediately
    const firstSection = document.querySelector('.section-card');
    if (firstSection) {
      firstSection.classList.add('visible');
    }
  });