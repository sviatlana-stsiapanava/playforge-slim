# Apply Test Techniques

## Purpose
Derive test scenarios from the parsed requirement using named test-design techniques, so coverage is systematic rather than ad hoc.

## Input
- The `Step: parse-requirement - output below` artifact. Stop and report if it is missing.

## Procedure
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
   - **e2e** — behavior that needs the browser UI. Only e2e scenarios are implemented by the create-test pipeline.
4. Assign a priority: **P1** (core happy path or blocking failure), **P2** (important rule or boundary), **P3** (edge case).
5. Trace each scenario back to the business rule or expected outcome it covers; flag any rule with no scenario.

## Output
Emit as a visible artifact:
`Step: apply-test-techniques - output below`
A derived-scenarios table with exactly these columns:

| # | Scenario | Technique | Pyramid level | Priority | Parameters | Expected result | Covers rule |
|---|----------|-----------|---------------|----------|------------|-----------------|-------------|

Follow it with a list of uncovered rules (or `none`).
