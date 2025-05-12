import express, { json } from "express";
import "express-async-error";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routers/index.router.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler)


const port = process.env.PORT;

app.listen(port, () => {
    console.log("Funcionou!")
});
