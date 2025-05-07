import { db } from "../database/database.js";

export async function getGames(req, res){

    try {
        const result = await db.query(`SELECT * FROM games`);
        return res.send(result.rows);
        
    } catch (error) {
        return res.sendStatus(404);
    }
}
