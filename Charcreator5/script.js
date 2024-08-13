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
                    description: spell.desc,
                    distance: spell.range || 'N/A', 
                    materials: spell.material || 'N/A', 
                    school: spell.school.name || 'N/A', 
                    level: spell.level || 0 
                });
            }
        });

        const uniqueSpells = Array.from(uniqueSpellsMap.values());

        console.log('Unique spells:', uniqueSpells);

        const spellsByLevel = {
            0: [], 
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: []
        };

        uniqueSpells.forEach(spell => {
            const level = spell.level;
            if (spellsByLevel[level] !== undefined) {
                spellsByLevel[level].push({
                    name: spell.name,
                    description: spell.description,
                    distance: spell.distance,
                    materials: spell.materials,
                    school: spell.school
                });
            } else {
                console.warn(`Unexpected level ${level} for spell: ${spell.name}`);
                spellsByLevel[0].push({
                    name: spell.name,
                    description: spell.description,
                    distance: spell.distance,
                    materials: spell.materials,
                    school: spell.school
                });
            }
        });

        console.log('Spells by level:', spellsByLevel);

        // spells organized by level
        for (const level in spellsByLevel) {
            const ulElement = document.getElementById(`spellLvl${level}`);
            const searchInput = ulElement ? ulElement.previousElementSibling : null;
            if (ulElement) {
                ulElement.innerHTML = '';
                spellsByLevel[level].forEach(spell => {
                    const liElement = document.createElement('li');
                    liElement.textContent = spell.name;

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
                        const isVisible = descriptionP.style.display === 'block';
                        Array.from(ulElement.querySelectorAll('.spell-description')).forEach(p => {
                            p.style.display = 'none';
                        });
                        descriptionP.style.display = isVisible ? 'none' : 'block';
                    });

                    liElement.appendChild(descriptionP);
                    ulElement.appendChild(liElement);
                });

                if (searchInput) {
                    searchInput.addEventListener('input', () => {
                        const query = searchInput.value.toLowerCase();
                        Array.from(ulElement.children).forEach(li => {
                            const name = li.textContent.toLowerCase();
                            const description = li.querySelector('.spell-description')?.innerHTML.toLowerCase() || '';
                            if (name.includes(query) || description.includes(query)) {
                                li.style.display = '';
                            } else {
                                li.style.display = 'none';
                            }
                        });
                    });
                }
            } else {
                console.warn(`No UL element found for level: ${level}`);
            }
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

document.addEventListener('DOMContentLoaded', getSpells);