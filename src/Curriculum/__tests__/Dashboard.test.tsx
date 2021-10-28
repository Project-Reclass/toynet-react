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

import ModuleList from 'src/Curriculum';
import RenderWithRouter from 'src/common/test-utils/renderWithRouter';
import { waitFor } from '@testing-library/react';
import * as requests from 'src/common/api/curriculum/dashboard/requests';
import { DashboardIntf } from 'src/common/types/curriculum';
import { asMockedModule } from 'src/common/test-utils/types';
import { renderWithWrappers } from 'src/common/test-utils/renderWithWrappers';

jest.mock('src/common/api/curriculum/dashboard/requests');

const path = '/dashboard/:curriculumId';
const initialEntries = ['/dashboard/1'];

const mockRequest = asMockedModule<DashboardIntf, typeof requests>(requests);


describe('The Module List', () => {
  afterEach(() => {
    mockRequest.__resetMock();
  });
  it('should render and match snapshot', async () => {
    const { container, getByText } = renderWithWrappers(
      <RenderWithRouter
        path='/dashboard/:curriculumId'
        initialEntries={[`/dashboard/${1}`]}
      >
        <ModuleList />
      </RenderWithRouter>,
    );

    await waitFor(() => getByText(/intro/i));

    expect(container).toMatchSnapshot();
  });

  it('should render the introduction of the curriculum', async () => {
    const mockedName = 'new cool introduction';
    mockRequest.__setMockData({
      ...mockRequest.mockData,
      introduction: mockedName,
    });
    const { getByText } = renderWithWrappers(
      <RenderWithRouter
        path={path}
        initialEntries={initialEntries}
      >
        <ModuleList />
      </RenderWithRouter>,
    );

    await waitFor(() => getByText(new RegExp(mockedName, 'i')));

    expect(getByText(new RegExp(mockedName, 'i'))).toBeInTheDocument();
  });

  it('should render the modules for the curriculum', async () => {
    mockRequest.__setMockData({
      ...mockRequest.mockData,
      modules: [
        {
          id: 1,
          name: 'First module name',
          introduction: 'first module intro',
          submodules: [],
        },
      ],
    });
    const { getByText } = renderWithWrappers(
      <RenderWithRouter
        path={path}
        initialEntries={initialEntries}
      >
        <ModuleList />
      </RenderWithRouter>,
    );

    await waitFor(() => getByText(new RegExp('first module intro', 'i')));

    expect(getByText(/first module intro/i)).toBeInTheDocument();
    expect(getByText(/first module name/i)).toBeInTheDocument();
  });

});
