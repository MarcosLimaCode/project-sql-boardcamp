import { createCustomersServices, getCustomersServices } from "../services/customers.service.js";

export async function getCustomers(req, res) {
    const result = await getCustomersServices();
    return res.send(result);
}

export async function createCustomers(req, res) {
    await createCustomersServices(req.body);
    return res.sendStatus(201);
}