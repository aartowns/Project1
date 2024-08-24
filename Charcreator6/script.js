document.addEventListener('DOMContentLoaded', () => {
    // Load and display character data
    loadCharacterData();

    // Load and display selected skills
    loadSkills();

    // Load and display selected feats
    loadSelectedFeats();

    // Load and display selected spells
    loadSelectedSpells();
});

function loadCharacterData() {
    const savedData = JSON.parse(localStorage.getItem('characterData')) || {};
    document.getElementById('levelDisplay').textContent = savedData.level || 'N/A';
    document.getElementById('raceDisplay').textContent = savedData.race || 'N/A';
    document.getElementById('classDisplay').textContent = savedData.className || 'N/A';
    document.getElementById('backgroundDisplay').textContent = savedData.background || 'N/A';
    document.getElementById('hitpointsDisplay').textContent = savedData.hitpoints || 'N/A';
    document.getElementById('nameDisplay').textContent = savedData.name || 'N/A';
}

function loadSkills() {
    const savedStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    const skillsDisplay = document.getElementById('skillsDisplay');
    skillsDisplay.innerHTML = '';

    Object.keys(savedStates).forEach(id => {
        const listItem = document.createElement('li');
        listItem.textContent = id + (savedStates[id] ? ' (selected)' : ' (not selected)');
        skillsDisplay.appendChild(listItem);
    });
}

function loadSelectedFeats() {
    const savedFeats = JSON.parse(localStorage.getItem('selectedFeats')) || [];
    const selectedFeatsDisplay = document.getElementById('selectedFeatsDisplay');
    selectedFeatsDisplay.innerHTML = '';

    savedFeats.forEach(feat => {
        const listItem = document.createElement('li');
        listItem.textContent = feat;
        selectedFeatsDisplay.appendChild(listItem);
    });
}

function loadSelectedSpells() {
    const savedSpells = JSON.parse(localStorage.getItem('selectedSpells')) || [];
    const selectedSpellsDisplay = document.getElementById('selectedSpellsDisplay');
    selectedSpellsDisplay.innerHTML = '';

    savedSpells.forEach(spell => {
        const listItem = document.createElement('li');
        listItem.textContent = spell.name;
        selectedSpellsDisplay.appendChild(listItem);
    });
}