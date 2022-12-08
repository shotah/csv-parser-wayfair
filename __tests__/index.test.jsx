import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';
import { csvState } from '../state/csvState';
import { RecoilObserver } from './utils/recoilObserver';

describe('Home', () => {
  beforeEach(() => {
    // const data = {
    //   data: [
    //     { id: 1, domain: 'google.com' },
    //     { id: 2, domain: 'amazon.com' }
    //   ]
    // };
    // csvState.mockResolvedValueOnce(data);
    const onChange = jest.fn();
    render(
      <RecoilRoot>
        <RecoilObserver node={csvState} onChange={onChange} />
        <Home />
      </RecoilRoot>
    );
  });

  it('renders a heading', async () => {
    // Validate main heading is displayed
    const heading = screen.getByRole('heading', {
      name: /Welcome to Favicon Finder!/i
    });
    expect(heading).toBeInTheDocument();
  });

  // TODO: Enable recoil mocking to validate Table will be shown with correct data.
  // it('should have data in the csv atom and show a table', async () => {
  //   await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());
  // });
});
