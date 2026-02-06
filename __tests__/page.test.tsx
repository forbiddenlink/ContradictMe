import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

describe('Home Page', () => {
  it('renders the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { name: /An AI that disagrees with you/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Home />);
    expect(
      screen.getByText(/Challenge your beliefs with the strongest counterarguments/i)
    ).toBeInTheDocument();
  });

  it('renders the challenge input', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(/Tell me something you believe strongly/i);
    expect(input).toBeInTheDocument();
  });

  it('renders the Challenge Me button', () => {
    render(<Home />);
    const button = screen.getByRole('button', { name: 'Start challenge conversation' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Challenge Me');
  });

  it('renders example topics', () => {
    render(<Home />);
    expect(screen.getByText(/Nuclear energy/i)).toBeInTheDocument();
    expect(screen.getByText(/College ROI/i)).toBeInTheDocument();
    expect(screen.getByText(/AI & Jobs/i)).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<Home />);
    expect(screen.getByText(/Evidence-Based/i)).toBeInTheDocument();
    expect(screen.getByText(/Steel-Manned/i)).toBeInTheDocument();
    expect(screen.getByText(/Respectful/i)).toBeInTheDocument();
  });

  it('renders the contest submission status', () => {
    render(<Home />);
    expect(screen.getByText(/Algolia Agent Studio Challenge/i)).toBeInTheDocument();
    expect(screen.getByText(/26 arguments indexed/i)).toBeInTheDocument();
  });
});
