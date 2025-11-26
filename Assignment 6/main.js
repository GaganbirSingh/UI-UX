/**
 * Sets the 'active' class on the navigation link corresponding to the current page.
 */
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', highlightActiveNav);