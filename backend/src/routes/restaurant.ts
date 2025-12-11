import { Router } from "express";
import * as controller from "../controllers/restaurant";
import { validate } from "../middleware/validate";
import {
  createRestaurantSchema,
  updateRestaurantSchema,
  idParamSchema,
} from "../validations/restaurant";

const router = Router();

router.post("/", validate(createRestaurantSchema), controller.createRestaurant);
router.get("/", controller.getRestaurants);
router.get("/:id", validate(idParamSchema), controller.getRestaurant);
router.put("/:id", validate(updateRestaurantSchema), controller.updateRestaurant);
router.delete("/:id", validate(idParamSchema), controller.deleteRestaurant);

export default router;
