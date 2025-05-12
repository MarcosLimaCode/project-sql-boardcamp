import { conflictError } from "../error/errors.js";
import { createCustomersRepository, getCustomersRepository, verifyNameRepository } from "../repositories/customers.repository.js";

export async function getCustomersServices() {
    const result = await getCustomersRepository();

    return result.rows;
}

export async function createCustomersServices({ name, phone, cpf }) {
    const registredName = await verifyNameRepository(cpf);
    if(registredName.length !== 0) throw conflictError("CPF");
    
   return await createCustomersRepository(name, phone, cpf);
}