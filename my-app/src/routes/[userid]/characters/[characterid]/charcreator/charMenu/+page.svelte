<script>
	import First from '$lib/First.svelte';
	import Second from '$lib/Second.svelte';
	import Third from '$lib/Third.svelte';
	import Fourth from '$lib/Fourth.svelte';
	import Fifth from '$lib/Fifth.svelte';
	import Sixth from '$lib/Sixth.svelte';
	import Seventh from '$lib/Seventh.svelte';
	import { writable } from 'svelte/store';

	let state = 'first';

	let character = writable({
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
	character.subscribe((val) => {
		console.log(val);
	});
</script>

<div style="display:flex; justify-content:center; flex-direction: column;">
	<div style="display:flex; justify-content:center; flex-direction: row;">
		<button
			class={state == 'first' ? 'selected' : ''}
			on:click={() => {
				state = 'first';
			}}
		>
			<strong>General Info</strong>
		</button>
		<button
			class={state == 'second' ? 'selected' : ''}
			on:click={() => {
				state = 'second';
			}}
		>
			<strong>Background</strong>
		</button>
		<button
			class={state == 'third' ? 'selected' : ''}
			on:click={() => {
				state = 'third';
			}}
		>
			<strong>Skills</strong>
		</button>
		<button
			class={state == 'fourth' ? 'selected' : ''}
			on:click={() => {
				state = 'fourth';
			}}
		>
			<strong>Atributes</strong>
		</button>
		<button
			class={state == 'fifth' ? 'selected' : ''}
			on:click={() => {
				state = 'fifth';
			}}
		>
			<strong>Feats</strong>
		</button>
		<button
			class={state == 'sixth' ? 'selected' : ''}
			on:click={() => {
				state = 'sixth';
			}}
		>
			<strong>Spells</strong>
		</button>
		<button
			class={state == 'seventh' ? 'selected' : ''}
			on:click={() => {
				state = 'seventh';
			}}
		>
			<strong>Character</strong>
		</button>
	</div>

	<div>
		{#if state == 'seventh'}
			<Seventh {character}></Seventh>
		{:else if state == 'second'}
			<Second {character}></Second>
		{:else if state == 'third'}
			<Third {character}></Third>
		{:else if state == 'fourth'}
			<Fourth {character}></Fourth>
		{:else if state == 'fifth'}
			<Fifth {character}></Fifth>
		{:else if state == 'sixth'}
			<Sixth {character}></Sixth>
		{:else}
			<First {character}></First>
		{/if}
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
	button:hover {
		color: cyan;
	}
</style>
