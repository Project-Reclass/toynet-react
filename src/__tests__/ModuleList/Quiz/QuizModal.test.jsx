import React from 'react';

import { renderWithTheme } from "src/common/test-utils/renderWithTheme";
import QuizModal from "src/Curriculum/Quiz/QuizModal";

const defaultProps = {
    isOpen: true,
    numCorrect: 10,
    total: 10,
    done: () => null,
    tryAgain: () => null,
}

const renderHelper = ({...props}) => (
  renderWithTheme(
    <div>
      <QuizModal {...props} />
    </div>
  )
)

describe('The quiz score modal', () => {
  it('should show a score', () => {
    const { getByText } = renderHelper(defaultProps);
    expect(getByText(/100/i)).toBeInTheDocument();
  });
  it('should only show a try again button when score is under 70%', () => {
    const { queryAllByText, getByText } = renderHelper({...defaultProps, numCorrect: 0});
    expect(getByText('Try Again')); // Find "Try Again" button with exact text match
    expect(queryAllByText(`I'm Done`)).toHaveLength(0); // There should be no "I'm Done" button
  });
  it('should show a `done` button and try again when score is 70% or over', () => {
    const { getByText , queryAllByText} = renderHelper({...defaultProps, numCorrect: 7});
    expect(getByText('Try Again')).toBeInTheDocument(); // Try again should still be visible
    expect(queryAllByText(`I'm Done`)).toHaveLength(1); // The done button should also now be visible
  })
})