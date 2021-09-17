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
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Article from 'src/Curriculum/Article';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

const RenderWithRouter = ({ children, moduleId, articleId }: {children: React.ReactChild, moduleId: number, articleId: number}) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/article/${articleId}`]}>
    <Route path="/module/:moduleId/article/:articleId">{children}</Route>
  </MemoryRouter>
);

describe('The Article page', () => {
  it('should render the same based on URL parameters', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter moduleId={42} articleId={64}>
        <Article />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});