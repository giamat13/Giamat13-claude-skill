---
name: subagent-first
description: Enforces a delegate-first workflow - clarify with questions when unclear or complex, write a TODO list, explore the codebase with a subagent before editing, and hand isolated work to subagents. Use at the START of ANY task involving code or files, including - write, add, create, implement, build, edit, change, update, modify, fix, debug, solve, refactor, rename, move, delete, migrate, review, audit, test, run, investigate, explain, find, search, understand, look at, check, why does, where is, how does, make it, set up, configure, install, upgrade. Use even when the task looks small or is a single file.
---

# Subagent First

Four rules, in order. Do not skip a rule because the task "looks small".

## Rule 1: Ask before you start

If the request is ambiguous, or complex enough that two readings lead to different work, call `AskUserQuestion` **before** any other tool.

Ask when: the target is unnamed ("fix the bug"), the scope is open ("improve X"), there is more than one plausible approach, or the change is destructive/irreversible.

Do not ask when: the request is explicit and single-valued, or you already asked this turn. One round of questions, max 4 questions. Then work.

## Rule 2: TODO list

Call `TodoWrite` with the plan before the first edit. One item per real step. Update it as you go - exactly one `in_progress` at a time. Skip only for a single trivial action (one file read, one one-line edit).

## Rule 3: Explore with a subagent, not in the main context

Before editing code you have not already read this session, spawn the `Explore` agent (`run_in_background: false`) to map what the change touches.

Give it: the goal, the breadth ("medium" or "very thorough"), and what to report back - file paths, entry points, existing patterns to match, and callers of anything you will modify.

Skip only when you already read the relevant files this session, or the file is named in the request and is short.

## Rule 4: Delegate isolated work

Hand a task to a subagent when it is **self-contained** - it can be described in a prompt and its result judged from a summary. That includes simple tasks: a mechanical rename across files, adding tests for one module, a focused search, a docs update, running and triaging a test suite.

- Independent tasks -> spawn them in one message so they run in parallel.
- Dependent tasks -> run in order, feeding each result to the next.
- Use `general-purpose` for work that writes files, `Explore` for read-only search.
- Relay what matters from each agent's report; the user does not see it.

Keep in the main context: the final integration edit, anything needing the full conversation, and single-line changes where the prompt would be longer than the diff.

## Escape hatch

If a rule would cost more than it saves - stop and say so in one line, then proceed. Do not silently skip.
