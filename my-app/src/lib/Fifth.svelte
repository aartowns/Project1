<script>
	import Mylistitem from '$lib/Mylistitem.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { get } from 'svelte/store';

	export let character;

	let spells = writable([]);

	let selectedSpells = writable([]);

	/**
	 * @type {HTMLInputElement}
	 */
	let search;

	let filteredSpells = writable([]);

	onMount(() => {
		getSpells();
		spells.subscribe((allSpells) => {
			filteredSpells.set(allSpells);
		});
		search.addEventListener('input', () => {
			filterSpells();
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
						level: spell.level || 0
					});
				}
			});

			// @ts-ignore
			spells.set(Array.from(uniqueSpellsMap.values()));

			// @ts-ignore
			filteredSpells.set(Array.from(uniqueSpellsMap.values()));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	/**
	 * @param {CustomEvent<any>} event
	 */
	function handleSelectToggled(event) {
		const { isSelected, name } = event.detail;

		if (isSelected) {
			// @ts-ignore
			selectedSpells.update((current) => {
				const spell = $spells.find((spell) => spell.name === name);
				// @ts-ignore
				if (spell && !current.includes(spell)) {
					return [...current, spell];
				}
				return current;
			});
		} else {
			selectedSpells.update((current) => {
				// @ts-ignore
				return current.filter((spell) => spell.name !== name);
			});
		}

		onChangeSpell();
	}

	function onChangeSpell() {
		selectedSpells.subscribe((spells) => {
			$character.chosenSpells = spells;
		})();
	}

	/**
	 * @type {string}
	 */
	let searchText;
	function filterSpells() {
		const lowerCaseText = searchText.toLowerCase();
		console.log(lowerCaseText);
		/**
		 * @type {any[]}
		 */
		const allSpells = get(spells);

		const filtered = allSpells.filter((spell) => {
			const nameMatch = spell.name.toLowerCase().includes(lowerCaseText);
			const descMatch = spell.description.toLowerCase().includes(lowerCaseText);
			return nameMatch || descMatch;
		});
		console.log('filtered spells:', filtered);

		// @ts-ignore
		filteredSpells.set(filtered);
	}
</script>

<div class="wrapper">
	<div class="selectedSpells">
		<h1>Selected Spells</h1>
		<ul id="selected">
			{#each $selectedSpells as spell}
				<Mylistitem
					name={spell.name}
					desc={spell.description}
					isSelected={true}
					on:selectToggled={(event) => handleSelectToggled(event)}
				/>
			{/each}
		</ul>
	</div>

	{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as level}
		<div class="spellLevel">
			<h1>{level === 0 ? 'Cantrips' : `Spell Level ${level}`}</h1>
			<input
				bind:this={search}
				bind:value={searchText}
				type="text"
				class="searchInput"
				placeholder={`Search Level ${level} spells by name or description...`}
				on:input={() => filterSpells()}
			/>
			<div class="spells" id={`spellLvl${level}`}>
				{#each $filteredSpells.filter((spell) => spell.level === level) as spell}
					<Mylistitem
						name={spell.name}
						desc={spell.description}
						isSelected={false}
						on:selectToggled={(event) => handleSelectToggled(event)}
					/>
				{/each}
			</div>
		</div>
	{/each}
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
