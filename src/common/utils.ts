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

/**
 * A utility function to merge multiple refs together to use
 * on a React JSX tag.
 *
 * ```
 * const Component = () => {
 *   const refOne = useRef();
 *   const refTwo = useRef();
 *   return <div ref={mergeRefs([refOne, refTwo])} />
 * }
 * ```
 */
export function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>,
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export const isRouter = (name: string) =>
  name.length > 0 && name[0].toLowerCase() === 'r';

export const isSwitch = (name: string) =>
  name.length > 0 && name[0].toLowerCase() === 's';

export const isHost = (name: string) =>
  name.length > 0 && name[0].toLowerCase() === 'h';
