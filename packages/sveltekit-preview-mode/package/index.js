import { dev } from "$app/environment";
import { get, writable } from "svelte/store";
export { default as PreviewBanner } from "./components/PreviewBanner.svelte";
export default function previewMode(options) {
    const o = {
        previewSecret: "secret",
        cookieName: "__preview_mode",
        exitPreviewQueryParam: "exit-preview",
        secretTokenQueryParam: "secret",
        ...options,
        cookieOpts: {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: !dev,
            ...options?.cookieOpts,
        },
    };
    return function ({ event, resolve }) {
        event.setHeaders({ "Cache-Control": "no-store" });
        event.locals.exitPreviewQueryParam = o.exitPreviewQueryParam;
        const is_exit = event.url.searchParams.has(o.exitPreviewQueryParam);
        const secret_matches = event.url.searchParams.get(o.secretTokenQueryParam) === o.previewSecret;
        const has_preview_cookie = event.cookies.get(o.cookieName) === "true";
        if (is_exit) {
            setPreview(false);
            // remove exit-preview query param from url
            event.url.searchParams.delete(o.exitPreviewQueryParam);
            // redirect to url without secret (but keep any other query params)
            return new Response(null, {
                status: 302,
                headers: {
                    location: event.url.pathname + event.url.search,
                    "Set-Cookie": event.cookies.serialize(o.cookieName, "false", o.cookieOpts),
                },
            });
        }
        if (has_preview_cookie || secret_matches) {
            setPreview(true);
            event.locals.isPreview = true;
            if (secret_matches) {
                event.cookies.set(o.cookieName, "true", o.cookieOpts);
                // remove secret query param from url
                event.url.searchParams.delete(o.secretTokenQueryParam);
                // redirect to url without secret (but keep any other query params)
                return new Response(null, {
                    status: 302,
                    headers: {
                        location: event.url.pathname + event.url.search,
                        "Set-Cookie": event.cookies.serialize(o.cookieName, "true", o.cookieOpts),
                    },
                });
            }
        }
        return resolve(event);
    };
}
const store = writable(false);
export const setPreview = store.set;
export const isPreview = () => get(store);
