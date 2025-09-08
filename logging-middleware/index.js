export function createLogger({
  baseUrl,
  endpoint = "/evaluation-service/logs",
  token,
}) {
  if (!baseUrl) throw new Error("Logger: baseUrl is required");

  async function Log(stack, level, pkg, message) {
    const payload = {
      stack: String(stack),
      level: String(level),
      package: String(pkg),
      message: String(message),
    };

    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Log failed: ${res.status} ${text}`);
    }
  }

  return { Log };
}
