import { Router } from "express";
import { getCustomers } from "../controllers/customers.controller.js";


const custumersRouter = Router();

custumersRouter.get("/customers", getCustomers);


export default custumersRouter;