import React from 'react';

import { renderWithTheme } from "src/common/test-utils/renderWithTheme";
import QuizModal from "src/ModuleList/Quiz/QuizModal";

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
    const { queryAllByText } = renderHelper({...defaultProps, numCorrect: 0});
    expect(queryAllByText(/try again/i)).toHaveLength(2);
    expect(queryAllByText(/done/i)).toHaveLength(0);
  });
  it('should show a `done` button when score is 70% or over', () => {
    const { queryAllByText, getByText } = renderHelper({...defaultProps, numCorrect: 7});
    expect(queryAllByText(/try again/i)).toHaveLength(1);
    expect(getByText(/done/i)).toBeInTheDocument();
  })
})