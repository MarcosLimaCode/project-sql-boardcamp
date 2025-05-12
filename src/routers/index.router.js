import { Router } from "express";
import custumersRouter from "./customers.router.js";
import gamesRouter from "./games.router.js";
import rentalsRouter from "./rentals.router.js";


const router = Router()
router.use(custumersRouter, gamesRouter,rentalsRouter)

export default router