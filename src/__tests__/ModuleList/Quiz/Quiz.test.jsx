import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter, Route } from 'react-router-dom';

import Quiz from 'src/ModuleList/Quiz';

const RenderWithRouter = ({ children, moduleId, quizId }) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/quiz/${quizId}`]}>
    <Route path="/module/:moduleId/quiz/:quizId">{children}</Route>
  </MemoryRouter>
);

describe('The Quiz page', () => {
  it('should render the same based on URL parameters', () => {
    const tree = renderer.create(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});