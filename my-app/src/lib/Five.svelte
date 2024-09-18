<script>
	import Myspellitem from '$lib/Myspellitem.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let character;

	// @ts-ignore
	let spells = writable([]);
	// @ts-ignore
	let selectedSpells = writable([]);

	/**
	 * @type {{ addEventListener: (arg0: string, arg1: () => void) => void; value: string; }}
	 */
	let search;

	onMount(() => {
		getSpells();
        search.addEventListener('input', () => {
			filterSpells(search.value);
		});
	});

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
			const apiUrl = 'https://api.open5e.com/v2/spells/';
			const allSpells = await fetchAllSpells(apiUrl);

			const uniqueSpellsMap = new Map();

			allSpells.forEach((spell) => {
				const key = spell.name.toLowerCase();
				if (!uniqueSpellsMap.has(key)) {
					uniqueSpellsMap.set(key, {
						name: spell.name,
						description: spell.desc || 'No description available.',
						distance:
							spell.range === 0.1 || spell.range === 0
								? spell.range_text
								: spell.range
									? spell.range + ' Feet'
									: 'Unknown',
						materials: Array.isArray(spell.material_specified)
							? spell.material_specified.join(', ')
							: spell.material_specified || 'None',
						school: spell.school?.name || 'None',
						level: spell.level || 0
					});
				}
			});

			// @ts-ignore
			spells.set(Array.from(uniqueSpellsMap.values()));
		} catch (error) {
			console.error('Error fetching data:', error);
			alert('Failed to load spells. Please try again later.');
		}
	}

	/**
	 * @param {{ detail: { isSelected: any; }; target: any; }} event
	 */
	function handleSelectToggled(event) {
		const { isSelected } = event.detail;
		if (isSelected) {
			// @ts-ignore
			selectedSpells.update((current) => [...current, event.target]);
		} else {
			selectedSpells.update((current) => current.filter((spell) => spell !== event.target));
		}
	}

	/**
	 * @param {string} searchText
	 */
	function filterSpells(searchText) {
		const lowerCaseText = searchText.toLowerCase();
		$spells = $spells.map((spell) => {
			function matches() {
				const nameMatch = spell.name.toLowerCase().includes(lowerCaseText);
				const descMatch = spell.desc?.toLowerCase().includes(lowerCaseText);
				return nameMatch || descMatch;
			}
            spells = matches()
            return spells
		});
	}
</script>

<div class="wrapper">
	{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as level}
		<div class="spellLevel">
			<h1>Spell Level {level === 0 ? 'Cantrips' : `Spell Level ${level}`}</h1>
			<input
                bind:this={search}
				type="text"
				class="searchInput"
				placeholder={`Search Level ${level} spells by name or description...`}
			/>
			<div class="spells" id={`spellLvl${level}`}>
				{#each $spells.filter((spell) => spell.level === level) as spell}
					<Myspellitem
						name={spell.name}
						desc={spell.description}
						isSelected={false}
						on:selectToggled={handleSelectToggled}
					/>
				{/each}
			</div>
		</div>
	{/each}
</div>

<div class="selectedSpells">
	<h1>Selected Spells</h1>
	<ul id="selected">
		{#each $selectedSpells as spell}
			<li>{spell.name}</li>
		{/each}
	</ul>
</div>

<style>
	.spells {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow-y: auto;
		width: 700px;
		height: auto;
		flex-wrap: nowrap;
	}
	.wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		background-color: #d9d9d9;
		width: 100vw;
		height: 100%;
		margin: 0;
	}

	.searchInput {
		width: 80%;
		max-width: 600px;
		padding: 8px;
		box-sizing: border-box;
	}

	.spellLevel {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 700px;
		height: 300px;
		background-color: var(--button-bg);
		margin: 10px;
		padding: 10px;
		border: solid black 0.5px;
	}

	.selectedSpells {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 20px;
		background-color: var(--button-bg);
		border: solid black 0.5px;
		box-sizing: border-box;
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
