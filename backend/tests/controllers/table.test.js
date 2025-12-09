import {
  createTable,
  getTables,
  getTable,
  updateTable,
  deleteTable
} from "../../src/controllers/table";

import * as service from "../../src/services/table";

describe("Table Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    next = jest.fn();
  });

  test("createTable → returns created table", async () => {
    const mockData = { id: 1 };
    service.create = jest.fn().mockResolvedValue(mockData);

    req.body = mockData;

    await createTable(req, res, next);

    expect(service.create).toHaveBeenCalledWith(mockData);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  test("createTable → forwards error", async () => {
    const err = new Error("fail");
    service.create = jest.fn().mockRejectedValue(err);

    await createTable(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  test("getTables → returns list", async () => {
    const list = [{ id: 1 }];
    service.getAll = jest.fn().mockResolvedValue(list);

    await getTables(req, res, next);

    expect(res.json).toHaveBeenCalledWith(list);
  });

  test("getTables → forwards error", async () => {
    const err = new Error("fail");
    service.getAll = jest.fn().mockRejectedValue(err);

    await getTables(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });

  test("getTable → returns one table", async () => {
    const table = { id: 1 };
    service.getOne = jest.fn().mockResolvedValue(table);

    req.params.id = "1";

    await getTable(req, res, next);

    expect(service.getOne).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(table);
  });

  test("getTable → 404 when not found", async () => {
    service.getOne = jest.fn().mockResolvedValue(null);

    req.params.id = "5";

    await getTable(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
    expect(err.message).toBe("Table not found");
  });

  test("updateTable → returns updated table", async () => {
    const updated = { id: 1, seats: 4 };
    service.update = jest.fn().mockResolvedValue(updated);

    req.params.id = "1";
    req.body = updated;

    await updateTable(req, res, next);

    expect(res.json).toHaveBeenCalledWith(updated);
  });

  test("updateTable → 404 when not found", async () => {
    service.update = jest.fn().mockResolvedValue(null);

    req.params.id = "2";
    req.body = { seats: 2 };

    await updateTable(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
    expect(err.message).toBe("Cannot update: Table not found");
  });

  test("deleteTable → returns success message", async () => {
    const deleted = { id: 1 };
    service.remove = jest.fn().mockResolvedValue(deleted);

    req.params.id = "1";

    await deleteTable(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      message: "Table deleted successfully",
      deleted
    });
  });

  test("deleteTable → 404 when not found", async () => {
    service.remove = jest.fn().mockResolvedValue(null);

    req.params.id = "3";

    await deleteTable(req, res, next);

    const err = next.mock.calls[0][0];
    expect(err.status).toBe(404);
    expect(err.message).toBe("Cannot delete: Table not found");
  });
});
