export type Listener<TState> = (
    state: TState,
    prevState: TState
  ) => void;
  
  export type StateUpdater<TState> =
    | Partial<TState>
    | ((state: TState) => Partial<TState>);
  
  export type Store<TState extends object> = {
    getState: () => TState;
    setState: (updater: StateUpdater<TState>) => void;
    subscribe: (listener: Listener<TState>) => () => void;
  };
  
  function hasStateChanged<TState extends object>(
    currentState: TState,
    partialState: Partial<TState>
  ): boolean {
    for (const key in partialState) {
      if (!Object.is(currentState[key], partialState[key])) {
        return true;
      }
    }
  
    return false;
  }
  
  export function createStore<TState extends object>(
    initialState: TState
  ): Store<TState> {
    let state = initialState;
    const listeners = new Set<Listener<TState>>();
  
    function getState(): TState {
      return state;
    }
  
    function setState(updater: StateUpdater<TState>): void {
      const partialState =
        typeof updater === "function"
          ? updater(state)
          : updater;
  
      if (!hasStateChanged(state, partialState)) {
        return;
      }
  
      const prevState = state;
  
      state = {
        ...state,
        ...partialState,
      };
  
      listeners.forEach((listener) => {
        listener(state, prevState);
      });
    }
  
    function subscribe(listener: Listener<TState>): () => void {
      listeners.add(listener);
  
      return () => {
        listeners.delete(listener);
      };
    }
  
    return {
      getState,
      setState,
      subscribe,
    };
  }