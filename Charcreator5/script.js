async function fetchAllSpells(url) {
    let allSpells = [];
    let nextPageUrl = url;

    while (nextPageUrl) {
        try {
            const response = await fetch(nextPageUrl);
            const data = await response.json();
            allSpells = allSpells.concat(data.results);
            nextPageUrl = data.next;
        } catch (error) {
            console.error('Error fetching data from page:', nextPageUrl, error);
            break;
        }
    }

    return allSpells;
}

function saveSelectedSpells() {
    const selectedSpells = Array.from(document.querySelectorAll('#selected li')).map(li => {
        return {
            name: li.querySelector('span').textContent
        };
    });
    localStorage.setItem('selectedSpells', JSON.stringify(selectedSpells));
    alert('Selected Spells have been saved!');
}

function loadSelectedSpells() {
    const savedSpells = JSON.parse(localStorage.getItem('selectedSpells')) || [];
    const selectedSpellsList = document.getElementById('selected');

    selectedSpellsList.innerHTML = '';

    const selectedSpellNames = new Set(savedSpells.map(spell => spell.name));

    document.querySelectorAll('.spell-checkbox').forEach(checkbox => {
        const spellName = checkbox.nextElementSibling.textContent;
        if (selectedSpellNames.has(spellName)) {
            checkbox.checked = true;
            const liElement = checkbox.closest('li');
            if (liElement) {
                const ulElement = checkbox.closest('ul');
                if (ulElement) {
                    ulElement.removeChild(liElement);
                    selectedSpellsList.appendChild(liElement);
                }
            }
        }
    });
}

async function getSpells() {
    try {
        const apiUrl = "https://api.open5e.com/v2/spells/";
        const allSpells = await fetchAllSpells(apiUrl);

        const uniqueSpellsMap = new Map();

        allSpells.forEach(spell => {
            const key = spell.name.toLowerCase();
            if (!uniqueSpellsMap.has(key)) {
                uniqueSpellsMap.set(key, {
                    name: spell.name,
                    description: spell.desc || 'No description available.',
                    distance: (spell.range === 0.1 || spell.range === 0 ? spell.range_text : (spell.range ? spell.range + ' Feet' : 'Unknown')),
                    materials: Array.isArray(spell.material_specified) ? spell.material_specified.join(', ') : spell.material_specified || 'None',
                    school: spell.school?.name || 'None',
                    level: spell.level || 0
                });
            }
        });

        const uniqueSpells = Array.from(uniqueSpellsMap.values());
        const spellsByLevel = Array.from({ length: 10 }, () => []);

        uniqueSpells.forEach(spell => {
            const level = Math.max(0, Math.min(spell.level, 9));
            spellsByLevel[level].push({
                name: spell.name,
                description: spell.description,
                distance: spell.distance,
                materials: spell.materials,
                school: spell.school
            });
        });

        for (const [index, spells] of spellsByLevel.entries()) {
            const ulElement = document.getElementById(`spellLvl${index}`);
            const searchInput = ulElement?.previousElementSibling;

            if (ulElement) {
                ulElement.innerHTML = '';
                const fragment = document.createDocumentFragment();

                spells.forEach(spell => {
                    const liElement = document.createElement('li');
                    
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'spell-checkbox';
                    checkbox.addEventListener('change', () => {
                        const selectedSpellsList = document.getElementById('selected');
                        if (checkbox.checked) {
                            if (!Array.from(selectedSpellsList.children).some(li => li.querySelector('span').textContent === spell.name)) {
                                ulElement.removeChild(liElement);
                                selectedSpellsList.appendChild(liElement);
                            }
                        } else {
                            selectedSpellsList.removeChild(liElement);
                            ulElement.appendChild(liElement);
                        }
                        saveSelectedSpells();
                    });

                    liElement.appendChild(checkbox);
                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = spell.name;
                    liElement.appendChild(nameSpan);

                    const descriptionP = document.createElement('p');
                    descriptionP.className = 'spell-description';
                    descriptionP.innerHTML = `
                        <strong>Description:</strong> ${spell.description}<br>
                        <strong>Range:</strong> ${spell.distance}<br>
                        <strong>Materials:</strong> ${spell.materials}<br>
                        <strong>School:</strong> ${spell.school}
                    `;
                    descriptionP.style.display = 'none';

                    liElement.addEventListener('click', () => {
                        descriptionP.style.display = descriptionP.style.display === 'block' ? 'none' : 'block';
                    });

                    liElement.appendChild(descriptionP);
                    fragment.appendChild(liElement);
                });

                ulElement.appendChild(fragment);

                if (searchInput) {
                    searchInput.addEventListener('input', () => {
                        const query = searchInput.value.toLowerCase();
                        Array.from(ulElement.children).forEach(li => {
                            const name = li.querySelector('span').textContent.toLowerCase();
                            const description = li.querySelector('.spell-description')?.innerHTML.toLowerCase() || '';
                            li.style.display = name.includes(query) || description.includes(query) ? '' : 'none';
                        });
                    });
                }
            } else {
                console.warn(`No UL element found for level: ${index}`);
            }
        }

        loadSelectedSpells(); 
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        alert('Failed to load spells. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', getSpells);

document.getElementById('saveButton').addEventListener('click', saveSelectedSpells);