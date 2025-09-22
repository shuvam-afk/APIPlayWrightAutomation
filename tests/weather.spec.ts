import { test, expect } from "@playwright/test";
import { ApiClient } from "../utils/apiClient";
import { tempRangeCompare } from "../utils/helper"; 

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
    const temp = responseBody.list[0].main.temp;

    // Use helper to check the temperature range (26–27)
    tempRangeCompare.expectToBeBetween(temp, 26, 27);
  });

    test("should have correct country code", async () => {
    const expectedCountry = "IN";
    expect(responseBody.list[0].sys.country).toBe(expectedCountry);
  });
});

