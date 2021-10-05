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


/**
 * Prints message to console.error if `NODE_ENV` is set to
 * `development`. Accepts anything as an arguments.
 */
export const devError = (msg: any) =>
  process.env.NODE_ENV === 'development' && console.error(
    typeof msg === 'object' ? JSON.stringify(msg) : msg,
  );


/**
 * Generates a unique string ID based on the current time
 * in milliseconds and a random number that is added to
 * the end of the string.
 *
 * **Note**: Collisions are still possible but is highly unlikely and
 * could only happen if two calls are made to ths within
 * the same millisecond and the same random number is generated
 * twice.
 */
export const genUniqueId = () =>
    `${Date.now()}${Math.random()}`;
