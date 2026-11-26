# TC-02: Editing a question can remove every tag

| Item | Value |
|---|---|
| Test method | White-box: branch/condition coverage of the edit endpoint |
| Requirements | REQ-3.4 Revise a question, REQ-3.9 Retain a saved revision, REQ-3.3 (a question has at least one tag) |
| Automation | [`tests/TC-02-edit-remove-all-tags.spec.ts`](tests/TC-02-edit-remove-all-tags.spec.ts) |
| Evidence | [`assets/TC-02-actual.png`](assets/TC-02-actual.png) |

## Design basis

`backend/src/api/register.ts` has two write paths for a question:

| Path | Title check | Body check | Tag check |
|---|---|---|---|
| `POST /api/questions` (publish) | `title.length < 15` | `body.length < 220` | `if (!tags.length) "Please add at least one tag"` |
| `PATCH /api/questions/:id` (edit) | `title.length < 15` | `body.length < 220` | **missing** |

The edit path never evaluates a "tags empty" condition, so an input where `cleanTags(req.body.tags)` returns `[]` takes a path that no test has covered. We picked the simplest input on that path: clear the Tags field in the UI editor.

The Edit page in `frontend/src/App.tsx` (`EditQuestionPage.save`) has no client-side tag check either.

## Difference from existing tests

`REQ-3.4.spec.ts` and `REQ-3.9.spec.ts` only save edits with the valid tags `http,retry`. No existing test submits an edit with an empty Tags field.

## Preconditions

- The application is running.
- Account `question_editor@example.com` / `Password123!`

## Steps

1. Log in as `question_editor@example.com` / `Password123!`.
2. Click **Ask Question**. Enter Title `SO Question Edit No Tags <unique suffix>`, a valid body of at least 220 characters (for example the shared retry body from `fixtures/data.ts`), and Tags `node.js,http,retry`. Click **Post Your Question**.
3. In **Question post**, click **Edit**. The Tags field is prefilled with `node.js,http,retry`.
4. Clear the **Tags** field completely. Enter Edit Summary `Removed all tags`.
5. Click **Save edits**.

## Expected behavior

The edit is rejected with `Please add at least one tag`, the editor stays open, and the question keeps its three tags. REQ-3.3 requires every question to carry at least one tag. REQ-3.4 and REQ-3.9 revise the same Title, Body and Tags fields, so an edit must not produce a question that could never have been published.

## Actual behavior

The edit is saved. The question detail shows the `edited` marker and **no tags at all**. The question also disappears from every tag page, so it can no longer be found through tag navigation (REQ-6.1, REQ-6.6).
