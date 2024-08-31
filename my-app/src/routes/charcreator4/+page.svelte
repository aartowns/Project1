<script>
	document.addEventListener('DOMContentLoaded', () => {
		const search = document.getElementById('featSearch');
		const allFeats = document.getElementById('resultList');
		const selectedFeats = document.getElementById('selected');
		let featsArray = [];

		async function loadFeats() {
			try {
				let resp = await fetch('https://api.open5e.com/v2/feats/');
				let data = await resp.json();
				let feats = [...data.results];

				while (data.next) {
					resp = await fetch(data.next);
					data = await resp.json();
					feats.push(...data.results);
				}

				featsArray = feats;

				feats.forEach((feat) => {
					const li = document.createElement('li');
					const checkbox = document.createElement('input');
					const descElem = document.createElement('p');

					checkbox.type = 'checkbox';
					checkbox.classList.add('feat-checkbox');
					checkbox.addEventListener('change', () => {
						if (checkbox.checked) {
							allFeats.removeChild(li);
							selectedFeats.appendChild(li);
							saveSelectedFeats();
						} else {
							selectedFeats.removeChild(li);
							allFeats.appendChild(li);
							saveSelectedFeats();
						}
					});

					descElem.textContent = feat.desc;
					descElem.classList.add('hidden');

					li.id = feat.name;
					li.textContent = feat.name;
					li.prepend(checkbox);
					li.appendChild(descElem);

					li.addEventListener('click', (event) => {
						if (event.target !== checkbox) {
							descElem.classList.toggle('hidden');
						}
					});

					allFeats.appendChild(li);
				});

				loadSelectedFeats();
			} catch (error) {
				console.error('Error loading feats:', error);
				alert('Failed to load feats. Please try again later.');
			}
		}

		function filterFeats(searchText) {
			const lowerCaseText = searchText.toLowerCase();
			featsArray.forEach((feat) => {
				const li = document.getElementById(feat.name);
				if (
					feat.name.toLowerCase().includes(lowerCaseText) ||
					feat.desc.toLowerCase().includes(lowerCaseText)
				) {
					li.classList.remove('hidden');
				} else {
					li.classList.add('hidden');
				}
			});
		}

		function saveSelectedFeats() {
			const selectedItems = selectedFeats.querySelectorAll('li');
			const selectedFeatsArray = Array.from(selectedItems).map((item) => item.id);
			localStorage.setItem('selectedFeats', JSON.stringify(selectedFeatsArray));
			alert('Selected feats have been saved!');
		}

		function loadSelectedFeats() {
			const savedFeats = JSON.parse(localStorage.getItem('selectedFeats')) || [];
			savedFeats.forEach((featName) => {
				const li = document.getElementById(featName);
				if (li) {
					const checkbox = li.querySelector('input[type="checkbox"]');
					checkbox.checked = true;
					allFeats.removeChild(li);
					selectedFeats.appendChild(li);
				}
			});
		}

		search.addEventListener('input', () => {
			filterFeats(search.value);
		});

		loadFeats();
	});
</script>

<header>
	<div class="header">
		<a class="pageLink" href="../index.html">Home</a>
	</div>
</header>
<div class="menu">
	<div class="menuOption">
		<a class="pageLink" href="../Charcreator/">Character Creator</a>
	</div>
	<div class="menuOption">
		<a class="pageLink" href="../Char">Characters</a>
	</div>
</div>
<div class="nextBack">
	<div class="back">
		<a class="nextBackLink" href="../Charcreator3/">Back</a>
	</div>
	<div class="next">
		<a class="nextBackLink" href="../Charcreator5/">Next</a>
	</div>
</div>
<div style="display: flex; flex-direction: row; text-align: center;">
	<div class="container">
		<div>
			<h1>Selected Feats</h1>
			<div>
				<ul id="selected"></ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="scrollable-container">
			<div style="justify-content: center;">
				<h1>All Feats</h1>
				<input type="search" name="feat" id="featSearch" />
				<div style="text-align: center;">
					<ul id="resultList" style="overflow-y: scroll; list-style: none;"></ul>
				</div>
			</div>
		</div>
	</div>
</div>

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

	.label {
		font-size: 20px;
	}

	.spellLevel {
		display: flex;
		flex: wrap;
		justify-content: center;
		align-items: center;
		min-width: 40em;
		min-height: 20em;
		max-width: 40em;
		max-height: 20em;
		background-color: #999aad;
		margin: 60px;
		padding: 0;
		border: solid black 0.5px;
	}

	.info {
		text-align: center;
	}

	#nav {
		justify-content: center;
		align-items: center;
		text-decoration: none;
		margin: 0;
		padding: 0;
	}

	#nav li a {
		display: block;
		padding: 0;
		text-decoration: none;
		width: 200px;
		line-height: 35px;
		color: #ffffff;
	}

	#nav li li a {
		font-size: 80%;
	}

	#nav li:hover {
		background: #d40b0b;
	}

	#nav ul {
		padding: 0;
		left: 0;
		display: none;
	}

	#nav li:hover ul ul {
		display: none;
	}

	#nav li:hover ul {
		display: block;
		position: relative;
	}

	#nav li li:hover ul {
		display: block;
	}

	#nav li a:hover {
		color: cyan;
	}

	.container {
		width: 50%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	#resultList li:hover {
		color: #d40b0b;
		text-decoration-line: underline;
	}

	#resultList li:hover p {
		text-decoration-line: none;
		color: black;
		display: inline-block;
	}

	.spellLevel {
		height: 300px;
		overflow-y: auto;
		border: 1px solid #ccc;
		padding: 10px;
		margin: 10px 0;
		position: relative;
	}

	.searchInput {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
		margin-bottom: 10px;
	}

	.spellLevel ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.spellLevel li {
		padding: 5px 0;
	}

	.selectedSpells {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		min-width: 91.5%;
		min-height: 20em;
		max-width: 91.5%;
		max-height: 20em;
		background-color: #999aad;
		margin: 60px;
		padding: 0;
		border: solid black 0.5px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.selectedSpells ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	.selectedSpells h1 {
		margin: 0;
		padding: 10px 0;
		text-align: center;
		width: 100%;
	}

	.scrollable-container {
		overflow-y: auto;
		height: 900px;
	}

	#featSearch {
		width: 100%;
		padding: 10px;
		margin-bottom: 20px;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		margin-bottom: 10px;
		cursor: pointer;
		background-color: #999aad;
	}

	li input[type='checkbox'] {
		margin-bottom: 10px;
	}

	.hidden {
		display: none;
	}

	p {
		margin: 0;
		padding: 5px;
		background-color: #f1f1f1;
		border: 1px solid #ddd;
		border-radius: 5px;
		text-align: center;
		display: inline-block;
		text-decoration: none;
	}
</style>
