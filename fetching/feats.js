const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { marked } = require('marked');
const { convert } = require('html-to-text');

async function fetchFeats(apiUrl) {
    let allResults = [];
    let nextPage  = apiUrl;
    while (nextPage) {
        try {
            const response = await axios.get(nextPage);
            const { results, next } = response.data;
            const flattenedResults = results.map(feat => ({
                name: feat.name,
                description: Array.isArray(feat.desc) ? feat.desc.join(' ') : feat.desc || '',
                has_prerequisite: feat.has_prerequisite ? "Yes" : "No",
                prerequisite: feat.prerequisite || "",
            }));
            flattenedResults.forEach(feat => {
                feat.description = convert(marked(feat.description));
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
            const escaped = ("" + item[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(","));
    }

    fs.writeFileSync(path.join(__dirname, filename), csvRows.join("\n"));
    console.log(`Data saved to ${filename}`);
}

async function main() {
    const apiUrl = "https://api.open5e.com/v2/feats/";
    const feats = await fetchFeats(apiUrl);

    if (feats.length > 0) {
        saveToCsv(feats, "feats.csv");
    } else {
        console.log("No feats found.");
    }
}

main();