import request from "supertest";
import express from "express";

import customerRoutes from "../../src/routes/customer";
import reservationRoutes from "../../src/routes/reservation";
import tableRoutes from "../../src/routes/table";
import restaurantRoutes from "../../src/routes/restaurant";

import * as customerController from "../../src/controllers/customer";
import * as reservationController from "../../src/controllers/reservation";
import * as tableController from "../../src/controllers/table";
import * as restaurantController from "../../src/controllers/restaurant";


jest.mock("../../src/controllers/customer");
jest.mock("../../src/controllers/reservation");
jest.mock("../../src/controllers/table");
jest.mock("../../src/controllers/restaurant");

const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/reservations", reservationRoutes);
app.use("/tables", tableRoutes);
app.use("/restaurants", restaurantRoutes);

describe("Route Tests", () => {
  beforeEach(() => jest.clearAllMocks());



  test("POST /customers → createCustomer", async () => {
    customerController.createCustomer.mockImplementation((req, res) => res.json({}));

    const payload = {
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210"
    };

    await request(app).post("/customers").send(payload);
    expect(customerController.createCustomer).toHaveBeenCalled();
  });

  test("GET /customers → getCustomers", async () => {
    customerController.getCustomers.mockImplementation((req, res) => res.json([]));
    await request(app).get("/customers");
    expect(customerController.getCustomers).toHaveBeenCalled();
  });

  test("GET /customers/:id → getCustomer", async () => {
    customerController.getCustomer.mockImplementation((req, res) => res.json({}));
    await request(app).get("/customers/1");
    expect(customerController.getCustomer).toHaveBeenCalled();
  });

  test("PUT /customers/:id → updateCustomer", async () => {
    customerController.updateCustomer.mockImplementation((req, res) => res.json({}));

    const payload = { name: "Updated", email: "u@example.com", phone: "1234567890" };

    await request(app).put("/customers/1").send(payload);
    expect(customerController.updateCustomer).toHaveBeenCalled();
  });

  test("DELETE /customers/:id → deleteCustomer", async () => {
    customerController.deleteCustomer.mockImplementation((req, res) => res.json({}));
    await request(app).delete("/customers/1");
    expect(customerController.deleteCustomer).toHaveBeenCalled();
  });


  test("POST /reservations → createReservation", async () => {
    reservationController.createReservation.mockImplementation((req, res) => res.json({}));

    const payload = {
      customerId: 1,
      tableId: 2,
      date: "2025-01-01",
      time: "18:00",
      guests: 2
    };

    await request(app).post("/reservations").send(payload);
    expect(reservationController.createReservation).toHaveBeenCalled();
  });

  test("GET /reservations → getReservations", async () => {
    reservationController.getReservations.mockImplementation((req, res) => res.json([]));
    await request(app).get("/reservations");
    expect(reservationController.getReservations).toHaveBeenCalled();
  });

  test("GET /reservations/:id → getReservation", async () => {
    reservationController.getReservation.mockImplementation((req, res) => res.json({}));
    await request(app).get("/reservations/1");
    expect(reservationController.getReservation).toHaveBeenCalled();
  });

  test("PUT /reservations/:id → updateReservation", async () => {
    reservationController.updateReservation.mockImplementation((req, res) => res.json({}));

    const payload = { guests: 3 };

    await request(app).put("/reservations/1").send(payload);
    expect(reservationController.updateReservation).toHaveBeenCalled();
  });

  test("DELETE /reservations/:id → deleteReservation", async () => {
    reservationController.deleteReservation.mockImplementation((req, res) => res.json({}));
    await request(app).delete("/reservations/1");
    expect(reservationController.deleteReservation).toHaveBeenCalled();
  });

  test("PATCH /reservations/:id/checkedin → checkedInReservation", async () => {
    reservationController.checkedInReservation.mockImplementation((req, res) => res.json({}));
    await request(app).patch("/reservations/1/checkedin");
    expect(reservationController.checkedInReservation).toHaveBeenCalled();
  });

  test("PATCH /reservations/:id/cancel → cancelledReservation", async () => {
    reservationController.cancelledReservation.mockImplementation((req, res) => res.json({}));
    await request(app).patch("/reservations/1/cancel");
    expect(reservationController.cancelledReservation).toHaveBeenCalled();
  });

  test("GET /reservations/status/upcoming → getUpcomingReservations", async () => {
    reservationController.getUpcomingReservations.mockImplementation((req, res) => res.json([]));
    await request(app).get("/reservations/status/upcoming");
    expect(reservationController.getUpcomingReservations).toHaveBeenCalled();
  });

  test("GET /reservations/status/checkedin → getCheckedInReservations", async () => {
    reservationController.getCheckedInReservations.mockImplementation((req, res) => res.json([]));
    await request(app).get("/reservations/status/checkedin");
    expect(reservationController.getCheckedInReservations).toHaveBeenCalled();
  });

  test("GET /reservations/status/cancelled → getCancelledReservations", async () => {
    reservationController.getCancelledReservations.mockImplementation((req, res) => res.json([]));
    await request(app).get("/reservations/status/cancelled");
    expect(reservationController.getCancelledReservations).toHaveBeenCalled();
  });

 

  test("POST /tables → createTable", async () => {
    tableController.createTable.mockImplementation((req, res) => res.json({}));

    const payload = {
      number: 1,
      seats: 4,
      restaurantId: 10
    };

    await request(app).post("/tables").send(payload);
    expect(tableController.createTable).toHaveBeenCalled();
  });

  test("GET /tables → getTables", async () => {
    tableController.getTables.mockImplementation((req, res) => res.json([]));
    await request(app).get("/tables");
    expect(tableController.getTables).toHaveBeenCalled();
  });

  test("GET /tables/:id → getTable", async () => {
    tableController.getTable.mockImplementation((req, res) => res.json({}));
    await request(app).get("/tables/1");
    expect(tableController.getTable).toHaveBeenCalled();
  });

  test("PUT /tables/:id → updateTable", async () => {
    tableController.updateTable.mockImplementation((req, res) => res.json({}));

    const payload = { seats: 6 };

    await request(app).put("/tables/1").send(payload);
    expect(tableController.updateTable).toHaveBeenCalled();
  });

  test("DELETE /tables/:id → deleteTable", async () => {
    tableController.deleteTable.mockImplementation((req, res) => res.json({}));
    await request(app).delete("/tables/1");
    expect(tableController.deleteTable).toHaveBeenCalled();
  });



  test("POST /restaurants → createRestaurant", async () => {
    restaurantController.createRestaurant.mockImplementation((req, res) => res.json({}));

    const payload = {
      name: "Restaurant A",
      location: "Mumbai"
    };

    await request(app).post("/restaurants").send(payload);
    expect(restaurantController.createRestaurant).toHaveBeenCalled();
  });

  test("GET /restaurants → getRestaurants", async () => {
    restaurantController.getRestaurants.mockImplementation((req, res) => res.json([]));
    await request(app).get("/restaurants");
    expect(restaurantController.getRestaurants).toHaveBeenCalled();
  });

  test("GET /restaurants/:id → getRestaurant", async () => {
    restaurantController.getRestaurant.mockImplementation((req, res) => res.json({}));
    await request(app).get("/restaurants/1");
    expect(restaurantController.getRestaurant).toHaveBeenCalled();
  });

  test("PUT /restaurants/:id → updateRestaurant", async () => {
    restaurantController.updateRestaurant.mockImplementation((req, res) => res.json({}));

    const payload = { name: "Updated R", location: "Delhi" };

    await request(app).put("/restaurants/1").send(payload);
    expect(restaurantController.updateRestaurant).toHaveBeenCalled();
  });

  test("DELETE /restaurants/:id → deleteRestaurant", async () => {
    restaurantController.deleteRestaurant.mockImplementation((req, res) => res.json({}));
    await request(app).delete("/restaurants/1");
    expect(restaurantController.deleteRestaurant).toHaveBeenCalled();
  });
});
