import { ffFetch } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const grid = document.getElementById('results-grid');
    const title = document.getElementById('search-title');
    const errorBox = document.getElementById('error-message');

    // 1. Determine Search Mode
    const query = params.get('query');
    const ingredients = params.get('ingredients');

    try {
        let results = [];
        
        if (ingredients) {
            title.textContent = `Results for ingredients: ${ingredients}`;
            results = await searchByIngredients(ingredients);
        } else if (query) {
            title.textContent = `Results for "${query}"`;
            results = await searchComplex(query);
        } else {
            throw new Error("No search terms provided.");
        }

        renderResults(results, grid);

    } catch (err) {
        grid.innerHTML = '';
        errorBox.textContent = err.message;
        errorBox.classList.remove('hidden');
    }
});

async function searchByIngredients(ingList) {
    const data = await ffFetch('/recipes/findByIngredients', {
        ingredients: ingList,
        number: 12,
        ranking: 1,
        ignorePantry: true
    });
    
    // Normalize data structure to match complexSearch
    return data.map(item => ({
        id: item.id,
        title: item.title,
        image: item.image,
        missedIngredientCount: item.missedIngredientCount,
        usedIngredientCount: item.usedIngredientCount
    }));
}

async function searchComplex(query) {
    const data = await ffFetch('/recipes/complexSearch', {
        query: query,
        number: 12,
        addRecipeInformation: true
    });
    return data.results;
}

function renderResults(recipes, container) {
    container.innerHTML = '';

    if (recipes.length === 0) {
        container.innerHTML = '<p>No recipes found. Try different terms.</p>';
        return;
    }

    recipes.forEach(recipe => {
        // Fallback for missing readyInMinutes in findByIngredients
        const timeStr = recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : 'See details';
        
        // Chips logic
        let chips = '';
        if (recipe.missedIngredientCount !== undefined) {
            chips = `
                <span class="chip used">${recipe.usedIngredientCount} used</span>
                <span class="chip missing">${recipe.missedIngredientCount} missing</span>
            `;
        }

        const card = document.createElement('div');
        card.className = 'recipe-card animate-fade-up';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="assets/placeholder.svg" data-src="${recipe.image}" alt="${recipe.title}" class="lazy-img">
            </div>
            <div class="card-content">
                <h3 class="card-title">${recipe.title}</h3>
                <div class="card-meta">
                    <span>⏱ ${timeStr}</span>
                </div>
                <div class="chip-container">${chips}</div>
                <a href="recipe.html?id=${recipe.id}" class="btn-primary" style="margin-top: 1rem; text-align: center;">View Recipe</a>
            </div>
        `;
        container.appendChild(card);
    });

    // Lazy Load Images
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.lazy-img').forEach(img => observer.observe(img));
}