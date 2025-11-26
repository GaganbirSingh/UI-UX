document.addEventListener('DOMContentLoaded', () => {
    // Select all necessary modal elements
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.modal-close');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    // Check if modal elements exist on the page
    if (!modal || !closeBtn) return;

    // Loop through each gallery image and add a click event listener
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // Read data-* attributes from the clicked thumbnail
            const largeImagePath = img.getAttribute('data-large');
            const captionText = img.getAttribute('data-caption');
            
            // Update modal content and style
            modal.style.display = 'block'; // Style update via JS
            modalImage.src = largeImagePath;
            modalCaption.textContent = captionText;
        });
    });

    // Function to close the modal
    const closeModal = () => {
        modal.style.display = 'none';
    };

    // Add click event listeners to close the modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close if the click is on the dark background, not the image itself
        if (e.target === modal) {
            closeModal();
        }
    });
});