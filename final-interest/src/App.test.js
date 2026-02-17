import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app navbar brand', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/cysocial/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
