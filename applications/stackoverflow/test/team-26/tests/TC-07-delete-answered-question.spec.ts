import { test, expect, login, action, post, titleFor, composeQuestion, createAnswer, openQuestion, noUsableAction, region } from '../../baseline/helpers';

// White-box: register.ts DELETE /api/questions/:id only checks ownership; App.tsx shows
// Delete whenever ownQuestion is true. Neither checks that the question is unanswered.
// Requirement: REQ-3.5 (only an unanswered, minimally engaged own question is eligible)
test('TC-07 REQ-3.5: an answered question is not eligible for owner deletion', async ({ page, browser }, info) => {
  await login(page, 'question_deleter');
  const title = titleFor(info, 'SO Answered Not Deletable');
  await composeQuestion(page, title);
  await createAnswer(browser, title, 'helpful_user');
  await openQuestion(page, title);
  await expect(region(page, 'Answers')).toContainText('Use exponential backoff');
  // Expected: Delete absent or disabled for the answered question.
  await noUsableAction(post(page), 'Delete');
});
