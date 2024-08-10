let search;
let allFeats;
let selectedFeats;
addEventListener('DOMContentLoaded', load());

async function load() {
    search = document.getElementById('feat');
    allFeats = document.getElementById('resultList');
    selectedFeats = document.getElementById('selected'); console.log(allFeats);
    let feats = await featLoader();
    for (let feat of feats) {
        let li = document.createElement('li');
        li.innerText = feat.name;
        allFeats.appendChild(li);
    }
}

async function featLoader() {
    let resp = await fetch("https://api.open5e.com/v2/feats/")
    let data = await resp.json();
    let arr = [];
    arr.push(...data.results);
    while (data.next){
        resp = await fetch(data.next);
        data = await resp.json();
        arr.push(...data.results);
    }
    return arr;
}