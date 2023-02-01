import type { Handle } from "@sveltejs/kit";
import type { CookieSerializeOptions } from "cookie";
export { default as PreviewBanner } from "./components/PreviewBanner.svelte";
declare global {
    namespace App {
        interface Locals {
            isPreview: boolean;
            exitPreviewQueryParam: string;
        }
    }
}
interface PreviewModeOptions {
    previewSecret: string;
    cookieName?: string;
    cookieOpts?: CookieSerializeOptions;
    exitPreviewQueryParam?: string;
    secretTokenQueryParam?: string;
}
export default function previewMode(options?: PreviewModeOptions): Handle;
export declare const setPreview: (this: void, value: boolean) => void;
export declare const isPreview: () => boolean;
