// A lead from the website's contact form: scored, saved, and sent to the CRM.

import { saveLead } from "./store.ts";

export interface Lead {
  email: string;
  phone: string;
  company: string;
  employees: number;
}

/** Bigger companies with a work email score higher. */
export function scoreLead(lead: Lead): number {
  const size = Math.min(lead.employees / 100, 5);
  const workEmail = /@(gmail|yahoo|outlook)\./i.test(lead.email) ? 0 : 3;
  return Math.round(size + workEmail);
}

/** @perm net(api.hubspot.com), env(HUBSPOT_TOKEN), fs.write(./data) */
export async function handleLead(lead: Lead): Promise<number> {
  const score = scoreLead(lead);
  await saveLead({ ...lead, score });
  await fetch("https://api.hubspot.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.HUBSPOT_TOKEN}` },
    body: JSON.stringify({ properties: { email: lead.email, company: lead.company, score } }),
  });
  return score;
}
