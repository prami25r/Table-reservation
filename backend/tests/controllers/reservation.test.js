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

import * as ReservationService from "../services/reservation";

describe("Reservation Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  // -------------------------------------------------------
  // CREATE
  // -------------------------------------------------------
  test("createReservation → returns 201 + created data", async () => {
    const mockData = { id: 1, fullName: "Sunshine" };

    ReservationService.create = jest.fn().mockResolvedValue(mockData);

    req.body = {
      fullName: "Sunshine",
      mobileNumber: "98765",
      restaurantId: 10,
      reservationDate: "2025-12-10",
      guestCount: 3,
    };

    await createReservation(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("createReservation → returns 400 when required fields missing", async () => {
    req.body = { fullName: "Sunshine" }; 

    await createReservation(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing required fields",
    });
  });

  test("createReservation → handles server error", async () => {
    ReservationService.create = jest.fn().mockRejectedValue(new Error("boom"));

    req.body = {
      fullName: "Sunshine",
      mobileNumber: "98765",
      restaurantId: 10,
      reservationDate: "2025-12-10",
      guestCount: 3,
    };

    await createReservation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "boom",
    });
  });

  test("getReservations → returns all reservations", async () => {
    const list = [{ id: 1 }];
    ReservationService.getAll = jest.fn().mockResolvedValue(list);

    await getReservations(req, res);

    expect(res.json).toHaveBeenCalledWith(list);
  });

  test("getReservation → returns a single reservation", async () => {
    const data = { id: 1 };
    ReservationService.getOne = jest.fn().mockResolvedValue(data);

    req.params.id = "1";

    await getReservation(req, res);

    expect(ReservationService.getOne).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(data);
  });


  test("updateReservation → updates and returns reservation", async () => {
    const result = { id: 1, guestCount: 4 };
    ReservationService.update = jest.fn().mockResolvedValue(result);

    req.params.id = "1";
    req.body = { guestCount: 4 };

    await updateReservation(req, res);

    expect(ReservationService.update).toHaveBeenCalledWith(1, { guestCount: 4 });
    expect(res.json).toHaveBeenCalledWith(result);
  });


  test("deleteReservation → returns success message", async () => {
    ReservationService.remove = jest.fn().mockResolvedValue(true);

    req.params.id = "1";

    await deleteReservation(req, res);

    expect(ReservationService.remove).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ message: "Deleted" });
  });

  test("checkedInReservation → updates status", async () => {
    const updated = { id: 1, status: "Checked-In" };
    ReservationService.updateStatus = jest
      .fn()
      .mockResolvedValue(updated);

    req.params.id = "1";

    await checkedInReservation(req, res);

    expect(ReservationService.updateStatus).toHaveBeenCalledWith(1, "Checked-In");
    expect(res.json).toHaveBeenCalledWith(updated);
  });


  test("cancelledReservation → updates status", async () => {
    const updated = { id: 1, status: "Cancelled" };
    ReservationService.updateStatus = jest
      .fn()
      .mockResolvedValue(updated);

    req.params.id = "1";

    await cancelledReservation(req, res);

    expect(ReservationService.updateStatus).toHaveBeenCalledWith(1, "Cancelled");
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("getUpcomingReservations → returns list", async () => {
    const list = [{ id: 1 }];
    ReservationService.getUpcoming = jest.fn().mockResolvedValue(list);

    await getUpcomingReservations(req, res);

    expect(res.json).toHaveBeenCalledWith(list);
  });

  test("getCheckedInReservations → returns list", async () => {
    const list = [{ id: 2 }];
    ReservationService.getCheckedIn = jest.fn().mockResolvedValue(list);

    await getCheckedInReservations(req, res);

    expect(res.json).toHaveBeenCalledWith(list);
  });

  test("getCancelledReservations → returns list", async () => {
    const list = [{ id: 3 }];
    ReservationService.getCancelled = jest.fn().mockResolvedValue(list);

    await getCancelledReservations(req, res);

    expect(res.json).toHaveBeenCalledWith(list);
  });
});
