import { useSyncExternalStore } from "react";
import type { Store } from "../core/createStore";

export function createStoreHook<TState extends object>(
  store: Store<TState>
) {
  function useStore(): TState;
  function useStore<TSelected>(
    selector: (state: TState) => TSelected
  ): TSelected;
  function useStore<TSelected>(
    selector?: (state: TState) => TSelected
  ) {
    return useSyncExternalStore(
      store.subscribe,
      () => (selector ? selector(store.getState()) : store.getState()),
      () => (selector ? selector(store.getState()) : store.getState())
    );
  }

  return useStore;
}