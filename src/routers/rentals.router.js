import { Router } from "express";
import { createRentals, deleteRentals, getRentals, returnRentals } from "../controllers/rentals.controller.js";


const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", createRentals)
rentalsRouter.post("/rentals/:id/return", returnRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)


export default rentalsRouter;