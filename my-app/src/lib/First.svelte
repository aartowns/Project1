<script>
	export let character;

	const onLevelChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Level = event.target.value;
	};
	
	const onHitPointChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.RolledHitpoints = event.target.value;
	};
	const onNameChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Name = event.target.value;
	};
</script>

<div class="wrapper">
	<div class="createOptions">
		<label class="labelPg1" for="Level" style="font-size: 2vh;">Level:</label>
		<select
			bind:value={$character.Level}
			name="Level"
			id="Level"
			style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh;"
		>
			<option class="option" value={1}>1</option>
			<option class="option" value={2}>2</option>
			<option class="option" value={3}>3</option>
			<option class="option" value={4}>4</option>
			<option class="option" value={5}>5</option>
			<option class="option" value={6}>6</option>
			<option class="option" value={7}>7</option>
			<option class="option" value={8}>8</option>
			<option class="option" value={9}>9</option>
			<option class="option" value={10}>10</option>
			<option class="option" value={11}>11</option>
			<option class="option" value={12}>12</option>
			<option class="option" value={13}>13</option>
			<option class="option" value={14}>14</option>
			<option class="option" value={15}>15</option>
			<option class="option" value={16}>16</option>
			<option class="option" value={17}>17</option>
			<option class="option" value={18}>18</option>
			<option class="option" value={19}>19</option>
			<option class="option" value={20}>20</option>
		</select>
	</div>
	
	<div class="createOptions">
		<label class="labelPg1" for="hitpoints" style="padding-right: 5px; font-size: 2vh;">Rolled Hitpoints:</label>
		<input
			bind:value={$character.RolledHitpoints}
			type="number"
			id="hitpoints"
			name="hitpoints"
			style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 15vw;"
		/>
	</div>
	<div class="createOptions">
		<label class="labelPg1" for="name" style="padding-right: 5px; font-size: 2vh;">Name:</label>
		<input
			bind:value={$character.Name}
			type="text"
			id="name"
			name="name"
			style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; font-size: 2vh; width: 15vw;"
		/>
	</div>
</div>


<style>

	.wrapper {
		display: flex;
		background-color: #d9d9d9;
		width: 100vw;
		height: 100%;
		justify-content: center;
		align-items: center;
		margin: 0;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.createOptions {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		width: 65vw;
		height: 10vh;
		background-color: var(--button-bg);
		margin: 2vh;
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
</style>
