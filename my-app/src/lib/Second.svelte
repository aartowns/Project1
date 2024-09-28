<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	export let character;
	/**
	 * @type {any[]}
	 */
	let races = [];
	/**
	 * @type {any[]}
	 */
	let classes = [];
	/**
	 * @type {{ desc: any; } | null}
	 */
	let selectedClass = null;
	/**
	 * @type {{ traits: any; desc: any; } | null}
	 */
	let selectedRace = null;

	onMount(async () => {
		try {
			let page = 1;
			let moreData = true;

			while (moreData) {
				const response = await fetch(`https://api.open5e.com/v2/races/?page=${page}`);
				if (!response.ok) throw new Error('Failed to fetch races');
				const data = await response.json();

				if (data.results.length > 0) {
					const filteredRaces = data.results.filter((/** @type {{ is_subrace: any; }} */ race) => !race.is_subrace);
					races = [...races, ...filteredRaces];
					page++;
				} else {
					moreData = false;
				}
			}
			if (races.length > 0) {
				selectedRace = races[0];
			}
		} catch (error) {
			console.error('Error fetching races:', error);
		}
	});

	onMount(async () => {
		try {
			const response = await fetch('https://api.open5e.com/v1/classes/');
			if (!response.ok) throw new Error('Failed to fetch classes');
			const data = await response.json();

			classes = data.results;

			if (classes.length > 0) {
				selectedClass = classes[0];
			}
		} catch (error) {
			console.error('Error fetching classes:', error);
		}
	});

	const onRaceChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		const selected = races.find((r) => r.name === event.target.value);
		$character.Race = selected ? selected.name : '';
		$character.Traits = selected ? selected.traits : [];
		selectedRace = selected;
	};
	const onClassChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		const selected = classes.find((c) => c.name === event.target.value);
		$character.Class = selected ? selected.name : '';
		$character.ClassDesc = selected ? selected.desc : [];
		selectedClass = selected;
	};
	const getClassDescription = (/** @type {string} */ desc) => marked(desc);
	const getRaceDescription = (/** @type {string} */ desc) => marked(desc);
</script>

<div class="big-wrapper">
	<div class="wrapper">
		<div class="createOptions">
			<label class="labelPg1" for="Race">Race:</label>
			<select
				bind:value={$character.Race}
				name="Background"
				id="Background"
				style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 20px;"
				on:change={onRaceChange}
			>
				{#each races as race}
					<option value={race.name} class="option">{race.name}</option>
				{/each}
			</select>
		</div>
		{#if selectedRace}
			<div class="outside-div">
				<h3>Description:</h3>
				<div class="option-description">
					<ul>
						{#each selectedRace.traits as trait}
							<p><strong>{trait.name}</strong></p>
							<p>{@html getRaceDescription(trait.desc)}</p>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>
	<div class="wrapper">
		<div class="createOptions">
			<label class="labelPg1" for="Class">Class:</label>
			<select
				bind:value={$character.Class}
				name="Background"
				id="Background"
				style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 20px;"
				on:change={onClassChange}
			>
				{#each classes as clas}
					<option value={clas.name} class="option">{clas.name}</option>
				{/each}
			</select>
		</div>
		{#if selectedClass}
			<div class="outside-div">
				<h3>Description:</h3>
				<div class="class-description">
					<ul>
						<p>{@html getClassDescription(selectedClass.desc)}</p>
					</ul>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	p {
		font-size: 16pt;
	}
	.big-wrapper {
		width: 100vw;
		height: 100%;
		display: flex;
	}
	.wrapper {
		display: flex;
		background-color: #d9d9d9;
		width: 50vw;
		height: 100%;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin: 0;
		flex-direction: column;
	}

	.createOptions {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		min-width: 20em;
		min-height: 5em;
		max-width: 20em;
		max-height: 5em;
		background-color: var(--button-bg);
		margin: 60px;
		padding: 0;
		border: solid black 0.5px;
	}

	.labelPg1 {
		font-size: 20px;
		padding-right: 10px;
	}

	.option {
		font-size: 20px;
	}
	.option-description {
		height: 400px;
		width: 80%;
		overflow-y: auto;
		background-color: #d9d9d9;
	}
	.class-description {
		height: 400px;
		width: 80%;
		overflow-y: auto;
		background-color: #d9d9d9;
		margin: 2%;
	}
	.outside-div {
		display: flex;
		flex-direction: column;
		width: 90%;
		height: 500px;
		background-color: var(--button-bg);
		justify-content: center;
		align-items: center;
		padding: 15px;
	}
</style>
