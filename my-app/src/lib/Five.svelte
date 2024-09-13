<script>
    import Mylistitem from '$lib/Mylistitem.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
    export let character;
  /**
 * @param {string} url
 */
async function fetchAllSpells(url) {
    /**
     * @type {any[]}
     */
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

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load spells. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', getSpells);

</script>

<div class="wrapper">
    <div class="spellLevel">
        <h1>Cantrips</h1>
        <input type="text" class="searchInput" placeholder="Search Cantrips by name or description...">
        <ul id="spellLvl0"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 1</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 1 spells by name or description...">
        <ul id="spellLvl1"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 2</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 2 spells by name or description...">
        <ul id="spellLvl2"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 3</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 3 spells by name or description...">
        <ul id="spellLvl3"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 4</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 4 spells by name or description...">
        <ul id="spellLvl4"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 5</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 5 spells by name or description...">
        <ul id="spellLvl5"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 6</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 6 spells by name or description...">
        <ul id="spellLvl6"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 7</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 7 spells by name or description...">
        <ul id="spellLvl7"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 8</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 8 spells by name or description...">
        <ul id="spellLvl8"></ul>
    </div>
    <div class="spellLevel">
        <h1>Spell Level 9</h1>
        <input type="text" class="searchInput" placeholder="Search Lvl 9 spells by name or description...">
        <ul id="spellLvl9"></ul>
    </div>      
</div>
<div class="selectedSpells">
    <h1>Selected Spells</h1>
    <ul id="selected">
        
    </ul>
</div>

<style>

.wrapper {
    display: flex;
    flex-wrap: wrap;
    background-color: #D9D9D9;
    width: 100vw;
    height:100%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 0;
    flex-direction: row;
}

.spellLevel {
    display: flex;
    flex: wrap;
    justify-content: center;
    align-items: center;
    min-width: 40em;
    min-height: 20em;
    max-width: 40em;
    max-height: 20em;
    background-color: var(--button-bg);
    margin: 60px;
    padding: 0;
    border: solid black .5px;
}

.spellLevel {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    position: relative;
}

.searchInput {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
}

.spellLevel ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.selectedSpells {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-width: 91.5%;
    min-height: 20em;
    max-width: 91.5%;
    max-height: 20em;
    background-color: var(--button-bg);
    margin: 60px; 
    padding: 0;
    border: solid black .5px;
    overflow-y: auto; 
    overflow-x: hidden; 
}

.selectedSpells ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.selectedSpells h1 {
    margin: 0; 
    padding: 10px 0; 
    text-align: center; 
    width: 100%; 
}
</style>