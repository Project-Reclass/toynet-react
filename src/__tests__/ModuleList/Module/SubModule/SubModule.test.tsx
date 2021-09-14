/*
Copyright (C) 1992-2021 Free Software Foundation, Inc.

This file is part of ToyNet React.

ToyNet React is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free
Software Foundation; either version 3, or (at your option) any later
version.

ToyNet React is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or
FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
for more details.

You should have received a copy of the GNU General Public License
along with ToyNet React; see the file LICENSE.  If not see
<http://www.gnu.org/licenses/>.

*/

/* eslint-disable no-magic-numbers */

import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';

import SubModule from 'src/Curriculum/Module/SubModule/SubModule';
import { renderTreeWithTheme, renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { ModuleTypes } from 'src/Curriculum/Module';

const defaultProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: ModuleTypes.ARTICLE,
  index: 0,
  count: 5,
};

const valuesProps = {
  title: 'Article',
  progress: 99,
  id: 1,
  moduleId: 2,
  type: ModuleTypes.VALUE,
  index: 0,
  count: 5,
};

describe('The sub modules', () => {
  it('should render and match previous snapshots', () => {
    const { container } = renderWithTheme(
      <SubModule {...defaultProps} />,
    );
    expect(container).toMatchSnapshot();
  });
  it('should create a link to the submodule page', () => {
    const { type, id, title, moduleId } = defaultProps;
    const { getByText } = renderWithTheme(<SubModule {...defaultProps} />);
    const link = getByText(title);

    expect(link.getAttribute('href')).toBe(`/module/${moduleId}/${type.toString()}/${id}`);
  });
  it('should create a link to a values page', () => {
    const { type, id, title } = valuesProps;
    const { getByText } = renderWithTheme(<SubModule {...valuesProps} />);
    const link = getByText(title);

    expect(link.getAttribute('href')).toBe(`/${type.toString()}/${id}`);
  });
});