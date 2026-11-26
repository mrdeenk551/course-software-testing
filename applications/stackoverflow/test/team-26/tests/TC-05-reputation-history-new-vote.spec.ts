import { test, expect, login, action, region, output, profileNav, ownProfile, numeric, titleFor, composeQuestion, asUser, openQuestion, post } from '../../baseline/helpers';

// White-box: register.ts POST /api/questions/:id/vote changes author.reputation (+10)
// but never appends an entry to author.reputationHistory, which ReputationHistory renders.
// Requirements: REQ-7.1 (reputation history with reasons/changes/links), REQ-3.6 (+10 on upvote)
test('TC-05 REQ-7.1: an upvote received appears in the author reputation history', async ({ page, browser }, info) => {
  await login(page, 'question_creator');
  const title = titleFor(info, 'SO Reputation History Question');
  await composeQuestion(page, title);
  await ownProfile(page);
  const before = await numeric(page, 'Reputation');

  await asUser(browser, 'question_upvoter', async p => {
    await openQuestion(p, title);
    await action(post(p), 'Up vote').click();
    await expect(output(post(p), 'Score')).toHaveText('1');
  });

  await page.reload();
  await expect(output(page, 'Reputation').first()).toHaveText(String(before + 10));
  await action(profileNav(page), 'Reputation').click();
  const history = region(page, 'Reputation history');
  // Expected: a newest-first entry "question upvoted" +10 linking to the question.
  await expect(history).toContainText('question upvoted');
  await expect(history).toContainText('+10');
  await expect(action(history, title)).toBeVisible();
});
