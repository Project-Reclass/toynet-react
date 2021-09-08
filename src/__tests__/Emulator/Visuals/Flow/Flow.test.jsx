import React from 'react';
import { waitFor } from '@testing-library/react';
import { renderWithTheme } from "src/common/test-utils/renderWithTheme";
import Flow from "src/Emulator/Visuals/Flow";

const routers = [
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

const switches = [
  {
    name: 's1',
    type: 'switch',
    connections: [],
  },
];

const hosts = [
  {
    name: 'h1',
    type: 'host',
    connections: [],
  },
];

describe('Flow', () => {
  it('should match the snapshot', async () => {
    const { container, getByText } = renderWithTheme(<Flow
      switches={switches}
      hosts={hosts}
      routers={routers}
      isTesting={true}
    />);

    await waitFor(() => getByText(/r1/gi));

    expect(getByText(/r1/gi)).toBeInTheDocument();
    expect(getByText(/r2/gi)).toBeInTheDocument();
    expect(getByText(/s1/gi)).toBeInTheDocument();
    expect(getByText(/h1/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should be able to render only hosts', async () => {
    const { container, getByText } = renderWithTheme(<Flow
      switches={[]}
      routers={[]}
      hosts={hosts}
      isTesting={true}
    />);
    
    await waitFor(() => getByText(/h1/gi));
    expect(getByText(/h1/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should be able to render only switches', async () => {
    const { container, getByText } = renderWithTheme(<Flow
      switches={switches}
      routers={[]}
      hosts={[]}
      isTesting={true}
    />);

    await waitFor(() => getByText(/s1/gi));

    expect(getByText(/s1/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  it('should be able to render only routers', async () => {
    const { container, getByText } = renderWithTheme(<Flow
      switches={[]}
      routers={routers}
      hosts={[]}
      isTesting={true}
    />);

    await waitFor(() => getByText(/r1/gi));
    expect(getByText(/r1/gi)).toBeInTheDocument();
    expect(getByText(/r2/gi)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});