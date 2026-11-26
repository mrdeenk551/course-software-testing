# TC-06: A vote the user casts never appears in their private Votes log

| Item | Value |
|---|---|
| Test method | White-box: data-flow (def-use) analysis of `privateVotes` |
| Requirement | REQ-7.4 Navigate owned activity (private Votes log) |
| Automation | [`tests/TC-06-votes-log-new-vote.spec.ts`](tests/TC-06-votes-log-new-vote.spec.ts) |
| Evidence | [`assets/TC-06-actual.png`](assets/TC-06-actual.png) |

## Design basis

REQ-7.4 says the owner's **private Votes log** shows their actions (for example `upvote` + parent link), and only the owner can see it.

In the code, the Votes view of `ActivityContent` (`frontend/src/App.tsx`, `view === "Votes"`) reads only `user.privateVotes`. In `backend/src/api/register.ts`, no handler (question vote, answer vote or comment vote) ever appends to `privateVotes`. The field is set only in the seed data for `activity_user`. We built an input that defines a vote and then uses the log: a user upvotes, then opens their own Votes view.

## Difference from existing tests

`REQ-7.4.spec.ts` checks only the seeded `activity_user` vote, plus the fact that Votes is unavailable to other users. No existing test checks that a newly cast vote is logged.

## Preconditions

- Accounts `question_creator` and `question_upvoter` (`@example.com` / `Password123!`).

## Steps

1. As `question_creator`, ask a question `SO Votes Log Question <unique suffix>` (valid body, tags `node.js,http,retry`).
2. Log in as `question_upvoter`, open that question, and click **Up vote**. The Score becomes 1 and Up vote is pressed.
3. Click the **Stack User** profile action, then **Activity**, then **Votes** in Activity navigation.

## Expected behavior

The owner's Votes log contains an `upvote` entry linking to `SO Votes Log Question …` (REQ-7.4).

## Actual behavior

Activity content shows `You have not cast any votes`, even though the vote is active and still pressed on the question.
