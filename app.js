document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            // Since I used display: none in CSS for mobile, I need to toggle a class that handles visibility
            // However, my CSS structure for nav-links was display: flex.
            // Let's adjust the logic to toggle a class on the navbar or handle it via inline styles for simplicity in this prototype,
            // or better, toggle a class 'active' and add CSS for it.
            
            // Actually, looking at my CSS, .nav-links is hidden on mobile.
            // I need to add a class to show it.
            navLinks.classList.toggle('active');
            
            // For this to work, I need to add the .active style in CSS or inject it here.
            // Let's assume I'll add a quick style injection for the mobile menu.
            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navLinks.style.display = ''; // Revert to CSS
            }
        });
    }

    // Sticky Navbar Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple Form Handling (Prevent Default)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('This is a demo. Form submission is mocked!');
        });
    });
});
