import { test, expect, login, action, field, region, post, titleFor } from '../../baseline/helpers';

// Black-box (equivalence partitioning): a Body made only of whitespace is "missing" input.
// Requirement: REQ-3.3
test('TC-01 REQ-3.3: whitespace-only body must not publish a question', async ({ page }, info) => {
  await login(page, 'question_creator');
  await action(region(page, 'Question feed'), 'Ask Question').click();
  const title = titleFor(info, 'SO Whitespace Body Question');
  await field(page, 'Title').fill(title);
  await field(page, 'Body').fill(' '.repeat(220));
  await field(page, 'Tags').fill('node.js,http,retry');
  await action(page, 'Post Your Question').click();

  // Expected: rejected with the body error, editor retained, nothing published.
  await expect(page.getByText('Question body is required (minimum 220 characters)', { exact: true })).toBeVisible();
  await expect(field(page, 'Body')).toBeVisible();
  await expect(post(page)).toHaveCount(0);
});
