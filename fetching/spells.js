const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { marked } = require('marked');
const { convert } = require('html-to-text');

async function fetchSpells(apiUrl) {
  let allResults = [];
  let nextPage = apiUrl;
  while (nextPage) {
    try {
      const response = await axios.get(nextPage);
      const { results, next } = response.data;
      const flattenedResults = results.map(spell => ({
        name: spell.name,
        level: spell.level,
        school: spell.school.name || '',
        range_text: spell.range_text || '',
        duration: spell.duration || '',
        concentration: spell.concentration ? "Yes" : "No",
        ritual: spell.ritual ? "Yes" : "No",
        casting_time: spell.casting_time || '',
        verbal: spell.verbal ? "Yes" : "No",
        somatic: spell.somatic ? "Yes" : "No",
        material: spell.material ? "Yes" : "No",
        material_specified: spell.material_specified || '',
        saving_throw_ability: spell.saving_throw_ability || '',
        target_count: spell.target_count || 0,
        higher_level: spell.higher_level || '',
        attack_roll: spell.attack_roll ? "Yes" : "No",
        damage_roll: spell.damage_roll || '',
        damage_types: spell.damage_types ? spell.damage_types.join(", ") : "", 
        description: Array.isArray(spell.desc) ? spell.desc.join(' ') : spell.desc || '',
      }));
      flattenedResults.forEach(spell => {
        spell.description = convert(marked(spell.description));
      });
      allResults = allResults.concat(flattenedResults);
      nextPage = next;
    } catch (error) {
      console.error(`Error ${error}`);
      break;
    }
  }
  return allResults;
}

function saveToCsv(data, filename) {
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  for (const item of data) {
    const values = headers.map((header) => {
      const escaped = ("" + item[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  fs.writeFileSync(path.join(__dirname, filename), csvRows.join("\n"));
  console.log(`Data saved to ${filename}`);
}

async function main() {
  const apiUrl = "https://api.open5e.com/v2/spells/";
  const spells = await fetchSpells(apiUrl);

  if (spells.length > 0) {
    saveToCsv(spells, "spells.csv");
  } else {
    console.log("No spells found.");
  }
}

main();
