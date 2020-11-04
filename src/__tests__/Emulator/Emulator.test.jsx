import React from 'react';
import renderer from 'react-test-renderer';
import { renderTreeWithTheme } from 'src/common/test-utils/renderWithTheme';

import Emulator from 'src/Emulator/Emulator';

describe('The emulator', () => {
  it('should render and match snapshots', () => {
    const tree = renderTreeWithTheme(<Emulator />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});