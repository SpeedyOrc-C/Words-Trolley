# Fetch the latest database schema in TypeScript
types:
	supabase gen types --project-id ckifwtkgzuuqejctmixv > ./src/lib/database.types.ts

website:
	pnpm run build

all: types website

# Start developing
dev:
	pnpm run dev

# Start developing and broadcast in the network
# This allows other computers, phones and iPads to view in realtime.
dev-as-host:
	pnpm run dev --host
