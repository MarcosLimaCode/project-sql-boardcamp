import { createGamesRepository, getGamesRepository } from "../repositories/games.repository.js";

export async function getGamesService() {
    const result = await getGamesRepository();
    return result
}

export async function createGamesService({ name, image, stockTotal, pricePerDay }) {
    const result =  await createGamesRepository(name, image, stockTotal, pricePerDay);
    return result
}