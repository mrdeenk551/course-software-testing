# TC-05: A received upvote changes reputation but never appears in Reputation history

| Item | Value |
|---|---|
| Test method | White-box: data-flow (def-use) analysis of reputation |
| Requirements | REQ-7.1 Read reputation history, REQ-3.6 Toggle question upvote (+10) |
| Automation | [`tests/TC-05-reputation-history-new-vote.spec.ts`](tests/TC-05-reputation-history-new-vote.spec.ts) |
| Evidence | [`assets/TC-05-actual.png`](assets/TC-05-actual.png) |

## Design basis

REQ-7.1 says Reputation history lists entries newest first, with reasons such as **question upvoted** and **answer upvoted**, signed changes, and links to the parent posts. REQ-3.6 makes a question upvote add +10 to the author's reputation.

Following the data flow in `backend/src/api/register.ts`:

- `POST /api/questions/:id/vote` and `POST /api/answers/:id/vote` **define** `author.reputation += 10` (or −2).
- Neither handler ever writes `author.reputationHistory`.
- `ReputationHistory` in `frontend/src/App.tsx` **uses** only `user.reputationHistory`.

So the only entries the history can show are the two seeded for `activity_user`. We selected an input that exercises the vote → history path for an account with no seeded history.

## Difference from existing tests

- `REQ-7.1.spec.ts` and `REQ-7.4.spec.ts` only read the two seeded entries of `activity_user`.
- `REQ-3.6.spec.ts` only checks the reputation number.

No existing test checks that a new vote is recorded in the history.

## Preconditions

- Accounts `question_creator` and `question_upvoter` (`@example.com` / `Password123!`).

## Steps

1. As `question_creator`, ask a question `SO Reputation History Question <unique suffix>` (valid body, tags `node.js,http,retry`).
2. Click the **Stack User** profile action and note the **Reputation** value R (100 on a fresh database).
3. In another browser or private window, log in as `question_upvoter`, open the question, and click **Up vote**. The Score becomes 1.
4. Back in the creator's window, reload the profile. Reputation is now **R + 10**, as expected.
5. In **Profile navigation**, click **Reputation**.

## Expected behavior

Reputation history shows a newest-first entry **question upvoted, +10**, linking to the question. This explains the +10 the author just received (REQ-7.1).

## Actual behavior

Reputation history shows `No reputation changes yet.`, while the profile's Reputation figure has already increased by 10. The history and the reputation total contradict each other.
