const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { marked } = require('marked');
const { convert } = require('html-to-text');

async function fetchArchetypes(apiUrl) {
    let allResults = [];
    let nextPage = apiUrl;

    while (nextPage) {
        try {
            const response = await axios.get(nextPage);
            const { results, next } = response.data;

            const flattenedResults = results.flatMap(cls => 
                (cls.archetypes || []).map(archetype => ({
                    class_name: cls.name,
                    archetype_name: archetype.name,
                    archetype_description: archetype.desc,
                    archetype_slug: archetype.slug,
                    document_title: archetype.document__title || 'N/A',
                    document_url: archetype.document__url || 'N/A'
                }))
            );

            flattenedResults.forEach(archetype => {
                archetype.archetype_description = convert(marked(archetype.archetype_description));
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
            } else if (header === 'archetype_description') {
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
    const archetypes = await fetchArchetypes(apiUrl);

    if (archetypes.length > 0) {
        saveToCsv(archetypes, "subclasses.csv");
    } else {
        console.log("No subclasses found.");
    }
}

main();
