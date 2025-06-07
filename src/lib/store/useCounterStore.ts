import { create } from 'zustand';

// Define the state shape
interface CounterState {
  count: number;
}

// Define the actions
interface CounterActions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
}

// Create the store with initial state and actions
const useCounterStore = create<CounterState & CounterActions>((set) => ({
  // Initial state
  count: 0,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount: number) => set((state) => ({ count: state.count + amount })),
}));

export default useCounterStore;
