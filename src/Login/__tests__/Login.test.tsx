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
import Login from 'src/Login';
import { fireEvent, act } from '@testing-library/react';

describe('The Module List', () => {
  it('should render and match snapshot', () => {
    const { container } = renderWithTheme(<Login />);
    expect(container).toMatchSnapshot();
  });
  it('should have red border around username input when length <= 3 char && password > 3', () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />,
    );
    const username = getByPlaceholderText('Username');
    const password = getByPlaceholderText('Password');
    const submitBtn = getByText('Sign In');

    act(() => {
      fireEvent.change(username, { target: { value: 'abc' } });
      fireEvent.change(password, { target: { value: 'abcd' } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
  it('should have red border around password input when length <= 3 char && username > 3', () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />,
    );
    const username = getByPlaceholderText('Username');
    const password = getByPlaceholderText('Password');
    const submitBtn = getByText('Sign In');

    act(() => {
      fireEvent.change(username, { target: { value: 'abcd' } });
      fireEvent.change(password, { target: { value: 'abc' } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
  it('should have red border around username and password input when length <= 3', () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />,
    );
    const username = getByPlaceholderText('Username');
    const password = getByPlaceholderText('Password');
    const submitBtn = getByText('Sign In');

    act(() => {
      fireEvent.change(username, { target: { value: 'abc' } });
      fireEvent.change(password, { target: { value: 'abc' } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
  it('should not have red border around username and password input when length > 3', () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />,
    );
    const username = getByPlaceholderText('Username');
    const password = getByPlaceholderText('Password');
    const submitBtn = getByText('Sign In');

    act(() => {
      fireEvent.change(username, { target: { value: 'abcd' } });
      fireEvent.change(password, { target: { value: 'abcd' } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
});
