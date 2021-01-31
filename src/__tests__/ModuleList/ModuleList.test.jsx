import React from 'react';

import ModuleList from 'src/Curriculum';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

describe('The Module List', () => {
  it('should render and match snapshot', () => {
    const { container } = renderWithTheme(<ModuleList />);
    expect(container).toMatchSnapshot();
  });
});