## Proof-of-Backed Kit

This app turns Stack Auth into a virtual VC experience:

- `/apply` — founders submit company info, upload pitch decks/logos (stored in Vercel Blob), and trigger the $1 Stack checkout.
- `/purchase/success` — confirmation page that reflects the latest payment + review status.
- `/portfolio` — public gallery auto-populated once applications are approved.
- `/admin` — Stack-authenticated reviewers approve/reject submissions.

### Required environment variables

Create or update `.env.local` with the following keys:

```bash
# Stack Auth
NEXT_PUBLIC_STACK_PROJECT_ID=...
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=...
STACK_SECRET_SERVER_KEY=...
STACK_OFFER_ID=offer-2

# Storage + database
BLOB_READ_WRITE_TOKEN=...
POSTGRES_URL=...
```

### Database & migrations

This project uses Drizzle ORM with Vercel Postgres.

```bash
npm install
npm run db:generate   # optional: generate SQL migrations
npm run db:push       # push schema to the database
```

### Running locally

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

- After an application is saved, a new Stack checkout session launches automatically.
- Stack webhooks at `POST /api/webhooks/stack` move companies to `awaiting_approval` and record payments.
- Mark a user as `admin` in the `users` table to unlock the `/admin` review dashboard.
