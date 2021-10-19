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

(global as any).ResizeObserver = ResizeObserver;
