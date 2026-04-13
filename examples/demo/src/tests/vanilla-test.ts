import { useCounterStore } from "../stores/counterStore";

console.log(useCounterStore.getState());

useCounterStore.setState({ name: "New Safepot" });

const unsubscribe = useCounterStore.subscribe((state, prevState) => {
  console.log({ state, prevState });
});

unsubscribe();