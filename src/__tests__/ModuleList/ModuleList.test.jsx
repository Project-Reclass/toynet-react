import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

import ModuleList from 'src/Curriculum';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import mockedData from './mockData.json';

jest.mock('src/common/api/curriculum/dashboard/requests');
import { getCurriculum } from 'src/common/api/curriculum/dashboard/requests';

const RenderWithRouter = ({ children, curriculumId }) => (
  <MemoryRouter initialEntries={[`/dashboard/${curriculumId}`]}>
    <Route path="/dashboard/:curriculumId">{children}</Route>
  </MemoryRouter>
);


describe('The Module List', () => {
  it('should render and match snapshot', async () => {
    getCurriculum.mockResolvedValue(mockedData);
    const { container, getByText } = renderWithTheme(
      <RenderWithRouter curriculumId={1}>
        <ModuleList />
      </RenderWithRouter>
    );

    await waitFor(() => getByText(new RegExp('Hi there', 'i')))

    expect(container).toMatchSnapshot();
  });
});