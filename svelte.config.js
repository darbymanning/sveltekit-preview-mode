import preprocess from "svelte-preprocess";
import vercel from "@sveltejs/adapter-vercel";
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
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
    adapter: vercel(),
    vite: {
      define: {
        ["process.env.REPOSITORY_URL"]: JSON.stringify(pkg.repository.url),
      },
      optimizeDeps: {
        exclude: ["@urql/svelte"],
      },
    },
  },
};

export default config;
