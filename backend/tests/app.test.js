import request from "supertest";
import app from "../src/app";

describe("app.ts tests", () => {
  test("App should be defined", () => {
    expect(app).toBeDefined();
  });

  test("Unknown route returns 404 (ensures app is fully initialized)", async () => {
    const res = await request(app).get("/__unknown__route__");
    expect(res.status).toBe(404);
  });
});
