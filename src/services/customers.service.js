import { db } from "../database/database.js";

export async function getCustomersServices() {
    const result = await db.query(`SELECT * FROM customers`);
    return result.rows
}

export async function createCustomersServices({ name, phone, cpf }) {
   const result = await db.query(`
        INSERT INTO customers (name, phone, cpf)
        VALUES ($1, $2, $3);`, [name, phone, cpf]);
    return result
}