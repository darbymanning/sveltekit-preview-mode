import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Not required in the real world, but allows us to use the local uncompiled version of the package
		alias: {
			'sveltekit-preview-mode': '../../packages/sveltekit-preview-mode/src/lib'
		},
		env: {
			dir: '../../'
		},
		adapter: adapter()
	}
};

export default config;
