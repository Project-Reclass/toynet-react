import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';

import Article from 'src/ModuleList/Article';

const RenderWithRouter = ({ children, moduleId, articleId }) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/article/${articleId}`]}>
    <Route path="/module/:moduleId/article/:articleId">{children}</Route>
  </MemoryRouter>
);

describe('The Article page', () => {
  it('should render the same based on URL parameters', () => {
    const tree = renderer.create(
      <RenderWithRouter moduleId={42} articleId={64}>
        <Article />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});