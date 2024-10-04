<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	export let character;
	/**
	 * @type {any[]}
	 */
	let backgrounds = [];

	/**
	 * @type {{ benefits: any; } | null}
	 */
	let selectedBackground = null;

	onMount(async () => {
		try {
			let page = 1;
			let moreData = true;

			while (moreData) {
				const response = await fetch(`https://api.open5e.com/v2/backgrounds/?page=${page}`);
				if (!response.ok) throw new Error('Failed to fetch');
				const data = await response.json();

				if (data.results.length > 0) {
					backgrounds = [...backgrounds, ...data.results];
					page++;
				} else {
					moreData = false;
				}
			}
			if (backgrounds.length > 0) {
				selectedBackground = backgrounds[0];
			}
		} catch (error) {
			console.error('Error fetching backgrounds:', error);
		}
	});

	const onBackgroundChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		const selected = backgrounds.find((bg) => bg.name === event.target.value);
		$character.Background = selected ? selected.name : '';
		$character.Benefits = selected ? selected.benefits : [];
		selectedBackground = selected;
	};

	const getBackgroundDesc = (/** @type {string} */ desc) => marked(desc);
</script>

<div class="wrapper">
	<div class="background">
		<label class="labelPg1" for="Background">Background:</label>
		<select
			bind:value={$character.Background}
			name="Background"
			id="Background"
			style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 30vw;"
			on:change={onBackgroundChange}
		>
			{#each backgrounds as background}
				<option value={background.name} class="option">{background.name}</option>
			{/each}
		</select>
	</div>
	{#if selectedBackground}
		<div class="outside-div">
			<h3>Description:</h3>
			<div class="background-description">
				{#each selectedBackground.benefits as benefit}
					<p><strong>{benefit.name}</strong> {@html getBackgroundDesc(benefit.desc)}</p>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	h3 {
		font-size: 2vh;
	}
	label {
		font-size: 2vh;
		padding-right: 2vh;
	}
	p {
		font-size: 1.5vh;
	}
	.background {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		width: 65vw;
		height: 10vh;
		background-color: var(--button-bg);
		margin: 2vh;
		padding: 0;
		border: solid black 0.25px;
	}
	.wrapper {
		display: flex;
		flex-wrap: wrap;
		background-color: #d9d9d9;
		width: 100vw;
		height: 100%;
		justify-content: center;
		align-items: center;
		gap: 20px;
		margin: 0;
		flex-direction: row;
	}
	.background-description {
		height: 32vh;
		width: 70vw;
		overflow-y: auto;
		background-color: #d9d9d9;
		margin: 2%;
		border: black 0.25px solid;
		padding: 1vh;
	}
	.outside-div {
		display: flex;
		flex-direction: column;
		width: 80vw;
		height: 36vh;
		background-color: var(--button-bg);
		justify-content: center;
		align-items: center;
		padding: 15px;
	}
</style>
