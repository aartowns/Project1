<script>
	// @ts-ignore
	import { json } from "@sveltejs/kit";
	export let character;

	const onSkillChanged = (/** @type {Event & { currentTarget: EventTarget & HTMLInputElement; }} */ event)=> {
		// @ts-ignore
		const skillId = event.target.id;
		// @ts-ignore
		const isChecked = event.target.checked;
		// @ts-ignore
		console.log(skillId, isChecked);
		// @ts-ignore
		if (isChecked) {
			// @ts-ignore
			if (!$character.ProficientSkills.includes(skillId)) {
				// @ts-ignore
				$character.ProficientSkills.push(skillId)
			}
		} else {
			// @ts-ignore
			if ($character.ProficientSkills.includes(skillId)) {
				// @ts-ignore
				$character.ProficientSkills = $character.ProficientSkills.filter((/** @type {any} */ skill) => skill !== skillId);	
			}
		}
		// @ts-ignore
		console.log($character)
    }

</script>

<div class="wrapper">
	<div class="skill">
		<label class="label" for="athletics"
			>Athletics
			<input on:input={(e)=>onSkillChanged(e)} id="athletics" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="acrobatics"
			>Acrobatics
			<input on:input={(e)=>onSkillChanged(e)} id="acrobatics" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="sleight-of-hand"
			>Sleight of Hand
			<input on:input={(e)=>onSkillChanged(e)} id="sleight-of-hand" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="stealth"
			>Stealth
			<input on:input={(e)=>onSkillChanged(e)} id="stealth" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="arcana"
			>Arcana
			<input on:input={(e)=>onSkillChanged(e)} id="arcana" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="history"
			>History
			<input on:input={(e)=>onSkillChanged(e)} id="history" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="investigation"
			>Investigation
			<input on:input={(e)=>onSkillChanged(e)} id="investigation" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="nature"
			>Nature
			<input on:input={(e)=>onSkillChanged(e)} id="nature" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="religion"
			>Religion
			<input on:input={(e)=>onSkillChanged(e)} id="religion" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="animal-handling"
			>Animal Handling
			<input on:input={(e)=>onSkillChanged(e)} id="animal-handling" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="insight"
			>Insight
			<input on:input={(e)=>onSkillChanged(e)} id="insight" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="medicine"
			>Medicine
			<input on:input={(e)=>onSkillChanged(e)} id="medicine" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="perception"
			>Perception
			<input on:input={(e)=>onSkillChanged(e)} id="perception" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="survival"
			>Survival
			<input on:input={(e)=>onSkillChanged(e)} id="survival" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="deception"
			>Deception
			<input on:input={(e)=>onSkillChanged(e)} id="deception" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="intimidation"
			>Intimidation
			<input on:input={(e)=>onSkillChanged(e)} id="intimidation" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="performance"
			>Performance
			<input on:input={(e)=>onSkillChanged(e)} id="performance" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="persuasion"
			>Persuasion
			<input on:input={(e)=>onSkillChanged(e)} id="persuasion" type="checkbox" />
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
