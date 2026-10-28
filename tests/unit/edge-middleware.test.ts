import { NextRequest } from "next/server";
import { middleware } from "@/middleware";

function createMockRequest(url: string, headers: Record<string, string> = {}) {
  const req = new NextRequest(new URL(url, "https://www.artron.ge"), {
    headers: new Headers(headers),
  });
  return req;
}

describe("Phase 97: Edge Middleware DDoS & Bot Shield", () => {
  it("should allow normal browser requests and attach X-Artron-Trace-ID", () => {
    const req = createMockRequest("https://www.artron.ge/", {
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    });

    const res = middleware(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Artron-Trace-ID")).toBeDefined();
  });

  it("should block known malicious vulnerability scanner bot User-Agents with 403 Forbidden", () => {
    const scanners = ["sqlmap/1.5.2", "Mozilla/5.0 nikto/2.1.6", "masscan/1.0", "wpscan/3.8"];

    for (const bot of scanners) {
      const req = createMockRequest("https://www.artron.ge/api/v1/demo-request", {
        "user-agent": bot,
      });

      const res = middleware(req);
      expect(res.status).toBe(403);
    }
  });

  it("should reject path traversal payload attempts in query string with 400 Bad Request", () => {
    const req = createMockRequest("https://www.artron.ge/?file=../../etc/passwd", {
      "user-agent": "Mozilla/5.0 Chrome",
    });

    const res = middleware(req);
    expect(res.status).toBe(400);
  });

  it("should reject SQL injection payload attempts in query string with 400 Bad Request", () => {
    const req = createMockRequest("https://www.artron.ge/?q=union%20select%20*%20from%20users", {
      "user-agent": "Mozilla/5.0 Chrome",
    });

    const res = middleware(req);
    expect(res.status).toBe(400);
  });

  it("should reject XSS script tags in query string with 400 Bad Request", () => {
    const req = createMockRequest("https://www.artron.ge/?target=<script>alert(1)</script>", {
      "user-agent": "Mozilla/5.0 Chrome",
    });

    const res = middleware(req);
    expect(res.status).toBe(400);
  });

  it("should attach rate limit headers for API routes", () => {
    const req = createMockRequest("https://www.artron.ge/api/v1/health", {
      "user-agent": "Mozilla/5.0 Chrome",
      "x-forwarded-for": "192.168.1.50",
    });

    const res = middleware(req);
    expect(res.status).toBe(200);
    expect(res.headers.get("X-RateLimit-Limit")).toBe("60");
    expect(res.headers.get("X-RateLimit-Remaining")).toBeDefined();
    expect(res.headers.get("X-Artron-Trace-ID")).toBeDefined();
  });
});
