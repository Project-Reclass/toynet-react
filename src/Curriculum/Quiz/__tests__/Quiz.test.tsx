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
import { fireEvent, waitFor, screen } from '@testing-library/react';

import Quiz from 'src/Curriculum/Quiz';
import { getQuizMeta } from 'src/common/api/curriculum/quiz/requests';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { renderWithWrappers } from 'src/common/test-utils/renderWithWrappers';

jest.mock('src/common/api/curriculum/quiz/requests.ts');
const getQuizMetaMock = getQuizMeta as jest.MockedFunction<typeof getQuizMeta>;

const RenderWithRouter = ({ children, moduleId, quizId }: {children: React.ReactChild, moduleId: number, quizId: number}) => (
  <MemoryRouter initialEntries={[`/module/${moduleId}/quiz/${quizId}`]}>
    <Route path="/module/:moduleId/quiz/:quizId">{children}</Route>
  </MemoryRouter>
);

const ANSWER: number = 3;
const data = [
  {
    'question': 'How many nodes share a single channel on a bus topology?',
    'options': [
        'One node',
        'Only ones communicating',
        'Three nodes',
        'All nodes',
    ],
    'answer': ANSWER,
  },
  {
    'question': 'Which of the following is the most fault-tolerant WAN topology?',
    'options': [
        'Partial Mesh',
        'Ring',
        'Star',
        'Full-mesh',
    ],
    'answer': ANSWER,
  },
];
describe('The Quiz page', () => {

  it('should render the same based on URL parameters', () => {
    const { container } = renderWithWrappers(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should fetch quiz data', async () => {
    getQuizMetaMock.mockResolvedValue({ items: data });

    const { getByText, getAllByText } = renderWithWrappers(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>,
    );

    await waitFor(() => getAllByText(/How many nodes/i));

    expect(getByText(/How many nodes/i)).toBeInTheDocument();
    expect(getByText(/fault-tolerant WAN topology/i)).toBeInTheDocument();
    expect(getByText(/Partial Mesh/i)).toBeInTheDocument();
  });

  it('should err if none answered', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    getQuizMetaMock.mockResolvedValue({ items: data });
    const { getByText } = renderWithWrappers(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>,
    );
    const submitBtn = getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(window.alert).toBeCalled();

  });
  it('should err if not all answered', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    getQuizMetaMock.mockResolvedValue({ items: data });
    const { getByText } = renderWithWrappers(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>,
    );
    const choice1 = screen.getByTestId('Only ones communicating');
    const submitBtn = getByText(/submit/i);
    fireEvent.click(choice1);
    fireEvent.click(submitBtn);
    expect(window.alert).toBeCalled();

  });
  it('should not err if all answered', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    getQuizMetaMock.mockResolvedValue({ items: data });
    const { getByText } = renderWithWrappers(
      <RenderWithRouter moduleId={42} quizId={64}>
        <Quiz />
      </RenderWithRouter>,
    );
    const choice1 = screen.getByTestId('Only ones communicating');
    const choice2 = screen.getByTestId('Partial Mesh');
    const submitBtn = getByText(/submit/i);
    fireEvent.click(choice1);
    fireEvent.click(choice2);
    fireEvent.click(submitBtn);
    expect(window.alert).not.toBeCalled();

  });

});