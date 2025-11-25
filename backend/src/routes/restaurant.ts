
import { Router } from "express";
import * as controller from "../controllers/restaurant";

const router = Router();

router.post("/", controller.createRestaurant);
router.get("/", controller.getRestaurants);
router.get("/:id", controller.getRestaurant);
router.put("/:id", controller.updateRestaurant);
router.delete("/:id", controller.deleteRestaurant);

export default router;
