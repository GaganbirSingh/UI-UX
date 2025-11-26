/**
 * Main UI Logic: Navigation, Themes, Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initTabs();
    loadFavoritesPreview();
});

// Theme Handling
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
        document.body.setAttribute('data-theme', storedTheme);
        toggle.textContent = storedTheme === 'dark' ? '☀️' : '🌙';
    }

    if(toggle) {
        toggle.addEventListener('click', () => {
            const current = document.body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            toggle.textContent = next === 'dark' ? '☀️' : '🌙';
        });
    }
}

// Mobile Navigation
function initMobileNav() {
    const btn = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
        });
    }
}

// Tab Switching (Home Page)
function initTabs() {
    const buttons = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.search-form');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            buttons.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Favorites Widget (if on Home)
function loadFavoritesPreview() {
    const grid = document.getElementById('fav-grid');
    if (!grid) return;

    const favs = JSON.parse(localStorage.getItem('ff_favorites') || '[]');
    if (favs.length > 0) {
        document.getElementById('favorites-preview').style.display = 'block';
        grid.innerHTML = favs.slice(0, 3).map(recipe => `
            <div class="recipe-card">
                <div class="card-img-wrapper">
                    <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${recipe.title}</h3>
                    <a href="recipe.html?id=${recipe.id}" class="btn-primary" style="text-align:center; margin-top:0.5rem">View</a>
                </div>
            </div>
        `).join('');
    }
}