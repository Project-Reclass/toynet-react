import React from 'react';

import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import Module from 'src/Curriculum/Module';

const defaultProps = {
  id: 1,
  index: 10,
  locked: false,
  introduction: 'introduction',
  name: 'cool',
  submodules: [
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
    const { container } = renderWithTheme(<Module {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('should list the modules completed', () => {
    const { submodules } = defaultProps;
    const { getByText } = renderWithTheme(<Module {...defaultProps} />);
    const matcher = `${submodules.length} / ${submodules.length} completed`;
    expect(getByText(new RegExp(matcher, 'i'))).toBeInTheDocument();

  });
});