<body>
	<header>
		<div class="header">
			<a class="pageLink" href="../index.html">Home</a>
		</div>
	</header>
	<div class="menu">
		<div class="menuOption">
			<a class="pageLink" href="../Charcreator">Character Creator</a>
		</div>
		<div class="menuOption">
			<a class="pageLink" href="../Char">Characters</a>
		</div>
	</div>
	<div class="nextBack">
		<div class="back">
			<a class="nextBackLink" href="charcreator1">Back</a>
		</div>
		<div class="next">
			<a class="nextBackLink" href="charcreator2">Next</a>
		</div>
	</div>
	<div class="wrapper">
		<div class="createOptions">
			<label class="labelPg1" for="Level">Level:</label>
			<select name="Level" id="Level" style="font-family: fantasy; font-size: 20px;">
				<option class="option" value="1">1</option>
				<option class="option" value="2">2</option>
				<option class="option" value="3">3</option>
				<option class="option" value="4">4</option>
				<option class="option" value="5">5</option>
				<option class="option" value="6">6</option>
				<option class="option" value="7">7</option>
				<option class="option" value="8">8</option>
				<option class="option" value="9">9</option>
				<option class="option" value="10">10</option>
				<option class="option" value="11">11</option>
				<option class="option" value="12">12</option>
				<option class="option" value="13">13</option>
				<option class="option" value="14">14</option>
				<option class="option" value="15">15</option>
				<option class="option" value="16">16</option>
				<option class="option" value="17">17</option>
				<option class="option" value="18">18</option>
				<option class="option" value="19">19</option>
				<option class="option" value="20">20</option>
			</select>
		</div>
		<div class="createOptions">
			<label class="labelPg1" for="Race">Race:</label>
			<select name="Race" id="Race" style="font-family: fantasy; font-size: 20px;">
				<option value="Dragonborn" class="option">Dragonborn</option>
				<option value="Dwarf" class="option">Dwarf</option>
				<option value="Elf" class="option">Elf</option>
				<option value="Gnome" class="option">Gnome</option>
				<option value="Half-Elf" class="option">Half-Elf</option>
				<option value="Half-Orc" class="option">Half-Orc</option>
				<option value="Halfling" class="option">Halfling</option>
				<option value="Human" class="option">Human</option>
				<option value="Tiefling" class="option">Tiefling</option>
			</select>
		</div>
		<div class="createOptions">
			<label class="labelPg1" for="Class">Class:</label>
			<select name="Class" id="Class" style="font-family: fantasy; font-size: 20px;">
				<option value="Barbarian" class="option">Barbarian</option>
				<option value="Bard" class="option">Bard</option>
				<option value="Cleric" class="option">Cleric</option>
				<option value="Druid" class="option">Druid</option>
				<option value="Fighter" class="option">Fighter</option>
				<option value="Monk" class="option">Monk</option>
				<option value="Paladin" class="option">Paladin</option>
				<option value="Ranger" class="option">Ranger</option>
				<option value="Rogue" class="option">Rogue</option>
				<option value="Sorcerer" class="option">Sorcerer</option>
				<option value="Warlock" class="option">Warlock</option>
				<option value="Wizard" class="option">Wizard</option>
			</select>
		</div>
		<div class="createOptions">
			<label class="labelPg1" for="Background">Background:</label>
			<select name="Background" id="Background" style="font-family: fantasy; font-size: 20px;">
				<option value="Acolyte" class="option">Acolyte</option>
			</select>
		</div>
		<div class="createOptions" style="padding-left: 10px; padding-right: 5px;">
			<label class="labelPg1" for="hitpoints" style="padding-right: 5px;">Rolled Hitpoints:</label>
			<input
				type="number"
				id="hitpoints"
				name="hitpoints"
				style="font-family: fantasy; font-size: 20px;"
			/>
		</div>
		<div class="createOptions">
			<label class="labelPg1" for="name" style="padding-right: 5px;">Name:</label>
			<input type="text" id="name" name="name" style="font-family: fantasy; font-size: 20px;" />
		</div>
	</div>
</body>

<style>
	.header {
		background-color: #d40b0b;
		width: 100vw;
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		font-size: 60px;
		border: solid black 0.5px;
		border-bottom: 0.25px;
	}

	.menu {
		width: 100vw;
		height: 100px;
		display: flex;
		background-color: #999aad;
		justify-content: center;
		align-items: center;
	}

	.menuOption {
		display: flex;
		border: solid black 0.5px;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50vw;
		font-size: 40px;
		border-bottom: 0.25px;
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

	.createOptions {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		min-width: 20em;
		min-height: 5em;
		max-width: 20em;
		max-height: 5em;
		background-color: #999aad;
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

	.pageLink {
		text-decoration: none;
		color: black;
	}

	.pageLink:hover {
		text-decoration: underline;
		color: cyan;
	}

	.nextBack {
		width: 100vw;
		height: 5em;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #999aad;
	}

	.back,
	.next {
		display: flex;
		border: solid black 0.5px;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 50vw;
		font-size: 40px;
	}

	.nextBackLink {
		text-decoration: none;
		color: black;
	}

	.nextBackLink:hover {
		text-decoration: underline;
		color: cyan;
	}

	body {
		width: 100vw;
		height: 100%;
		padding: 0;
		margin: 0;
		font-family: fantasy;
		background-color: #d9d9d9;
	}
</style>
