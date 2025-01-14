document.addEventListener('DOMContentLoaded', () => {
    // Get all sections and the scroll indicator
    const sections = document.querySelectorAll('section');
    const indicator = document.getElementById('indicator');
    const navItems = document.querySelectorAll('.pill-nav ul li');

    // Get the starting position of the "About" nav item
    const aboutNavItem = document.querySelector('.pill-nav ul li a[href="#about"]').parentElement;
    const aboutRect = aboutNavItem.getBoundingClientRect();
    const aboutLeft = aboutRect.left;

    // Set the initial left position of the indicator
    indicator.style.left = `${aboutLeft}px`;

    // Function to update the indicator width based on scroll position
    const updateIndicator = () => {
        let maxWidth = 0;

        // Get the current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Find the current section and calculate the total width to expand
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const currentNavItem = document.querySelector(`.pill-nav ul li a[href="#${section.id}"]`).parentElement;
                const currentRect = currentNavItem.getBoundingClientRect();

                // Calculate the width from the "About" nav item's left to the current section's nav item's right
                maxWidth = currentRect.left + currentRect.width - aboutLeft;
            }
        });

        // Update the indicator width
        indicator.style.width = `${maxWidth}px`;
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', updateIndicator);

    // Initialize the indicator width
    updateIndicator();
});
