import { NextResponse, type NextRequest } from "next/server";

// Known malicious vulnerability scanners and automated attack bots
const BLOCKED_USER_AGENTS = [
  "sqlmap",
  "nikto",
  "masscan",
  "wpscan",
  "acunetix",
  "havij",
  "zgrab",
  "censys",
  "shodan",
  "nmap",
  "dirbuster",
  "gobuster",
];

// Malicious query patterns: Path Traversal, SQLi, XSS vectors
const SUSPICIOUS_PATTERNS = [
  /\.\.\//, // ../ directory traversal
  /%2e%2e/i, // url-encoded directory traversal
  /(?:union\s+select|select.+from|insert\s+into|delete\s+from)/i, // basic SQLi
  /<script[\s>]/i, // script tag injection
  /%3cscript/i, // url-encoded script tag
  /javascript:/i, // javascript URI scheme
];

// In-memory rate limiting map for edge requests (window = 60s, max = 60 requests for APIs)
const apiRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const API_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const API_MAX_REQUESTS = 60;

function checkApiRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = apiRateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    apiRateLimitMap.set(ip, {
      count: 1,
      resetTime: now + API_RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: API_MAX_REQUESTS - 1 };
  }

  if (record.count >= API_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: API_MAX_REQUESTS - record.count };
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const userAgent = request.headers.get("user-agent") || "";
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "127.0.0.1";

  // 1. Block malicious vulnerability scanners & automated attack agents
  const isMaliciousBot = BLOCKED_USER_AGENTS.some((bot) =>
    userAgent.toLowerCase().includes(bot)
  );
  if (isMaliciousBot) {
    return new NextResponse("Forbidden: Automated Security Audit Blocked", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 2. Inspect query string for malicious payloads (Path Traversal, SQLi, XSS)
  if (search) {
    let decodedSearch = search;
    try {
      decodedSearch = decodeURIComponent(search);
    } catch {
      return new NextResponse("Bad Request: Malformed URI Sequence", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const isSuspicious = SUSPICIOUS_PATTERNS.some(
      (pattern) => pattern.test(search) || pattern.test(decodedSearch)
    );
    if (isSuspicious) {
      return new NextResponse("Bad Request: Malicious Pattern Detected", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // 3. API Edge Throttling & Rate Limiting
  if (pathname.startsWith("/api/")) {
    const { allowed, remaining } = checkApiRateLimit(ip);
    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "API rate limit exceeded. Please retry in 60 seconds.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Limit": String(API_MAX_REQUESTS),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(API_MAX_REQUESTS));
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set(
      "X-Artron-Trace-ID",
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `trace-${Date.now()}`
    );
    return response;
  }

  // 4. Default: Attach trace ID and continue to page handler
  const response = NextResponse.next();
  response.headers.set(
    "X-Artron-Trace-ID",
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `trace-${Date.now()}`
  );
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static assets (.svg, .png, .jpg, .jpeg, .gif, .webp, .mp3, .m4a, .woff2)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp3|m4a|woff2)$).*)",
  ],
};
