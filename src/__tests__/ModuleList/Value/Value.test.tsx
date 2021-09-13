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
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import Value from 'src/Curriculum/Value';
import { getValueMeta } from 'src/common/api/curriculum/value/requests';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';

jest.mock('src/common/api/curriculum/value/requests.ts');
const getValueMetaMock = getValueMeta as jest.MockedFunction<typeof getValueMeta>;

const RenderWithRouter = ({ children, valueId }: { children: React.ReactChild, valueId: number }) => (
  <MemoryRouter initialEntries={[`/value/${valueId}`]}>
    <Route path="/value/:valueId">{children}</Route>
  </MemoryRouter>
);

describe('The value page', () => {
  it('should render multiple inspirations for integrity', async () => {
    const data = {
        'value': 'Integrity',
        'inspiration': [
            {
                'organization': 'U.S. Air Force',
                'definition': 'Integrity is the adherence to a strong moral code and consistency in one’s actions and values [...] Airmen should be guided by a deeply held sense of honor, not one of personal comfort or uncontrolled selfish appetites.',
            },
            {
                'organization': 'U.S. Army',
                'definition': 'Do what’s right, legally and morally. Integrity is a quality you develop by adhering to moral principles. It requires that you do and say nothing that deceives others. As your integrity grows, so does the trust others place in you […] and, finally, the fundamental acceptance of yourself.',
            },
            {
                'organization': 'U.S. Coast Guard',
                'definition': 'Integrity is our standard. We demonstrate uncompromising ethical conduct and moral behavior in all of our personal actions. We are loyal and accountable to the public trust.',
            },
        ],
    };

    (getValueMeta as jest.MockedFunction<typeof getValueMeta>).mockResolvedValue(data);
    const { getByText, getAllByText, getAllByTestId } = render(
      <RenderWithRouter valueId={5001}>
        <Value />
      </RenderWithRouter>,
    );
    await waitFor(() => getAllByText(/integrity/i));

    expect(getAllByText(/U.S. Air Force/i).length).toBeGreaterThan(0);
    expect(getAllByText(/U.S. Army/i).length).toBeGreaterThan(0);
    expect(getAllByText(/U.S. Coast Guard/i).length).toBeGreaterThan(0);

    expect(getByText(/Integrity is the adherence/i)).toBeInTheDocument();
    expect(getByText(/Do what’s right, legally/i)).toBeInTheDocument();
    expect(getByText(/Integrity is our standard./i)).toBeInTheDocument();

    expect(getAllByTestId('styled-box').length).toEqual(data.inspiration.length);
  });

  it('should render multiple inspirations for respect', async () => {
    const data = {
        'value': 'Respect',
        'inspiration': [
            {
                'organization': 'Army',
                'definition': 'Treat people as they should be treated [...] Respect is what allows us to appreciate the best in other people. Respect is trusting that all people have done their jobs and fulfilled their duty.',
            },
        ],
    };

    getValueMetaMock.mockResolvedValue(data);
    const { getByText, getAllByText, getAllByTestId } = render(
      <RenderWithRouter valueId={5002}>
        <Value />
      </RenderWithRouter>,
    );
    await waitFor(() => getAllByText(/respect/i));

    expect(getAllByText(/Army/i).length).toBeGreaterThan(0);

    expect(getByText(/Treat people as they/i)).toBeInTheDocument();

    expect(getAllByTestId('styled-box').length).toEqual(data.inspiration.length);
  });

  it('should render multiple inspirations for honor', async () => {
    const data = {
        'value': 'Honor',
        'inspiration': [
            {
                'organization': 'Army',
                'definition': 'Live up to Army values [...] Honor is a matter of carrying out, acting, and living the values of respect, duty, loyalty, selfless service, integrity and personal courage in everything you do.',
            },
            {
                'organization': 'Marines / Navy',
                'definition': 'The quality of maturity, dedication, trust, and dependability that commits Marines to act responsibly; to be accountable for actions; to fulfill obligations; and to hold others accountable for their actions.',
            },
        ],
    };
    getValueMetaMock.mockResolvedValue(data);
    const { getByText, getAllByText, getAllByTestId } = render(
      <RenderWithRouter valueId={5003}>
        <Value />
      </RenderWithRouter>,
    );
    await waitFor(() => getAllByText(/honor/i));

    expect(getAllByText(/Army/i).length).toBeGreaterThan(0);
    expect(getAllByText(/Marines/i).length).toBeGreaterThan(0);

    expect(getByText(/Live up to Army values/i)).toBeInTheDocument();
    expect(getByText(/The quality of maturity/i)).toBeInTheDocument();

    expect(getAllByTestId('styled-box').length).toEqual(data.inspiration.length);
  });

  it('should render multiple inspirations for loyalty', async () => {
    const data = {
        'value': 'Loyalty',
        'inspiration': [
            {
                'organization': 'U.S. Army',
                'definition': 'Bear true faith and allegiance to the U.S. Constitution, the Army, your unit and other Soldiers. Bearing true faith and allegiance is a matter of believing in and devoting yourself to something or someone … By wearing the uniform of the U.S. Army you are expressing your loyalty. And by doing your share, you show your loyalty to your unit.',
            },
        ],
    };
    getValueMetaMock.mockResolvedValue(data);
    const { getByText, getAllByText, getAllByTestId } = render(
      <RenderWithRouter valueId={5004}>
        <Value />
      </RenderWithRouter>,
    );
    await waitFor(() => getAllByText(/loyalty/i));

    expect(getAllByText(/U.S. Army/i).length).toBeGreaterThan(0);

    expect(getByText(/Bear true faith and allegiance/i)).toBeInTheDocument();

    expect(getAllByTestId('styled-box').length).toEqual(data.inspiration.length);
  });

  it('should render the same based on URL parameters for integrity', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter valueId={5001}>
        <Value />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the same based on URL parameters for respect', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter valueId={5002}>
        <Value />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the same based on URL parameters for honor', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter valueId={5003}>
        <Value />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the same based on URL parameters for loyalty', () => {
    const { container } = renderWithTheme(
      <RenderWithRouter valueId={5004}>
        <Value />
      </RenderWithRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});