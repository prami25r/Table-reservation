import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  checkedInReservation,
  cancelledReservation,
  getUpcomingReservations,
  getCheckedInReservations,
  getCancelledReservations
} from "../controllers/reservation";


const router = Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.get("/:id", getReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.patch("/:id/checkedin", checkedInReservation);
router.patch("/:id/cancel", cancelledReservation);
router.get("/status/upcoming", getUpcomingReservations);
router.get("/status/checkedin", getCheckedInReservations);
router.get("/status/cancelled", getCancelledReservations);

export default router;
