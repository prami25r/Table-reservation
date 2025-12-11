import { validate } from "../../src/middleware/validate";
import { z, ZodError } from "zod";

describe("Validation Middleware", () => {
  const schema = z.object({
    body: z.object({
      name: z.string()
    })
  });

  test("calls next() for valid input", () => {
    const req = { body: { name: "John" }, params: {}, query: {} } as any;
    const res = {} as any;
    const next = jest.fn();

    validate(schema)(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("returns 400 for invalid Zod input", () => {
    const req = { body: {}, params: {}, query: {} } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    const next = jest.fn();

    validate(schema)(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next(err) for non-Zod errors", () => {
   
    const faultySchema: any = {
      parse: () => {
        throw new Error("Random failure");
      }
    };

    const req = { body: {}, params: {}, query: {} } as any;

    const res = {
      status: jest.fn(),
      json: jest.fn()
    } as any;

    const next = jest.fn();

    validate(faultySchema)(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));


    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
