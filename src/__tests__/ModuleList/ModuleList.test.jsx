import React from 'react';

import { renderTreeWithTheme } from 'src/common/test-utils/renderWithTheme';
import ModuleList from 'src/ModuleList';

describe('The Module List', () => {
  it('should render and match snapshot', () => {
    const tree = renderTreeWithTheme(<ModuleList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});