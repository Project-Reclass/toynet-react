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
import { renderHook, act, cleanup } from '@testing-library/react-hooks';
import useBoolean from 'src/common/hooks/useBoolean';

afterEach(cleanup);

describe('The useBoolean custom hook', () => {
  it('should allow setting a default value', () => {
    const { result } = renderHook(() => useBoolean(false));
    expect(result.current.bool).toBeFalsy();
  });

  it('should be able to set value to true', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.setTrue();
    });

    expect(result.current.bool).toBeTruthy();
  });

  it('should be able to set value to false', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });

    expect(result.current.bool).toBeFalsy();
  });

  it('should be able to toggle value', () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.toggle();
    });

    expect(result.current.bool).toBeTruthy();

    act(() => {
      result.current.toggle();
    });

    expect(result.current.bool).toBeFalsy();
  });
});