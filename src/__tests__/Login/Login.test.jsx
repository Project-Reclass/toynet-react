import React from "react";

import { renderWithTheme } from "src/common/test-utils/renderWithTheme";
import Login from "src/Login";
import { fireEvent, act } from "@testing-library/react";

describe("The Module List", () => {
  it("should render and match snapshot", () => {
    const { container } = renderWithTheme(<Login />);
    expect(container).toMatchSnapshot();
  });
  it("should have red border around username input when length <= 3 char && password > 3", () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />
    );
    const username = getByPlaceholderText("Username");
    const password = getByPlaceholderText("Password");
    const submitBtn = getByText("Sign In");

    act(() => {
      fireEvent.change(username, { target: { value: "abc" } });
      fireEvent.change(password, { target: { value: "abcd" } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
  it("should have red border around password input when length <= 3 char && username > 3", () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />
    );
    const username = getByPlaceholderText("Username");
    const password = getByPlaceholderText("Password");
    const submitBtn = getByText("Sign In");

    act(() => {
      fireEvent.change(username, { target: { value: "abcd" } });
      fireEvent.change(password, { target: { value: "abc" } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
  it("should have red border around username and password input when length <= 3", () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />
    );
    const username = getByPlaceholderText("Username");
    const password = getByPlaceholderText("Password");
    const submitBtn = getByText("Sign In");

    act(() => {
      fireEvent.change(username, { target: { value: "abc" } });
      fireEvent.change(password, { target: { value: "abc" } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
  it("should not have red border around username and password input when length > 3", () => {
    const { getByPlaceholderText, getByText, container } = renderWithTheme(
      <Login />
    );
    const username = getByPlaceholderText("Username");
    const password = getByPlaceholderText("Password");
    const submitBtn = getByText("Sign In");

    act(() => {
      fireEvent.change(username, { target: { value: "abcd" } });
      fireEvent.change(password, { target: { value: "abcd" } });
    });

    act(() => {
      fireEvent.click(submitBtn);
    });

    expect(container).toMatchSnapshot();
  });
});
