// quiet-dread-remake-entry — main.ts
// Writes one single-line code review comment that approves a pull request
// while carrying quiet existential dread, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output). Gate (RULES.txt): 1-140 characters (code points),
// not only whitespace, single line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "LGTM. I understand every line of this diff, and that is the part that worries me.";

function codePoints(s) {
  return [...s].length;
}

function main() {
  const text = ENTRY;
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const n = codePoints(text);
  if (n < 1 || n > 140) {
    throw new Error(`entry must be 1-140 characters, got ${n}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");
  console.log(`wrote ${n} characters to ${outPath}`);
}

main();
