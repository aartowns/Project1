const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { marked } = require('marked');
const { convert } = require('html-to-text');

async function fetchClasses(apiUrl) {
    let allResults = [];
    let nextPage  = apiUrl;

    while (nextPage) {
        try {
            const response = await axios.get(nextPage);
            const { results, next } = response.data;

            const flattenedResults = results.map(cls => ({
                name: cls.name,
                description: cls.desc,
                hit_dice: cls.hit_dice,
                hp_at_1st_level: cls.hp_at_1st_level,
                hp_at_higher_levels: cls.hp_at_higher_levels,
                prof_armor: cls.prof_armor,
                prof_weapons: cls.prof_weapons,
                prof_tools: cls.prof_tools,
                prof_saving_throws: cls.prof_saving_throws,
                prof_skills: cls.prof_skills,
                equipment: cls.equipment,
                spellcasting_ability: cls.spellcasting_ability,
                subtypes_name: cls.subtypes_name || 'None',
                table: cls.table
            }));

            flattenedResults.forEach(cls => {
                cls.description = convert(marked(cls.description));
            });

            allResults = allResults.concat(flattenedResults);
            nextPage = next;
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
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
                return `"${item[header].join(" | ")}"`;
            } else if (header === 'table') {
                return `"${item[header]}"`;
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
    const apiUrl = "https://api.open5e.com/v1/classes/";
    const classes = await fetchClasses(apiUrl);

    if (classes.length > 0) {
        saveToCsv(classes, "classes.csv");
    } else {
        console.log("No classes found.");
    }
}

main();
