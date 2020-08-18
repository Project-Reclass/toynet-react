import React from 'react';
import renderer from 'react-test-renderer';
import Module from 'src/ModuleList/Module';

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
    const tree = renderer.create(<Module {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});