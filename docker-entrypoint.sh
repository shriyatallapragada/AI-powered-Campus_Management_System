#!/bin/sh
set -e

if [ -z "$NEXTAUTH_SECRET" ]; then
  echo "NEXTAUTH_SECRET is not set; pass one with -e NEXTAUTH_SECRET=..." >&2
  exit 1
fi

# First start on an empty volume: create tables and load demo data
DB_FILE="${DATABASE_URL#file:}"
if [ ! -f "$DB_FILE" ]; then
  npx prisma db push --skip-generate
  npm run db:seed
fi

exec npx next start -p "${PORT:-3000}"
