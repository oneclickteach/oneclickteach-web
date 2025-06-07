import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer Component', () => {
  it('renders the copyright notice', () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/©.*OneClickTeach/i);
    expect(copyrightElement).toBeInTheDocument();
  });

  it('displays the current year in the copyright notice', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(new RegExp(`© ${currentYear} OneClickTeach`));
    expect(copyrightElement).toBeInTheDocument();
  });
});
