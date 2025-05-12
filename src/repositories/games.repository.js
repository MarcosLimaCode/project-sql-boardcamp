import { db } from "../database/database.js";

export async function getGamesRepository() {
    const result = await db.query(`SELECT * FROM games`);
    return result.rows
}

export async function verifyGameRepository(name) {
    const result = await db.query(`
        SELECT * FROM games 
            WHERE name = $1;`, [name]);
     return result.rows
 }


export async function createGamesRepository(name, image, stockTotal, pricePerDay) {
   const result =  await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);
    return result
}