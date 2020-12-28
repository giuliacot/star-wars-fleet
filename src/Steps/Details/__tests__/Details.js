import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Details } from '../Details';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('Details', () => {
  let queryClient;
  let errorMsg = /Are you sure of the commander choosed?.*/i;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.mount();
  });

  afterEach(() => {
    queryClient.clear();
  });
  test('it should not go to the next step if the required field is empty', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Details />
      </QueryClientProvider>,
    );
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
