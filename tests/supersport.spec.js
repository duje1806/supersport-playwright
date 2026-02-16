import { test, expect } from '@playwright/test';

test('Supersport - matematička provjera dobitka (2 para)', async ({ page }) => {

  await page.goto('https://www.supersport.hr/sport/day/1');

  const cookieButtons = page.getByRole('button', { name: /prihvati/i });
  const cookieCount = await cookieButtons.count();

  for (let i = 0; i < cookieCount; i++) {
    if (await cookieButtons.nth(i).isVisible()) {
      await cookieButtons.nth(i).click();
    }
  }

  await page.waitForTimeout(1000);

  await page.waitForSelector('tr[data-id="TableRow"]');

  const rows = page.locator('tr[data-id="TableRow"]');
  const rowCount = await rows.count();

  expect(rowCount).toBeGreaterThan(1);

  const firstRowIndex = Math.floor(Math.random() * rowCount);
  let secondRowIndex = Math.floor(Math.random() * rowCount);

  while (secondRowIndex === firstRowIndex) {
    secondRowIndex = Math.floor(Math.random() * rowCount);
  }

  const firstRowOdds = rows
    .nth(firstRowIndex)
    .locator('td[class*="table-outcomes-module_outcome"]');

  const secondRowOdds = rows
    .nth(secondRowIndex)
    .locator('td[class*="table-outcomes-module_outcome"]');

  const firstOddIndex = Math.floor(Math.random() * await firstRowOdds.count());
  const secondOddIndex = Math.floor(Math.random() * await secondRowOdds.count());

  await firstRowOdds.nth(firstOddIndex).click();
  await secondRowOdds.nth(secondOddIndex).click();

  const slipOddsLocator = page.locator('div[class*="OddInfo-module_odd-info"] span');
  await expect(slipOddsLocator).toHaveCount(2);

  const odd1 = parseFloat(
    (await slipOddsLocator.nth(0).innerText()).replace(',', '.')
  );

  const odd2 = parseFloat(
    (await slipOddsLocator.nth(1).innerText()).replace(',', '.')
  );

  console.log("Koef 1:", odd1);
  console.log("Koef 2:", odd2);

  const combinedOdd = Number((odd1 * odd2).toFixed(4));
  console.log("Kombinirani tečaj:", combinedOdd);

  const stake = Math.floor(Math.random() * 20) + 5;
  console.log("Ulog:", stake);

  const stakeInput = page.locator('input.custom-input');
  await stakeInput.fill('');
  await stakeInput.fill(String(stake));

  await page.waitForTimeout(1000);

  const winLocator = page
    .locator('div[class*="SlipPreparationFinancialHeader-module_eventual-withdrawal"]')
    .locator('div[class*="value"]');

  const winText = await winLocator.innerText();

  const displayedWin = parseFloat(
    winText.replace(',', '.').replace(/[^\d.]/g, '')
  );

  console.log("Prikazana isplata:", displayedWin);

  const manipulationFeeRate = 0.05;
  const taxRate = 0.10;

  const netStake = stake - (stake * manipulationFeeRate);
  const grossWin = netStake * combinedOdd;
  const tax = (grossWin - netStake) * taxRate;
  const calculatedWin = Number((grossWin - tax).toFixed(2));

  console.log("Izračunata isplata:", calculatedWin);

  const difference = Math.abs(displayedWin - calculatedWin);

  console.log("Razlika:", difference);

  expect(difference).toBeLessThanOrEqual(0.01);

});
