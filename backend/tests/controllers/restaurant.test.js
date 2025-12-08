import {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant";

import * as service from "../services/restaurant";

describe("Restaurant Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });


  test("createRestaurant → returns created restaurant", async () => {
    const mockData = { id: 1, name: "Food Heaven" };
    service.create = jest.fn().mockResolvedValue(mockData);

    req.body = mockData;

    await createRestaurant(req, res, next);

    expect(service.create).toHaveBeenCalledWith(mockData);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("createRestaurant → forwards error to next()", async () => {
    const error = new Error("DB error");
    service.create = jest.fn().mockRejectedValue(error);

    await createRestaurant(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });


  test("getRestaurants → returns list of restaurants", async () => {
    const list = [{ id: 1 }, { id: 2 }];
    service.getAll = jest.fn().mockResolvedValue(list);

    await getRestaurants(req, res, next);

    expect(service.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(list);
  });

  test("getRestaurants → forwards error to next()", async () => {
    const error = new Error("Failed");
    service.getAll = jest.fn().mockRejectedValue(error);

    await getRestaurants(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });


  test("getRestaurant → returns a restaurant when found", async () => {
    const restaurant = { id: 1, name: "Sunshine Café" };
    service.getOne = jest.fn().mockResolvedValue(restaurant);

    req.params.id = "1";

    await getRestaurant(req, res, next);

    expect(service.getOne).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(restaurant);
  });

  test("getRestaurant → returns 404 when not found", async () => {
    service.getOne = jest.fn().mockResolvedValue(null);

    req.params.id = "99";

    await getRestaurant(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
    expect(err.message).toBe("Restaurant not found");
  });

 
  test("updateRestaurant → updates and returns restaurant", async () => {
    const updated = { id: 1, name: "Updated Place" };
    service.update = jest.fn().mockResolvedValue(updated);

    req.params.id = "1";
    req.body = updated;

    await updateRestaurant(req, res, next);

    expect(service.update).toHaveBeenCalledWith(1, updated);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("updateRestaurant → 404 when update fails", async () => {
    service.update = jest.fn().mockResolvedValue(null);

    req.params.id = "55";
    req.body = { name: "Test" };

    await updateRestaurant(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
    expect(err.message).toBe("Cannot update: Restaurant not found");
  });

  test("deleteRestaurant → returns success message", async () => {
    const deleted = { id: 1 };
    service.remove = jest.fn().mockResolvedValue(deleted);

    req.params.id = "1";

    await deleteRestaurant(req, res, next);

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "Restaurant deleted successfully",
      deleted,
    });
  });

  test("deleteRestaurant → 404 when delete fails", async () => {
    service.remove = jest.fn().mockResolvedValue(null);

    req.params.id = "10";

    await deleteRestaurant(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
    expect(err.message).toBe("Cannot delete: Restaurant not found");
  });
});
