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
import { fireEvent } from '@testing-library/react';
import { renderWithTheme } from 'src/common/test-utils/renderWithTheme';
import IPAddressInput from '../IPAddressInput';

const onChangeMock = jest.fn();
describe('the ip address input', () => {
  it('should not allow spaces to be input', () => {
    const { getByTestId } = renderWithTheme(<IPAddressInput onChange={onChangeMock} />);
    const ipInput = getByTestId('ipaddress-input');

    fireEvent.change(ipInput, { target: { value: 'test  ' }});

    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock.mock.calls[0][0]).toMatchObject({ target: { value: 'test' }});
  });
});