// Fortune Cookie for the Liquidated Trader — writes one fortune to /output/entry.txt.
// Deterministic: the same fixed text on every run, no clock, no randomness, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "Great fortune lies ahead, just past the chair you are currently sleeping on.";

// Mirror of the round's sealed gate: UTF-8 text of 1 to 160 characters, not only
// white space. Fail loudly here rather than silently shipping an invalid entry.
const body = FORTUNE.trim();
const bytes = Buffer.byteLength(body, "utf8");
if (body.length < 1 || bytes > 160 || !/\S/.test(body)) {
  throw new Error(`fortune fails the gate: ${body.length} chars, ${bytes} bytes`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), FORTUNE + "\n", "utf8");
