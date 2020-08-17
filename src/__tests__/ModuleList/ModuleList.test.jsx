import React from 'react';

import renderer from 'react-test-renderer';
import ModuleList from 'src/ModuleList';

describe('The Module List', () => {
  it('should render and match snapshot', () => {
    const tree = renderer.create(<ModuleList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});