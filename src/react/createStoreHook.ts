import { useRef, useSyncExternalStore } from "react";
import type { Store } from "../core/createStore";

export type EqualityFn<T> = (a: T, b: T) => boolean;

const defaultEqualityFn = <T,>(a: T, b: T): boolean => Object.is(a, b);

export function createStoreHook<TState extends object>(
  store: Store<TState>
) {
  function useStore(): TState;
  function useStore<TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: EqualityFn<TSelected>
  ): TSelected;
  function useStore<TSelected>(
    selector?: (state: TState) => TSelected,
    equalityFn: EqualityFn<TSelected> = defaultEqualityFn
  ): TState | TSelected {
    const snapshot = useSyncExternalStore(
      store.subscribe,
      store.getState,
      store.getState
    );

    const selectedRef = useRef<TSelected | undefined>(undefined);

    if (!selector) {
      return snapshot;
    }

    const selected = selector(snapshot);
    const previousSelected = selectedRef.current;

    if (
      previousSelected !== undefined &&
      equalityFn(previousSelected, selected)
    ) {
      return previousSelected;
    }

    selectedRef.current = selected;
    return selected;
  }

  return useStore;
}