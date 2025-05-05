import { describe, it, expect, vi } from "vitest";
import { healthCheck } from "../../src/controllers/healthController";

describe("Health Controller", () => {
  it("should return 200 status with success message", () => {
    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    healthCheck(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "Server is running",
    });
  });
});
