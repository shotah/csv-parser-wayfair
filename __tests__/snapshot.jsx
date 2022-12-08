import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Home from '../pages/index';

it('renders homepage unchanged', async () => {
  const { asFragment } = render(
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
  expect(asFragment()).toMatchSnapshot();
});
