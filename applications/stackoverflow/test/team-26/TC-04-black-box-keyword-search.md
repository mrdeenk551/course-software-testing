# TC-04: Keyword search misses a title that contains every keyword

| Item | Value |
|---|---|
| Test method | Black-box: equivalence partitioning of search queries |
| Requirement | REQ-6.3 Search public questions |
| Automation | [`tests/TC-04-search-keywords.spec.ts`](tests/TC-04-search-keywords.spec.ts) |
| Evidence | [`assets/TC-04-actual.png`](assets/TC-04-actual.png) |

## Design basis

REQ-6.3 says that pressing Enter in Search shows **relevant** public question links ranked by relevance, with keyword search as the general capability. We split multi-word keyword queries into:

1. the words appear in the title as one contiguous phrase (baseline: `react state` → "How does React state update?")
2. **the words all appear in the title, but not next to each other** (`react update` → "How does **React** state **update**?")

Class 2 uses no special syntax such as tag or user operators, which the requirement excludes. It is plain keywords, and the target is clearly relevant.

## Difference from existing tests

`REQ-6.3.spec.ts` only searches for the contiguous phrase `react state`. No existing test uses non-adjacent keywords.

## Preconditions

- An anonymous browser on the application. The seeded question "How does React state update?" exists in the initial data.

## Steps

1. Open the application home page. No login is needed.
2. In the banner **Search** box, type `react update`.
3. Press **Enter**.

## Expected behavior

**Search results** lists "How does React state update?", which contains both keywords, and does not list the unrelated retry question.

## Actual behavior

Search results shows `0 results for react update` and "No questions matched your search." The same happens for `state react`, so even reordering the baseline's own words returns nothing.
