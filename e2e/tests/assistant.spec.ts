import { expect, test } from "@playwright/test";

test.describe('Get Started Flow', () => {
  test('successfully navigates through the get started flow', async ({ page }) => {
    // Given - Initial setup
    await page.goto('http://localhost:5173')
    await expect(page).toHaveURL('http://localhost:5173')

    // When - User clicks the Get Started button
    await test.step('User clicks the Get Started button', async () => {
      const getStartedButton = page.getByTestId('GetStartedDisclaimer:button_cta')
      await expect(getStartedButton).toBeVisible()
      await expect(getStartedButton).toBeEnabled()
      await getStartedButton.click()
    })

    await test.step('User accepts the disclaimer', async () => {
      // Then - Disclaimer dialog should appear
      const acceptButton = page.getByTestId('GetStartedDisclaimerContent:button_accept')
      await expect(acceptButton).toBeVisible()
      await expect(acceptButton).toBeEnabled()

      // When - User accepts the disclaimer
      await acceptButton.click()

      // Then - Should navigate to the assistant page
      // Note: Replace with actual URL/element that confirms successful navigation
      await expect(page).not.toHaveURL('http://localhost:5173')
      // Add assertion for successful navigation, e.g.:
      await expect(page.getByTestId('AssistantView:container')).toBeVisible()
    })

  })
})
