# TC-07: The owner can delete a question that already has an answer

| Item | Value |
|---|---|
| Test method | White-box: condition coverage of the deletion eligibility check |
| Requirements | REQ-3.5 Delete an eligible own question, REQ-3.10 |
| Automation | [`tests/TC-07-delete-answered-question.spec.ts`](tests/TC-07-delete-answered-question.spec.ts) |
| Evidence | [`assets/TC-07-actual.png`](assets/TC-07-actual.png) |

## Design basis

REQ-3.5 limits owner deletion to an **eligible** question: an *unanswered, minimally engaged* question. Answers are therefore part of the eligibility condition.

In the code:

- `frontend/src/App.tsx`, `QuestionDetailPage`: `{ownQuestion && <button>Delete</button>}`. The only condition is ownership.
- `backend/src/api/register.ts`, `DELETE /api/questions/:id`: it checks only `question.authorId !== user.id`.

Neither checks `answers.length`, so the "owner + answered" combination is never evaluated. We built an input with that combination.

## Difference from existing tests

- `REQ-3.5.spec.ts` deletes only an unanswered question (the eligible case).
- `REQ-3.10.spec.ts` checks a non-owner.

No existing test checks the owner of an **answered** question.

## Preconditions

- Accounts `question_deleter` and `helpful_user` (`@example.com` / `Password123!`).

## Steps

1. As `question_deleter`, ask `SO Answered Not Deletable <unique suffix>` (valid body, tags `node.js,http,retry`).
2. As `helpful_user`, open that question and post an answer, for example the shared answer from `fixtures/data.ts`. Answer count becomes 1.
3. As `question_deleter`, open the question again and look at **Question post**.

## Expected behavior

The question is not eligible for deletion, because it has an answer (REQ-3.5). **Delete** is absent or disabled.

## Actual behavior

**Delete** is shown and enabled. Clicking it and confirming removes the answered question, including Helpful User's answer, from the public feed and search.
