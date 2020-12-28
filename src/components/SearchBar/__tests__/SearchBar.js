import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import { useDataQuery } from '../useDataQuery.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import userEvent from '@testing-library/user-event';
jest.mock('../useDataQuery.tsx');

describe('SearchBar', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });
  test('it should shows options', () => {
    useDataQuery.mockReturnValue({
      loading: false,
      data: {
        results: [
          {
            name: 'Luke Skywalker',
          },
          {
            name: 'C-3PO',
          },
          {
            name: 'Darth Vader',
          },
        ],
      },
      refetch: () => true,
    });
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <SearchBar
          label="hello"
          kind="people"
          initialValue=""
          name="hello"
          matchingCheck={(a, b) => a.name === b.name}
          set={(value) => {
            updateFleet({
              commander: value,
            });
          }}
        />
      </QueryClientProvider>,
    );
    userEvent.type(screen.getByLabelText('hello'), 'Luke');
    userEvent.click(container.querySelector('input'));
    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
  });
});
