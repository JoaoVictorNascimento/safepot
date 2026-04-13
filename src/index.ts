export { createStore } from "./core/createStore";
export { createStoreHook } from "./react/createStoreHook";
export { create } from "./api/create";
export { shallow } from "./utils/shallow";

export type {
  Store,
  Listener,
  StateUpdater,
} from "./core/createStore";

export type { EqualityFn } from "./react/createStoreHook";