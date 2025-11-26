import { ffFetch } from './config.js';

document.getElementById('substitute-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('ingredient-input').value;
    const resultsDiv = document.getElementById('substitute-results');

    if(!input) return;

    resultsDiv.innerHTML = '<div class="loader"></div>';

    try {
        const data = await ffFetch('/food/ingredients/substitutes', {
            ingredientName: input
        });

        if (data.status === 'success' && data.substitutes) {
            resultsDiv.innerHTML = data.substitutes.map(sub => `
                <div class="substitute-card animate-fade-up">
                    <p>${sub}</p>
                </div>
            `).join('');
        } else {
            resultsDiv.innerHTML = `<p>No substitutes found for "${input}".</p>`;
        }
    } catch (err) {
        resultsDiv.innerHTML = `<p class="error-box">${err.message}</p>`;
    }
});