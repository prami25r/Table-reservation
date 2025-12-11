import { Router } from "express";
import * as controller from "../controllers/table";
import { validate } from "../middleware/validate";

import {
  createTableSchema,
  updateTableSchema,
  idParamSchema,
} from "../validations/table";

const router = Router();

router.post("/", validate(createTableSchema), controller.createTable);
router.get("/", controller.getTables);
router.get("/:id", validate(idParamSchema), controller.getTable);
router.put("/:id", validate(updateTableSchema), controller.updateTable);
router.delete("/:id", validate(idParamSchema), controller.deleteTable);

export default router;
