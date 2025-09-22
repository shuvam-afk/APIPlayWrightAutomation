import { expect } from "@playwright/test";

export class tempRangeCompare {
  
  static expectToBeBetween(value: number, min: number, max: number) {
    expect(value).toBeGreaterThanOrEqual(min);
    expect(value).toBeLessThanOrEqual(max);
  }
}
