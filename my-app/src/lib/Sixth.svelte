<script>
	import Mylistitem from '$lib/Mylistitem.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	export let character;

	/**
	 * @type {HTMLInputElement}
	 */
	let search;

	/**
	 * @type {HTMLUListElement}
	 */
	let allFeats;

	/**
	 * @type {HTMLUListElement}
	 */
	let selectedFeats;

	let featsArray = writable([]);

	/**
	 * Load feats from the API and populate the lists.
	 */
	async function loadFeats() {
		try {
			/**
			 * @type {any}
			 */
			let data = { next: 'https://api.open5e.com/v2/feats/' };
			do {
				let resp = await fetch(data.next);
				data = await resp.json();
				data.results = data.results.map((/** @type {any} */ result) => {
					return {
						...result,
						isSelected: false,
						isShown: true
					};
				});
				$featsArray = [...$featsArray, ...data.results];
			} while (data.next);
		} catch (error) {
			console.error('Error loading feats:', error);
		}
	}

	function onChangeFeat() {
		$character.chosenFeats = getSelectedFeats().map((feat) => ({
			name: feat.name,
			description: feat.desc
		}));
	}

	function getSelectedFeats() {
		return $featsArray.filter((feat) => {
			return feat.isSelected;
		});
	}

	/**
	 * Filter feats based on the search text.
	 * @param {string} searchText
	 */
	function filterFeats(searchText) {
		const lowerCaseText = searchText.toLowerCase();
		$featsArray = $featsArray.map((feat) => {
			function matches() {
				const nameMatch = feat.name.toLowerCase().includes(lowerCaseText);
				const descMatch = feat.desc?.toLowerCase().includes(lowerCaseText);
				return nameMatch || descMatch;
			}
			feat.isShown = matches();
			return feat;
		});
	}

	onMount(() => {
		loadFeats();

		search.addEventListener('input', () => {
			filterFeats(search.value);
		});
	});
</script>

<div style="display: flex; flex-direction: row; text-align: center;">
	<div class="container">
		<div class="scrollable-container" style="margin-top: 2.5vh;">
			<div
				style="background-color: var(--button-bg); display: flex; flex-direction: column; justify-content: center; "
			>
				<h1>Selected Feats</h1>
				<div style="text-align: center; justify-content: center; margin: 1vh; padding-bottom: 1vh;">
					<ul bind:this={selectedFeats} id="selected">
						{#each $featsArray as feat}
							{#if feat.isSelected}
								<li>
									<Mylistitem
										name={feat.name}
										desc={feat.desc}
										isSelected={feat.isSelected}
										on:selectToggled={(ev) => {
											feat.isSelected = ev.detail.isSelected;
											onChangeFeat();
										}}
									></Mylistitem>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="scrollable-container">
			<div style="justify-content: center; background-color: var(--button-bg); align-items:center; ">
				<h1>All Feats</h1>
				<input
					bind:this={search}
					type="search"
					placeholder="Search..."
					name="feat"
					id="searchField"
					style="width: 15vh"
				/>
				<div style="text-align: center; justify-content: center; margin: 1vh; padding-bottom: 1vh;">
					<ul bind:this={allFeats} id="resultList">
						{#each $featsArray as feat}
							{#if !feat.isSelected && feat.isShown}
								<li>
									<Mylistitem
										name={feat.name}
										desc={feat.desc}
										isSelected={feat.isSelected}
										on:selectToggled={(ev) => {
											feat.isSelected = ev.detail.isSelected;
											onChangeFeat();
										}}
									></Mylistitem>
								</li>
							{/if}
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	h1 {
		font-size: 4vh;
	}
	li {
		font-size: 2vh;
	}
	.scrollable-container {
		height: 50vh;
		overflow-y: auto;
		padding: 1vh;
		box-sizing: border-box;
	}

	.container {
		width: 50vw;
		padding: 1vh;
		box-sizing: border-box;
	}

	#selected {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	#resultList {
		list-style: none;
		padding: 0;
		margin: 0;
	}
</style>
