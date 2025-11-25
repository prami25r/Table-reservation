import { Router } from "express";
import * as controller from "../controllers/table";

const router = Router();

router.post("/", controller.createTable);
router.get("/", controller.getTables);
router.get("/:id", controller.getTable);
router.put("/:id", controller.updateTable);
router.delete("/:id", controller.deleteTable);

export default router;
