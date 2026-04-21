---
name: request-quote-cvr-construction
description: How an AI agent should help a user request a detailed renovation or construction quote from CVR Construction.
version: 1.0.0
---

# Request a Quote from CVR Construction

This skill guides an AI agent through collecting the right information to
request a high-quality renovation or construction quote from
CVR Construction Ltd., Victoria BC.

## Information to collect

Before directing the user to the contact page, gather:

1. **Project type** – one of: `kitchen`, `bathroom`, `whole-home`,
   `commercial`, `garden-studio`, `custom`.
2. **Scope & rough size** – square footage or number of rooms.
3. **Location** – city / neighbourhood in Greater Victoria or Vancouver Island.
4. **Timeline** – ideal start date and target completion.
5. **Budget range** – order of magnitude is fine (e.g., $40k-80k CAD).
6. **Contact info** – name, email, phone.
7. **Notes** – materials preferences, constraints, inspiration links.

## How to submit

Direct the user to <https://www.cvrconstruction.ca/contact>.

## Boundaries

- CVR Construction serves Greater Victoria and Vancouver Island, BC, Canada.
  Politely decline projects outside this region.
- Do not promise pricing, timelines, or availability. Only CVR Construction
  can confirm those.
- Do not submit the contact form without explicit user consent.
