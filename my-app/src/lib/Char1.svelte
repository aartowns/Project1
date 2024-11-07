<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	
	/**
	 * @type {{ Name: any; Level: any; Race: any; Class: any; Background: any; RolledHitpoints: any; Strength: any; Dexterity: any; Constitution: any; Intelligence: any; Wisdom: any; Charisma: any; Benefits: any; ProficientSkills: any; chosenFeats: any; chosenSpells: any; Traits: any; ClassDesc: string; SubRace: any; SubTraits: any; Archetype: any; ArchetypeDesc: string; }}
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
	let showRace = false;
	let showClass = false;
	let showArchetype = false;
	let showSubrace = false;

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
	const getClassDescription = (/** @type {string} */ desc) => marked(desc);
	const getRaceDescription = (/** @type {string} */ desc) => marked(desc);
	const getBackgroundDesc = (/** @type {string} */ desc) => marked(desc);
	const getSubRaceDescription = (/** @type {string} */ desc) => marked(desc);
	const getArchetypeDescription = (/** @type {string} */ desc) => marked(desc);
</script>

{#if localCharacter}
	<div class="wrapper">
		<div class="header">
			<h2>Name: {localCharacter.Name}</h2>
			<h2>Level: {localCharacter.Level}</h2>
			<h2>Race: {localCharacter.Race}</h2>
			<h2>Class: {localCharacter.Class}</h2>
			<h2>Background: {localCharacter.Background}</h2>
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
			
			<div class="charOption">
				<button
					on:click={() => (showBackground = !showBackground)}
					style="margin:0%; width: 100%;
		height: 100%;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);">{localCharacter.Background}</button
				>
				{#if showBackground}
					<div class="content">
						<h3>Description:</h3>

						{#each localCharacter.Benefits as benefit}
							<p><strong>{benefit.name}</strong> {@html getBackgroundDesc(benefit.desc)}</p>
						{/each}
					</div>
				{/if}
			</div>
			<div class="charOption">
				<button
					on:click={() => (showSkills = !showSkills)}
					style="margin:0%; width: 100%;
		height: 100%;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);">Skills</button
				>
				{#if showSkills}
					<div class="content" style="text-align: center;">
						{#each localCharacter.ProficientSkills as skill}
							<li><strong>{skill}</strong></li>
						{/each}
					</div>
				{/if}
			</div>
			<div class="charOption">
				<button
					on:click={() => (showFeats = !showFeats)}
					style="margin:0%; width: 100%;
			height: 100%;
			font-size: 2vh;
			font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
			background-color: var(--button-bg);">Feats</button
				>
				{#if showFeats}
					<div class="content">
						{#each localCharacter.chosenFeats as feat}
							<li><strong>{feat.name}</strong></li>
							<p>{feat.description}</p>
						{/each}
					</div>
				{/if}
			</div>
			<div class="charOption">
				<button
					on:click={() => (showSpells = !showSpells)}
					style="margin:0%; width: 100%;
	height: 100%;
	font-size: 2vh;
	font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	background-color: var(--button-bg);">Spells</button
				>
				{#if showSpells}
					<div class="content">
						{#each localCharacter.chosenSpells as spell}
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
					style="margin:0%; width: 100%;
		height: 100%;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);">{localCharacter.Race}</button
				>
				{#if showRace}
					<div class="content">
						<h3>Description:</h3>

						{#each localCharacter.Traits as trait}
							<p><strong>{trait.name}</strong></p>
							<p>{@html getRaceDescription(trait.desc)}</p>
						{/each}
					</div>
				{/if}
			</div>
			<div class="charOption">
				<button
					on:click={() => (showClass = !showClass)}
					style="margin:0%; width: 100%;
		height: 100%;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);">{localCharacter.Class}</button
				>
				{#if showClass}
					<div class="content">
						<h3>Description:</h3>

						<p>{@html getClassDescription(localCharacter.ClassDesc)}</p>
					</div>
				{/if}
			</div>
			<div class="charOption">
				<button
					on:click={() => (showSubrace = !showSubrace)}
					style="margin:0%; width: 100%; height: 100%;
		font-size: 2vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);">{localCharacter.SubRace}</button
				>
				{#if showSubrace}
					<div class="content">
						<h3>Description:</h3>
	
						{#each localCharacter.SubTraits as SubTrait}
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
		background-color: var(--button-bg);">{localCharacter.Archetype}</button
				>
				{#if showArchetype}
					<div class="content">
						<h3>Description:</h3>
							<p>{@html getArchetypeDescription(localCharacter.ArchetypeDesc)}</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

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
