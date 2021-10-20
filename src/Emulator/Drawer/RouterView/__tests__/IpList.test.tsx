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

import IpList from '../IpList';

jest.mock('@chakra-ui/core', () => {
  const actual = jest.requireActual('@chakra-ui/core');
  return {
    ...actual,
    useToast: jest.fn(),
  };
});

const setIps = jest.fn();
const defaultProps = {
  isDisabled: false,
  shouldShowError: false,
  ips: [
    {
      id: '1',
      ipAddr: 'localhost',
    },
    {
      id: '2',
      ipAddr: '10.0.0.1/30',
    },
  ],
  setIps,
};

describe('the ip list component', () => {
  it('should render a list of ips', () => {
    const { getByDisplayValue } = renderWithTheme(<IpList {...defaultProps} />);
    expect(getByDisplayValue(/localhost/i)).toBeInTheDocument();
    expect(getByDisplayValue('10.0.0.1/30')).toBeInTheDocument();
  });
  it('should show an error whenever the the ip is invalid', () => {
    const { getByText } = renderWithTheme(
      <IpList
        {...defaultProps}
        ips={[
          {
            id: '1',
            ipAddr: '',
          },
        ]}
        shouldShowError={true}
      />,
    );

    expect(getByText(/interface requires an ip/i)).toBeInTheDocument();
  });
});