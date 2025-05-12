import moment from "moment";
import { db } from "../database/database.js";

export async function getRentalsService() {
    const results = await db.query(`
        SELECT rentals.*, customers.id AS customers_id, customers.name AS customers_name, games.id AS games_id, games.name AS games_name
            FROM rentals
            JOIN customers 
                ON "customerId" = customers.id
            JOIN games 
                ON "gameId" = games.id
        ;`)

    const rentalFormated = results.rows.map(rental => ({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: moment(rental.rentDate).format('YYYY-MM-DD'),
        daysRented: rental.daysRented,
        returnDate: moment(rental.returnDate).isValid() 
            ? moment(rental.returnDate).format('YYYY-MM-DD') 
            : null,
        originalPrice: rental.originalPrice,
        delayFee: rental.delayFee,
        customer: {
            id: rental.customers_id,
            name: rental.customers_name
        },
        game: {
            id: rental.games_id,
            name: rental.games_name
        }
    }));

    return rentalFormated
}

export async function createRentalsService({ customerId, gameId, daysRented }) {
    const rentDate = moment().format('YYYY-MM-DD');
    const findPrice = await db.query(`SELECT "pricePerDay" FROM games WHERE id = $1;`, [gameId])
    const originalPrice = findPrice.rows[0].pricePerDay * daysRented;
    const result = await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, null, originalPrice, null]);
    
    return result;
}

export async function returnRentalsService(rentalId) {
    const returnDate = moment().format('YYYY-MM-DD');
    const result = await db.query(`
        UPDATE rentals 
            SET "returnDate" = $1, 
                "delayFee" = GREATEST((($1 - "rentDate") - "daysRented")  * "originalPrice", 0)
            WHERE id = $2;`, [returnDate, rentalId])

    return result
}

export async function deleteRentalsService(rentalId) {
    const result = await db.query(`
        DELETE FROM rentals 
            WHERE id = $1;`, [rentalId]);

    return result;
}