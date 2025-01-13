document.addEventListener('DOMContentLoaded', () => {
  // Get all sections and the scroll indicator
  const sections = document.querySelectorAll('section');
  const indicator = document.getElementById('indicator');
  const navItems = document.querySelectorAll('.pill-nav ul li');
  
  // Function to update the indicator position
  const updateIndicator = () => {
      let currentSection = sections[0]; // Default to the first section
      let nextSection = null; // To handle expansion

      // Find the current section and optionally the next section
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section, index) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              currentSection = section;
              nextSection = sections[index + 1] || null; // Next section (if exists)
          }
      });

      // Update indicator position and expansion
      const currentNavItem = document.querySelector(`.pill-nav ul li a[href="#${currentSection.id}"]`).parentElement;
      const nextNavItem = nextSection
          ? document.querySelector(`.pill-nav ul li a[href="#${nextSection.id}"]`).parentElement
          : null;

      if (currentNavItem) {
          const currentRect = currentNavItem.getBoundingClientRect();
          const nextRect = nextNavItem ? nextNavItem.getBoundingClientRect() : null;

          // Fix the left position of the indicator
          indicator.style.left = `${currentRect.left}px`;

          // Expand the width to the next nav item if scrolling
          if (nextRect) {
              const expandedWidth = nextRect.left + nextRect.width - currentRect.left;
              indicator.style.width = `${expandedWidth}px`;
          } else {
              // If no next section, reset to the current nav width
              indicator.style.width = `${currentRect.width}px`;
          }

          // Keep the height of the indicator consistent
          indicator.style.height = `${currentRect.height}px`;
      }
  };

  // Attach scroll event listener
  window.addEventListener('scroll', updateIndicator);

  // Initialize the indicator position
  updateIndicator();
});

