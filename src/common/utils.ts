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

