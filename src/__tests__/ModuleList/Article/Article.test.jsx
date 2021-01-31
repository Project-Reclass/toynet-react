import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

import Article from 'src/Curriculum/Article';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

const RenderWithRouter = ({ children, moduleId, articleId }) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/article/${articleId}`]}>
    <Route path="/module/:moduleId/article/:articleId">{children}</Route>
  </MemoryRouter>
);

describe('The Article page', () => {
  it('should render the same based on URL parameters', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter moduleId={42} articleId={64}>
        <Article />
      </RenderWithRouter>
    );
    expect(container).toMatchSnapshot();
  });
});