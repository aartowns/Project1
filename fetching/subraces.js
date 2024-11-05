const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { marked } = require('marked');
const { convert } = require('html-to-text');

async function fetchRaces(apiUrl) {
    let allResults = [];
    let nextPage  = apiUrl;
    while (nextPage) {
        try {
            const response = await axios.get(nextPage);
            const { results, next } = response.data;
            const filteredRaces = results.filter(race => race.is_subrace);
            const flattenedResults = filteredRaces.map(race => ({
                name: race.name,
                description: race.desc,
                traits: race.traits ? race.traits.map(trait => ({
                    trait_name: trait.name,
                    trait_desc: Array.isArray(trait.desc) ? trait.desc.join(' '): trait.desc || ''  
                })) : []
            }));
            flattenedResults.forEach(race => {
                race.traits = race.traits.map(trait =>({
                    trait_name: trait.trait_name,
                    trait_desc: convert(marked(trait.trait_desc))
                }));
            });
            allResults = allResults.concat(flattenedResults);
            nextPage = next;
        } catch (error) {
            console.error(`Error: ${error}`);
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
        const values = headers.map(header => {
            if (Array.isArray(item[header])) {
                return `"${item[header].map(b => `${b.trait_name}: ${b.trait_desc}`).join(" | ")}"`;
            }
            const escaped = ("" + item[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
    }

    fs.writeFileSync(path.join(__dirname, filename), csvRows.join("\n"));
    console.log(`Data saved to ${filename}`);
}

async function main() {
    const apiUrl = "https://api.open5e.com/v2/races/";
    const races = await fetchRaces(apiUrl);

    if (races.length > 0) {
        saveToCsv(races, "subraces.csv");
    } else {
        console.log("No races found.");
    }
}

main();