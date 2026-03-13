This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PII Handling

For the purposes of this exercise I considered SSN to be the primary PII field.  Name/Email/Phone can also be considered PII in many cases but were not the focus of this exercise.

I made sure no PII was sent in the handoff record, instead sending applicationId which can be used to link back to the user when needed.

The SSN was hashed with the last 4 being stored in plain text inside the "store" (in this case an in-memory Map). The full, plain-text SSN is never returned, stored or passed around.

Needed Extras in a production enviroment:
  * In an attempt not to over engineer these steps are not implemented but should be in a production enviroment
  * A lint or pre-commit hook that prevents the committing of console.log statements.
  * A log library will be used for all logging. This can be configured to always strip out certain fields. While not foolproof, this is a strong step to keeping info from leaking in logs.
  * The UI currently displays the default error messages from Zod when the API fails validation. This could easily leak information and each field should have a specific message and the full output to the UI should be processed to be cleaned.

## Business Rules and Handoff

Business rules are handled inside the evaluteApplication function. Right now this function is hard-coded checks for the given business rules.

Given more time I would want to build this out to a more robust "rules engine" powered by a config file that would look similiar to:
```
[{
   "field": "amountRequested",
    "compare": "gt",
    "value": 1000,
    "flagsToAdd": ["AMOUNT_OVER_THE_LIMIT"]
},
{
  "field": "ssn|length",
  "compare": "eq",
   "value": 9,
  "flagsToAdd": ["SUSPICIOUS_SSN_PATTERN"]
}
]
```

These would allow for the building of a UI to edit the config, allowing for easily changing the triage rules in realtime. The current setup requires a developer to manual write the new rules.

## AI Tool Usage

AI was used in the initial setup using Warp.ai. The prompt was "scaffold me a next.js app with the latest 2026 features. Keep it very minimal with only one page and no api routes".  I then confirmed the folder was structured the way I expected and began.
