import { test, expect, entry, action, region } from '../../baseline/helpers';
import { retryTitle } from '../../baseline/fixtures/data';

// Black-box (equivalence partitioning): keyword search where the words appear in the
// title but not as one contiguous phrase.
// Requirement: REQ-6.3 (search by keyword, relevant public question links)
test('TC-04 REQ-6.3: keyword search finds a title containing all words non-contiguously', async ({ page }) => {
  await entry(page);
  const search = page.getByRole('banner').getByRole('searchbox', { name: 'Search', exact: true });
  await search.fill('react update');
  await search.press('Enter');
  const results = region(page, 'Search results');
  // Expected: "How does React state update?" is a relevant keyword match; the retry post is not.
  await expect(action(results, 'How does React state update?')).toBeVisible();
  await expect(action(results, retryTitle)).toHaveCount(0);
});
