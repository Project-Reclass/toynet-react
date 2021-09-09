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

import {ReactComponent as Grid} from 'src/assets/splashScreen/v2/grid-background.svg';
import {ReactComponent as Illustration} from 'src/assets/splashScreen/v2/illustration-header.svg';

import {
  SplashHeaderContainer,
  SpashHeaderGridContainer,
  SplashHeaderContent,
  SplashHeaderContentH1,
  SplashHeaderImageContainer,
  SplashHeaderBody,
  SplashHeaderBodySVG,
} from './styled';

interface Props {
  children: React.ReactNode
};

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: object) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <SplashHeaderContainer>
          <SpashHeaderGridContainer>
            <Grid />
          </SpashHeaderGridContainer>
          <SplashHeaderBody>
            <SplashHeaderContent>
              <SplashHeaderContentH1>
                Please refresh or close tab and reopen site.
              </SplashHeaderContentH1>
            </SplashHeaderContent>
            <SplashHeaderImageContainer>
              <SplashHeaderBodySVG>
                <Illustration />
              </SplashHeaderBodySVG>
            </SplashHeaderImageContainer>
          </SplashHeaderBody>
        </SplashHeaderContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
