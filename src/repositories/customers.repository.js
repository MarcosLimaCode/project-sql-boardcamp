import { db } from "../database/database.js";

export async function getCustomersRepository() {
    const result = await db.query(`SELECT * FROM customers`);
    return result;
}

export async function verifyNameRepository(cpf) {
    const result = await db.query(`
        SELECT * FROM customers 
            WHERE cpf = $1;`, [cpf]);
     return result.rows;
 }

export async function createCustomersRepository(name, phone, cpf) {
    const result = await db.query(`
         INSERT INTO customers (name, phone, cpf)
         VALUES ($1, $2, $3);`, [name, phone, cpf]);
     return result;
 }
