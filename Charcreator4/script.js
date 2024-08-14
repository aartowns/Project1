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
                  } else {
                      selectedFeats.removeChild(li);
                      allFeats.appendChild(li);
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
      } catch (error) {
          console.error('Error loading feats:', error);
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

  search.addEventListener("input", () => {
      filterFeats(search.value);
  });

  loadFeats();
});