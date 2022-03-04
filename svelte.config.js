import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import { readFileSync } from "fs";

const pkg = JSON.parse(
  readFileSync(new URL("package.json", import.meta.url), "utf8")
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    preprocess({
      scss: {
        includePaths: ["src/lib/"],
      },
    }),
  ],
  kit: {
    adapter: adapter(),
    vite: {
      define: {
        ["import.meta.env.REPOSITORY_URL"]: JSON.stringify(pkg.repository.url),
      },
      optimizeDeps: {
        exclude: ["@urql/svelte"],
      },
    },
  },
};

export default config;
