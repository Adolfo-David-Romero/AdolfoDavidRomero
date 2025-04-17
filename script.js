document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const indicator = document.getElementById('indicator');
    const navLinks = document.querySelectorAll('.pill-nav ul li a');

    // Get the "About" nav item (anchor start point)
    const aboutLink = document.querySelector('.pill-nav a[href="#about"]');
    const aboutItem = aboutLink?.parentElement;

    let aboutLeft = 0;

    const measureInitialOffsets = () => {
        aboutLeft = aboutItem.offsetLeft;
    };

    const updateIndicator = () => {
        let scrollMiddle = window.scrollY + window.innerHeight / 2;

        for (let section of sections) {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (scrollMiddle >= top && scrollMiddle < bottom) {
                const activeLink = document.querySelector(`.pill-nav a[href="#${section.id}"]`);
                const activeItem = activeLink?.parentElement;

                if (activeItem) {
                    const activeRight = activeItem.offsetLeft + activeItem.offsetWidth;
                    const width = activeRight - aboutLeft;
                    indicator.style.left = `${aboutLeft}px`;
                    indicator.style.width = `${width}px`;
                }

                break;
            }
        }
    };

    window.addEventListener('scroll', updateIndicator);
    window.addEventListener('resize', () => {
        measureInitialOffsets();
        updateIndicator();
    });

    // Initial load
    measureInitialOffsets();
    updateIndicator();
});