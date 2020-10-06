import React, { FC } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@chakra-ui/core/dist';
import renderer from 'react-test-renderer';

const Wrapper: FC = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export const renderWithTheme = (ui: any) => {
  return render(ui, { wrapper: Wrapper });
};

export const renderTreeWithTheme = (ui: any) => {
  return renderer.create(<Wrapper>{ui}</Wrapper>);
};
