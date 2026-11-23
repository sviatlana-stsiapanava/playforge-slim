---
name: create-test
description: Use when the user asks to create a new Playwright test. Runs the create-test workflow at .claude/workflows/create-test.yml from the first step through verified closure.
---

# Create Test

## Purpose
Entry point for creating a new test. This skill does not define its own procedure; it loads and executes the `create-test` workflow.

## When to run
Run in the main conversation whenever the user asks to create a new test, before reading or writing any test code.

## Procedure
1. Read `.claude/workflows/create-test.yml` in full.
2. Execute its steps in dependency order (`needs`), following each step's skill or agent exactly as the workflow directs.
3. Before advancing, verify the artifact the step's goal names is present in the conversation. If it is missing, stop and complete that step first.
4. Never skip, reorder, or merge steps. If a step cannot be completed, apply its `on_failure` (`stop` or `ask_user`) and report which step is blocked and why.
5. The run ends only when the final step has emitted its output artifact.

## Output Contract
Emit a visible marker when starting:
`Skill: create-test - running .claude/workflows/create-test.yml`
The final output is the artifact produced by the last step (`Skill: task-complete - output below`).
