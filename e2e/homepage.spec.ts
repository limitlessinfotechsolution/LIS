import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Limitless Infotech/)
  })

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/')
    
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /services/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /about/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible()
  })

  test('should have hero section', async ({ page }) => {
    await page.goto('/')
    
    const hero = page.locator('[class*="hero"]').first()
    await expect(hero).toBeVisible()
  })

  test('should navigate to services page', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /services/i }).first().click()
    await expect(page).toHaveURL(/\/services/)
  })

  test('should open contact form', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /contact/i }).first().click()
    await expect(page).toHaveURL(/\/contact/)
    
    await expect(page.getByLabel(/name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
  })

  test('should have footer', async ({ page }) => {
    await page.goto('/')
    
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('should be responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    await expect(page.locator('nav')).toBeVisible()
  })
})
