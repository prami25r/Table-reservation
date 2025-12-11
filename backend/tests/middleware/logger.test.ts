import { requestLogger } from "../../src/middleware/logger";
import { logger } from "../../src/utils/logger";

jest.mock("../../src/utils/logger", () => ({
  logger: { info: jest.fn() }
}));

describe("Logger Middleware", () => {
  test("logs request and calls next()", () => {
    const req = { method: "GET", url: "/test" } as any;
    const res = {} as any;
    const next = jest.fn();

    requestLogger(req, res, next);

    expect(logger.info).toHaveBeenCalledWith("GET /test");
    expect(next).toHaveBeenCalled();
  });
});
