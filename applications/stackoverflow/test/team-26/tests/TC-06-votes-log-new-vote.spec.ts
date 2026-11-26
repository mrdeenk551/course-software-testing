import { test, expect, login, action, post, output, activity, titleFor, createQuestion, openQuestion } from '../../baseline/helpers';

// White-box: register.ts vote handlers never append to user.privateVotes, so the owner's
// private Votes view (ActivityContent view === "Votes") only ever shows seeded entries.
// Requirement: REQ-7.4 (private Votes log shows the owner's actions)
test('TC-06 REQ-7.4: a cast vote appears in the voter private Votes log', async ({ page, browser }, info) => {
  const title = await createQuestion(browser, info, 'question_creator', 'SO Votes Log Question');
  await login(page, 'question_upvoter');
  await openQuestion(page, title);
  await action(post(page), 'Up vote').click();
  await expect(output(post(page), 'Score')).toHaveText('1');

  const content = await activity(page, 'Votes');
  // Expected: the owner sees an upvote entry linking to the voted question.
  await expect(content).toContainText('upvote');
  await expect(action(content, title)).toBeVisible();
});
