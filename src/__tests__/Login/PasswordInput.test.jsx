import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

import PasswordInput from 'src/Login/PasswordInput';

describe('The password input field', () => {
  it('should match snapshots', () => {
    const { container } =  renderWithTheme(<PasswordInput />);
    expect(container).toMatchSnapshot();
  });
  it('should match snapshot with text hidden by default', () => {
    const { getByTestId, container } =  renderWithTheme(<PasswordInput />);
    const input = getByTestId('password-input');
    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    expect(container).toMatchSnapshot();
  });
  it('should match snapshot with text shown', () => {
    const { getByTestId, getByText, container } =  renderWithTheme(<PasswordInput />);

    const btn = getByText(/show/i);
    const input = getByTestId('password-input');

    act(() => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    act(() => {
      fireEvent.click(btn);
    });

    expect(getByText(/hide/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should have a button that toggles from show / hide', () => {
    const { getByText } =  renderWithTheme(<PasswordInput />);

    const btn = getByText(/show/i);
    act(() => {
      fireEvent.click(btn);
    });

    expect(getByText(/hide/i)).toBeInTheDocument();
  });
});