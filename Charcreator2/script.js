document.addEventListener('DOMContentLoaded', () => {

    loadCheckboxStates();

    document.getElementById('saveButton').addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.skill input[type="checkbox"]');
        const checkboxStates = {};

        checkboxes.forEach(checkbox => {
            checkboxStates[checkbox.id] = checkbox.checked;
        });

        localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
        alert('Checkbox states saved to local storage!');
    });

    document.getElementById('loadButton').addEventListener('click', () => {
        loadCheckboxStates();
    });
});

function loadCheckboxStates() {
    const savedStates = localStorage.getItem('checkboxStates');
    if (savedStates) {
        const checkboxStates = JSON.parse(savedStates);
        Object.keys(checkboxStates).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checkboxStates[id];
            }
        });
    }
}