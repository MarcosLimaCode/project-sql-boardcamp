import { Router } from "express";
import { createCustomers, getCustomers } from "../controllers/customers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { customersSchema } from "../schemas/customers.schema.js";


const custumersRouter = Router();

custumersRouter.get("/customers", getCustomers);
custumersRouter.post("/customers", validateSchema(customersSchema), createCustomers);


export default custumersRouter;