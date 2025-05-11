import { Router } from "express";
import { createRentals, deleteRentals, getRentals, returnRentals } from "../controllers/rentals.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { rentalsSchema } from "../schemas/rentals.schema.js";


const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validateSchema(rentalsSchema), createRentals)
rentalsRouter.post("/rentals/:id/return", returnRentals)
rentalsRouter.delete("/rentals/:id", deleteRentals)


export default rentalsRouter;