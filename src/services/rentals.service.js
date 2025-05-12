import moment from "moment";
import { createRentalsRepository, deleteRentalsRepository, findPriceRepository, getRentalsRepository, returnRentalsRepository, verifyCustomerIdRepository, verifyGameIdRepository, verifyGameRentedRepository, verifyGameStockRepository, verifyRentalIdRepository } from "../repositories/rentals.repository.js";
import { badRequestError, notFoundError, unprocessableError } from "../error/errors.js";

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
    if (await verifyGameIdRepository(gameId) === 0) throw notFoundError("Jogo");
    if (await verifyCustomerIdRepository(customerId) === 0) throw notFoundError("Cliente");

    const rentedGames = await verifyGameRentedRepository(gameId);
    const currentRented = rentedGames.filter(rented => rented.returnDate === null).length;
    const stockTotal = await verifyGameStockRepository(gameId);
    if (currentRented === stockTotal) throw unprocessableError("O jogo selecionado não está disponível.");

    const rentDate = moment().format('YYYY-MM-DD');
    const findPrice = await findPriceRepository(gameId);
    const originalPrice = findPrice.rows[0].pricePerDay * daysRented;

    return await createRentalsRepository(customerId, gameId, daysRented, rentDate, originalPrice);
}

export async function returnRentalsService(rentalId) {
    const rentals = await verifyRentalIdRepository(rentalId);

    if (rentals.length === 0) throw notFoundError("Aluguel");
    if (rentals[0].returnDate !== null) throw unprocessableError("Aluguel já finalizado.");

    const returnDate = moment().format('YYYY-MM-DD');
    const result = await returnRentalsRepository(returnDate, rentalId);

    return result
}

export async function deleteRentalsService(rentalId) {
    const rentals = await verifyRentalIdRepository(rentalId);
    if (rentals.length === 0) throw notFoundError("Aluguel");
    if (rentals[0].returnDate === null) throw badRequestError();


    const result = deleteRentalsRepository(rentalId);

    return result;
}