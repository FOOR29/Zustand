// imporamos Zustand
import { create } from "zustand";

// tipamos
interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count -1 })),
}))

//lego exportamos
export default useCounterStore
