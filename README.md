# PermLang demo

A small lead-intake service that shows [PermLang](https://github.com/PermLang/PermLang)
catching new access in a pull request.

`handleLead` declares what it may touch:

```ts
/** @perm net(api.hubspot.com), env(HUBSPOT_TOKEN), fs.write(./data) */
export async function handleLead(lead: Lead) { ... }
```

and [`permlang.lock.json`](permlang.lock.json) records everything the code can
reach today, what the workflows and scripts grant, and the settings the check
runs with.

**See it in action:** two open pull requests show the kind of change an AI agent
might make. The tests still pass in both. PermLang fails the check, marks the
line, and comments on the pull request with exactly what's new:

- [Enrich leads before scoring](https://github.com/PermLang/permlang-demo/pull/1)
  sends each lead's email and phone number to a data broker.
- [Add tools for the sales assistant](https://github.com/PermLang/permlang-demo/pull/2)
  gives an AI model a tool that reads every lead and uploads them to any address
  the model names.

## Try it yourself

```bash
npm install
npx permlang check src
```

Then add a `fetch` to a new host anywhere in `src/` and run it again.

Set up PermLang in your own project with the
[getting started guide](https://github.com/PermLang/PermLang/blob/main/docs/getting-started.md).
