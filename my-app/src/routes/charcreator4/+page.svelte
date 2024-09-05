document.addEventListener("DOMContentLoaded", () => {
    const search = document.getElementById("featSearch");
    const allFeats = document.getElementById("resultList");
    const selectedFeats = document.getElementById("selected");
    let featsArray = [];

    async function loadFeats() {
        try {
            let resp = await fetch("https://api.open5e.com/v2/feats/");
            let data = await resp.json();
            let feats = [...data.results];

            while (data.next) {
                resp = await fetch(data.next);
                data = await resp.json();
                feats.push(...data.results);
            }

            featsArray = feats;

            feats.forEach(feat => {
                const li = document.createElement("li");
                const checkbox = document.createElement("input");
                const descElem = document.createElement("p");

                checkbox.type = "checkbox";
                checkbox.classList.add("feat-checkbox");
                checkbox.addEventListener("change", () => {
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
                descElem.classList.add("hidden");

                li.id = feat.name;
                li.textContent = feat.name;
                li.prepend(checkbox);
                li.appendChild(descElem);

                li.addEventListener("click", (event) => {
                    if (event.target !== checkbox) {
                        descElem.classList.toggle("hidden");
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
        featsArray.forEach(feat => {
            const li = document.getElementById(feat.name);
            if (feat.name.toLowerCase().includes(lowerCaseText) || feat.desc.toLowerCase().includes(lowerCaseText)) {
                li.classList.remove("hidden");
            } else {
                li.classList.add("hidden");
            }
        });
    }

    function saveSelectedFeats() {
        const selectedItems = selectedFeats.querySelectorAll('li');
        const selectedFeatsArray = Array.from(selectedItems).map(item => item.id);
        localStorage.setItem('selectedFeats', JSON.stringify(selectedFeatsArray));
        alert('Selected feats have been saved!');
    }

    function loadSelectedFeats() {
        const savedFeats = JSON.parse(localStorage.getItem('selectedFeats')) || [];
        savedFeats.forEach(featName => {
            const li = document.getElementById(featName);
            if (li) {
                const checkbox = li.querySelector('input[type="checkbox"]');
                checkbox.checked = true;
                allFeats.removeChild(li);
                selectedFeats.appendChild(li);
            }
        });
    }

    search.addEventListener("input", () => {
        filterFeats(search.value);
    });

    loadFeats();
});

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
				<ul id="selected">

				</ul>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="scrollable-container">
			<div style="justify-content: center;">
				<h1>All Feats</h1>
				<input type="search" name="feat" id="featSearch">
				<div style="text-align: center;">
					<ul id="resultList" style="overflow-y: scroll; list-style: none;">

					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.scrollable-container {
		height: 100%;
		overflow-y: auto;
		padding: 10px;
		box-sizing: border-box;
	}

	.all-feats-container {
		height: 800px;
	}

	.selected-feats-container {
		height: 800px;
	}

	.container {
		width: 50%;
		padding: 10px;
		box-sizing: border-box;
	}

	#resultList {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	#resultList li {
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 5px;
		background-color: #f9f9f9;
		transition: background-color 0.3s ease;
	}

	#resultList li:hover {
		background-color: #999aad;
	}

	.feat-button {
		all: unset;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		text-align: center;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: text-decoration 0.3s;
		padding: 0;
		margin: 0;
	}

	.feat-button > * {
		margin: 0 5px;
	}

	.feat-button:hover {
		text-decoration: underline;
		color: #d40b0b;
	}

	.searchInput {
		margin-right: 10px;
	}

	p {
		display: none;
		margin: 5px 0 0 0;
		padding: 5px;
		font-size: 14px;
		color: black;
		background-color: #f0f0f0;
		border: 1px solid #ddd;
	}

	#resultList li.show-description p {
		display: block;
	}

	.searchInput {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
		margin-bottom: 10px;
	}

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
</style>
