import moment from "moment";
import { createRentalsRepository, deleteRentalsRepository, findPriceRepository, getRentalsRepository, returnRentalsRepository } from "../repositories/rentals.repository.js";

export async function getRentalsService() {
    const results = await getRentalsRepository();

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
    const findPrice = await findPriceRepository(gameId);
    const originalPrice = findPrice.rows[0].pricePerDay * daysRented;
    const result = await createRentalsRepository(customerId, gameId, daysRented, rentDate, originalPrice);
    
    return result;
}

export async function returnRentalsService(rentalId) {
    const returnDate = moment().format('YYYY-MM-DD');
    const result = returnRentalsRepository(returnDate, rentalId);

    return result
}

export async function deleteRentalsService(rentalId) {
    const result = deleteRentalsRepository(rentalId);

    return result;
}