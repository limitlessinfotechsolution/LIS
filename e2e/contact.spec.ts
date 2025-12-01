import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('should display contact form', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/message/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    await page.getByRole('button', { name: /send/i }).click()
    
    // Check for validation messages
    await expect(page.locator('text=/required/i').first()).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.getByLabel(/email/i).fill('invalid-email')
    await page.getByRole('button', { name: /send/i }).click()
    
    await expect(page.locator('text=/valid email/i')).toBeVisible()
  })

  test('should submit form successfully', async ({ page }) => {
    await page.getByLabel(/name/i).fill('John Doe')
    await page.getByLabel(/email/i).fill('john@example.com')
    await page.getByLabel(/message/i).fill('Test message')
    
    await page.getByRole('button', { name: /send/i }).click()
    
    // Wait for success message
    await expect(page.locator('text=/success/i')).toBeVisible({ timeout: 10000 })
  })
})
