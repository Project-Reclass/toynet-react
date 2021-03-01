import React from 'react';

import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import Login from 'src/Login';

describe('The Module List', () => {
  it('should render and match snapshot', () => {
    const { container } = renderWithTheme(<Login />);
    expect(container).toMatchSnapshot();
  });
});