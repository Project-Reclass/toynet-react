import React from 'react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import { getSurveyMeta } from 'src/common/api/curriculum/survey/requests';
import { MemoryRouter, Route } from 'react-router-dom';
import { waitFor, fireEvent, screen } from '@testing-library/react';
import Survey from 'src/Curriculum/Survey';
jest.mock('src/common/api/curriculum/survey/requests');




const RenderWithRouter = ({ children, moduleId, surveyId }) => (
    <MemoryRouter initialEntries={[`/module/${moduleId}/survey/${surveyId}`]}>
      <Route path="/module/:moduleId/survey/:surveyId">{children}</Route>
    </MemoryRouter>
);

const data = [
  {
      'item_type': 'TEXT',
      'question': 'What is your first name?'
  },
  {
      'item_type': 'CHOICE',
      'question': 'Are you interested in a career in the technology industry?',
      'options': [
          'As of now, I do not plan on it.',
          'Not sure...',
          'I am open to it. :)',
          'Absolutely!'
      ]
  },
  {
      'item_type': 'LONGTEXT',
      'question': 'What do you hope to get out of this course?'
  },
  {
      'item_type': 'SCALE',
      'question': 'How familiar would you say you are with computer networking concepts?',
      'options': [
          'Not at all',
          'Some familiarity',
          'Quite a bit',
          'Very familiar',
          'Professional Experience'
      ]
  }
];

function setInputValue(input, newValue) {
  let lastValue = input.value;
  input.value = newValue;
  let event = new Event("input", { target: input, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = input._valueTracker;
  if (tracker) {
      tracker.setValue(lastValue);
  }
  input.dispatchEvent(event);
}

describe('The Survey page', () => {
    it('should render the same based on URL parameters', () => {
        const { container } = renderWithTheme(
          <RenderWithRouter moduleId={0} surveyId={6001}>
            <Survey />
          </RenderWithRouter>
        );
        expect(container).toMatchSnapshot();
    });
    it('should fetch quiz data', async () => {
        getSurveyMeta.mockResolvedValue({ items: data });
        const { getByText, getAllByText } = renderWithTheme(
          <RenderWithRouter surveyId={64}>
            <Survey />
          </RenderWithRouter>
        );
    
        await waitFor(() => getAllByText(/first name/i));

        expect(getByText(/first name/i)).toBeInTheDocument();
        expect(getByText(/get out of this course/i)).toBeInTheDocument();
        expect(getByText(/Some familiarity/i)).toBeInTheDocument();
    });
    it('should err if none answered',() => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      getSurveyMeta.mockResolvedValue({ items: data });
      const { getByText, getAllByText } = renderWithTheme(
        <RenderWithRouter surveyId={64}>
          <Survey />
        </RenderWithRouter>
      );
      const submitBtn = getByText(/submit/i);
      fireEvent.click(submitBtn);
      expect(window.alert).toBeCalled();
      
    })
    it('should err if not all answered',() => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      getSurveyMeta.mockResolvedValue({ items: data });
      const { getByText, getAllByText } = renderWithTheme(
        <RenderWithRouter surveyId={64}>
          <Survey />
        </RenderWithRouter>
      );
      const choice1 = screen.getByTestId('Not sure...');
      const submitBtn = getByText(/submit/i);
      fireEvent.click(choice1);
      fireEvent.click(submitBtn);
      expect(window.alert).toBeCalled();
      
    })
    it('should not err if all answered',() => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      getSurveyMeta.mockResolvedValue({ items: data });
      const { getByText, getAllByText } = renderWithTheme(
        <RenderWithRouter surveyId={64}>
          <Survey />
        </RenderWithRouter>
      );
      const choice1 = screen.getByTestId('What is your first name?');
      const choice2 = screen.getByTestId('Not sure...');
      const choice3 = screen.getByTestId('What do you hope to get out of this course?')
      const choice4 = screen.getByTestId('Quite a bit');

      const submitBtn = getByText(/submit/i);

      fireEvent.click(choice2);
      fireEvent.click(choice4);
      setInputValue(choice1,'John Doe');
      setInputValue(choice3,'Nothing');
      fireEvent.click(submitBtn);
      expect(window.alert).not.toBeCalled();
    
    })
    
});