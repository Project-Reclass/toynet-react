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
import { getSurveyMeta } from 'src/common/api/curriculum/survey/requests';
import { MemoryRouter, Route } from 'react-router-dom';
import { waitFor, fireEvent, screen } from '@testing-library/react';
import Survey from 'src/Curriculum/Survey';
import { renderWithWrappers } from 'src/common/test-utils/renderWithWrappers';
import { useSurvey } from 'src/common/api/curriculum/survey';

jest.mock('src/common/api/curriculum/survey/hooks');
jest.mock('src/common/api/curriculum/survey/requests');

const getSurveyMetaMock = getSurveyMeta as jest.MockedFunction<typeof getSurveyMeta>;
const useSurveyMock = useSurvey as jest.MockedFunction<typeof useSurvey>;

const RenderWithRouter = ({ children, moduleId, surveyId }:{children: React.ReactChild, moduleId: string | number, surveyId: number}) => (
    <MemoryRouter initialEntries={[`/module/${moduleId}/survey/${surveyId}`]}>
      <Route path="/module/:moduleId/survey/:surveyId">{children}</Route>
    </MemoryRouter>
);

const data = [
  {
      'item_type': 'TEXT',
      'question': 'What is your first name?',
  },
  {
      'item_type': 'CHOICE',
      'question': 'Are you interested in a career in the technology industry?',
      'options': [
          'As of now, I do not plan on it.',
          'Not sure...',
          'I am open to it. :)',
          'Absolutely!',
      ],
  },
  {
      'item_type': 'LONGTEXT',
      'question': 'What do you hope to get out of this course?',
  },
  {
      'item_type': 'SCALE',
      'question': 'How familiar would you say you are with computer networking concepts?',
      'options': [
          'Not at all',
          'Some familiarity',
          'Quite a bit',
          'Very familiar',
          'Professional Experience',
      ],
  },
];

//I am assuming that this function is the "hack" mentioned here:
//https://github.com/facebook/react/issues/11488#issuecomment-347775628

//setting input to any is the only way I found for this hack to work with TS
function setInputValue(input:any, newValue:string) {
  let lastValue = input.value;
  input.value = newValue;
  let event = new CustomEvent('input', { detail: {target: input}, bubbles: true });

  //this part of the hack is for react 15, so I assume you don't need it
  // React 15
  // event.simulated = true;

  // React 16
  let tracker = input._valueTracker;
  if (tracker) {
      tracker.setValue(lastValue);
  }
  input.dispatchEvent(event);
}

describe('The Survey page', () => {
    it('should render the same based on URL parameters', () => {
      useSurveyMock.mockReturnValue({
        isLoading: false,
        data: {
          name: 'Survey',
          description: 'A mock survey',
          items: data,
        },
      });
        const { container } = renderWithWrappers(
          <RenderWithRouter moduleId={0} surveyId={6001}>
            <Survey />
          </RenderWithRouter>,
        );
        expect(container).toMatchSnapshot();
    });
    it('should fetch quiz data', async () => {
        getSurveyMetaMock.mockResolvedValue({ items: data });
        useSurveyMock.mockReturnValue({
          isLoading: false,
          data: {
            name: 'Survey',
            description: 'A mock survey',
            items: data,
          },
        });
        const { getByText, getAllByText } = renderWithWrappers(
          <RenderWithRouter surveyId={64} moduleId={42}>
            <Survey />
          </RenderWithRouter>,
        );

        await waitFor(() => getAllByText(/first name/i));

        expect(getByText(/first name/i)).toBeInTheDocument();
        expect(getByText(/get out of this course/i)).toBeInTheDocument();
        expect(getByText(/Some familiarity/i)).toBeInTheDocument();
    });
    it('should err if none answered', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      getSurveyMetaMock.mockResolvedValue({ items: data });
      useSurveyMock.mockReturnValue({
        isLoading: false,
        data: {
          name: 'Survey',
          description: 'A mock survey',
          items: data,
        },
      });
      const { getByText } = renderWithWrappers(
        <RenderWithRouter surveyId={64} moduleId={42}>
          <Survey />
        </RenderWithRouter>,
      );
      const submitBtn = getByText(/submit/i);
      fireEvent.click(submitBtn);
      expect(window.alert).toBeCalled();

    });
    it('should err if not all answered', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      getSurveyMetaMock.mockResolvedValue({ items: data });
      useSurveyMock.mockReturnValue({
        isLoading: false,
        data: {
          name: 'Survey',
          description: 'A mock survey',
          items: data,
        },
      });
      const { getByText } = renderWithWrappers(
        <RenderWithRouter surveyId={64} moduleId={42}>
          <Survey />
        </RenderWithRouter>,
      );
      const choice1 = screen.getByTestId('Not sure...');
      const submitBtn = getByText(/submit/i);
      fireEvent.click(choice1);
      fireEvent.click(submitBtn);
      expect(window.alert).toBeCalled();

    });
    it('should not err if all answered', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      getSurveyMetaMock.mockResolvedValue({ items: data });
      useSurveyMock.mockReturnValue({
        isLoading: false,
        data: {
          name: 'Survey',
          description: 'A mock survey',
          items: data,
        },
      });
      const { getByText } = renderWithWrappers(
        <RenderWithRouter surveyId={64} moduleId={42}>
          <Survey />
        </RenderWithRouter>,
      );
      const choice1 = screen.getByTestId('What is your first name?');
      const choice2 = screen.getByTestId('Not sure...');
      const choice3 = screen.getByTestId('What do you hope to get out of this course?');
      const choice4 = screen.getByTestId('Quite a bit');

      const submitBtn = getByText(/submit/i);

      fireEvent.click(choice2);
      fireEvent.click(choice4);
      setInputValue(choice1, 'John Doe');
      setInputValue(choice3, 'Nothing');
      fireEvent.click(submitBtn);
      expect(window.alert).not.toBeCalled();

    });

});