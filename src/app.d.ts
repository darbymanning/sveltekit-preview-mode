/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
  // interface Locals {}

  // interface Platform {}

  interface Session {
    preview: boolean;
  }

  // interface Stuff {}
}

interface ImportMetaEnv {
  readonly REPOSITORY_URL: string;
  readonly VITE_GRAPHCMS_DEV_AUTH_TOKEN: string;
  readonly VITE_GRAPHCMS_PROD_AUTH_TOKEN: string;
  readonly VITE_GRAPHCMS_PROJECT_API: string;
}
