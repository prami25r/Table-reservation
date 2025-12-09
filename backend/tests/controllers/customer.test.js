import {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer
} from "../../src/controllers/customer";

import * as service from "../../src/services/customer";

describe("Customer Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  test("createCustomer → should return created customer", async () => {
    const mockCustomer = { id: 1, name: "Sunshine" };
    service.create = jest.fn().mockResolvedValue(mockCustomer);

    req.body = mockCustomer;

    await createCustomer(req, res, next);

    expect(service.create).toHaveBeenCalledWith(mockCustomer);
    expect(res.json).toHaveBeenCalledWith(mockCustomer);
  })
  test("getCustomers → should return all customers", async () => {
    const list = [{ id: 1 }, { id: 2 }];
    service.getAll = jest.fn().mockResolvedValue(list);

    await getCustomers(req, res, next);

    expect(service.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(list);
  });


  test("getCustomer → should return a single customer when found", async () => {
    const customer = { id: 1, name: "Sunshine" };
    service.getOne = jest.fn().mockResolvedValue(customer);

    req.params.id = 1;

    await getCustomer(req, res, next);

    expect(service.getOne).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(customer);
  });

  test("getCustomer → should call next(err) when not found", async () => {
    service.getOne = jest.fn().mockResolvedValue(null);
    req.params.id = 123;

    await getCustomer(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
  });


  test("updateCustomer → should return updated customer", async () => {
    const updated = { id: 1, name: "Updated" };
    service.update = jest.fn().mockResolvedValue(updated);

    req.params.id = 1;
    req.body = updated;

    await updateCustomer(req, res, next);

    expect(service.update).toHaveBeenCalledWith(1, updated);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("updateCustomer → should call next(err) when not found", async () => {
    service.update = jest.fn().mockResolvedValue(null);

    req.params.id = 999;

    await updateCustomer(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
  });

  test("deleteCustomer → should return success message", async () => {
    const deletedData = { id: 1 };
    service.remove = jest.fn().mockResolvedValue(deletedData);

    req.params.id = 1;

    await deleteCustomer(req, res, next);

    expect(service.remove).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "Customer deleted successfully",
      deleted: deletedData,
    });
  });

  test("deleteCustomer → should call next(err) when not found", async () => {
    service.remove = jest.fn().mockResolvedValue(null);

    req.params.id = 404;

    await deleteCustomer(req, res, next);

    expect(next).toHaveBeenCalled();
    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
  });

 test("getCustomers → should hit line 15 even when service.getAll throws", async () => {
  const error = new Error("Failed");

  service.getAll = jest.fn().mockImplementation(async () => {
    throw error; 
  });

  await getCustomers(req, res, next);

  expect(service.getAll).toHaveBeenCalled();
  expect(next).toHaveBeenCalledWith(error);
});



});
