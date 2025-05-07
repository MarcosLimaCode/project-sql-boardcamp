import { db } from "../database/database.js";

export async function getCustomers(req, res){
    res.status(200).send("getCustomers");
}