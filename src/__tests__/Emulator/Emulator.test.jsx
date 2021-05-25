import React from 'react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

jest.mock('src/common/api/topology/requests');

import Emulator from 'src/Emulator/Emulator';


describe('The emulator', () => {
  it('should render and match snapshots', () => {
    const { container } = renderWithTheme(<Emulator />)
    expect(container).toMatchSnapshot();
  })
});