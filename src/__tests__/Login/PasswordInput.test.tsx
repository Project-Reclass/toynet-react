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

import React from "react";
import { act, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "src/common/test-utils/renderWithTheme";

import PasswordInput from "src/Login/PasswordInput";

describe("The password input field", () => {
  it("should match snapshots", () => {
    const { container } = renderWithTheme(<PasswordInput />);
    expect(container).toMatchSnapshot();
  });
  it("should match snapshot with text hidden by default", () => {
    const { getByTestId, container } = renderWithTheme(<PasswordInput />);
    const input = getByTestId("password-input");
    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    expect(container).toMatchSnapshot();
  });
  it("should match snapshot with text shown", () => {
    const { getByTestId, getByText, container } = renderWithTheme(
      <PasswordInput />
    );

    const btn = getByText(/show/i);
    const input = getByTestId("password-input");

    act(() => {
      fireEvent.change(input, { target: { value: "test" } });
    });
    act(() => {
      fireEvent.click(btn);
    });

    expect(getByText(/hide/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it("should have a button that toggles from show / hide", () => {
    const { getByText } = renderWithTheme(<PasswordInput />);

    const btn = getByText(/show/i);
    act(() => {
      fireEvent.click(btn);
    });

    expect(getByText(/hide/i)).toBeInTheDocument();
  });
});
