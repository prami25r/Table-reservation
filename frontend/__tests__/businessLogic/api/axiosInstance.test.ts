import axios from "axios";
import api from "../../../src/api/axiosInstance";

jest.mock("axios", () => ({
  create: jest.fn((config) => ({ __mock: true, config })),
}));

describe("axiosInstance", () => {
  it("creates axios instance with baseURL and timeout", () => {
    const created = (api as any).__mock ? api : null;

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: "http://localhost:3000",
      timeout: 10000,
    });

    expect(created).toBeTruthy();
    expect((created as any).config.baseURL).toBe("http://localhost:3000");
    expect((created as any).config.timeout).toBe(10000);
  });
});

