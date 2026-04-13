import { createStore, type Listener, type StateUpdater } from "../core/createStore";
import { createStoreHook } from "../react/createStoreHook";
  
  type CreateState<TState extends object> = (
    set: (updater: StateUpdater<TState>) => void,
    get: () => TState
  ) => TState;
  
  export type UseBoundStore<TState extends object> = {
    (): TState;
    <TSelected>(selector: (state: TState) => TSelected): TSelected;
    getState: () => TState;
    setState: (updater: StateUpdater<TState>) => void;
    subscribe: (listener: Listener<TState>) => () => void;
  };
  
  export function create<TState extends object>(
    initializer: CreateState<TState>
  ): UseBoundStore<TState> {
    const store = createStore({} as TState);
  
    const initialState = initializer(store.setState, store.getState);
  
    store.setState(initialState);
  
    const useStore = createStoreHook(store) as UseBoundStore<TState>;
  
    useStore.getState = store.getState;
    useStore.setState = store.setState;
    useStore.subscribe = store.subscribe;
  
    return useStore;
  }