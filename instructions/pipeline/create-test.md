# Create-Test Pipeline

## Responsibility
Sequence the creation of a new test from request to verified closure. This file orders the steps; each step's procedure lives in its own skill or agent.

## Sequence
1. **Clarify test scope** — follow `.claude/skills/clarify-test-scope/SKILL.md`. Before advancing, verify the output artifact `Skill: clarify-test-scope - output below` is present.
2. **Load crafted test cases** — read the `test-cases/<feature-slug>.md` file named in the request; do not continue until its case table is loaded. If the request names no crafted file, run the `craft-test-case` skill (`.claude/skills/craft-test-case/SKILL.md`) first — create-test does not derive scenarios itself.
3. **Implement** — follow `.claude/skills/implement-test/SKILL.md`. Before advancing, verify the output artifact `Skill: implement-test - output below` is present.
4. **Review** — run `.claude/agents/test-reviewer.md` on the changed spec. Before advancing, verify the output artifact `Agent: test-reviewer - output below` is present and the verdict is `approve`.
5. **Close** — follow `.claude/skills/task-complete/SKILL.md`. Before advancing, verify the output artifact `Skill: task-complete - output below` is present.

Never skip a step, reorder steps, or start a step before the previous step's output artifact exists.