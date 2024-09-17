<script>
	export let character;
	const onStrengthChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Strength = event.target.value;
	};
	const onDexterityChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Dexterity = event.target.value;
	};
	const onConstitutionChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Constitution = event.target.value;
	};
	const onIntelligenceChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Intelligence = event.target.value;
	};
	const onWisdomChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Wisdom = event.target.value;
	};
	const onCharismaChange = (/** @type {{ target: { value: any; }; }} */ event) => {
		$character.Charisma = event.target.value;
	};
</script>

<div class="wrapper">
	<div class="createOptions">
		<label class="labelPg1" for="Strength">Strength:</label>
		<select
			bind:value={$character.Strength}
			name="Strength"
			id="Strength"
			style="font-family: fantasy; font-size: 20px;"
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
		<label class="labelPg1" for="dexterity">Dexterity:</label>
		<select
			bind:value={$character.Dexterity}
			name="dexterity"
			id="dexterity"
			style="font-family: fantasy; font-size: 20px;"
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
		<label class="labelPg1" for="constitution">Constitution:</label>
		<select
			bind:value={$character.Constitution}
			name="constitution"
			id="constitution"
			style="font-family: fantasy; font-size: 20px;"
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
		<label class="labelPg1" for="intelligence">Intelligence:</label>
		<select
			bind:value={$character.Intelligence}
			name="intelligence"
			id="intelligence"
			style="font-family: fantasy; font-size: 20px;"
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
		<label class="labelPg1" for="wisdom">Wisdom:</label>
		<select
			bind:value={$character.Wisdom}
			name="wisdom"
			id="wisdom"
			style="font-family: fantasy; font-size: 20px;"
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
		<label class="labelPg1" for="charisma">Charisma:</label>
		<select
			bind:value={$character.Charisma}
			name="charisma"
			id="charisma"
			style="font-family: fantasy; font-size: 20px;"
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
</div>

<style>
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

	.createOptions {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		min-width: 20em;
		min-height: 5em;
		max-width: 20em;
		max-height: 5em;
		background-color: var(--button-bg);
		margin: 60px;
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
