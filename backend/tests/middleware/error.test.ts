import errorMiddleware from "../../src/middleware/error";

describe("Error Middleware", () => {
  test("returns 500 with error message", () => {
    const err = new Error("Something went wrong");

    const req: any = {};
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    errorMiddleware(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Something went wrong" });
  });
});
