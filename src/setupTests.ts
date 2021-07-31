// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

import { ResizeObserver } from '@juggle/resize-observer';

// ResizeObserver is required to be added to the `jsdom`
// it is checked on the global object for the `flow` library
// We add the `ResizeObserver` type here to the global node
// so to ensure type safety.
declare global {
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
      ResizeObserver: typeof ResizeObserver;
    }
  }
}

global.ResizeObserver = ResizeObserver;
