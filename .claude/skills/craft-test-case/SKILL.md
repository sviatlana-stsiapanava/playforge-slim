---
name: craft-test-case
description: Use when a feature requirement must be turned into structured test cases before any test code is written. Produces test-cases/<feature-slug>.md, the input to the create-test workflow.
---

# Craft Test Case

## Purpose
Turn one feature requirement into structured, technique-derived test cases and a coverage checklist, before any test code is written. The saved file is the input to the `create-test` workflow. This skill designs test cases only; it writes no test code.

## When to run
Run in the main conversation, because it may need to ask the user questions, when a feature requirement has no crafted `test-cases/<feature-slug>.md` yet.

## Procedure
Run the three phases in order. Do not start a phase before the previous one is complete.

### 1. Parse the requirement
Input: one feature requirement as given by the user (text, ticket, or acceptance criteria).
1. Restate the feature in one sentence and derive a kebab-case `<feature-slug>` from it.
2. Extract and list separately:
   - **Actors**: who uses the feature (e.g. anonymous visitor, logged-in user).
   - **Preconditions**: state that must exist before the feature is used.
   - **Inputs**: every field, parameter, or action the user provides, with any stated type, format, length, or allowed values.
   - **Business rules**: every condition that changes the outcome.
   - **Expected outcomes**: the observable result for each rule (text, element, URL, state).
   - **Out of scope**: anything the requirement explicitly excludes.
3. List **open questions** for anything ambiguous, missing, or contradictory (e.g. an input with no stated limits, a rule with no stated error message). Do not invent answers.
4. If any open question blocks scenario design, ask the user all of them in one numbered message and wait for answers. Record each answer next to its question.

Done when the six lists and the open questions (with answers, or `none`) exist.

### 2. Apply test techniques
1. For every input, apply the techniques that fit and name the one used for each scenario:
   - **Equivalence partitioning**: one scenario per valid and invalid class.
   - **Boundary value analysis**: values at, just below, and just above every stated limit.
   - **Decision table**: one scenario per meaningful combination of business-rule conditions.
   - **State transition**: one scenario per valid transition and per relevant invalid transition.
   - **Error guessing**: likely failures not covered above (empty input, whitespace, special characters, double submit).
2. Merge scenarios that exercise the same behavior with the same expected outcome; keep the one with the clearest parameters.
3. Assign each scenario a pyramid level:
   - **unit** — pure logic with no UI or network.
   - **api** — behavior verifiable through a request/response.
   - **e2e** — behavior that needs the browser UI. Only e2e scenarios are implemented by the create-test workflow.
4. Assign a priority: **P1** (core happy path or blocking failure), **P2** (important rule or boundary), **P3** (edge case).
5. Trace each scenario back to the business rule or expected outcome it covers; flag any rule with no scenario.

Done when this derived-scenarios table exists, followed by a list of uncovered rules (or `none`):

| # | Scenario | Technique | Pyramid level | Priority | Parameters | Expected result | Covers rule |
|---|----------|-----------|---------------|----------|------------|-----------------|-------------|

### 3. Produce the test cases
1. Give every scenario a stable case ID: `TC-<FEATURE>-<NNN>`, where `<FEATURE>` is the upper-case feature slug and `<NNN>` is a zero-padded sequence starting at `001`.
2. For each case write: title, pyramid level, priority, preconditions, test data, numbered steps, and expected result. Steps and expected results must name observable behavior only — no selectors or code.
3. Build a coverage checklist: one checkbox per business rule and expected outcome from the parsed requirement, each listing the case IDs that cover it.
4. Save the deliverable to `test-cases/<feature-slug>.md` using the structure below. If the file exists, show the user the differences and ask before overwriting.
5. Report the saved path.

````markdown
# Test Cases: <Feature name>

Requirement: <one-sentence restatement>
Open questions: <resolved answers, or none>

## Case table
| ID | Title | Level | Priority | Preconditions | Test data | Steps | Expected result |
|----|-------|-------|----------|---------------|-----------|-------|-----------------|

## Coverage checklist
- [ ] <rule or outcome> — <case IDs>
````

## Output Contract
Emit the final artifact:
`Skill: craft-test-case - output below`
Include: the saved `test-cases/<feature-slug>.md` path and the full case table.
