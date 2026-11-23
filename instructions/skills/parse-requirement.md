# Parse Requirement

## Purpose
Break one feature requirement into explicit, testable parts before any scenarios are designed.

## Input
- One feature requirement as given by the user (text, ticket, or acceptance criteria).

## Procedure
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

## Output
Emit as a visible artifact:
`Step: parse-requirement - output below`
Include: feature slug, the six lists above, and open questions with their answers (or `none`).
