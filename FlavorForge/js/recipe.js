import { ffFetch } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const container = document.getElementById('recipe-container');
    const loader = document.getElementById('recipe-loader');

    if (!id) {
        container.innerHTML = '<p>No recipe ID specified.</p>';
        return;
    }

    try {
        const recipe = await ffFetch(`/recipes/${id}/information`, {
            includeNutrition: true
        });
        
        renderRecipe(recipe, container);
        loader.classList.add('hidden');
        container.classList.remove('hidden');
        
    } catch (err) {
        loader.classList.add('hidden');
        container.innerHTML = `<p class="error-box">${err.message}</p>`;
        container.classList.remove('hidden');
    }
});

function renderRecipe(data, container) {
    const isFav = isFavorite(data.id);
    
    // Process instructions
    const instructions = data.analyzedInstructions.length > 0 
        ? data.analyzedInstructions[0].steps.map(s => `<li>${s.step}</li>`).join('')
        : '<li>No detailed instructions provided.</li>';

    const ingredients = data.extendedIngredients.map(ing => `
        <li>
            <input type="checkbox" id="ing-${ing.id}">
            <label for="ing-${ing.id}">${ing.original}</label>
        </li>
    `).join('');

    const nutrition = data.nutrition && data.nutrition.nutrients 
        ? data.nutrition.nutrients.filter(n => ['Calories', 'Protein', 'Fat', 'Carbohydrates'].includes(n.name))
        : [];
    
    const nutriHtml = nutrition.map(n => `<div><strong>${n.name}</strong>: ${n.amount}${n.unit}</div>`).join(' | ');

    container.innerHTML = `
        <img src="${data.image}" alt="${data.title}" class="detail-hero">
        
        <div class="detail-content">
            <div class="detail-header">
                <h1 class="detail-title">${data.title}</h1>
                <div class="detail-stats">
                    <span>⏱ ${data.readyInMinutes} min</span>
                    <span>👥 ${data.servings} servings</span>
                    <button id="fav-btn" class="btn-outline">${isFav ? '♥ Saved' : '♡ Save'}</button>
                </div>
                <div style="margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-light);">
                    ${nutriHtml}
                </div>
            </div>

            <div class="detail-grid">
                <div class="ingredients-section">
                    <h2>Ingredients</h2>
                    <ul class="ingredient-list">${ingredients}</ul>
                </div>
                <div class="method-section">
                    <h2>Instructions</h2>
                    <ol class="steps-list">${instructions}</ol>
                </div>
            </div>
        </div>
    `;

    document.getElementById('fav-btn').addEventListener('click', (e) => toggleFavorite(data, e.target));
}

// Favorites Logic
function isFavorite(id) {
    const favs = JSON.parse(localStorage.getItem('ff_favorites') || '[]');
    return favs.some(f => f.id === id);
}

function toggleFavorite(recipe, btn) {
    let favs = JSON.parse(localStorage.getItem('ff_favorites') || '[]');
    const index = favs.findIndex(f => f.id === recipe.id);

    if (index > -1) {
        favs.splice(index, 1);
        btn.textContent = '♡ Save';
    } else {
        favs.push({ id: recipe.id, title: recipe.title, image: recipe.image });
        btn.textContent = '♥ Saved';
    }
    
    localStorage.setItem('ff_favorites', JSON.stringify(favs));
}