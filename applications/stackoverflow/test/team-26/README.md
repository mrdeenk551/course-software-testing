# Stack Overflow: Team 26 fault-revealing tests

**Team 26.** Leader: mrdeenk

| Member | GitHub ID |
|---|---|
| _(name)_ | mrdeenk |
| _(name)_ | _(id)_ |

## Test cases

| ID | Method | Requirement(s) | Fault |
|---|---|---|---|
| [TC-01](TC-01-black-box-whitespace-only-body.md) | Black-box (equivalence partitioning) | REQ-3.3 | A question whose body is 220 spaces is published with an empty body |
| [TC-02](TC-02-white-box-edit-removes-all-tags.md) | White-box (branch/condition) | REQ-3.4, REQ-3.9, REQ-3.3 | Editing can save a question with no tags |
| [TC-03](TC-03-black-box-comment-on-long-thread.md) | Black-box (boundary value) | REQ-5.2, REQ-5.3 | A new comment on a thread with 5 comments is hidden from its author |
| [TC-04](TC-04-black-box-keyword-search.md) | Black-box (equivalence partitioning) | REQ-6.3 | Search `react update` finds nothing, although "How does React state update?" matches |
| [TC-05](TC-05-white-box-reputation-history.md) | White-box (data flow) | REQ-7.1, REQ-3.6 | A received upvote adds +10 but never appears in Reputation history |
| [TC-06](TC-06-white-box-votes-log.md) | White-box (data flow) | REQ-7.4 | A cast vote never appears in the owner's private Votes log |
| [TC-07](TC-07-white-box-delete-answered-question.md) | White-box (condition) | REQ-3.5 | The owner can delete a question that already has an answer |

## Reproduction

Every document lists manual steps. Automated versions are in [`tests/`](tests/) and reuse the unmodified baseline helpers. See [RUNNING.md](RUNNING.md) for dependencies and the exact command. All 7 specs fail against the provided implementation, and we confirmed this on two fresh databases. Screenshots of the actual behavior are in [`assets/`](assets/).
