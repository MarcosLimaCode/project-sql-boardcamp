import { db } from "../database/database.js";

export async function getGames(req, res) {
    const result = await db.query(`SELECT * FROM games`);
    return res.send(result.rows);
}

export async function createGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;
    
    await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);

    return res.sendStatus(200);
}
