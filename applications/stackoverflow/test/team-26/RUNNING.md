# Running the Team 26 automation scripts

Each test document can be reproduced by hand. The Playwright specs in `tests/` automate the same steps. Every spec **fails** against the provided implementation, and the failing assertion is the fault.

The specs reuse the unmodified baseline helpers (`../baseline/helpers.ts`, `../baseline/fixtures/data.ts`).

## Dependencies

- Node.js 22.12+
- `@playwright/test` 1.63 and a Chromium browser. They are installed only for the run and are not committed.

## Steps

1. Start the application on a fresh database (recommended, because the database persists between launches):

   ```sh
   cd applications/stackoverflow
   # Linux/macOS: use a throw-away database file
   DATABASE_URL=/tmp/team26.db sh start.sh
   # Windows PowerShell
   $env:DATABASE_URL="$env:TEMP\team26.db"; .\start.bat
   ```

   Note the printed URL, for example `http://127.0.0.1:3000`.

2. In a second terminal:

   ```sh
   cd applications/stackoverflow/test
   npm install --no-save @playwright/test@1.63.0
   npx playwright install chromium
   BASE_URL=http://127.0.0.1:3000 npx playwright test -c team-26/playwright.config.ts
   ```

   On Windows PowerShell, set the variable with `$env:BASE_URL="http://127.0.0.1:3000"` before `npx playwright test -c team-26/playwright.config.ts`.

## Expected result on the provided implementation

All 7 specs fail. We verified this on two independent fresh databases. The failure messages match the "Actual behavior" section of each test document:

| Spec | Failing assertion |
|---|---|
| TC-01 | `Question body is required (minimum 220 characters)` not shown; the question is published |
| TC-02 | `Please add at least one tag` not shown; the edit is saved with no tags |
| TC-03 | The new comment is not visible; only `Show 1 more comments` appears |
| TC-04 | `0 results for react update` |
| TC-05 | Reputation history shows `No reputation changes yet.` |
| TC-06 | Votes shows `You have not cast any votes` |
| TC-07 | `Delete` is enabled on an answered question |
