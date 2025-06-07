import { render, screen } from '@testing-library/react';
import Header from '@/components/layout/Header';

// Mock next/router if Link components cause issues, though often not needed for basic href checks.
// If you encounter issues with Link, you might need to mock 'next/navigation' as Next.js 13+ uses the App Router.
// jest.mock('next/navigation', () => ({
//   useRouter: () => ({ push: jest.fn() }),
//   usePathname: () => '/',
//   // Add other hooks if used by Header or its children
// }));

// Mock next-themes if useTheme causes issues during rendering
// jest.mock('next-themes', () => ({
//   useTheme: () => ({
//     theme: 'light', // or 'dark'
//     setTheme: jest.fn(),
//     themes: ['light', 'dark'],
//   }),
// }));

describe('Header Component', () => {
  beforeEach(() => {
    // Render the Header component before each test
    render(<Header />);
  });

  it('renders the brand name and links to the homepage', () => {
    const brandLink = screen.getByRole('link', { name: /OneClickTeach/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('renders the Home link and links to the homepage', () => {
    const homeLink = screen.getByRole('link', { name: /^Home$/i }); // Exact match for "Home"
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the Help link and links to /help', () => {
    const helpLink = screen.getByRole('link', { name: /Help/i });
    expect(helpLink).toBeInTheDocument();
    expect(helpLink).toHaveAttribute('href', '/help');
  });

  it('renders the theme toggle button', () => {
    // The ModeToggle component includes a button with an sr-only span "Toggle theme"
    const themeToggleButton = screen.getByRole('button', { name: /Toggle theme/i });
    expect(themeToggleButton).toBeInTheDocument();
  });
});
