import assert from "node:assert/strict";
import { test } from "node:test";
import { scoreLead } from "../src/leads.ts";

test("a large company with a work email scores high", () => {
  assert.equal(scoreLead({ email: "cto@acme.com", phone: "555-0100", company: "Acme", employees: 800 }), 8);
});

test("a free email address scores lower", () => {
  assert.equal(scoreLead({ email: "sam@gmail.com", phone: "555-0101", company: "Sam's Shop", employees: 3 }), 0);
});
