// Array of package objects
const travelPackages = [
    { id: 'himalayan-bliss', destination: 'Shimla & Manali', durationDays: 7, basePrice: 40000, season: 'Peak' },
    { id: 'coastal-dreams', destination: 'Goa', durationDays: 5, basePrice: 35000, season: 'Off' },
    { id: 'backwater-magic', destination: 'Kerala', durationDays: 6, basePrice: 55000, season: 'Peak' },
    { id: 'royal-rajasthan', destination: 'Jaipur & Udaipur', durationDays: 8, basePrice: 60000, season: 'Standard' },
    { id: 'spiritual-sojourn', destination: 'Varanasi', durationDays: 4, basePrice: 25000, season: 'Standard' }
];

/**
 * Calculates the final price of a package based on its season.
 * @param {number} basePrice - The base price of the package.
 * @param {string} season - The travel season ('Peak', 'Off', 'Standard').
 * @returns {number} The calculated final price.
 */
function calculateFinalPrice(basePrice, season) {
    let multiplier = 1.0; // Standard season
    
    // Using a switch statement for seasonal pricing logic
    switch (season) {
        case 'Peak':
            multiplier = 1.25; // 25% surcharge for peak season
            break;
        case 'Off':
            multiplier = 0.85; // 15% discount for off-season
            break;
    }
    
    // Return final price using arithmetic operator
    return Math.round(basePrice * multiplier);
}

/**
 * Renders the travel packages into the table body.
 */
function renderPackagesTable() {
    const tableBody = document.getElementById('packages-tbody');
    if (!tableBody) return; // Exit if the table body isn't on the page

    // Using a loop to iterate over the packages array
    travelPackages.forEach(pkg => {
        const finalPrice = calculateFinalPrice(pkg.basePrice, pkg.season);

        // Create a new table row element
        const row = document.createElement('tr');
        
        // Use template literals to create the HTML for the cells
        row.innerHTML = `
            <td>${pkg.destination}</td>
            <td>${pkg.durationDays}</td>
            <td>${pkg.season}</td>
            <td>${pkg.basePrice.toLocaleString('en-IN')}</td>
            <td>${finalPrice.toLocaleString('en-IN')}</td>
        `;
        
        // Append the new row to the table body
        tableBody.appendChild(row);
    });
}

// Run the rendering function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderPackagesTable);