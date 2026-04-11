import { useCounterStore, counterStore } from "../stores/counterStore";

export function Counter() {
  const count = useCounterStore((state) => state.count);
  const name = useCounterStore((state) => state.name);

  return (
    <div>
      <h1>{name}</h1>
      <p>{count}</p>

      <button
        onClick={() =>
          counterStore.setState((state) => ({
            count: state.count + 1,
          }))
        }
      >
        Increment
      </button>
    </div>
  );
}