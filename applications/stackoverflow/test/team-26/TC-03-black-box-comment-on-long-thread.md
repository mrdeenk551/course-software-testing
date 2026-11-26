# TC-03: A new comment on a thread that already has 5 comments is not displayed

| Item | Value |
|---|---|
| Test method | Black-box: boundary value analysis (the 5-comment collapse limit) |
| Requirements | REQ-5.2 Comment on a question, REQ-5.3 Expand hidden comments |
| Automation | [`tests/TC-03-comment-on-long-thread.spec.ts`](tests/TC-03-comment-on-long-thread.spec.ts) |
| Evidence | [`assets/TC-03-actual.png`](assets/TC-03-actual.png) |

## Design basis

REQ-5.3 defines a boundary: Comments initially shows the first five comments, and the rest sit behind "Show N more comments". REQ-5.2 requires that after a user adds a comment, the question's Comments region **displays** it, both immediately and after a refresh.

The baseline REQ-5.2 test adds a comment to an empty thread (0 → 1). We tested the boundary instead: a thread with exactly 5 comments, plus one new comment.

## Difference from existing tests

- `REQ-5.2.spec.ts` comments on a new question with no comments.
- `REQ-5.3.spec.ts` only views 7 seeded comments and adds none.

No existing test adds a comment once the 5-comment limit has been reached.

## Preconditions

- Accounts `question_creator`, `helpful_user` and `question_comment_user` (all `@example.com` / `Password123!`).

## Steps

1. As `question_creator`, ask a question titled `SO Long Comment Thread <unique suffix>`, with a valid body and tags `node.js,http,retry`.
2. As `helpful_user`, open that question. Use **Add a comment** and Enter five times to add `Earlier thread comment 1` … `Earlier thread comment 5`. All five are visible.
3. As `question_comment_user`, open the same question. In **Question post → Comments**, click **Add a comment**, type `Can you share what you tried so far?`, and press **Enter**.
4. Reload the page.

## Expected behavior

The question's Comments region displays `Can you share what you tried so far?` with Stack User attribution and a timestamp, before and after reload (REQ-5.2).

## Actual behavior

The comment is saved but **not displayed**. Comments still shows only `Earlier thread comment 1–5`, followed by a `Show 1 more comments` button. The user gets no sign that their comment was posted. The comment stays hidden after reload and is visible only after clicking `Show 1 more comments`.
