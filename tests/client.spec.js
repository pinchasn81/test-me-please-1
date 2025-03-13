import { test, expect } from '@playwright/test';

test.describe('Calculator Client Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  // Test 1: Basic UI Elements
  test('should display calculator elements', async ({ page }) => {
    // Use more specific selectors
    await expect(page.locator('#num1')).toBeVisible();
    await expect(page.locator('#num2')).toBeVisible();
    await expect(page.locator('button')).toBeVisible();
  });

  // Test 2: Basic Addition
  test('should perform basic addition', async ({ page }) => {
    await page.locator('#num1').fill('5');
    await page.locator('#num2').fill('3');
    await page.locator('button').click();

    // Wait for specific result element
    await expect(page.locator('.result')).toContainText('8');
  });

  // Test 3: Division by Zero (This should fail due to missing error handling)
  test('should show error message for division by zero', async ({ page }) => {
    await page.locator('#num1').fill('10');
    await page.locator('#num2').fill('0');
    await page.locator('select').selectOption('/');
    await page.locator('button').click();

    // Look for specific error element
    await expect(page.locator('.error')).toBeVisible();
  });

  // Test 4: Input Validation
  test('should validate numeric input', async ({ page }) => {
    await page.locator('#num1').fill('abc');
    await page.locator('button').click();

    // Check that result is empty or shows validation message
    await expect(page.locator('.result')).not.toContainText(/[0-9]+/);
  });

  // Test 5: Basic Operation
  test('should perform basic calculation', async ({ page }) => {
    await page.locator('#num1').fill('5');
    await page.locator('#num2').fill('3');
    await page.locator('button').click();

    // Check for result in specific element
    await expect(page.locator('.result')).toBeVisible();
  });
}); 