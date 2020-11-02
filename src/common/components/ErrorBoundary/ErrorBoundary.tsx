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
