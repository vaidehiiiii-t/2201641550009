export function createLogger({
  baseUrl,
  endpoint = "/evaluation-service/logs",
  token,
}) {
  if (!baseUrl) throw new Error("Logger: baseUrl is required");

  async function post(url, body) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Log POST failed: ${res.status} ${text}`);
    }
  }

  async function Log(stack, level, pkg, message, meta) {
    const payload = {
      stack,
      level,
      package: pkg,
      message,
      meta,
      timestamp: new Date().toISOString(),
    };
    const url = `${baseUrl}${endpoint}`;

    let attempt = 0;
    while (attempt < 3) {
      try {
        await post(url, payload);
        return;
      } catch (e) {
        attempt++;
        await new Promise((r) => setTimeout(r, 200 * attempt));
      }
    }

    throw new Error("failed to send log after retries");
  }

  return { Log };
}
