import { createStore } from "../../../../src/core/createStore";
import { createStoreHook } from "../../../../src/react/createStoreHook";

const counterStore = createStore({
  count: 0,
  name: "Safepot",
});

export const useCounterStore = createStoreHook(counterStore);

export { counterStore };