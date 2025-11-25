import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation
} from "../controllers/reservation";

const router = Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.get("/:id", getReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

export default router;
