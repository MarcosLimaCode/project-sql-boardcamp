import { db } from "../database/database.js";

export async function getRentals(req, res){
    res.status(200).send("getRentals");
}