document.addEventListener('DOMContentLoaded', () => {
    const togglePopupBtn = document.getElementById('togglePopup');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');

    // Toggle popup visibility
    togglePopupBtn.addEventListener('click', () => {
        if (popup.style.display === 'block' || popup.style.display === '') {
            popup.style.display = 'none';
        } else {
            popup.style.display = 'block';
        }
    });

    // Close the popup
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close the popup if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});