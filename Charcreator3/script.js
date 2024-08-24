document.addEventListener('DOMContentLoaded', () => {

    loadSelectValues();

    document.getElementById('saveButton').addEventListener('click', () => {
        const selects = document.querySelectorAll('.createOptions select');
        const selectValues = {};

        selects.forEach(select => {
            selectValues[select.id] = select.value;
        });

        localStorage.setItem('selectValues', JSON.stringify(selectValues));
        alert('Select values saved to local storage!');
    });

    document.getElementById('loadButton').addEventListener('click', () => {
        loadSelectValues();
    });
});

function loadSelectValues() {
    const savedValues = localStorage.getItem('selectValues');
    if (savedValues) {
        const selectValues = JSON.parse(savedValues);
        Object.keys(selectValues).forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                select.value = selectValues[id];
            }
        });
    }
}