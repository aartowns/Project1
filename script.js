async function getSpells() {
    let resp = await fetch("https://api.open5e.com/v2/spells/");
    let data = await resp.json();
    console.log(data);
}
getSpells()