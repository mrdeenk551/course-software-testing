# TC-01: A whitespace-only question body is published

| Item | Value |
|---|---|
| Test method | Black-box: equivalence partitioning of the Body field |
| Requirement | REQ-3.3 Publish a question (SCN-REQ-3.3-02 / -03 rules) |
| Automation | [`tests/TC-01-whitespace-body.spec.ts`](tests/TC-01-whitespace-body.spec.ts) |
| Evidence | [`assets/TC-01-actual.png`](assets/TC-01-actual.png) |

## Design basis

REQ-3.3 says that **missing** or insufficient input shows `Question body is required (minimum 220 characters)` and that nothing is published. We split Body input into three classes:

1. empty (already covered by the baseline)
2. fewer than 220 visible characters (baseline uses 219 `a`)
3. **220 characters that are all whitespace**: the body has no content, so it is "missing", but its raw length is 220

The Title field in the same form is trimmed before its minimum-length check, so the editor already treats whitespace as non-content. We chose class 3 to check that Body is treated the same way.

## Difference from existing tests

`REQ-3.3.spec.ts` only submits an empty body and a 219-character body made of letters. No existing test submits a whitespace-only body.

## Preconditions

- The application is running. Any database state works.
- Account `question_creator@example.com` / `Password123!`

## Steps

1. Click **Log in** and sign in as `question_creator@example.com` / `Password123!`.
2. In **Question feed**, click **Ask Question**.
3. Title: `SO Whitespace Body Question <any unique suffix>`.
4. Body: exactly **220 spaces** and nothing else. A quick way is to run `' '.repeat(220)` in the browser console and paste the result.
5. Tags: `node.js,http,retry`.
6. Click **Post Your Question**.

## Expected behavior

The editor stays open and shows `Question body is required (minimum 220 characters)`. No question is published, because a body of only whitespace is missing content (REQ-3.3).

## Actual behavior

The question is published. Its detail page opens with the title, an **empty Question post body**, and the three tags. It also appears in the public feed.
