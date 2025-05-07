import { db } from "../database/database.js";

export async function getCustomers(req, res) {
    res.status(200).send("getCustomers");
}

export async function createCustomers(req, res) {
    const { name, phone, cpf } = req.body;

    await db.query(`
        INSERT INTO customers (name, phone, cpf)
        VALUES ($1, $2, $3);`, [name, phone, cpf]);

    return res.sendStatus(200);
}
