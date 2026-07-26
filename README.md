# subagent-first

A Claude Code plugin that forces a delegate-first workflow instead of hoping the model remembers to.

Four rules, enforced from the first turn of every session:

1. **Ask before you start** - `AskUserQuestion` when the request is ambiguous or complex.
2. **TODO list** - `TodoWrite` before the first edit.
3. **Explore with a subagent** - map the codebase with the `Explore` agent before editing files you have not read.
4. **Delegate isolated work** - hand self-contained tasks to subagents, in parallel when they are independent.

## Why a plugin and not just a skill

A skill only loads when the model decides its description matches the request. That is not enforcement - on a task that "looks small" it gets skipped.

This plugin ships a `SessionStart` hook that prints the rules straight into context at the start of every session, so they are there whether or not the model would have reached for the skill. The skill itself is still included, so `/subagent-first` works on demand.

Cost: about 450 tokens, once per session.

## Install

```
/plugin marketplace add giamat13/useful-claude-skill
/plugin install subagent-first@useful-claude-skill
```

From a local clone, point the first command at the directory instead:

```
/plugin marketplace add C:\path\to\useful-claude-skill
```

## Layout

```
.claude-plugin/marketplace.json     marketplace entry
subagent-first/
  .claude-plugin/plugin.json        plugin manifest
  hooks/hooks.json                  SessionStart hook
  hooks/inject.mjs                  prints the SKILL.md body
  skills/subagent-first/SKILL.md    the rules (single source of truth)
```

Edit `SKILL.md` and the injection follows - the hook reads that file.
