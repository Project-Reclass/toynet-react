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
import { waitFor } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import Flow from 'src/Emulator/Visuals/Flow';

import { DeviceInterface } from 'src/common/types';

const routers: DeviceInterface[] = [
  {
    name: 'r1',
    type: 'router',
    connections: [],
  },
  {
    name: 'r2',
    type: 'router',
    connections: [],
  },
];

const switches: DeviceInterface[] = [
  {
    name: 's1',
    type: 'switch',
    connections: [],
  },
];

const hosts: DeviceInterface[] = [
  {
    name: 'h1',
    type: 'host',
    connections: [],
  },
];

const testSessionId = '123abc';

describe('Flow', () => {
  it('should match the snapshot', async () => {
    const { container, getByText } = renderWithTheme(
      <Flow
        sessionId={testSessionId}
        switches={switches}
        hosts={hosts}
        routers={routers}
        isTesting={true}
      />,
    );

    await waitFor(() => getByText(/r1/gi));

    expect(getByText(/r1/gi)).toBeInTheDocument();
    expect(getByText(/r2/gi)).toBeInTheDocument();
    expect(getByText(/s1/gi)).toBeInTheDocument();
    expect(getByText(/h1/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should be able to render only hosts', async () => {
    const { container, getByText } = renderWithTheme(
      <Flow
        sessionId={testSessionId}
        switches={[]}
        routers={[]}
        hosts={hosts}
        isTesting={true}
      />,
    );

    await waitFor(() => getByText(/h1/gi));
    expect(getByText(/h1/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should be able to render only switches', async () => {
    const { container, getByText } = renderWithTheme(
      <Flow
        sessionId={testSessionId}
        switches={switches}
        routers={[]}
        hosts={[]}
        isTesting={true}
      />,
    );

    await waitFor(() => getByText(/s1/gi));

    expect(getByText(/s1/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should be able to render only routers', async () => {
    const { container, getByText } = renderWithTheme(
      <Flow
        sessionId={testSessionId}
        switches={[]}
        routers={routers}
        hosts={[]}
        isTesting={true}
      />,
    );

    await waitFor(() => getByText(/r1/gi));
    expect(getByText(/r1/gi)).toBeInTheDocument();
    expect(getByText(/r2/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
