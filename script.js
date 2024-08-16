document.addEventListener('DOMContentLoaded', () => {
    const togglePopupBtn = document.getElementById('togglePopup');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopup');

    //toggles popup
    togglePopupBtn.addEventListener('click', () => {
        if (popup.style.display === 'block' || popup.style.display === '') {
            popup.style.display = 'none';
        } else {
            popup.style.display = 'block';
        }
    });

    //closes
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    //closes the popup if user clicks anywhere else
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});