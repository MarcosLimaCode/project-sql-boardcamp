import { createGamesService, getGamesService } from "../services/games.service.js";

export async function getGames(req, res) {
    const result = await getGamesService();
    return res.send(result);
}

export async function createGames(req, res) {
    await createGamesService(req.body);
    return res.sendStatus(201);
}