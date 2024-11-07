import { json } from '@sveltejs/kit';
import mysql from 'mysql2/promise';
/** @type {import('./$types').RequestHandler} */
export async function POST(request) {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        database: "d&d",
        password: "Alzar77!"
    })
    const [results, fields] = await connection.query(`SELECT * FROM feats`);
    console.log(results);
    console.log(fields);
    return json(results);
};