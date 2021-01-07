import React from 'react';

import { renderTreeWithTheme } from 'src/common/test-utils/renderWithTheme';
import Module from 'src/Curriculum/Module';

const defaultProps = {
  title: 'First Module',
  progress: 8,
  type: 'parent',
  subModules: [
    {
      id: 1,
      moduleId: 1,
      title: 'First Article',
      progress: 42,
      type: 'quiz',
    }
  ]
}

describe('The Module', () => {
  it('should render and match snapshots', () => {
    const tree = renderTreeWithTheme(<Module {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});