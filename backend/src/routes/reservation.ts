import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  checkedInReservation,
  cancelledReservation
} from "../controllers/reservation";


const router = Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.get("/:id", getReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.patch("/:id/checkedin", checkedInReservation);
router.patch("/:id/cancel", cancelledReservation);

export default router;
