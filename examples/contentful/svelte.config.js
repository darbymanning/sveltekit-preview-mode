import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // Not required in the real world, but allows us to use the local uncompiled version of the package
    alias: {
      "sveltekit-preview-mode": "../../packages/sveltekit-preview-mode/src/lib",
    },
    adapter: adapter(),
  },
};

export default config;
