import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { fireEvent, getByTestId, waitFor, screen } from '@testing-library/react';

import Quiz from 'src/Curriculum/Quiz';
import { getQuizMeta } from 'src/common/api/curriculum/quiz/requests';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

jest.mock('src/common/api/curriculum/quiz/requests.ts');
const getQuizMetaMock = getQuizMeta as jest.MockedFunction<typeof getQuizMeta>;

const RenderWithRouter = ({ children, moduleId, quizId }: {children: React.ReactChild, moduleId: number, quizId: number}) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/quiz/${quizId}`]}>
    <Route path="/module/:moduleId/quiz/:quizId">{children}</Route>
  </MemoryRouter>
);

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
    getQuizMetaMock.mockResolvedValue({ items: data });

    const { getByText, getAllByText } = renderWithTheme(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>
    );

    await waitFor(() => getAllByText(/How many nodes/i));

    expect(getByText(/How many nodes/i)).toBeInTheDocument();
    expect(getByText(/fault-tolerant WAN topology/i)).toBeInTheDocument();
    expect(getByText(/Partial Mesh/i)).toBeInTheDocument();
  });
  
  it('should err if none answered',() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    getQuizMetaMock.mockResolvedValue({ items: data });
    const { getByText, getAllByText } = renderWithTheme(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>
    );
    const submitBtn = getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(window.alert).toBeCalled();
    
  })
  it('should err if not all answered',() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    getQuizMetaMock.mockResolvedValue({ items: data });
    const { getByText, getAllByText } = renderWithTheme(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>
    );
    const choice1 = screen.getByTestId('Only ones communicating');
    const submitBtn = getByText(/submit/i);
    fireEvent.click(choice1);
    fireEvent.click(submitBtn);
    expect(window.alert).toBeCalled();
    
  })
  it('should not err if all answered',() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    getQuizMetaMock.mockResolvedValue({ items: data });
    const { getByText, getAllByText } = renderWithTheme(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>
    );
    const choice1 = screen.getByTestId('Only ones communicating');
    const choice2 = screen.getByTestId('Partial Mesh');
    const submitBtn = getByText(/submit/i);
    fireEvent.click(choice1);
    fireEvent.click(choice2);
    fireEvent.click(submitBtn);
    expect(window.alert).not.toBeCalled();
  
  })
  
});