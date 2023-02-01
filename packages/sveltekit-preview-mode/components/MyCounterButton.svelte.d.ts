import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
  props: Record<string, never>;
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {};
};
export type MyCounterButtonProps = typeof __propDef.props;
export type MyCounterButtonEvents = typeof __propDef.events;
export type MyCounterButtonSlots = typeof __propDef.slots;
export default class MyCounterButton extends SvelteComponentTyped<
  MyCounterButtonProps,
  MyCounterButtonEvents,
  MyCounterButtonSlots
> {}
export {};
