types:
	supabase gen types --project-id ckifwtkgzuuqejctmixv > ./src/lib/database.types.ts

website:
	pnpm run build

all: types website
