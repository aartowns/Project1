<script>
	import { onMount } from 'svelte';

	/**
	 * @type {{ Name: any; Level: any; Race: any; Class: any; RolledHitpoints: any; Strength: any; Dexterity: any; Constitution: any; Intelligence: any; Wisdom: any; Charisma: any; Background: any; Benefits: any; ProficientSkills: any; chosenFeats: any; chosenSpells: any; }}
	 */
	let localCharacter;
	/**
	 * @type {string}
	 */
	export let slot;
	let showSkills = false;
	let showFeats = false;
	let showSpells = false;
	let showBackground = false;

	function getCharacterInfo() {
		const savedCharacter = localStorage.getItem('character' + slot);
		if (savedCharacter) {
			localCharacter = JSON.parse(savedCharacter);
		} else {
			console.log('No Saved Character Found');
		}
	}

	onMount(() => {
		getCharacterInfo();
	});
</script>

{#if localCharacter}
	<div class="wrapper">
		<div class="header">
			<h2>Name: {localCharacter.Name}</h2>
			<h2>Level: {localCharacter.Level}</h2>
			<h2>Race: {localCharacter.Race}</h2>
			<h2>Class: {localCharacter.Class}</h2>
			<h2>Hitpoints: {localCharacter.RolledHitpoints}</h2>
		</div>
		<div class="attributes">
			<h2>Strength: {localCharacter.Strength}</h2>
			<h2>Dexterity: {localCharacter.Dexterity}</h2>
			<h2>Constitution: {localCharacter.Constitution}</h2>
			<h2>Intelligence: {localCharacter.Intelligence}</h2>
			<h2>Wisdom: {localCharacter.Wisdom}</h2>
			<h2>Charisma: {localCharacter.Charisma}</h2>
		</div>
		<div class="buttons">
			<div class="background">
				<button
					on:click={() => (showBackground = !showBackground)}
					style="margin:0%; width: 100%;
		height: 100%;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);"><strong>Background</strong></button
				>
				{#if showBackground}
					<div class="background-content">
						<h2>{localCharacter.Background}</h2>
						<h3>Description:</h3>
						<ul>
							{#each localCharacter.Benefits as benefit}
								<li><strong>{benefit.name}: </strong>{benefit.desc}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
			<div class="skills">
				<button
					on:click={() => (showSkills = !showSkills)}
					style="margin:0%; width: 100%;
		height: 100%;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);"><strong>Skills</strong></button
				>
				{#if showSkills}
					<div class="skill-content">
						<ul>
							{#each localCharacter.ProficientSkills as skill}
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
			font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
			background-color: var(--button-bg);"><strong>Feats</strong></button
				>
				{#if showFeats}
					<div class="feat-content">
						<ul>
							{#each localCharacter.chosenFeats as feat}
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
	font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	background-color: var(--button-bg);"><strong>Spells</strong></button
				>
				{#if showSpells}
					<div class="spell-content">
						<ul>
							{#each localCharacter.chosenSpells as spell}
								<li><strong>{spell.name}</strong></li>
								<p>{spell.description}</p>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
		<div class="buttons">
			
		</div>
	</div>
	{/if}
<style>
	.wrapper {
		background-color: #d9d9d9;
		border: var(--button-selected) 5px solid;
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
		padding-top: 20px;
		margin: 0px;
		width: 25%;
		height: 20em;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.skills {
		padding-top: 20px;
		margin: 0px;
		width: 25%;
		height: 4em;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.feats {
		padding-top: 20px;
		width: 25%;
		height: 4em;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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
	.background {
		padding-top: 20px;
		margin: 0px;
		width: 25%;
		height: 4em;
		max-height: 4em;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	}

	.background-content {
		overflow-y: auto;
		height: 20em;
	}
</style>