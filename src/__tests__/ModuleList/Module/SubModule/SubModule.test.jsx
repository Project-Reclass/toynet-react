import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'

import SubModule from 'src/Curriculum/Module/SubModule/SubModule';

const defaultProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: 'article',
}

describe('The sub modules', () => {
  it('should render and match previous snapshots', () => {
    const tree = renderer.create(
      <SubModule {...defaultProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should create a link to the submodule page', () => {
    const { moduleId, type, id, title } = defaultProps;
    const { getByText } = render(<SubModule {...defaultProps} />);
    const link = getByText(title);

    expect(link.getAttribute('href')).toBe(`/module/${moduleId}/${type.toString()}/${id}`)
  });
});