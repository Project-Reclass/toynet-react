import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'

import SubModule from 'src/Curriculum/Module/SubModule/SubModule';
import { renderTreeWithTheme, renderWithTheme } from 'src/common/test-utils/renderWithTheme';

const defaultProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: 'article',
}

const valuesProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: 'value',
}

describe('The sub modules', () => {
  it('should render and match previous snapshots', () => {
    const tree = renderTreeWithTheme(
      <SubModule {...defaultProps} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should create a link to the submodule page', () => {
    const { type, id, title } = defaultProps;
    const { getByText } = renderWithTheme(<SubModule {...defaultProps} />);
    const link = getByText(title);

    expect(link.getAttribute('href')).toBe(`/module/0/${type.toString()}/${id}`)
  });
  it('should create a link to a values page', () => {
    const { type, id, title } = valuesProps;
    const { getByText } = renderWithTheme(<SubModule {...valuesProps} />);
    const link = getByText(title);

    expect(link.getAttribute('href')).toBe(`/${type.toString()}/${id}`)
  })
});