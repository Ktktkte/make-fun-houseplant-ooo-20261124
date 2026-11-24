import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const reply = readFileSync(entryPath, "utf8");

if (reply.length < 1 || reply.length > 120) {
  throw new Error(`entry must be 1-120 characters, got ${reply.length}`);
}
if (reply.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), reply, "utf8");
