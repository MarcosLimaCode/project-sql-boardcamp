import { Router } from "express";
import { createCustomers, getCustomers } from "../controllers/customers.controller.js";


const custumersRouter = Router();

custumersRouter.get("/customers", getCustomers);
custumersRouter.post("/customers", createCustomers);


export default custumersRouter;