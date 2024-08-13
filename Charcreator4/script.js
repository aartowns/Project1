let search;
let allFeats;
let allFeatsArray = [];
let selectedFeats;
 
addEventListener("DOMContentLoaded", () => {
  load();
});

async function load() {

  search = document.getElementById("featSearch");
  allFeats = document.getElementById("resultList");
  selectedFeats = document.getElementById("selected");
  
  console.log(allFeats);
  let feats = await featLoader();
  for (let feat of feats) {
    let li = document.createElement("li");
    const obj = { elem: li, active: false, obj: feat };
    allFeatsArray.push(obj);
    li.id = feat.name;
    li.classList.add("featContainer");
    li.innerText = feat.name;
    allFeats.appendChild(li);
    let descElem = document.createElement("p");
    descElem.innerText = feat.desc;
    //desc.classList.add('hidden');
    li.appendChild(descElem);
    descElem.remove();
    // Add an event listener to the list item
li.addEventListener("click", () => {
    // Check if the list item has the 'active' class
    if (li.classList.contains("active")) {
      // If it has 'active', remove 'active' class and remove 'descElem'
      li.classList.remove('active'); 
      if (li.contains(descElem)) {
        li.removeChild(descElem); // Remove descElem if it's a child of li
      }
    } else {
      // If it doesn't have 'active', add 'active' class and append 'descElem'
      li.classList.add('active'); 
      li.appendChild(descElem); // Append descElem only if it’s not already a child
    }
  });
  }
  console.log(allFeatsArray);
  search.addEventListener("keyup", () => {
    filterFeats(search.value);
  });
  search.addEventListener("search", () => {
    filterFeats(search.value);
  });
}

async function featLoader() {
  let resp = await fetch("https://api.open5e.com/v2/feats/");
  let data = await resp.json();
  console.log(data);
  let arr = [];
  arr.push(...data.results);
  while (data.next) {
    resp = await fetch(data.next);
    data = await resp.json();
    arr.push(...data.results);
  }
  return arr;
}

async function filterFeats(searchText) {
  console.log(searchText);
  if (!searchText) {
    allFeatsArray.forEach((feat) => {
      feat.elem.classList.remove("hidden");
    });
  }
  allFeatsArray.forEach((feat) => {
    if (
      feat.obj.desc.toLowerCase().includes(searchText.toLowerCase()) ||
      feat.obj.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      allFeats.appendChild(feat.elem);
      //we want it
    } else {
      feat.elem.remove();
    }
  });
}
