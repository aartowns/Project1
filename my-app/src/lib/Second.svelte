<script>
    export let character;
    const onAthleticsChange = (/** @type {{ target: { value: boolean; }; }} */ event)=> {
        $character.Athletics = event.target.value;
    }
</script>

<div class="wrapper">
	<div class="skill">
		<label class="label" for="athletics"
			>Athletics
			<input bind:checked={$character.Athletics} id="athletics" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="acrobatics"
			>Acrobatics
			<input id="acrobatics" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="sleight-of-hand"
			>Sleight of Hand
			<input id="sleight-of-hand" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="stealth"
			>Stealth
			<input id="stealth" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="arcana"
			>Arcana
			<input id="arcana" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="history"
			>History
			<input id="history" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="investigation"
			>Investigation
			<input id="investigation" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="nature"
			>Nature
			<input id="nature" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="religion"
			>Religion
			<input id="religion" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="animal-handling"
			>Animal Handling
			<input id="animal-handling" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="insight"
			>Insight
			<input id="insight" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="medicine"
			>Medicine
			<input id="medicine" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="perception"
			>Perception
			<input id="perception" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="survival"
			>Survival
			<input id="survival" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="deception"
			>Deception
			<input id="deception" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="intimidation"
			>Intimidation
			<input id="intimidation" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="performance"
			>Performance
			<input id="performance" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="persuasion"
			>Persuasion
			<input id="persuasion" type="checkbox" />
		</label>
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

	.skill {
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

	.label {
		font-size: 20px;
	}
</style>
