import { Router } from "express";
import { createRentals, getRentals } from "../controllers/rentals.controller.js";


const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", createRentals)


export default rentalsRouter;