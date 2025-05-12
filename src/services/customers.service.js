import { conflictError, notFoundError } from "../error/errors.js";
import { createCustomersRepository, getCustomersByIdRepository, getCustomersRepository, verifyNameRepository } from "../repositories/customers.repository.js";

export async function getCustomersServices() {
    const result = await getCustomersRepository();

    return result.rows;
}

export async function getCustomersByIdServices(id) {
    const result = await getCustomersByIdRepository(id);
    if(result.length === 0) throw notFoundError("Cliente");

    return result;
}

export async function createCustomersServices({ name, phone, cpf }) {
    const registredName = await verifyNameRepository(cpf);
    if(registredName.length !== 0) throw conflictError("CPF");
    
   return await createCustomersRepository(name, phone, cpf);
}