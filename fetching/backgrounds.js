const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { marked } = require('marked');
const { convert } = require('html-to-text');

async function fetchBackgrounds(apiUrl) {
    let allResults = [];
    let nextPage  = apiUrl;
    while (nextPage) {
        try {
            const response = await axios.get(nextPage);
            const { results, next } = response.data;
            const flattenedResults = results.map(background => ({
                name: background.name,
                benefits: background.benefits ? background.benefits.map(benefit => ({
                    benefit_name: benefit.name,
                    benefit_desc: Array.isArray(benefit.desc) ? benefit.desc.join(' '): benefit.desc || ''  
                })) : []
            }));
            flattenedResults.forEach(background => {
                background.benefits = background.benefits.map(benefit =>({
                    benefit_name: benefit.benefit_name,
                    benefit_desc: convert(marked(benefit.benefit_desc))
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
                return `"${item[header].map(b => `${b.benefit_name}: ${b.benefit_desc}`).join(" | ")}"`;
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
    const apiUrl = "https://api.open5e.com/v2/backgrounds/";
    const backgrounds = await fetchBackgrounds(apiUrl);

    if (backgrounds.length > 0) {
        saveToCsv(backgrounds, "backgrounds.csv");
    } else {
        console.log("No backgrounds found.");
    }
}

main();