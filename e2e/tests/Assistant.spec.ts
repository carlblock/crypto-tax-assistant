import test, { expect, Page } from '@playwright/test'

test.describe('Assistant flow', () => {
  const URL = 'http://localhost:5173/assistant'
  test('successfully navigates through the get started flow', async ({ page }: { page: Page }) => {
    // Given - Initial setup
    await page.goto(URL)
    await expect(page).toHaveURL(URL)


    const getExchangeElements = (page: Page) => ({
      select: page.getByTestId('ExchangeSelect:trigger_main'),
      dropdown: page.getByTestId('ExchangeSelect:content_options'),
      krakenOption: page.getByTestId('ExchangeSelect:option_kraken'),
      continueButton: page.getByTestId('ExchangeStep:button_continue'),
      getOption: (exchange: string) => page.getByTestId(`ExchangeSelect:option_${exchange}`),
      getAllNonKrakenOptions: () => page.getByTestId(/^ExchangeSelect:option_(?!kraken)/).all()
    })

    const getCSVProcessElements = (page: Page) => ({
      fileInput: page.getByTestId('CSVProcessStep:input_file'),
      continueButton: page.getByTestId('CSVProcessStep:button_continue'),
    })

    await test.step('shows exchange dropdown and selects Kraken', async () => {
      const { select, dropdown, krakenOption, continueButton } = getExchangeElements(page)

      // Verify initial state
      await expect(select).toBeVisible()
      await expect(select).toBeEnabled()
      await expect(select).toHaveText('Crypto Exchange')

      await expect(continueButton).toBeDisabled()

      // Open dropdown
      await select.click()
      await expect(dropdown).toBeVisible()

      // Verify Kraken is enabled
      await expect(krakenOption).toBeEnabled()

      // Select Kraken
      await krakenOption.click()

      // Verify selection
      await expect(select).toHaveText('Kraken')
      await expect(dropdown).not.toBeVisible()
      // Continue button should be enabled now
      await expect(continueButton).toBeEnabled()
      await continueButton.click()
    })

    await test.step('shows descriptions to how to export transactions from Kraken', async () => {
      const descriptions = page.getByTestId('CSVExportStep:instructions')
      // Find a mention of "Kraken" in the description
      await expect(descriptions).toContainText('Kraken')
      await page.getByTestId('CSVExportStep:button_continue').click()
    })

    await test.step('CSV upload step', async () => {
      const { fileInput, continueButton } = getCSVProcessElements(page)
      await fileInput.setInputFiles('e2e/data/test_transactions.csv')
      await expect(continueButton).toBeEnabled()
      await continueButton.click()
    })

  })
})

