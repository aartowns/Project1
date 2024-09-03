<script>
	import { onMount } from 'svelte';

	let search = '';
	let featsArray = [];
	let selectedFeats = [];

	onMount(async () => {
		await loadFeats();
	});

	async function loadFeats() {
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
			console.log('Loaded feats:', featsArray);
		} catch (error) {
			console.error('Error loading feats:', error);
			alert('Failed to load feats. Please try again later.');
		}
	}

	function filterFeats() {
		const lowerCaseText = search.toLowerCase();
		return featsArray.filter(
			(feat) =>
				feat.name.toLowerCase().includes(lowerCaseText) ||
				feat.desc.toLowerCase().includes(lowerCaseText)
		);
	}

	function toggleFeat(featName) {
		if (selectedFeats.includes(featName)) {
			selectedFeats = selectedFeats.filter((name) => name !== featName);
		} else {
			selectedFeats = [...selectedFeats, featName];
		}
	}

	$: filteredFeats = filterFeats();
	$: selectedFeatsData = featsArray.filter((feat) => selectedFeats.includes(feat.name));

	function toggleDescription(featName) {
		const listItem = document.getElementById(featName);
		if (listItem) {
			listItem.classList.toggle('show-description');
		}
	}
</script>

<header>
	<div class="header">
		<a class="pageLink" href="/">Home</a>
	</div>
</header>
<div class="menu">
	<div class="menuOption">
		<a class="pageLink" href="charcreator1">Character Creator</a>
	</div>
	<div class="menuOption">
		<a class="pageLink" href="../Char">Characters</a>
	</div>
</div>
<div class="nextBack">
	<div class="back">
		<a class="nextBackLink" href="charcreator3">Back</a>
	</div>
	<div class="next">
		<a class="nextBackLink" href="charcreator5">Next</a>
	</div>
</div>
<div style="display: flex; flex-direction: row; text-align: center;">
	<div class="container">
		<div class="scrollable-container selected-feats-container">
			<h1>Selected Feats</h1>
			<div>
				<ul>
					{#each selectedFeatsData as feat}
						<li>{feat.name}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="scrollable-container all-feats-container">
			<div style="justify-content: center;">
				<h1>All Feats</h1>
				<input
					type="search"
					bind:value={search}
					class="searchInput"
					placeholder="Search feats..."
				/>
				<div style="text-align: center;">
					<ul id="resultList">
						{#each featsArray as feat}
							{#if feat.name.toLowerCase().includes(search.toLowerCase()) || feat.desc
									.toLowerCase()
									.includes(search.toLowerCase())}
								<li id={feat.name}>
									<button
										class="feat-button"
										aria-expanded={selectedFeats.includes(feat.name)}
										aria-controls={feat.name}
										on:click={() => toggleDescription(feat.name)}
									>
										<input
											type="checkbox"
											class="searchInput"
											checked={selectedFeats.includes(feat.name)}
											on:change={() => toggleFeat(feat.name)}
										/>
										{feat.name}
									</button>
									<p id={feat.name} class:hidden={!selectedFeats.includes(feat.name)}>
										{feat.desc}
									</p>
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
	.scrollable-container {
		height: 100%;
		overflow-y: auto;
		padding: 10px;
		box-sizing: border-box;
	}

	.all-feats-container {
		height: 800px;
	}

	.selected-feats-container {
		height: 800px;
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

	#resultList li {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #f9f9f9;
		transition: background-color 0.3s ease;
	}

	#resultList li:hover {
		background-color: #999aad;
	}

	.feat-button {
		all: unset;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		text-align: center;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: text-decoration 0.3s;
		padding: 0;
		margin: 0;
	}

	.feat-button > * {
		margin: 0 5px;
	}

	.feat-button:hover {
		text-decoration: underline;
		color: #d40b0b;
	}

	.searchInput {
		margin-right: 10px;
	}

	p {
		display: none;
		margin: 5px 0 0 0;
		padding: 5px;
		font-size: 14px;
		color: black;
		background-color: #f0f0f0;
		border: 1px solid #ddd;
	}

	#resultList li.show-description p {
		display: block;
	}

	.searchInput {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
		margin-bottom: 10px;
	}

	.header {
		background-color: #d40b0b;
		width: 100vw;
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		font-size: 60px;
		border: solid black 0.5px;
		border-bottom: 0.25px;
	}

	.menu {
		width: 100vw;
		height: 100px;
		display: flex;
		background-color: #999aad;
		justify-content: center;
		align-items: center;
	}

	.menuOption {
		display: flex;
		border: solid black 0.5px;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50vw;
		font-size: 40px;
		border-bottom: 0.25px;
	}

	.pageLink {
		text-decoration: none;
		color: black;
	}

	.pageLink:hover {
		text-decoration: underline;
		color: cyan;
	}

	.nextBack {
		width: 100vw;
		height: 5em;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #999aad;
	}

	.back,
	.next {
		display: flex;
		border: solid black 0.5px;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50vw;
		font-size: 40px;
	}

	.nextBackLink {
		text-decoration: none;
		color: black;
	}

	.nextBackLink:hover {
		text-decoration: underline;
		color: cyan;
	}
</style>
