import { render, screen } from '@testing-library/react';
import CoinList from './components/TopSection/CoinList';

test('Cryptocurrencies', () => {
  render(<CoinList />);
  const linkElement = screen.getByText(/Cryptocurrencies By Market Cap/i);
  expect(linkElement).toBeInTheDocument();
});
