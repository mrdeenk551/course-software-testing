import { test, expect, login, action, field, post, titleFor, composeQuestion } from '../../baseline/helpers';

// White-box: backend/src/api/register.ts PATCH /api/questions/:id validates title and body
// but has no "at least one tag" check, unlike POST /api/questions.
// Requirements: REQ-3.4 (revise a question), REQ-3.3 (at least one tag), REQ-3.9
test('TC-02 REQ-3.4: saving an edit that removes every tag must be rejected', async ({ page }, info) => {
  await login(page, 'question_editor');
  const title = titleFor(info, 'SO Question Edit No Tags');
  await composeQuestion(page, title);
  await action(post(page), 'Edit').click();
  await expect(field(page, 'Tags')).toHaveValue('node.js,http,retry');
  await field(page, 'Tags').fill('');
  await field(page, 'Edit Summary').fill('Removed all tags');
  await action(page, 'Save edits').click();

  // Expected: Please add at least one tag, editor retained, tags unchanged.
  await expect(page.getByText('Please add at least one tag', { exact: true })).toBeVisible();
  await expect(field(page, 'Edit Summary')).toBeVisible();
});
