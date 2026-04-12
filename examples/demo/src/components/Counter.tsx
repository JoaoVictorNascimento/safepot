import { useCounterStore } from "../stores/counterStore";

export function Counter() {
  const count = useCounterStore((state) => state.count);
  const name = useCounterStore((state) => state.name);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <h1>{name}</h1>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}