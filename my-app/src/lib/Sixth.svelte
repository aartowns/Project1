<script>
	/**
	 * @type {any}
	 */
	export let character;
	let slot = 1;
	let showSkills = false;
	let showFeats = false;
	let showSpells = false;
	function saveCharacter() {
		const characterData = JSON.stringify($character);
		console.log(characterData);
		localStorage.setItem('character' + slot, characterData);
		alert('Character Saved!');
	}
</script>

<div class="wrapper">
	<div class="save">
		<div class="save-slot">
			<select style="width:100%; background-color: var(--button-bg); border: solid black 1px;" name="slot" id="slot" bind:value={slot}>
				<option value={1}>1</option>
				<option value={2}>2</option>
				<option value={3}>3</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
			</select>
		</div>
		<div class="save-button">
			<button
				style="margin:0%; width: 100%;
height: 100%;
font-size: 16pt;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
		<h2>Hitpoints: {$character.RolledHitpoints}</h2>
		<h2>Background: {$character.Background}</h2>
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
		<div class="skills">
			<button
				on:click={() => (showSkills = !showSkills)}
				style="margin:0%; width: 100%;
    height: 100%;
    font-size: 16pt;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    background-color: var(--button-bg);">Skills</button
			>
			{#if showSkills}
				<div class="skill-content">
					<ul>
						{#each $character.ProficientSkills as skill}
							<li><strong>{skill}</strong></li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div class="feats">
			<button
				on:click={() => (showFeats = !showFeats)}
				style="margin:0%; width: 100%;
		height: 100%;
		font-size: 16pt;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		background-color: var(--button-bg);">Feats</button
			>
			{#if showFeats}
				<div class="feat-content">
					<ul>
						{#each $character.chosenFeats as feat}
							<li><strong>{feat.name}</strong></li>
							<p>{feat.description}</p>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
		<div class="spells">
			<button
				on:click={() => (showSpells = !showSpells)}
				style="margin:0%; width: 100%;
height: 4em;
font-size: 16pt;
font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
background-color: var(--button-bg);">Spells</button
			>
			{#if showSpells}
				<div class="spell-content">
					<ul>
						{#each $character.chosenSpells as spell}
							<li><strong>{spell.name}</strong></li>
							<p>{spell.description}</p>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.wrapper {
		background-color: white;
		border: var(--button-selected) 1px solid;
		height: 100vh;
	}

	.header {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	h2 {
		padding-right: 30px;
	}

	.attributes {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}

	.spells {
		padding: 20px;
		margin: 0px;
		width: 20%;
		height: 20em;
		font-size: 16pt;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}

	.skills {
		padding: 20px;
		margin: 0px;
		width: 20%;
		height: 4em;
		font-size: 16pt;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}

	.feats {
		padding: 20px;
		width: 20%;
		height: 4em;
		font-size: 16pt;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
		width: 20%;
		height: 4em;
		font-size: 16pt;
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
	}

	.save-slot {
		padding-bottom: 20px;
        width: 5%;
	}

	.spell-content {
		overflow-y: auto;
		height: 20em;
	}

	.feat-content {
		overflow-y: auto;
		height: 20em;
	}

	.skill-content {
		overflow-y: auto;
		height: 20em;
	}

	button:hover {
		color: cyan;
	}
</style>
