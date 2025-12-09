jest.mock("../src/app", () => ({
  __esModule: true,
  default: {
    listen: jest.fn((port, cb) => cb && cb())
  }
}));

describe("server.ts tests", () => {
  test("Server starts without crashing", () => {
    require("../src/server");
    expect(true).toBe(true);
  });
});
