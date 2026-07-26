import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Print the SKILL.md body (frontmatter stripped) so the rules are in context
// from the first turn of every session, instead of waiting for the model to
// decide the skill description matches.
const skill = fileURLToPath(
  new URL("../skills/better-tool-use/SKILL.md", import.meta.url),
);

const body = readFileSync(skill, "utf8").split(/^---$/m).slice(2).join("---");

process.stdout.write(body.trim());
