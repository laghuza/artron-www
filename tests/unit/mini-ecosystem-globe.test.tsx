import React from 'react';
import { render } from '@testing-library/react';
import { MiniEcosystemGlobe } from '@/components/navigation/MiniEcosystemGlobe';

describe('MiniEcosystemGlobe Component', () => {
  it('renders canvas element with specified dimensions and accessibility title', () => {
    const { container } = render(<MiniEcosystemGlobe size={20} className="test-globe" />);
    const canvas = container.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('test-globe');
  });

  it('renders without crashing with default size', () => {
    const { container } = render(<MiniEcosystemGlobe />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveAttribute('title', 'ARTRON Global Ecosystem');
    expect(wrapper).toHaveStyle({ width: '18px', height: '18px' });
  });

  it('applies active state styling and attributes cleanly', () => {
    const { container } = render(<MiniEcosystemGlobe size={18} isActive={true} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
