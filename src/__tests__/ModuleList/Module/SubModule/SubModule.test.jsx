import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, waitFor, act } from '@testing-library/react'

import SubModule from 'src/Curriculum/Module/SubModule/SubModule';
import {  renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { resolve } from 'path';

const defaultProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: 'article',
  introduction: 'this is an introduction',
}

const valuesProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: 'VALUE',
}

describe('The sub modules', () => {
  it('should render and match previous snapshots', () => {
    const { container } = renderWithTheme(
      <SubModule {...defaultProps} />
    );
    
    expect(container).toMatchSnapshot();
  });
  it('should create a link to the submodule page', () => {
    const { type, id, moduleId } = defaultProps;
    const { getByText } = renderWithTheme(<SubModule {...defaultProps} />);
    const link = getByText(new RegExp('go to submodule', 'i'));
    expect(link.closest('a').getAttribute('href')).toBe(`/module/${moduleId}/${type.toString()}/${id}`)
  });
  it('should create a link to a values page', () => {
    const { type, id } = valuesProps;
    const { getByText } = renderWithTheme(<SubModule {...valuesProps} />);
    const link = getByText(new RegExp('go to submodule', 'i'));

    expect(link.closest('a').getAttribute('href')).toBe(`/${type.toLowerCase().toString()}/${id}`)
  });
});