import { request, APIRequestContext } from "@playwright/test";

export class ApiClient {
  private requestContext!: APIRequestContext;

  async init(baseURL: string) {
    this.requestContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        "Accept": "*/*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        "User-Agent": "Playwright-Test",
      },
    });
  }

  async get(endpoint: string, params?: Record<string, string | number>) {
    const url = params
      ? `${endpoint}?${new URLSearchParams(params as any).toString()}`
      : endpoint;

    return this.requestContext.get(url);
  }

  async close() {
    await this.requestContext.dispose();
  }
}
