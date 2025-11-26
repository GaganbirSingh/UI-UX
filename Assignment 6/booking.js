document.addEventListener('DOMContentLoaded', () => {
    // Select form elements
    const form = document.querySelector('.booking-form');
    const packageSelect = document.getElementById('package');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const travelersInput = document.getElementById('travelers');
    const promoCodeInput = document.getElementById('promo-code');
    const priceEstimator = document.getElementById('price-estimator');
    const submitBtn = document.getElementById('submit-btn');

    // Array of required fields for validation
    const requiredFields = [
        document.getElementById('name'),
        document.getElementById('email'),
        packageSelect,
        startDateInput,
        endDateInput
    ];

    /**
     * Calculates the estimated total price based on form inputs.
     */
    function calculateTotalPrice() {
        const basePricePerNight = parseFloat(packageSelect.value) || 0;
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const numTravelers = parseInt(travelersInput.value, 10) || 1;
        const promoCode = promoCodeInput.value.trim().toUpperCase();

        // Ensure dates are valid for calculation
        if (isNaN(startDate) || isNaN(endDate) || endDate <= startDate) {
            priceEstimator.textContent = 'Estimated Total: ₹0 (Invalid dates)';
            return;
        }

        // Calculate nights using Date math
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        const nights = Math.round(Math.abs((endDate - startDate) / oneDay));

        let total = basePricePerNight * nights;

        // Apply a guest multiplier if more than 2 travelers
        if (numTravelers > 2) {
            const extraGuests = numTravelers - 2;
            total += (basePricePerNight * 0.20) * extraGuests * nights; // +20% per extra guest per night
        }
        
        // Apply promo code discount using a switch statement
        let discount = 0;
        switch (promoCode) {
            case 'EARLYBIRD':
                discount = 0.10; // 10% off
                break;
            case 'TRAVELMORE':
                discount = 0.15; // 15% off
                break;
        }
        
        total -= total * discount;

        priceEstimator.textContent = `Estimated Total: ₹${total.toLocaleString('en-IN')} for ${nights} night(s)`;
    }

    /**
     * Validates the form and enables/disables the submit button.
     */
    function validateForm() {
        let allValid = true;
        // Loop through required fields to check their values
        for (const field of requiredFields) {
            if (!field.value) {
                allValid = false;
                break; // Exit loop early if any field is invalid
            }
        }
        
        // Also check if dates are logical
        if (startDateInput.value && endDateInput.value && endDateInput.value <= startDateInput.value) {
            allValid = false;
        }

        // Ternary operator to set the 'disabled' attribute
        submitBtn.disabled = !allValid;
    }

    // Add event listeners to all relevant form fields
    const fieldsToWatch = [packageSelect, startDateInput, endDateInput, travelersInput, promoCodeInput, ...requiredFields];
    fieldsToWatch.forEach(field => {
        field.addEventListener('input', () => {
            calculateTotalPrice();
            validateForm();
        });
    });

    // Prevent form submission for this example
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking request submitted! (This is a demo)');
    });
});