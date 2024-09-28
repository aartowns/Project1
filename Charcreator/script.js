document.addEventListener('DOMContentLoaded', () => {

    loadFormData();

    document.getElementById('saveButton').addEventListener('click', () => {
        const level = document.getElementById('Level').value;
        const race = document.getElementById('Race').value;
        const className = document.getElementById('Class').value;
        const background = document.getElementById('Background').value;
        const hitpoints = document.getElementById('hitpoints').value;
        const name = document.getElementById('name').value;

        const formData = {
            level: level,
            race: race,
            className: className,
            background: background,
            hitpoints: hitpoints,
            name: name
        };

        localStorage.setItem('characterData', JSON.stringify(formData));
        alert('Data saved to local storage!');
    });

    document.getElementById('loadButton').addEventListener('click', () => {
        loadFormData();
    });
});

function loadFormData() {
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        document.getElementById('Level').value = formData.level || '1'; 
        document.getElementById('Race').value = formData.race || 'Dragonborn'; 
        document.getElementById('Class').value = formData.className || 'Barbarian'; 
        document.getElementById('Background').value = formData.background || 'Acolyte'; 
        document.getElementById('hitpoints').value = formData.hitpoints || '';
        document.getElementById('name').value = formData.name || '';
    }
}