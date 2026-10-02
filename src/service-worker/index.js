import {version} from "$app/env"
import {assets, immutable} from "$app/manifest"
import {resolve} from "$app/paths"
import {self} from "$app/service-worker"

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`

// `immutable`/`assets` paths from `$app/manifest` are relative to the
// base path, so resolve them to absolute pathnames that can be matched
// against `url.pathname` in the `fetch` handler
const ASSETS = [
	...immutable.map((asset) => resolve(asset.path)), // the Vite output
	...assets.map((asset) => resolve(asset.path))  // everything in `static`
]

self.addEventListener("install", (event) =>
{
	// Create a new cache and add all files to it
	async function addFilesToCache()
	{
		const cache = await caches.open(CACHE)
		await cache.addAll(ASSETS)
	}

	event.waitUntil(addFilesToCache())
})

self.addEventListener("activate", (event) =>
{
	// Remove previous cached data from disk
	async function deleteOldCaches()
	{
		for (const key of await caches.keys())
		{
			if (key !== CACHE) await caches.delete(key)
		}
	}

	event.waitUntil(deleteOldCaches())
})

self.addEventListener("fetch", (event) =>
{
	// ignore POST requests etc
	if (event.request.method !== "GET") return

	async function respond()
	{
		const url = new URL(event.request.url)
		const cache = await caches.open(CACHE)

		// `immutable`/`assets` can always be served from the cache
		if (ASSETS.includes(url.pathname))
		{
			const response = await cache.match(url.pathname)

			if (response)
			{
				return response
			}
		}

		// for everything else, try the network first...
		try
		{
			const response = await fetch(event.request)

			if (response.status === 200 && ! response.headers.get("cache-control")?.includes("no-store"))
			{
				// ...and cache responses in the background for next time....
				void cache.put(event.request, response.clone())
			}

			return response
		}
		catch (error)
		{
			// ...otherwise fall back to previously cached data if it exists...
			const response = await cache.match(event.request)

			if (response)
			{
				return response
			}

			// ...or throw the error
			throw error
		}
	}

	event.respondWith(respond())
})
