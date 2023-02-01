import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
  props: Record<string, never>;
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type PreviewBannerProps = typeof __propDef.props;
export type PreviewBannerEvents = typeof __propDef.events;
export type PreviewBannerSlots = typeof __propDef.slots;
export default class PreviewBanner extends SvelteComponentTyped<
  PreviewBannerProps,
  PreviewBannerEvents,
  PreviewBannerSlots
> {}
export {};
