import adapter from "@sveltejs/adapter-vercel"
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte"

const config = {
	preprocess: vitePreprocess(),
	kit: {adapter: adapter()},
	extensions: [".svelte", ".svx"],
}

export default config
