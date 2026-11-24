# Produce Test Cases

## Purpose
Turn the derived scenarios into the saved test-case deliverable that the create-test pipeline consumes.

## Input
- The `Step: parse-requirement - output below` and `Step: apply-test-techniques - output below` artifacts. Stop and report if either is missing.

## Procedure
1. Give every scenario a stable case ID: `TC-<FEATURE>-<NNN>`, where `<FEATURE>` is the upper-case feature slug and `<NNN>` is a zero-padded sequence starting at `001`.
2. For each case write: title, pyramid level, priority, preconditions, test data, numbered steps, and expected result. Steps and expected results must name observable behavior only — no selectors or code.
3. Build a coverage checklist: one checkbox per business rule and expected outcome from the parsed requirement, each listing the case IDs that cover it.
4. Save the deliverable to `test-cases/<feature-slug>.md` using the structure below. If the file exists, show the user the differences and ask before overwriting.
5. Report the saved path.

## File structure
```markdown
# Test Cases: <Feature name>

Requirement: <one-sentence restatement>
Open questions: <resolved answers, or none>

## Case table
| ID | Title | Level | Priority | Preconditions | Test data | Steps | Expected result |
|----|-------|-------|----------|---------------|-----------|-------|-----------------|

## Coverage checklist
- [ ] <rule or outcome> — <case IDs>
```

## Output
Emit as a visible artifact:
`Skill: craft-test-case - output below`
Include: the saved file path and the full case table.
