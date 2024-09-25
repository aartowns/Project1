<script>
// @ts-nocheck

	import Char1 from '$lib/Char1.svelte';
	import { writable } from 'svelte/store';

	let localCharacter = writable({
		Level: 1,
		Race: 'Dragonborn',
		Class: 'Barbarian',
		Background: 'Acolyte',
		Benefits: [],
		RolledHitpoints: 0,
		Name: '',
		ProficientSkills: [],
		Strength: 1,
		Dexterity: 1,
		Constitution: 1,
		Wisdom: 1,
		Intelligence: 1,
		Charisma: 1,
		chosenFeats: [],
		chosenSpells: []
	});

	let state = 1;
</script>

<div style="display:flex; justify-content:center; flex-direction: column;">
	<div style="display:flex; justify-content:center; flex-direction: row;">
		<button
			class={state == 1 ? 'selected' : ''}
			on:click={() => {
				state = 1;
				console.log(state);
			}}
		>
			<strong>Character 1</strong>
		</button>
		<button
			class={state == 2 ? 'selected' : ''}
			on:click={() => {
				state = 2;
				console.log(state);
			}}
		>
			<strong>Character 2</strong>
		</button>
		<button
			class={state == 3 ? 'selected' : ''}
			on:click={() => {
				state = 3;
				console.log(state);
			}}
		>
			<strong>Character 3</strong>
		</button>
		<button
			class={state == 4 ? 'selected' : ''}
			on:click={() => {
				state = 4;
				console.log(state);
			}}
		>
			<strong>Character 4</strong>
		</button>
		<button
			class={state == 5 ? 'selected' : ''}
			on:click={() => {
				state = 5;
				console.log(state);
			}}
		>
			<strong>Character 5</strong>
		</button>
	</div>

	<div>
		{#key state}
			<Char1 slot={state}></Char1>
		{/key}
	</div>
</div>

<style>
	button {
		width: 20%;
		height: 4em;
		font-size: 16pt;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		background-color: var(--button-bg);
	}
	.selected {
		background-color: var(--button-selected);
	}
</style>
