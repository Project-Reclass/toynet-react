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

import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import Module from 'src/Curriculum/Module';
import { ModuleTypes } from 'src/Curriculum/Module';

const defaultProps = {
  id: 0,
  moduleId: 0,
  title: 'First Module',
  progress: 8,
  type: ModuleTypes.PARENT,

  subModules: [
    {
      id: 1,
      moduleId: 1,
      title: 'First Article',
      progress: 42,
      type: ModuleTypes.QUIZ,
    },
  ],
};

describe('The Module', () => {
  it('should render and match snapshots', () => {
    const { container } = renderWithTheme(<Module {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});