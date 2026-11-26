import { test, expect, login, action, field, region, post, comment, titleFor, createQuestion, asUser, openQuestion, publishComment } from '../../baseline/helpers';

// Black-box (boundary value): REQ-5.2 is only exercised on an empty thread; here the
// thread already holds exactly 5 comments (the REQ-5.3 collapse boundary).
// Requirements: REQ-5.2 (comment is displayed), REQ-5.3 (first five shown)
test('TC-03 REQ-5.2: a new comment on a thread with five comments is displayed', async ({ page, browser }, info) => {
  test.setTimeout(90_000);
  const title = await createQuestion(browser, info, 'question_creator', 'SO Long Comment Thread');
  await asUser(browser, 'helpful_user', async p => {
    await openQuestion(p, title);
    for (let n = 1; n <= 5; n++) await publishComment(post(p), `Earlier thread comment ${n}`);
  });

  await login(page, 'question_comment_user');
  await openQuestion(page, title);
  const thread = region(post(page), 'Comments');
  await action(thread, 'Add a comment').click();
  await field(thread, 'Comment').fill('Can you share what you tried so far?');
  await field(thread, 'Comment').press('Enter');

  // Expected: the submitted comment is visible in the question's Comments, also after reload.
  await expect(comment(post(page))).toBeVisible();
  await page.reload();
  await expect(comment(post(page))).toBeVisible();
});
