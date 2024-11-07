<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import { page } from '$app/stores';
	export let character;
	/**
	 * @type {any[]}
	 */
	let races = [];
	/**
	 * @type {any[]}
	 */
	let subRaces = [];
	/**
	 * @type {any[]}
	 */
	let classes = [];
	/**
	 * @type {any[]}
	 */
	let archetypes = [];
	/**
	 * @type {{ desc: any; } | null}
	 */
	let selectedClass = null;
	/**
	 * @type {{ traits: any; desc: any; } | null}
	 */
	let selectedRace = null;
	/**
	 * @type {{ traits: any; desc: any; } | null}
	 */
	let selectedSubRace = null;

	/**
	 * @type {{ desc: any; } | null}
	 */
	let selectedArchetype = null;

	onMount(async () => {
		try {
			let page = 1;
			let moreData = true;

			while (moreData) {
				const response = await fetch(`https://api.open5e.com/v2/races/?page=${page}`);
				if (!response.ok) throw new Error('Failed to fetch races');
				const data = await response.json();

				if (data.results.length > 0) {
					const filteredRaces = data.results.filter(
						(/** @type {{ is_subrace: any; }} */ race) => !race.is_subrace
					);
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
			let page = 1;
			let moreData = true;

			while (moreData) {
				const response = await fetch(`https://api.open5e.com/v2/races/?page=${page}`);
				if (!response.ok) throw new Error('Failed to fetch races');
				const data = await response.json();

				if (data.results.length > 0) {
					const filteredSubRaces = data.results.filter(
						(/** @type {{ is_subrace: any; }} */ race) => race.is_subrace
					);
					subRaces = [...subRaces, ...filteredSubRaces];
					page++;
				} else {
					moreData = false;
				}
			}
			if (subRaces.length > 0) {
				selectedSubRace = subRaces[0];
			}
		} catch (error) {
			console.error('Error fetching subraces:', error);
		}
	});

	onMount(async () => {
		try {
			const response = await fetch('https://api.open5e.com/v1/classes/');
			if (!response.ok) throw new Error('Failed to fetch classes');
			const data = await response.json();

			classes = [...data.results, ...classes];

			
		} catch (error) {
			console.error('Error fetching classes:', error);
		}
	});

	onMount(async () => {
    try {
      const response = await fetch('https://api.open5e.com/v1/classes/');
      if (!response.ok) throw new Error('Failed to fetch classes');
      const data = await response.json();

      classes = data.results;
      archetypes = [];

	  
      classes.forEach((clas) => {
        if (clas.archetypes && clas.archetypes.length > 0) {
          archetypes = [...archetypes, ...clas.archetypes];
        }
      });

      

    } catch (error) {
      console.error('Error fetching classes and archetypes:', error);
    }
  });

	const onSubRaceChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		const selected = subRaces.find((r) => r.name === event.target.value);
		$character.SubRace = selected ? selected.name : '';
		$character.SubTraits = selected ? selected.traits : [];
		selectedSubRace = selected;
	};

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
	const onArchetypeChange = (/** @type {{ target: { value: any; }; }} */ event) => {
    const selected = archetypes.find((a) => a.name === event.target.value);
    $character.Archetype = selected ? selected.name : '';
    $character.ArchetypeDesc = selected ? selected.desc : [];
    selectedArchetype = selected;
  };
	const getClassDescription = (/** @type {string} */ desc) => marked(desc);
	const getRaceDescription = (/** @type {string} */ desc) => marked(desc);
	const getSubRaceDescription = (/** @type {string} */ desc) => marked(desc);
	const getArchetypeDescription = (/** @type {string} */ desc) => marked(desc);
</script>

<div class="big-wrapper">
	<div class="wrapper">
		<div class="createOptions">
			<label class="labelPg1" for="Race">Race:</label>
			<select
				bind:value={$character.Race}
				name="Background"
				id="Background"
				style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 30vw;"
				on:change={onRaceChange}
			>
				{#each races as race}
					<option value={race.name} class="option">{race.name}</option>
				{/each}
			</select>
		</div>
		{#if selectedRace}
			<div class="outside-div">
				<h3>Race Description:</h3>
				<div class="option-description">
					{#each selectedRace.traits as trait}
						<p><strong>{trait.name}</strong></p>
						<p>{@html getRaceDescription(trait.desc)}</p>
					{/each}
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
				style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 30vw;"
				on:change={onClassChange}
			>
				{#each classes as clas}
					<option value={clas.name} class="option">{clas.name}</option>
				{/each}
			</select>
		</div>
		{#if selectedClass}
			<div class="outside-div">
				<h3>Class Description:</h3>
				<div class="class-description">
					<p>{@html getClassDescription(selectedClass.desc)}</p>
				</div>
			</div>
		{/if}
	</div>
</div>
<div class="big-wrapper">
	<div class="wrapper">
		<div class="createOptions">
			<label class="labelPg1" for="SubRace">Subrace:</label>
			<select
				bind:value={$character.SubRace}
				name="SubRace"
				id="SubRace"
				style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 30vw;"
				on:change={onSubRaceChange}
			>
				{#each subRaces as subrace}
					<option value={subrace.name} class="option">{subrace.name}</option>
				{/each}
			</select>
		</div>
		{#if selectedSubRace}
			<div class="outside-div">
				<h3>Subrace Description:</h3>
				<div class="option-description">
					{#each selectedSubRace.traits as trait}
						<p><strong>{trait.name}</strong></p>
						<p>{@html getSubRaceDescription(trait.desc)}</p>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="wrapper">
	<div class="createOptions">
		<label class="labelPg1" for="Archetype">Archetype:</label>
		<select
		  bind:value={$character.Archetype}
		  name="Archetype"
		  id="Archetype"
		  style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 30vw;"
		  on:change={onArchetypeChange}
		>
		  {#each archetypes as archetype}
			<option value={archetype.name} class="option">{archetype.name}</option>
		  {/each}
		</select>
	  </div>
  
	  {#if selectedArchetype}
		<div class="outside-div">
		  <h3>Archetype Description:</h3>
		  <div class="option-description">
			
			  <p>{@html getArchetypeDescription(selectedArchetype.desc)}</p>
			
		  </div>
		</div>
	  {/if}
	</div>
</div>

<style>
	label {
		font-size: 2vh;
	}
	h3 {
		font-size: 2vh;
	}
	p {
		font-size: 1.5vh;
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
		width: 50vw;
		height: 10vh;
		background-color: var(--button-bg);
		margin: 2vh;
		padding: 0;
		border: solid black 0.5px;
	}

	.labelPg1 {
		padding-right: 2vw;
	}
	.option-description {
		height: 32vh;
		width: 40vw;
		overflow-y: auto;
		background-color: #d9d9d9;
		margin: 2%;
		border: black .25px solid;
		padding: 1vh;
	}
	.class-description {
		height: 32vh;
		width: 40vw;
		overflow-y: auto;
		background-color: #d9d9d9;
		margin: 2%;
		border: black .25px solid;
		padding: 1vh;
	}
	.outside-div {
		display: flex;
		flex-direction: column;
		width: 50vw;
		height: 36vh;
		background-color: var(--button-bg);
		justify-content: center;
		align-items: center;
		padding: 15px;
	}
</style>
