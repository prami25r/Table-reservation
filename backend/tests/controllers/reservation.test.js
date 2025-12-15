const {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../../src/controllers/restaurant");

const RestaurantService = require("../../src/services/restaurant");

jest.mock("../../src/services/restaurant", () => ({
  create: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

describe("Restaurant Controller", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("createRestaurant → returns created restaurant", async () => {
    const data = { id: 1, name: "BBQ Nation" };

    RestaurantService.create.mockResolvedValue(data);
    req.body = { name: "BBQ Nation" };

    await createRestaurant(req, res, next);

    expect(RestaurantService.create).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith(data);
    expect(next).not.toHaveBeenCalled();
  });

  test("createRestaurant → forwards error to next", async () => {
    const error = new Error("boom");

    RestaurantService.create.mockRejectedValue(error);

    await createRestaurant(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  test("getRestaurants → returns list", async () => {
    const list = [{ id: 1 }];

    RestaurantService.getAll.mockResolvedValue(list);

    await getRestaurants(req, res, next);

    expect(res.json).toHaveBeenCalledWith(list);
  });

  test("getRestaurant → returns restaurant when found", async () => {
    const data = { id: 1 };

    RestaurantService.getOne.mockResolvedValue(data);
    req.params.id = "1";

    await getRestaurant(req, res, next);

    expect(RestaurantService.getOne).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test("getRestaurant → 404 when not found", async () => {
    RestaurantService.getOne.mockResolvedValue(null);
    req.params.id = "99";

    await getRestaurant(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err.message).toBe("Restaurant not found");
    expect(err.status).toBe(404);
  });

  test("updateRestaurant → updates successfully", async () => {
    const updated = { id: 1, name: "Updated" };

    RestaurantService.update.mockResolvedValue(updated);
    req.params.id = "1";
    req.body = { name: "Updated" };

    await updateRestaurant(req, res, next);

    expect(RestaurantService.update).toHaveBeenCalledWith(1, req.body);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("updateRestaurant → 404 when restaurant missing", async () => {
    RestaurantService.update.mockResolvedValue(null);
    req.params.id = "1";

    await updateRestaurant(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err.message).toBe("Cannot update: Restaurant not found");
    expect(err.status).toBe(404);
  });

  test("deleteRestaurant → deletes successfully", async () => {
    const deleted = { id: 1 };

    RestaurantService.remove.mockResolvedValue(deleted);
    req.params.id = "1";

    await deleteRestaurant(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: "Restaurant deleted successfully",
      deleted,
    });
  });

  test("deleteRestaurant → 404 when restaurant missing", async () => {
    RestaurantService.remove.mockResolvedValue(null);
    req.params.id = "1";

    await deleteRestaurant(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err.message).toBe("Cannot delete: Restaurant not found");
    expect(err.status).toBe(404);
  });
});
