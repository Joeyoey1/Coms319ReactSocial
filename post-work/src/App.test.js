import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders default post title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/title not found/i);
  expect(titleElement).toBeInTheDocument();
});
