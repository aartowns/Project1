<script>
	// @ts-ignore
	import { json } from '@sveltejs/kit';
	export let character;

	const onSkillChanged = (
		/** @type {Event & { currentTarget: EventTarget & HTMLInputElement; }} */ event
	) => {
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
				$character.ProficientSkills.push(skillId);
			}
		} else {
			// @ts-ignore
			if ($character.ProficientSkills.includes(skillId)) {
				// @ts-ignore
				$character.ProficientSkills = $character.ProficientSkills.filter(
					(/** @type {any} */ skill) => skill !== skillId
				);
			}
		}
		// @ts-ignore
		console.log($character);
	};
</script>

<div class="wrapper">
	<div class="skill">
		<label class="label" for="Athletics"
			>Athletics
			<input on:input={(e) => onSkillChanged(e)} id="Athletics" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Acrobatics"
			>Acrobatics
			<input on:input={(e) => onSkillChanged(e)} id="Acrobatics" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Sleight of Hand"
			>Sleight of Hand
			<input on:input={(e) => onSkillChanged(e)} id="Sleight of Hand" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Stealth"
			>Stealth
			<input on:input={(e) => onSkillChanged(e)} id="Stealth" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Arcana"
			>Arcana
			<input on:input={(e) => onSkillChanged(e)} id="Arcana" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="History"
			>History
			<input on:input={(e) => onSkillChanged(e)} id="History" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Investigation"
			>Investigation
			<input on:input={(e) => onSkillChanged(e)} id="Investigation" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Nature"
			>Nature
			<input on:input={(e) => onSkillChanged(e)} id="Nature" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Religion"
			>Religion
			<input on:input={(e) => onSkillChanged(e)} id="Religion" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Animal Handling"
			>Animal Handling
			<input on:input={(e) => onSkillChanged(e)} id="Animal Handling" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Insight"
			>Insight
			<input on:input={(e) => onSkillChanged(e)} id="Insight" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Medicine"
			>Medicine
			<input on:input={(e) => onSkillChanged(e)} id="Medicine" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Perception"
			>Perception
			<input on:input={(e) => onSkillChanged(e)} id="Perception" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Survival"
			>Survival
			<input on:input={(e) => onSkillChanged(e)} id="Survival" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Deception"
			>Deception
			<input on:input={(e) => onSkillChanged(e)} id="Deception" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Intimidation"
			>Intimidation
			<input on:input={(e) => onSkillChanged(e)} id="Intimidation" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Performance"
			>Performance
			<input on:input={(e) => onSkillChanged(e)} id="Performance" type="checkbox" />
		</label>
	</div>
	<div class="skill">
		<label class="label" for="Persuasion"
			>Persuasion
			<input on:input={(e) => onSkillChanged(e)} id="Persuasion" type="checkbox" />
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
		gap: .5vh;
		margin: 0;
		flex-direction: row;
	}

	.skill {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		width: 40vw;
		height: 5vh;
		background-color: var(--button-bg);
		border: solid black 0.5px;
		align-content: flex-start;
	}

	.label {
		font-size: 2vh;
	}
</style>
