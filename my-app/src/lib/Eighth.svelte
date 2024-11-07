<script>
	import { marked } from 'marked';
	/**
	 * @type {any}
	 */
	export let character;
	let slot = 1;
	let showClass = false;
	let showRace = false;
	let showSkills = false;
	let showFeats = false;
	let showSpells = false;
	let showBackground = false;
	let showArchetype = false;
	let showSubrace = false;

	function saveCharacter() {
		const characterData = JSON.stringify($character);
		console.log(characterData);
		localStorage.setItem('character' + slot, characterData);
		alert('Character Saved!');
	}
	const getBackgroundDesc = (/** @type {string} */ desc) => marked(desc);
	const getClassDescription = (/** @type {string} */ desc) => marked(desc);
	const getRaceDescription = (/** @type {string} */ desc) => marked(desc);
	const getSubRaceDescription = (/** @type {string} */ desc) => marked(desc);
	const getArchetypeDescription = (/** @type {string} */ desc) => marked(desc);
</script>

<div class="wrapper">
	<div class="save">
		<div class="save-slot">
			<select
				style="width:100%; background-color: var(--button-bg); border: solid black 1px; font-size: 2vh;"
				name="slot"
				id="slot"
				bind:value={slot}
			>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
			</select>
		</div>
		<div class="save-button">
			<button
				style="margin:0%; width: 100%; height: 100%;
height: 100%;
font-size: 2vh;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
background-color: var(--button-bg);"
				on:click={saveCharacter}
			>
				Save Character</button
			>
		</div>
	</div>
	<div class="header">
		<h2>Name: {$character.Name}</h2>
		<h2>Level: {$character.Level}</h2>
		<h2>Race: {$character.Race}</h2>
		<h2>Class: {$character.Class}</h2>
		<h2>Background: {$character.Background}</h2>
		<h2>Hitpoints: {$character.RolledHitpoints}</h2>
	</div>
	<div class="attributes">
		<h2>Strength: {$character.Strength}</h2>
		<h2>Dexterity: {$character.Dexterity}</h2>
		<h2>Constitution: {$character.Constitution}</h2>
		<h2>Intelligence: {$character.Intelligence}</h2>
		<h2>Wisdom: {$character.Wisdom}</h2>
		<h2>Charisma: {$character.Charisma}</h2>
	</div>
	<div class="buttons">
		
		
		<div class="charOption">
			<button
				on:click={() => (showBackground = !showBackground)}
				style="margin:0%; width: 100%; height: 100%;
    font-size: 2vh;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: var(--button-bg);">{$character.Background}</button
			>
			{#if showBackground}
				<div class="content">
					<h3>Description:</h3>

					{#each $character.Benefits as benefit}
						<p><strong>{benefit.name}</strong> {@html getBackgroundDesc(benefit.desc)}</p>
					{/each}
				</div>
			{/if}
		</div>
		<div class="charOption">
			<button
				on:click={() => (showSkills = !showSkills)}
				style="margin:0%; width: 100%; height: 100%;
    font-size: 2vh;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: var(--button-bg);">Skills</button
			>
			{#if showSkills}
				<div class="content" style="text-align: center;">
					{#each $character.ProficientSkills as skill}
						<li><strong>{skill}</strong></li>
					{/each}
				</div>
			{/if}
		</div>
		<div class="charOption">
			<button
				on:click={() => (showFeats = !showFeats)}
				style="margin:0%; width: 100%; height: 100%;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);">Feats</button
			>
			{#if showFeats}
				<div class="content">
					{#each $character.chosenFeats as feat}
						<li><strong>{feat.name}</strong></li>
						<p>{feat.description}</p>
					{/each}
				</div>
			{/if}
		</div>
		<div class="charOption">
			<button
				on:click={() => (showSpells = !showSpells)}
				style="margin:0%; width: 100%; height: 100%;
font-size: 2vh;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
background-color: var(--button-bg);">Spells</button
			>
			{#if showSpells}
				<div class="content">
					{#each $character.chosenSpells as spell}
						<li><strong>{spell.name}</strong></li>
						<p>{spell.description}</p>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="buttons">
		<div class="charOption">
			<button
				on:click={() => (showRace = !showRace)}
				style="margin:0%; width: 100%; height: 100%;
    font-size: 2vh;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: var(--button-bg);">{$character.Race}</button
			>
			{#if showRace}
				<div class="content">
					<h3>Description:</h3>

					{#each $character.Traits as trait}
						<p><strong>{trait.name}</strong></p>
						<p>{@html getRaceDescription(trait.desc)}</p>
					{/each}
				</div>
			{/if}
		</div>
		<div class="charOption">
			<button
				on:click={() => (showClass = !showClass)}
				style="margin:0%; width: 100%; height: 100%;
    font-size: 2vh;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: var(--button-bg);">{$character.Class}</button
			>
			{#if showClass}
				<div class="content">
					<h3>Description:</h3>

					<p>{@html getClassDescription($character.ClassDesc)}</p>
				</div>
			{/if}
		</div>
		<div class="charOption">
			<button
				on:click={() => (showSubrace = !showSubrace)}
				style="margin:0%; width: 100%; height: 100%;
    font-size: 2vh;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: var(--button-bg);">{$character.SubRace}</button
			>
			{#if showSubrace}
				<div class="content">
					<h3>Description:</h3>

					{#each $character.SubTraits as SubTrait}
						<p><strong>{SubTrait.name}</strong></p>
						<p>{@html getSubRaceDescription(SubTrait.desc)}</p>
					{/each}
				</div>
			{/if}
		</div>
		<div class="charOption">
			<button
				on:click={() => (showArchetype = !showArchetype)}
				style="margin:0%; width: 100%; height: 100%;
    font-size: 2vh;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    background-color: var(--button-bg);">{$character.Archetype}</button
			>
			{#if showArchetype}
				<div class="content">
					<h3>Description:</h3>

					
						<p>{@html getArchetypeDescription($character.ArchetypeDesc)}</p>
					
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.charOption {
		height: 10vh;
		width: 25vw;
	}
	.content {
		overflow-y: auto;
		max-height: 20vh;
		width: 22.5vw;
		padding-left: 1vw;
		padding-right: 1vw;
	}
	.wrapper {
		background-color: #d9d9d9;
		border: var(--button-selected) 5px solid;
		height: 100%;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	h2 {
		padding-right: 2vw;
		font-size: 2vh;
	}

	.attributes {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		height: 30vh;
		
	}

	.save {
		display: flex;
		justify-content: center;
		flex-direction: column-reverse;
		align-items: center;
		width: 100%;
	}

	.save-button {
		padding: 20px;
		padding-bottom: 0px;
		margin: 0px;
		width: 50vw;
		height: 10vh;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.save-slot {
		padding-bottom: 20px;
		width: 20vw;
		height: 5vh;
	}

	button:hover {
		color: cyan;
	}

	li {
		font-size: 1.5vh;
		list-style: none;
	}
	p {
		font-size: 1.5vh;
	}
	h3 {
		font-size: 1.5vh;
	}
</style>
