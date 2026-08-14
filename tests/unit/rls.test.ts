const mockExecuteRawUnsafe = jest.fn();
const mockTransaction = jest.fn((callback) => callback({
  $executeRawUnsafe: mockExecuteRawUnsafe,
}));

const mockExtends = jest.fn().mockImplementation((config) => {
  return {
    $transaction: mockTransaction,
    $executeRawUnsafe: mockExecuteRawUnsafe,
    ...config.client,
  };
});

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        $extends: mockExtends,
      };
    }),
  };
});

import { prisma } from "../../src/lib/prisma";

describe("Row-Level Security (RLS) Multi-Tenant Enforcement", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should wrap database queries inside a transaction and set local session variable for RLS", async () => {
    const tenantId = "demo-tenant-uuid";
    const testCallback = jest.fn(async (tx) => {
      return "success";
    });

    const result = await prisma.$withTenant(tenantId, testCallback);

    expect(mockTransaction).toHaveBeenCalled();
    expect(mockExecuteRawUnsafe).toHaveBeenCalledWith(
      `SET LOCAL app.current_tenant_id = '${tenantId}';`
    );
    expect(testCallback).toHaveBeenCalled();
    expect(result).toBe("success");
  });
});
