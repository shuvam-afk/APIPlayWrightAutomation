import { test, expect } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";

test.describe("Weather API Tests", () => {
  let client: ApiClient;
  let responseBody: any;

  test.beforeAll(async () => {
    client = new ApiClient();
    await client.init("https://api.openweathermap.org");

    // Make the API call once and reuse in tests
    const response = await client.get("/data/2.5/find", {
      q: "Bengaluru",
      appid: "5796abbde9106b7da4febfae8c44c232",
      units: "metric"
    });

    expect(response.status()).toBe(200); // status check once
    responseBody = await response.json();
  });

  test.afterAll(async () => {
    await client.close();
  });

  test("should have Bengaluru as the city name", async () => {
    expect(responseBody.list[0].name).toBe("Bengaluru");
  });

  test("should have correct temperature for Bengaluru", async () => {
    const expectedTemp = 27.17;
    expect(responseBody.list[0].main.temp).toBeCloseTo(expectedTemp, 1);
  });
});

