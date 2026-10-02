// Leads are appended to a local file, one JSON object per line.

import { appendFile, mkdir } from "node:fs/promises";

/** @perm fs.write(./data) */
export async function saveLead(lead: object): Promise<void> {
  await mkdir("./data", { recursive: true });
  await appendFile("./data/leads.jsonl", `${JSON.stringify(lead)}\n`);
}
