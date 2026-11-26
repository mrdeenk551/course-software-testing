PR title: [Stack Overflow][Team 26] Add fault-revealing tests

No application code was changed. This PR adds only test scripts, test documents and screenshots under `applications/stackoverflow/test/team-26/`. Each test is Playwright-based (`tests/TC-0X-*.spec.ts`). See `RUNNING.md` for how to run them.

---

REQ-3.3 Test: Whitespace-only question body

## Description
Stack Overflow's Ask Question form publishes a question whose body is only whitespace.

## Requirement: Expected Output
REQ-3.3: missing or insufficient input shows "Question body is required (minimum 220 characters)". The editor stays open and nothing is published.

## Test description
Playwright-based (`tests/TC-01-whitespace-body.spec.ts`, doc: `TC-01-black-box-whitespace-only-body.md`)
1) Log in as question_creator@example.com / Password123!
2) Click on Ask Question
3) Enter a valid Title; in Body, enter 220 spaces; in Tags, enter node.js,http,retry
4) Click on Post Your Question
5) Observe output

## Observed Output
The question is published with an empty body. No error appears.

---

REQ-3.4 Test: Edit removes all tags

## Description
Stack Overflow's Edit question form saves a question with no tags.

## Requirement: Expected Output
REQ-3.4 / REQ-3.9 (with the REQ-3.3 tag rule): saving an edit with an empty Tags field shows "Please add at least one tag". The question keeps its tags.

## Test description
Playwright-based (`tests/TC-02-edit-remove-all-tags.spec.ts`, doc: `TC-02-white-box-edit-removes-all-tags.md`)
1) Log in as question_editor@example.com and publish a question with tags node.js,http,retry
2) Click on Edit in Question post
3) Clear Tags and enter an Edit Summary
4) Click on Save edits
5) Observe output

## Observed Output
The edit is saved. The question shows "edited" and has no tags.

---

REQ-5.2 Test: Comment on a thread with 5 comments

## Description
Stack Overflow hides a newly added comment when the thread already has 5 comments.

## Requirement: Expected Output
REQ-5.2: after pressing Enter, the question's Comments shows the submitted comment with attribution and a timestamp, before and after reload.

## Test description
Playwright-based (`tests/TC-03-comment-on-long-thread.spec.ts`, doc: `TC-03-black-box-comment-on-long-thread.md`)
1) Create a question and add 5 comments to it as helpful_user
2) Log in as question_comment_user and open the question
3) Click on Add a comment, enter "Can you share what you tried so far?", and press Enter
4) Reload the page
5) Observe output

## Observed Output
The new comment is not displayed. Only comments 1–5 and a "Show 1 more comments" button are visible.

---

REQ-6.3 Test: Keyword search

## Description
Stack Overflow's search does not find a question whose title contains every keyword, unless the words are adjacent.

## Requirement: Expected Output
REQ-6.3: Search results lists the relevant public question, "How does React state update?".

## Test description
Playwright-based (`tests/TC-04-search-keywords.spec.ts`, doc: `TC-04-black-box-keyword-search.md`)
1) Open the home page (anonymous)
2) In the banner Search box, enter "react update"
3) Press Enter
4) Observe output

## Observed Output
"0 results for react update". No questions match.

---

REQ-7.1 Test: New upvote in reputation history

## Description
A received upvote adds +10 reputation but is never recorded in Reputation history.

## Requirement: Expected Output
REQ-7.1: Reputation history lists, newest first, "question upvoted +10" linked to the question.

## Test description
Playwright-based (`tests/TC-05-reputation-history-new-vote.spec.ts`, doc: `TC-05-white-box-reputation-history.md`)
1) As question_creator, publish a question and note the profile Reputation
2) As question_upvoter, open the question and click on Up vote
3) As question_creator, reload the profile. Reputation is +10.
4) Click on Reputation in Profile navigation
5) Observe output

## Observed Output
"No reputation changes yet.", although Reputation increased by 10.

---

REQ-7.4 Test: New vote in private Votes log

## Description
A vote the user casts never appears in their private Votes log.

## Requirement: Expected Output
REQ-7.4: the owner's Votes view lists the upvote with a link to the voted question.

## Test description
Playwright-based (`tests/TC-06-votes-log-new-vote.spec.ts`, doc: `TC-06-white-box-votes-log.md`)
1) Create a question as question_creator
2) Log in as question_upvoter, open the question, and click on Up vote
3) Click on the Stack User profile, then Activity, then Votes
4) Observe output

## Observed Output
"You have not cast any votes".

---

REQ-3.5 Test: Delete an answered question

## Description
The owner can delete a question that already has an answer.

## Requirement: Expected Output
REQ-3.5: only an unanswered, minimally engaged own question is eligible for deletion. For an answered question, Delete is absent or disabled.

## Test description
Playwright-based (`tests/TC-07-delete-answered-question.spec.ts`, doc: `TC-07-white-box-delete-answered-question.md`)
1) As question_deleter, publish a question
2) As helpful_user, post an answer to it
3) As question_deleter, open the question
4) Observe Delete in Question post

## Observed Output
Delete is visible and enabled. Confirming it removes the answered question.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01GmrGytsM2JSWMPYf3pQAzT
