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

import { validate } from "../middleware/validate";
import {
  createReservationSchema,
  updateReservationSchema,
  idParamSchema,
} from "../validations/reservation";

const router = Router();

router.post("/", validate(createReservationSchema), createReservation);
router.get("/", getReservations);
router.get("/:id", validate(idParamSchema), getReservation);
router.put("/:id", validate(updateReservationSchema), updateReservation);
router.delete("/:id", validate(idParamSchema), deleteReservation);

router.patch("/:id/checkedin", validate(idParamSchema), checkedInReservation);
router.patch("/:id/cancel", validate(idParamSchema), cancelledReservation);

router.get("/status/upcoming", getUpcomingReservations);
router.get("/status/checkedin", getCheckedInReservations);
router.get("/status/cancelled", getCancelledReservations);

export default router;
