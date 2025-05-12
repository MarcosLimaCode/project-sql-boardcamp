import { db } from "../database/database.js";

export async function getRentalsRepository() {
    const results = await db.query(`
        SELECT rentals.*, customers.id AS customers_id, customers.name AS customers_name, games.id AS games_id, games.name AS games_name
            FROM rentals
            JOIN customers 
                ON "customerId" = customers.id
            JOIN games 
                ON "gameId" = games.id
        ;`)

    return results
}

export async function findPriceRepository(gameId) {
    const result = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1;`, [gameId])
    return result;
}

export async function createRentalsRepository(customerId, gameId, daysRented, rentDate, originalPrice) {
    const result = await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);
    
    return result;
}

export async function returnRentalsRepository(returnDate, rentalId) {
    const result = await db.query(`
        UPDATE rentals 
            SET "returnDate" = $1, 
                "delayFee" = GREATEST((($1 - "rentDate") - "daysRented")  * "originalPrice", 0)
            WHERE id = $2;`, [returnDate, rentalId])

    return result
}

export async function deleteRentalsRepository(rentalId) {
    const result = await db.query(`
        DELETE FROM rentals 
            WHERE id = $1;`, [rentalId]);

    return result;
}