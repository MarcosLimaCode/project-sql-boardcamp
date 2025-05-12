import { conflictError } from "../error/errors.js";
import { createGamesRepository, getGamesRepository, verifyGameRepository } from "../repositories/games.repository.js";

export async function getGamesService() {
    const result = await getGamesRepository();
    return result
}

export async function createGamesService({ name, image, stockTotal, pricePerDay }) {
    const registredGame =  await verifyGameRepository(name);
    if(registredGame.length !== 0) throw conflictError("Jogo");

    return await createGamesRepository(name, image, stockTotal, pricePerDay);
}