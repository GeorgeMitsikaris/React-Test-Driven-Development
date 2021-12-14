import { render, screen } from '@testing-library/react';
import SignupPage from './SignupPage';

it('has header', () => {
  render(<SignupPage />);
  const header = screen.queryByRole('heading', { name: 'Sign Up' });
  expect(header).toBeInTheDocument();
})