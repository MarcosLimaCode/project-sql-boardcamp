import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routes/games.router.js";
import custumersRouter from "./routes/costumers.router.js";
import rentalsRouter from "./routes/retals.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(gamesRouter);
app.use(custumersRouter);
app.use(rentalsRouter);


const port = process.env.PORT;

app.listen(port, () => {
    console.log("Funcionou!")
});
