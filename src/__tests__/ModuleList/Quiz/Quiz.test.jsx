import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

import Quiz from 'src/Curriculum/Quiz';

jest.mock('src/common/api/curriculum/quiz/requests');
import { getQuizMeta } from 'src/common/api/curriculum/quiz/requests';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

const RenderWithRouter = ({ children, moduleId, quizId }) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/quiz/${quizId}`]}>
    <Route path="/module/:moduleId/quiz/:quizId">{children}</Route>
  </MemoryRouter>
);

describe('The Quiz page', () => {
  it('should render the same based on URL parameters', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetch quiz data', async () => {
    const data = [
      {
        "question": "How many nodes share a single channel on a bus topology?",
        "options": [
            "One node",
            "Only ones communicating",
            "Three nodes",
            "All nodes"
        ],
        "answer": 3
      },
      {
        "question": "Which of the following is the most fault-tolerant WAN topology?",
        "options": [
            "Partial Mesh",
            "Ring",
            "Star",
            "Full-mesh"
        ],
        "answer": 3
      }
    ];
    getQuizMeta.mockResolvedValue({ items: data });
    const { getByText, getAllByText } = renderWithTheme(
      <RenderWithRouter quizId={64}>
        <Quiz />
      </RenderWithRouter>
    );

    await waitFor(() => getAllByText(/How many nodes/i));

    expect(getByText(/How many nodes/i)).toBeInTheDocument();
    expect(getByText(/fault-tolerant WAN topology/i)).toBeInTheDocument();
    expect(getByText(/Partial Mesh/i)).toBeInTheDocument();
  });
});