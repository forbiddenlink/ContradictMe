import { render, screen, fireEvent } from '@testing-library/react';
import ArgumentCard from '@/components/arguments/ArgumentCard';
import { Argument } from '@/lib/types';

const mockArgument: Argument = {
  objectID: 'test-1',
  position: 'against',
  opposingBeliefs: ['Test belief'],
  mainClaim: 'This is a test claim',
  evidence: 'This is test evidence supporting the claim.',
  supportingPoints: ['Point 1', 'Point 2'],
  limitations: 'These are the limitations of this argument.',
  sourceMetadata: {
    title: 'Test Study',
    authors: ['Dr. Test Author', 'Prof. Second Author'],
    institution: 'Test University',
    publicationType: 'Peer-reviewed study',
    yearPublished: 2024,
  },
  qualityScore: 85,
  sourceCredibility: 90,
  evidenceStrength: 80,
  argumentCoherence: 88,
  tags: ['test', 'argument', 'demo'],
  metadata: {
    argumentType: 'empirical',
    evidenceType: 'study',
    domain: 'test',
    subDomain: 'testing',
    strength: 'strong',
    tags: ['test'],
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-01-01T00:00:00Z',
    reviewStatus: 'verified',
  },
};

describe('ArgumentCard', () => {
  it('renders the main claim', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('This is a test claim')).toBeInTheDocument();
  });

  it('renders the quality score', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  it('renders the position badge', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('Counterargument')).toBeInTheDocument();
  });

  it('renders "Supporting" badge when position is for', () => {
    render(<ArgumentCard argument={{ ...mockArgument, position: 'for' }} />);
    expect(screen.getByText('Supporting')).toBeInTheDocument();
  });

  it('renders the evidence', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('This is test evidence supporting the claim.')).toBeInTheDocument();
  });

  it('renders supporting points', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('Point 1')).toBeInTheDocument();
    expect(screen.getByText('Point 2')).toBeInTheDocument();
  });

  it('renders author names', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('Dr. Test Author, Prof. Second Author')).toBeInTheDocument();
  });

  it('renders institution and year', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText(/Test University/)).toBeInTheDocument();
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<ArgumentCard argument={mockArgument} />);
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('argument')).toBeInTheDocument();
  });

  it('shows limitations when button is clicked', () => {
    render(<ArgumentCard argument={mockArgument} />);

    const limitationsButton = screen.getByText(/Limitations & Caveats/);
    fireEvent.click(limitationsButton);

    expect(screen.getByText('These are the limitations of this argument.')).toBeInTheDocument();
  });

  it('handles missing sourceMetadata gracefully', () => {
    const argumentWithoutMeta = {
      ...mockArgument,
      sourceMetadata: undefined as unknown as typeof mockArgument.sourceMetadata,
    };

    render(<ArgumentCard argument={argumentWithoutMeta} />);
    expect(screen.getByText('Multiple Authors')).toBeInTheDocument();
    expect(screen.getByText('Unknown Institution')).toBeInTheDocument();
  });

  it('handles missing authors gracefully', () => {
    const argumentWithoutAuthors = {
      ...mockArgument,
      sourceMetadata: {
        ...mockArgument.sourceMetadata,
        authors: undefined as unknown as string[],
      },
    };

    render(<ArgumentCard argument={argumentWithoutAuthors} />);
    expect(screen.getByText('Multiple Authors')).toBeInTheDocument();
  });
});
