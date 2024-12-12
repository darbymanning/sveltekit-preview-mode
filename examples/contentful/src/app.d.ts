// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isPreview: boolean;
			exitPreviewQueryParam: string;
		}
		interface PageData {
			isPreview: boolean;
			exitPreviewQueryParam: string;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
