<script>
	import { onMount } from 'svelte';

	/**
	 * The search input element for filtering feats.
	 * @type {HTMLInputElement}
	 */
	let search;

	/**
	 * The unordered list element where all feats are displayed.
	 * @type {HTMLUListElement}
	 */
	let allFeats;

	/**
	 * The unordered list element where selected feats are displayed.
	 * @type {HTMLUListElement}
	 */
	let selectedFeats;

	/**
	 * Array to hold all fetched feats.
	 * @type {any[]}
	 */
	let featsArray = [];

	/**
	 * Fetch feats from the API and return them.
	 * @returns {Promise<any[]>} A promise that resolves to an array of feats.
	 */
	async function fetchFeats() {
		try {
			let resp = await fetch('https://api.open5e.com/v2/feats/');
			let data = await resp.json();
			let feats = [...data.results];

			while (data.next) {
				resp = await fetch(data.next);
				data = await resp.json();
				feats.push(...data.results);
			}

			featsArray = feats;
			return feats;
		} catch (error) {
			console.error('Error fetching feats:', error);
			alert('Failed to load feats. Please try again later.');
			return [];
		}
	}

	/**
	 * Create and append feat list items to the `allFeats` element.
	 * @param {any[]} feats - Array of feat objects to display.
	 */
	function createFeatsDOM(feats) {
		if (!allFeats) {
			console.error('allFeats element is not bound or initialized.');
			return;
		}

		// Clear existing list
		allFeats.innerHTML = '';

		feats.forEach((feat) => {
			const li = document.createElement('li');
			const checkbox = document.createElement('input');
			const descElem = document.createElement('p');

			checkbox.type = 'checkbox';
			checkbox.classList.add('feat-checkbox');
			checkbox.addEventListener('change', () => {
				if (checkbox.checked) {
					allFeats.removeChild(li);
					selectedFeats.appendChild(li);
				} else {
					selectedFeats.removeChild(li);
					allFeats.appendChild(li);
				}
			});

			descElem.textContent = feat.desc;
			descElem.classList.add('hidden');

			li.id = feat.name;
			li.textContent = feat.name;
			li.prepend(checkbox);
			li.appendChild(descElem);

			li.addEventListener('click', (event) => {
				if (event.target !== checkbox) {
					descElem.classList.toggle('hidden');
				}
			});

			allFeats.appendChild(li);
		});
	}

	/**
	 * Filter feats based on the search text.
	 * @param {string} searchText - The text to filter feats by.
	 */
	function filterFeats(searchText) {
		if (!allFeats) {
			console.error('allFeats element is not bound or initialized.');
			return;
		}

		const lowerCaseText = searchText.toLowerCase();
		featsArray.forEach((feat) => {
			const li = document.getElementById(feat.name);
			if (li) {
				if (
					feat.name.toLowerCase().includes(lowerCaseText) ||
					feat.desc.toLowerCase().includes(lowerCaseText)
				) {
					li.classList.remove('hidden');
				} else {
					li.classList.add('hidden');
				}
			}
		});
	}

	onMount(async () => {
		if (!search || !allFeats || !selectedFeats) {
			console.error('One or more bound elements are not available.');
			return;
		}

		const feats = await fetchFeats();
		createFeatsDOM(feats);

		if (search) {
			search.addEventListener('input', () => {
				filterFeats(search.value);
			});
		} else {
			console.error('Search input element not found.');
		}
	});
</script>

<div style="display: flex; flex-direction: row; text-align: center;">
	<div class="container">
		<div>
			<h1>Selected Feats</h1>
			<div>
				<ul bind:this={selectedFeats} id="selected"></ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="scrollable-container">
			<div style="justify-content: center;">
				<h1>All Feats</h1>
				<input
					bind:this={search}
					type="text"
					placeholder="Search..."
					name="feat"
					id="searchField"
				/>
				<div style="text-align: center;">
					<ul
						bind:this={allFeats}
						id="resultList"
						style="overflow-y: scroll; list-style: none;"
					></ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.scrollable-container {
		height: 100%;
		overflow-y: auto;
		padding: 10px;
		box-sizing: border-box;
	}

	.container {
		width: 50%;
		padding: 10px;
		box-sizing: border-box;
	}

	#resultList {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.hidden {
		display: none;
	}

	li:hover {
		color: #d40b0b;
		cursor: pointer;
	}
</style>
