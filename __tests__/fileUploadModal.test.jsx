import * as React from 'react';
import { RecoilRoot } from 'recoil';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';

describe('Home', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    );
  });

  it('expects modal to open and close', async () => {
    // Open Modal
    fireEvent.click(screen.getByText(/upload csv/i));

    // Close Modal
    fireEvent.click(screen.getByText(/Close/i));

    // Wait for modal close by testing close button.
    await waitForElementToBeRemoved(() => screen.getByText(/Close/i));

    // Validate close button is no longer in the document
    expect(screen.queryByText(/Close/i)).not.toBeInTheDocument();
  });

  it('should have upload button disabled for incorrect file type', async () => {
    // Create Mock txt file to use.
    const textContent =
      'data:text/csv;charset=utf-8,1,google.com\n,2,amazon.com';
    const file = new File([textContent], 'test.txt', {
      type: 'text'
    });

    // Open Modal
    fireEvent.click(screen.getByText(/upload csv/i));

    // Validate button is disabled before file is uploaded
    expect(screen.getByText('Upload')).toBeDisabled();

    // Add our Mock file to input
    const uploadInput = screen.getByTestId('file_input');
    await waitFor(() =>
      fireEvent.change(uploadInput, {
        target: { files: [file] }
      })
    );

    // Validate button is disabled before file is uploaded
    expect(screen.getByText('Upload')).toBeDisabled();
  });

  it('should accept a CSV and enable upload button and allowed to be clicked', async () => {
    // Create Mock CSV file to use.
    const csvContent =
      'data:text/csv;charset=utf-8,1,google.com\n,2,amazon.com';
    const file = new File([csvContent], 'test.csv', {
      type: 'application/vnd.ms-excel'
    });

    // Open Modal
    fireEvent.click(screen.getByText(/upload csv/i));

    // Validate button is disabled before file is uploaded
    expect(screen.getByText('Upload')).toBeDisabled();

    // Add our Mock file to input
    const uploadInput = screen.getByTestId('file_input');
    // eslint-disable-next-line sonarjs/no-identical-functions
    await waitFor(() =>
      fireEvent.change(uploadInput, {
        target: { files: [file] }
      })
    );

    // Validate upload is no longer disabled
    expect(screen.getByText('Upload')).not.toBeDisabled();

    // Pressing the upload button
    fireEvent.click(screen.getByText('Upload'));

    // Waiting for button element to go away.
    await waitForElementToBeRemoved(() => screen.getByText('Upload'));

    // Validate the Modal and button have gone away.
    expect(screen.queryByText('Upload')).not.toBeInTheDocument();

    // TODO: Fix file input to load up table in Testing
    // await waitFor(() => expect(screen.getByRole('table')).toBeInTheDocument());
  });
});
