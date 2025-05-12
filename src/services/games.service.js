import { db } from "../database/database.js";

export async function getGamesService() {
    const result = await db.query(`SELECT * FROM games`);
    return result.rows
}

export async function createGamesService({ name, image, stockTotal, pricePerDay }) {
   const result =  await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);
    return result
}
