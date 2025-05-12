import { createCustomersRepository, getCustomersRepository } from "../repositories/customers.repository.js";

export async function getCustomersServices() {
    const result = await getCustomersRepository();
    return result.rows
}

export async function createCustomersServices({ name, phone, cpf }) {
    const result = createCustomersRepository(name, phone, cpf);
    return result
}