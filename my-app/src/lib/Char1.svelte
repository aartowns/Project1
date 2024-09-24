<script>
	import { onMount } from 'svelte';

	/**
	 * @type {{ Name: any; Level: any; Race: any; Class: any; Background: any; RolledHitpoints: any; Strength: any; Dexterity: any; Constitution: any; Intelligence: any; Wisdom: any; Charisma: any; ProficientSkills: any; chosenFeats: any; chosenSpells: any; }}
	 */
	let localCharacter;
	/**
	 * @type {string}
	 */
	export let slot;

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
		<h2>Name: {localCharacter.Name}</h2>
		<h2>Level: {localCharacter.Level}</h2>
		<h2>Race: {localCharacter.Race}</h2>
		<h2>Class: {localCharacter.Class}</h2>
		<h2>Background: {localCharacter.Background}</h2>
		<h2>Hitpoints: {localCharacter.RolledHitpoints}</h2>
		<h2>Strength: {localCharacter.Strength}</h2>
		<h2>Dexterity: {localCharacter.Dexterity}</h2>
		<h2>Constitution: {localCharacter.Constitution}</h2>
		<h2>Intelligence: {localCharacter.Intelligence}</h2>
		<h2>Wisdom: {localCharacter.Wisdom}</h2>
		<h2>Charisma: {localCharacter.Charisma}</h2>
		<h2>Skills:</h2>
		<ul>
			{#each localCharacter.ProficientSkills as skill}
				<li><strong>{skill}</strong></li>
			{/each}
		</ul>
		<h2>Feats:</h2>
		<ul>
			{#each localCharacter.chosenFeats as feat}
				<li><strong>{feat.name}</strong></li>
				<p>{feat.description}</p>
			{/each}
		</ul>

		<h2>Spells:</h2>
		<ul>
			{#each localCharacter.chosenSpells as spell}
				<li><strong>{spell.name}</strong></li>
				<p>{spell.description}</p>
			{/each}
		</ul>
	</div>
{/if}
