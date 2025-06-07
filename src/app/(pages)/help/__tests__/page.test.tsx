import { render, screen, fireEvent } from '@testing-library/react';
import HelpPage from '../page'; // Adjust path if your folder structure is different
import useCounterStore from '@/lib/store/useCounterStore';

// Get the reset action from the store
const { reset: resetCounterStore } = useCounterStore.getState();

describe('HelpPage', () => {
  beforeEach(() => {
    // Reset the store to its initial state using its own reset action
    resetCounterStore();
    render(<HelpPage />);
  });

  it('renders the main heading', () => {
    expect(screen.getByRole('heading', { name: /Help & FAQs/i, level: 1 })).toBeInTheDocument();
  });

  it('renders FAQ and Contact Support sections', () => {
    expect(screen.getByRole('heading', { name: /Frequently Asked Questions/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Contact Support/i, level: 2 })).toBeInTheDocument();
  });

  describe('Zustand Counter Example', () => {
    it('renders the counter section and initial count', () => {
      expect(screen.getByRole('heading', { name: /Zustand Counter Example/i, level: 2 })).toBeInTheDocument();
      // Assuming initial count is 0, adjust if your store's initial state is different
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 0'); 
    });

    it('increments the count when Increment button is clicked', () => {
      const incrementButton = screen.getByRole('button', { name: /Increment$/i });
      fireEvent.click(incrementButton);
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 1');
    });

    it('decrements the count when Decrement button is clicked', () => {
      // First, increment to avoid negative count if not allowed or to have a base
      const incrementButton = screen.getByRole('button', { name: /Increment$/i });
      fireEvent.click(incrementButton); // Count is 1

      const decrementButton = screen.getByRole('button', { name: /Decrement/i });
      fireEvent.click(decrementButton);
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 0');
    });

    it('resets the count when Reset button is clicked', () => {
      const incrementButton = screen.getByRole('button', { name: /Increment$/i });
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton); // Count is 2
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 2');

      const resetButton = screen.getByRole('button', { name: /Reset/i });
      fireEvent.click(resetButton);
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 0'); // Assuming reset goes to 0
    });

    it('increments by a specific amount when Increment by 5 button is clicked', () => {
      const incrementByButton = screen.getByRole('button', { name: /Increment by 5/i });
      fireEvent.click(incrementByButton);
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 5');

      fireEvent.click(incrementByButton); // Click again
      expect(screen.getByText(/Current Count:/i).closest('p')).toHaveTextContent('Current Count: 10');
    });
  });
});
