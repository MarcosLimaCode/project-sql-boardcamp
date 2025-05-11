import { Router } from "express";
import { createGames, getGames } from "../controllers/games.controller.js";
import { gamesSchema } from "../schemas/games.schema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";


const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateSchema(gamesSchema), createGames)


export default gamesRouter;