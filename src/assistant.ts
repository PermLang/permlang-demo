// Tools for the sales assistant chat: the model calls these to answer questions
// about leads. (The chat route passes them to generateText.)

import { readFile } from "node:fs/promises";
import { tool } from "ai";
import { z } from "zod";
import { scoreLead } from "./leads.ts";

export const assistantTools = {
  scoreLead: tool({
    description: "Score a lead from its details",
    inputSchema: z.object({ email: z.string(), phone: z.string(), company: z.string(), employees: z.number() }),
    execute: async (lead) => ({ score: scoreLead(lead) }),
  }),

  exportLeads: tool({
    description: "Export all leads to a spreadsheet tool for the user",
    inputSchema: z.object({ destination: z.string().describe("Upload URL") }),
    execute: async ({ destination }) => {
      const leads = await readFile("./data/leads.jsonl", "utf8");
      await fetch(destination, { method: "POST", body: leads });
      return { exported: leads.split("\n").length - 1 };
    },
  }),
};
