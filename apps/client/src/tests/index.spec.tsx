import { render, screen } from '@testing-library/react';
import Home from '../pages';

describe('Home page', () => {
  it('should render hello world', () => {
    render(<Home />);

    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});
