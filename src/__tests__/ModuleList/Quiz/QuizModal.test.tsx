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

import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import QuizModal from 'src/Curriculum/Quiz/QuizModal';

const defaultProps = {
    isOpen: true,
    // eslint-disable-next-line no-magic-numbers
    numCorrect: 10,
    // eslint-disable-next-line no-magic-numbers
    total: 10,
    done: () => null,
    tryAgain: () => null,
};

const renderHelper = ({...props}: {isOpen: boolean, numCorrect: number, total: number, done: () => null, tryAgain: () => null}) => (
  renderWithTheme(
    <div>
      <QuizModal {...props} />
    </div>,
  )
);

describe('The quiz score modal', () => {
  it('should show a score', () => {
    const { getByText } = renderHelper(defaultProps);
    expect(getByText(/100/i)).toBeInTheDocument();
  });
  it('should only show a try again button when score is under 70%', () => {
    const { queryAllByText, getByText } = renderHelper({...defaultProps, numCorrect: 0});
    expect(getByText('Try Again')).toBeInTheDocument(); // Find "Try Again" button with exact text match
    expect(queryAllByText('I\'m Done')).toHaveLength(0); // There should be no "I'm Done" button
  });
  it('should show a `done` button and try again when score is 70% or over', () => {
    // eslint-disable-next-line no-magic-numbers
    const { getByText, queryAllByText} = renderHelper({...defaultProps, numCorrect: 7});
    expect(getByText('Try Again')).toBeInTheDocument(); // Try again should still be visible
    expect(queryAllByText('I\'m Done')).toHaveLength(1); // The done button should also now be visible
  });
});