import { render, screen } from '@testing-library/react';
import ToolCard from '@/components/ToolCard';

describe('ToolCard Component', () => {
  const mockTool = {
    id: '1',
    name: 'Test Tool',
    description: 'Test Description',
    icon: '🧪',
    slug: 'test-tool',
    category: 'Test',
    keywords: ['test'],
    metaDescription: 'Test meta description',
  };

  it('renders tool name and description', () => {
    render(<ToolCard tool={mockTool} />);

    expect(screen.getByText('Test Tool')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders tool icon', () => {
    render(<ToolCard tool={mockTool} />);

    expect(screen.getByText('🧪')).toBeInTheDocument();
  });

  it('has correct link href', () => {
    const { container } = render(<ToolCard tool={mockTool} />);
    const link = container.querySelector('a');

    expect(link).toHaveAttribute('href', '/test-tool');
  });
});
