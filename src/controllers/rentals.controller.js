import { createRentalsService, deleteRentalsService, getRentalsService, returnRentalsService } from "../services/rentals.service.js";

export async function getRentals(req, res) {
    const results = await getRentalsService();
    return res.status(200).send(results);
}

export async function createRentals(req, res) {
    await createRentalsService(req.body);
    return res.sendStatus(201);
}

export async function returnRentals(req, res) {
    await returnRentalsService(req.params.id);
    return res.sendStatus(201);
}

export async function deleteRentals(req, res) {
    await deleteRentalsService(req.params.id)
    return res.sendStatus(200);
}