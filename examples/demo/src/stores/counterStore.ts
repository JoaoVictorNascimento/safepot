import { create } from "../../../../dist/index.mjs";

type CounterStore = {
  count: number;
  name: string;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  name: "Safepot",
  increment: () =>
    set((state) => ({ count: state.count + 1 })),
  decrement: () =>
    set((state) => ({ count: state.count - 1 })),
}));