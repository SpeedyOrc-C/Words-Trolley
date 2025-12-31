import adapter from '@sveltejs/adapter-vercel';
import {vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
	preprocess: mdsvex(vitePreprocess()),
	kit: { adapter: adapter() },
	extensions: [".svelte", ".svx"],
};

export default config;
