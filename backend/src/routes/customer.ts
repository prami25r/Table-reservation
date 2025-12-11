import { Router } from "express";
import * as controller from "../controllers/customer";
import { validate } from "../middleware/validate";
import {
  createCustomerSchema,
  updateCustomerSchema,
  idParamSchema
} from "../validations/customer";

const router = Router();

router.post("/", validate(createCustomerSchema), controller.createCustomer);
router.get("/", controller.getCustomers);
router.get("/:id", validate(idParamSchema), controller.getCustomer);
router.put("/:id", validate(updateCustomerSchema), controller.updateCustomer);
router.delete("/:id", validate(idParamSchema), controller.deleteCustomer);

export default router;
