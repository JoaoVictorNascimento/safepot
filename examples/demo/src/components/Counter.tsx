import { useCounterStore } from "../stores/counterStore";
import { shallow } from "../../../../dist/index.mjs";

export function Counter() {
  const { count, name, increment, decrement } = useCounterStore(
    (state) => ({
      count: state.count,
      name: state.name,
      increment: state.increment,
      decrement: state.decrement,
    }),
    shallow
  );

  return (
    <div>
      <h1>{name}</h1>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}